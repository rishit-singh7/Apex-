import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import threading
import time
from contextlib import asynccontextmanager, contextmanager
from pathlib import Path
from typing import Annotated, AsyncGenerator, Generator, Literal

from fastapi import Depends, FastAPI, HTTPException, Request, Response, status
from fastapi.responses import FileResponse
from pydantic import BaseModel, ConfigDict, Field, field_validator

from real_numbers_quiz import (
    QUESTIONS as LEGACY_REAL_NUMBERS_QUESTIONS,
    QUIZ_ID as LEGACY_REAL_NUMBERS_QUIZ_ID,
    OVERALL_TIMER_SECONDS as LEGACY_OVERALL_TIMER_SECONDS,
    QUESTION_TIMER_SECONDS as LEGACY_QUESTION_TIMER_SECONDS,
)
from real_numbers_quiz_v2 import (
    QUESTIONS as REAL_NUMBERS_QUESTIONS,
    QUIZ_ID as REAL_NUMBERS_QUIZ_ID,
    OVERALL_TIMER_SECONDS,
    QUESTION_TIMER_SECONDS,
)
from polynomials_quiz_v1 import (
    QUESTIONS as POLYNOMIALS_QUESTIONS,
    QUIZ_ID as POLYNOMIALS_QUIZ_ID,
    OVERALL_TIMER_SECONDS as POLYNOMIALS_OVERALL_TIMER_SECONDS,
    QUESTION_TIMER_SECONDS as POLYNOMIALS_QUESTION_TIMER_SECONDS,
)
from linear_equations_quiz_v1 import (
    QUESTIONS as LINEAR_EQUATIONS_QUESTIONS,
    QUIZ_ID as LINEAR_EQUATIONS_QUIZ_ID,
    OVERALL_TIMER_SECONDS as LINEAR_EQUATIONS_OVERALL_TIMER_SECONDS,
    QUESTION_TIMER_SECONDS as LINEAR_EQUATIONS_QUESTION_TIMER_SECONDS,
)
from quadratic_equations_quiz_v1 import (
    QUESTIONS as QUADRATIC_EQUATIONS_QUESTIONS,
    QUIZ_ID as QUADRATIC_EQUATIONS_QUIZ_ID,
    OVERALL_TIMER_SECONDS as QUADRATIC_EQUATIONS_OVERALL_TIMER_SECONDS,
    QUESTION_TIMER_SECONDS as QUADRATIC_EQUATIONS_QUESTION_TIMER_SECONDS,
)
from arithmetic_progressions_quiz_v1 import (
    QUESTIONS as ARITHMETIC_PROGRESSIONS_QUESTIONS,
    QUIZ_ID as ARITHMETIC_PROGRESSIONS_QUIZ_ID,
    OVERALL_TIMER_SECONDS as ARITHMETIC_PROGRESSIONS_OVERALL_TIMER_SECONDS,
    QUESTION_TIMER_SECONDS as ARITHMETIC_PROGRESSIONS_QUESTION_TIMER_SECONDS,
)


PROJECT_DIR = Path(__file__).resolve().parent
DATABASE_PATH = Path(os.environ.get("APEX_DATABASE_PATH", PROJECT_DIR / "apex.sqlite3"))
SESSION_COOKIE = "apex_session"
SESSION_DURATION_SECONDS = 12 * 60 * 60
REMEMBERED_SESSION_SECONDS = 30 * 24 * 60 * 60
PASSWORD_HASH_ITERATIONS = 600_000
COOKIE_SECURE = os.environ.get("APEX_COOKIE_SECURE", "false").lower() in {
    "1",
    "true",
    "yes",
}

ExamName = Literal[
    "Math Olympiad",
    "Science Olympiad",
    "JEE Foundation",
    "Other",
]
OLYMPIAD_FOCI = {
    "Math Olympiad": frozenset({"SOF IMO", "IOQM"}),
    "Science Olympiad": frozenset({"SOF NSO"}),
}
PreparationLevel = Literal[
    "beginner",
    "some-preparation",
    "well-prepared",
    "focused-revision",
]


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncGenerator[None, None]:
    initialize_database()
    yield


app = FastAPI(
    title="Apex local learning backend",
    description="Local account and session API for the Apex learning prototype.",
    version="0.1.0",
    lifespan=lifespan,
)


class RegisterRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: Annotated[str, Field(min_length=2, max_length=80)]
    email: Annotated[str, Field(min_length=3, max_length=254)]
    age: Annotated[int, Field(ge=5, le=120)]
    exam: ExamName
    password: Annotated[str, Field(min_length=8, max_length=128)]

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        normalized = value.strip().casefold()
        if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", normalized):
            raise ValueError("Enter a valid email address.")
        return normalized

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        if len(value.strip()) < 2:
            raise ValueError("Name must contain at least two characters.")
        return value.strip()


class LoginRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    email: Annotated[str, Field(min_length=3, max_length=254)]
    password: Annotated[str, Field(min_length=1, max_length=128)]
    remember: bool = False

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        normalized = value.strip().casefold()
        if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", normalized):
            raise ValueError("Enter a valid email address.")
        return normalized


class OlympiadFocusRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    exam_focus: Annotated[str, Field(min_length=1, max_length=40)]
    preparation_level: PreparationLevel
    school_class: Annotated[int, Field(ge=1, le=12)]


class QuizAnswerRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    question_index: Annotated[int, Field(ge=0, le=19)]
    option: Literal["A", "B", "C", "D"]


class QuizNavigationRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    question_index: Annotated[int, Field(ge=0, le=19)]


class RateLimiter:
    def __init__(self) -> None:
        self._attempts: dict[tuple[str, str], list[float]] = {}
        self._lock = threading.Lock()

    def check(self, action: str, client: str, limit: int, window: int) -> None:
        now = time.monotonic()
        key = (action, client)
        with self._lock:
            attempts = [
                attempt
                for attempt in self._attempts.get(key, [])
                if now - attempt < window
            ]
            if len(attempts) >= limit:
                self._attempts[key] = attempts
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Too many attempts. Please wait a little and try again.",
                )
            attempts.append(now)
            self._attempts[key] = attempts


rate_limiter = RateLimiter()


@contextmanager
def database() -> Generator[sqlite3.Connection, None, None]:
    connection = sqlite3.connect(DATABASE_PATH, timeout=10)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("PRAGMA busy_timeout = 10000")
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def initialize_database() -> None:
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with database() as connection:
        connection.execute("PRAGMA journal_mode = WAL")
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS accounts (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                age INTEGER NOT NULL CHECK (age BETWEEN 5 AND 120),
                exam TEXT NOT NULL CHECK (
                    exam IN (
                        'Math Olympiad',
                        'Science Olympiad',
                        'JEE Foundation',
                        'Other'
                    )
                ),
                exam_focus TEXT,
                preparation_level TEXT,
                school_class INTEGER CHECK (school_class BETWEEN 1 AND 12),
                password_salt BLOB NOT NULL,
                password_hash BLOB NOT NULL,
                created_at INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sessions (
                token_hash BLOB PRIMARY KEY,
                account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
                expires_at INTEGER NOT NULL
            );

            CREATE INDEX IF NOT EXISTS sessions_expires_at_idx
                ON sessions(expires_at);

            CREATE TABLE IF NOT EXISTS quiz_attempts (
                id INTEGER PRIMARY KEY,
                account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
                quiz_id TEXT NOT NULL,
                started_at REAL NOT NULL,
                overall_deadline_at REAL NOT NULL,
                status TEXT NOT NULL CHECK (status IN ('in_progress', 'submitted')),
                current_question INTEGER NOT NULL CHECK (current_question BETWEEN 0 AND 19),
                question_states_json TEXT NOT NULL,
                answers_json TEXT NOT NULL,
                question_snapshot_json TEXT,
                submitted_at REAL,
                time_taken_seconds INTEGER,
                correct_count INTEGER,
                incorrect_count INTEGER,
                unanswered_count INTEGER,
                final_score INTEGER,
                accuracy REAL,
                xp_awarded INTEGER NOT NULL DEFAULT 0 CHECK (xp_awarded >= 0)
            );

            CREATE INDEX IF NOT EXISTS quiz_attempts_history_idx
                ON quiz_attempts(account_id, quiz_id, started_at DESC);
            CREATE TABLE IF NOT EXISTS xp_transactions (
                id INTEGER PRIMARY KEY,
                account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
                attempt_id INTEGER NOT NULL UNIQUE REFERENCES quiz_attempts(id) ON DELETE CASCADE,
                transaction_type TEXT NOT NULL CHECK (transaction_type = 'quiz_completion'),
                amount INTEGER NOT NULL CHECK (amount > 0),
                created_at REAL NOT NULL
            );
            """
        )
        connection.execute("DROP INDEX IF EXISTS quiz_attempts_one_active_idx")
        connection.execute(
            """CREATE UNIQUE INDEX quiz_attempts_one_active_idx
               ON quiz_attempts(account_id, quiz_id)
               WHERE status = 'in_progress'"""
        )
        quiz_attempt_columns = {
            row["name"] for row in connection.execute("PRAGMA table_info(quiz_attempts)")
        }
        if "question_snapshot_json" not in quiz_attempt_columns:
            connection.execute(
                "ALTER TABLE quiz_attempts ADD COLUMN question_snapshot_json TEXT"
            )
        legacy_snapshot = json.dumps(
            LEGACY_REAL_NUMBERS_QUESTIONS,
            ensure_ascii=False,
        )
        connection.execute(
            """UPDATE quiz_attempts SET question_snapshot_json = ?
               WHERE quiz_id = ? AND question_snapshot_json IS NULL""",
            (legacy_snapshot, LEGACY_REAL_NUMBERS_QUIZ_ID),
        )
        account_columns = {
            row["name"] for row in connection.execute("PRAGMA table_info(accounts)")
        }
        if "exam_focus" not in account_columns:
            connection.execute("ALTER TABLE accounts ADD COLUMN exam_focus TEXT")
        if "preparation_level" not in account_columns:
            connection.execute(
                "ALTER TABLE accounts ADD COLUMN preparation_level TEXT"
            )
        if "school_class" not in account_columns:
            connection.execute(
                "ALTER TABLE accounts ADD COLUMN school_class INTEGER "
                "CHECK (school_class BETWEEN 1 AND 12)"
            )


def hash_password(password: str, salt: bytes | None = None) -> tuple[bytes, bytes]:
    password_salt = salt if salt is not None else secrets.token_bytes(16)
    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        password_salt,
        PASSWORD_HASH_ITERATIONS,
    )
    return password_salt, password_hash


def public_account(row: sqlite3.Row) -> dict[str, int | str | None]:
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "age": row["age"],
        "exam": row["exam"],
        "exam_focus": row["exam_focus"],
        "preparation_level": row["preparation_level"],
        "school_class": row["school_class"],
    }


def create_session(
    account_id: int,
    remember: bool,
) -> tuple[str, int]:
    token = secrets.token_urlsafe(32)
    expires_at = int(time.time()) + (
        REMEMBERED_SESSION_SECONDS if remember else SESSION_DURATION_SECONDS
    )
    token_hash = hashlib.sha256(token.encode("ascii")).digest()

    with database() as connection:
        connection.execute("DELETE FROM sessions WHERE expires_at <= ?", (int(time.time()),))
        connection.execute(
            "INSERT INTO sessions (token_hash, account_id, expires_at) VALUES (?, ?, ?)",
            (token_hash, account_id, expires_at),
        )
    return token, expires_at


def get_current_account(
    request: Request,
) -> dict[str, int | str | None]:
    token = request.cookies.get(SESSION_COOKIE)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please log in to continue.",
        )

    token_hash = hashlib.sha256(token.encode("utf-8")).digest()
    with database() as connection:
        row = connection.execute(
            """
            SELECT accounts.id, accounts.name, accounts.email, accounts.age,
                   accounts.exam, accounts.exam_focus,
                   accounts.preparation_level, accounts.school_class
            FROM sessions
            JOIN accounts ON accounts.id = sessions.account_id
            WHERE sessions.token_hash = ? AND sessions.expires_at > ?
            """,
            (token_hash, int(time.time())),
        ).fetchone()

    if row is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Your session has expired. Please log in again.",
        )
    return public_account(row)


CurrentAccount = Annotated[
    dict[str, int | str | None], Depends(get_current_account)
]


def set_session_cookie(
    response: Response,
    token: str,
    expires_at: int,
) -> None:
    response.set_cookie(
        key=SESSION_COOKIE,
        value=token,
        max_age=max(0, expires_at - int(time.time())),
        expires=expires_at,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        path="/",
    )


def client_address(request: Request) -> str:
    return request.client.host if request.client is not None else "unknown"


@app.get("/", include_in_schema=False)
@app.get("/login_page.html", include_in_schema=False)
def login_page() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "login_page.html",
        media_type="text/html",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/login_page.js", include_in_schema=False)
def login_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "login_page.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/onboarding", include_in_schema=False)
def onboarding_page() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "onboarding.html",
        media_type="text/html",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/onboarding.js", include_in_schema=False)
def onboarding_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "onboarding.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/profile", include_in_schema=False)
def profile_page() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "dashboard.html",
        media_type="text/html",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/profile.js", include_in_schema=False)
def profile_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "dashboard.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/real-numbers", include_in_schema=False)
def real_numbers_page() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "real_numbers.html",
        media_type="text/html",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/real-numbers.js", include_in_schema=False)
def real_numbers_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "real_numbers.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/real-numbers-content.js", include_in_schema=False)
def real_numbers_content_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "real_numbers_content.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/real-numbers/quiz", include_in_schema=False)
def real_numbers_quiz_page() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "real_numbers_quiz.html",
        media_type="text/html",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/real-numbers-quiz.css", include_in_schema=False)
def real_numbers_quiz_styles() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "real_numbers_quiz.css",
        media_type="text/css",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/real-numbers-quiz.js", include_in_schema=False)
def real_numbers_quiz_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "real_numbers_quiz.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/polynomials/quiz", include_in_schema=False)
def polynomials_quiz_page() -> FileResponse:
    return FileResponse(PROJECT_DIR / "polynomials_quiz.html", media_type="text/html", headers={"Cache-Control": "no-cache"})


@app.get("/polynomials-quiz.css", include_in_schema=False)
def polynomials_quiz_styles() -> FileResponse:
    return FileResponse(PROJECT_DIR / "polynomials_quiz.css", media_type="text/css", headers={"Cache-Control": "no-cache"})


@app.get("/polynomials-quiz.js", include_in_schema=False)
def polynomials_quiz_script() -> FileResponse:
    return FileResponse(PROJECT_DIR / "polynomials_quiz.js", media_type="text/javascript", headers={"Cache-Control": "no-cache"})


@app.get("/polynomials", include_in_schema=False)
def polynomials_page() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "polynomials.html",
        media_type="text/html",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/polynomials.js", include_in_schema=False)
def polynomials_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "polynomials.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/polynomials-content.js", include_in_schema=False)
def polynomials_content_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "polynomials_content.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/linear-equations", include_in_schema=False)
def linear_equations_page() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "linear_equations.html",
        media_type="text/html",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/linear-equations.js", include_in_schema=False)
def linear_equations_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "linear_equations.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/linear-equations-content.js", include_in_schema=False)
def linear_equations_content_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "linear_equations_content.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/linear-equations/quiz", include_in_schema=False)
def linear_equations_quiz_page() -> FileResponse:
    return FileResponse(PROJECT_DIR / "linear_equations_quiz.html", media_type="text/html", headers={"Cache-Control": "no-cache"})


@app.get("/linear-equations-quiz.css", include_in_schema=False)
def linear_equations_quiz_styles() -> FileResponse:
    return FileResponse(PROJECT_DIR / "linear_equations_quiz.css", media_type="text/css", headers={"Cache-Control": "no-cache"})


@app.get("/linear-equations-quiz.js", include_in_schema=False)
def linear_equations_quiz_script() -> FileResponse:
    return FileResponse(PROJECT_DIR / "linear_equations_quiz.js", media_type="text/javascript", headers={"Cache-Control": "no-cache"})


@app.get("/quadratic-equations", include_in_schema=False)
def quadratic_equations_page() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "quadratic_equations.html",
        media_type="text/html",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/quadratic-equations.js", include_in_schema=False)
def quadratic_equations_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "quadratic_equations.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/quadratic-equations-content.js", include_in_schema=False)
def quadratic_equations_content_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "quadratic_equations_content.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/quadratic-equations/quiz", include_in_schema=False)
def quadratic_equations_quiz_page() -> FileResponse:
    return FileResponse(PROJECT_DIR / "quadratic_equations_quiz.html", media_type="text/html", headers={"Cache-Control": "no-cache"})


@app.get("/quadratic-equations-quiz.css", include_in_schema=False)
def quadratic_equations_quiz_styles() -> FileResponse:
    return FileResponse(PROJECT_DIR / "quadratic_equations_quiz.css", media_type="text/css", headers={"Cache-Control": "no-cache"})


@app.get("/quadratic-equations-quiz.js", include_in_schema=False)
def quadratic_equations_quiz_script() -> FileResponse:
    return FileResponse(PROJECT_DIR / "quadratic_equations_quiz.js", media_type="text/javascript", headers={"Cache-Control": "no-cache"})


@app.get("/arithmetic-progressions", include_in_schema=False)
def arithmetic_progressions_page() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "arithmetic_progressions.html",
        media_type="text/html",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/arithmetic-progressions.js", include_in_schema=False)
def arithmetic_progressions_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "arithmetic_progressions.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/arithmetic-progressions-content.js", include_in_schema=False)
def arithmetic_progressions_content_script() -> FileResponse:
    return FileResponse(
        PROJECT_DIR / "arithmetic_progressions_content.js",
        media_type="text/javascript",
        headers={"Cache-Control": "no-cache"},
    )


@app.get("/arithmetic-progressions/quiz", include_in_schema=False)
def arithmetic_progressions_quiz_page() -> FileResponse:
    return FileResponse(PROJECT_DIR / "arithmetic_progressions_quiz.html", media_type="text/html", headers={"Cache-Control": "no-cache"})


@app.get("/arithmetic-progressions-quiz.css", include_in_schema=False)
def arithmetic_progressions_quiz_styles() -> FileResponse:
    return FileResponse(PROJECT_DIR / "arithmetic_progressions_quiz.css", media_type="text/css", headers={"Cache-Control": "no-cache"})


@app.get("/arithmetic-progressions-quiz.js", include_in_schema=False)
def arithmetic_progressions_quiz_script() -> FileResponse:
    return FileResponse(PROJECT_DIR / "arithmetic_progressions_quiz.js", media_type="text/javascript", headers={"Cache-Control": "no-cache"})


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


def quiz_now() -> float:
    """Clock boundary kept separate so timer behavior can be tested deterministically."""
    return time.time()


def require_real_numbers_eligibility(account: CurrentAccount) -> None:
    if (
        account.get("exam") != "Math Olympiad"
        or account.get("exam_focus") != "SOF IMO"
        or account.get("school_class") != 10
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The Real Numbers quiz is currently available to Class 10 SOF IMO learners.",
        )


def require_polynomials_eligibility(account: CurrentAccount) -> None:
    if (
        account.get("exam") != "Math Olympiad"
        or account.get("exam_focus") != "SOF IMO"
        or account.get("school_class") != 10
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The Polynomials quiz is currently available to Class 10 SOF IMO learners.",
        )


def require_linear_equations_eligibility(account: CurrentAccount) -> None:
    if (
        account.get("exam") != "Math Olympiad"
        or account.get("exam_focus") != "SOF IMO"
        or account.get("school_class") != 10
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The Pair of Linear Equations quiz is currently available to Class 10 SOF IMO learners.",
        )


def require_quadratic_equations_eligibility(account: CurrentAccount) -> None:
    if (
        account.get("exam") != "Math Olympiad"
        or account.get("exam_focus") != "SOF IMO"
        or account.get("school_class") != 10
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The Quadratic Equations quiz is currently available to Class 10 SOF IMO learners.",
        )


def require_arithmetic_progressions_eligibility(account: CurrentAccount) -> None:
    if (
        account.get("exam") != "Math Olympiad"
        or account.get("exam_focus") != "SOF IMO"
        or account.get("school_class") != 10
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The Arithmetic Progressions quiz is currently available to Class 10 SOF IMO learners.",
        )


def _load_quiz_attempt(
    connection: sqlite3.Connection,
    attempt_id: int,
    account_id: int,
) -> sqlite3.Row:
    row = connection.execute(
        """SELECT * FROM quiz_attempts
           WHERE id = ? AND account_id = ? AND quiz_id IN (?, ?)""",
        (attempt_id, account_id, REAL_NUMBERS_QUIZ_ID, LEGACY_REAL_NUMBERS_QUIZ_ID),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Quiz attempt not found.")
    return row


def _load_polynomials_attempt(
    connection: sqlite3.Connection,
    attempt_id: int,
    account_id: int,
) -> sqlite3.Row:
    row = connection.execute(
        "SELECT * FROM quiz_attempts WHERE id = ? AND account_id = ? AND quiz_id = ?",
        (attempt_id, account_id, POLYNOMIALS_QUIZ_ID),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Quiz attempt not found.")
    return row


def _load_linear_equations_attempt(
    connection: sqlite3.Connection,
    attempt_id: int,
    account_id: int,
) -> sqlite3.Row:
    row = connection.execute(
        "SELECT * FROM quiz_attempts WHERE id = ? AND account_id = ? AND quiz_id = ?",
        (attempt_id, account_id, LINEAR_EQUATIONS_QUIZ_ID),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Quiz attempt not found.")
    return row


def _load_quadratic_equations_attempt(
    connection: sqlite3.Connection,
    attempt_id: int,
    account_id: int,
) -> sqlite3.Row:
    row = connection.execute(
        "SELECT * FROM quiz_attempts WHERE id = ? AND account_id = ? AND quiz_id = ?",
        (attempt_id, account_id, QUADRATIC_EQUATIONS_QUIZ_ID),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Quiz attempt not found.")
    return row


def _load_arithmetic_progressions_attempt(
    connection: sqlite3.Connection,
    attempt_id: int,
    account_id: int,
) -> sqlite3.Row:
    row = connection.execute(
        "SELECT * FROM quiz_attempts WHERE id = ? AND account_id = ? AND quiz_id = ?",
        (attempt_id, account_id, ARITHMETIC_PROGRESSIONS_QUIZ_ID),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Quiz attempt not found.")
    return row


def _reload_quiz_attempt(connection: sqlite3.Connection, row: sqlite3.Row) -> sqlite3.Row:
    if row["quiz_id"] == POLYNOMIALS_QUIZ_ID:
        return _load_polynomials_attempt(connection, row["id"], row["account_id"])
    if row["quiz_id"] == LINEAR_EQUATIONS_QUIZ_ID:
        return _load_linear_equations_attempt(connection, row["id"], row["account_id"])
    if row["quiz_id"] == QUADRATIC_EQUATIONS_QUIZ_ID:
        return _load_quadratic_equations_attempt(connection, row["id"], row["account_id"])
    if row["quiz_id"] == ARITHMETIC_PROGRESSIONS_QUIZ_ID:
        return _load_arithmetic_progressions_attempt(connection, row["id"], row["account_id"])
    return _load_quiz_attempt(connection, row["id"], row["account_id"])


def _attempt_questions(row: sqlite3.Row) -> tuple[dict[str, object], ...]:
    snapshot = row["question_snapshot_json"]
    if snapshot:
        return tuple(json.loads(snapshot))
    if row["quiz_id"] == LEGACY_REAL_NUMBERS_QUIZ_ID:
        return LEGACY_REAL_NUMBERS_QUESTIONS
    if row["quiz_id"] == LINEAR_EQUATIONS_QUIZ_ID:
        return LINEAR_EQUATIONS_QUESTIONS
    if row["quiz_id"] == QUADRATIC_EQUATIONS_QUIZ_ID:
        return QUADRATIC_EQUATIONS_QUESTIONS
    if row["quiz_id"] == ARITHMETIC_PROGRESSIONS_QUIZ_ID:
        return ARITHMETIC_PROGRESSIONS_QUESTIONS
    return REAL_NUMBERS_QUESTIONS


def _attempt_timer_seconds(row: sqlite3.Row) -> tuple[int, int]:
    if row["quiz_id"] == LEGACY_REAL_NUMBERS_QUIZ_ID:
        return LEGACY_OVERALL_TIMER_SECONDS, LEGACY_QUESTION_TIMER_SECONDS
    if row["quiz_id"] == POLYNOMIALS_QUIZ_ID:
        return POLYNOMIALS_OVERALL_TIMER_SECONDS, POLYNOMIALS_QUESTION_TIMER_SECONDS
    if row["quiz_id"] == LINEAR_EQUATIONS_QUIZ_ID:
        return LINEAR_EQUATIONS_OVERALL_TIMER_SECONDS, LINEAR_EQUATIONS_QUESTION_TIMER_SECONDS
    if row["quiz_id"] == QUADRATIC_EQUATIONS_QUIZ_ID:
        return QUADRATIC_EQUATIONS_OVERALL_TIMER_SECONDS, QUADRATIC_EQUATIONS_QUESTION_TIMER_SECONDS
    if row["quiz_id"] == ARITHMETIC_PROGRESSIONS_QUIZ_ID:
        return ARITHMETIC_PROGRESSIONS_OVERALL_TIMER_SECONDS, ARITHMETIC_PROGRESSIONS_QUESTION_TIMER_SECONDS
    return OVERALL_TIMER_SECONDS, QUESTION_TIMER_SECONDS


def _public_attempt_question(
    question: dict[str, object],
    index: int,
) -> dict[str, object]:
    return {
        "index": index,
        "id": question["id"],
        "category": question["category"],
        "prompt": question["prompt"],
        "options": question["options"],
    }


def _finish_quiz_attempt(
    connection: sqlite3.Connection,
    row: sqlite3.Row,
    now: float,
) -> sqlite3.Row:
    if row["status"] == "submitted":
        return row
    questions = _attempt_questions(row)
    answers = json.loads(row["answers_json"])
    correct = sum(
        1 for index, question in enumerate(questions)
        if answers.get(str(index)) == question["correct"]
    )
    attempted = sum(1 for index in range(len(questions)) if str(index) in answers)
    incorrect = attempted - correct
    unanswered = len(questions) - attempted
    xp_awarded = 10 + (2 * correct)
    overall_seconds, _ = _attempt_timer_seconds(row)
    time_taken = max(0, min(int(now - row["started_at"]), overall_seconds))
    connection.execute(
        """UPDATE quiz_attempts
           SET status = 'submitted', submitted_at = ?, time_taken_seconds = ?,
               correct_count = ?, incorrect_count = ?, unanswered_count = ?,
               final_score = ?, accuracy = ?, xp_awarded = ?
           WHERE id = ? AND account_id = ? AND status = 'in_progress'""",
        (now, time_taken, correct, incorrect, unanswered, correct,
          round(correct * 100 / len(questions), 2), xp_awarded,
         row["id"], row["account_id"]),
    )
    connection.execute(
        """INSERT OR IGNORE INTO xp_transactions
           (account_id, attempt_id, transaction_type, amount, created_at)
           VALUES (?, ?, 'quiz_completion', ?, ?)""",
        (row["account_id"], row["id"], xp_awarded, now),
    )
    return _reload_quiz_attempt(connection, row)


def _tick_quiz_attempt(
    connection: sqlite3.Connection,
    row: sqlite3.Row,
    now: float,
) -> sqlite3.Row:
    if row["status"] == "submitted":
        return row
    if now >= row["overall_deadline_at"]:
        return _finish_quiz_attempt(connection, row, row["overall_deadline_at"])

    states = json.loads(row["question_states_json"])
    current_state = states.get(str(row["current_question"]))
    if current_state and current_state.get("active_since") is not None:
        elapsed = max(0.0, now - current_state["active_since"])
        remaining = max(0.0, current_state["remaining_seconds"] - elapsed)
        if remaining <= 0:
            current_state["remaining_seconds"] = 0
            current_state["active_since"] = None
            current_state["locked"] = True
        else:
            current_state["remaining_seconds"] = remaining
            current_state["active_since"] = now
        connection.execute(
            "UPDATE quiz_attempts SET question_states_json = ? WHERE id = ?",
            (json.dumps(states), row["id"]),
        )
    return _reload_quiz_attempt(connection, row)


def _quiz_result_payload(row: sqlite3.Row) -> dict[str, object]:
    if row["status"] != "submitted":
        raise HTTPException(status_code=409, detail="Submit the quiz before viewing explanations.")
    answers = json.loads(row["answers_json"])
    questions = _attempt_questions(row)
    review = []
    for index, question in enumerate(questions):
        selected = answers.get(str(index))
        correct = selected == question["correct"] if selected else False
        review.append({
            "index": index,
            "category": question["category"],
            "prompt": question["prompt"],
            "options": question["options"],
            "selectedOption": selected,
            "selectedLabel": question["options"].get(selected) if selected else None,
            "correctOption": question["correct"],
            "correctLabel": question["options"][question["correct"]],
            "outcome": "unanswered" if selected is None else "correct" if correct else "incorrect",
            "explanation": question["explanation"],
        })
    overall_seconds, _ = _attempt_timer_seconds(row)
    return {
        "attemptId": row["id"],
        "status": "submitted",
        "totalQuestions": len(questions),
        "correct": row["correct_count"],
        "incorrect": row["incorrect_count"],
        "unanswered": row["unanswered_count"],
        "score": row["final_score"],
        "accuracy": row["accuracy"],
        "timeTakenSeconds": row["time_taken_seconds"],
        "overallTimeLimitSeconds": overall_seconds,
        "questions": review,
    }


def _quiz_state_payload(row: sqlite3.Row, now: float) -> dict[str, object]:
    if row["status"] == "submitted":
        return _quiz_result_payload(row)
    states = json.loads(row["question_states_json"])
    questions = _attempt_questions(row)
    _, question_timer_seconds = _attempt_timer_seconds(row)
    current_index = row["current_question"]
    current_state = states.get(str(current_index), {})
    q_remaining = current_state.get("remaining_seconds", question_timer_seconds)
    if current_state.get("active_since") is not None:
        q_remaining = max(0, q_remaining - max(0, now - current_state["active_since"]))
    state_list = []
    answers = json.loads(row["answers_json"])
    for index in range(len(questions)):
        q_state = states.get(str(index), {})
        state_list.append({
            "index": index,
            "visited": str(index) in states,
            "answered": str(index) in answers,
            "locked": bool(q_state.get("locked", False)),
        })
    return {
        "attemptId": row["id"],
        "status": "in_progress",
        "questionCount": len(questions),
        "currentQuestionIndex": current_index,
        "question": _public_attempt_question(questions[current_index], current_index),
        "selectedOption": answers.get(str(current_index)),
        "questionRemainingSeconds": int(q_remaining + 0.999),
        "overallRemainingSeconds": max(0, int(row["overall_deadline_at"] - now + 0.999)),
        "questions": state_list,
    }


def _quiz_response(row: sqlite3.Row, now: float) -> dict[str, object]:
    return _quiz_state_payload(row, now)


@app.post("/api/quiz/real-numbers/attempts")
def start_or_resume_real_numbers_quiz(account: CurrentAccount) -> dict[str, object]:
    require_real_numbers_eligibility(account)
    now = quiz_now()
    with database() as connection:
        active = connection.execute(
            """SELECT * FROM quiz_attempts
               WHERE account_id = ? AND quiz_id = ?
                 AND status = 'in_progress' ORDER BY started_at LIMIT 1""",
            (account["id"], REAL_NUMBERS_QUIZ_ID),
        ).fetchone()
        if active is not None:
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)

        states = {"0": {
            "remaining_seconds": QUESTION_TIMER_SECONDS,
            "active_since": now,
            "locked": False,
        }}
        try:
            cursor = connection.execute(
                """INSERT INTO quiz_attempts
                   (account_id, quiz_id, started_at, overall_deadline_at, status,
                    current_question, question_states_json, answers_json,
                    question_snapshot_json)
                   VALUES (?, ?, ?, ?, 'in_progress', 0, ?, '{}', ?)""",
                (account["id"], REAL_NUMBERS_QUIZ_ID, now,
                 now + OVERALL_TIMER_SECONDS, json.dumps(states),
                 json.dumps(REAL_NUMBERS_QUESTIONS, ensure_ascii=False)),
            )
        except sqlite3.IntegrityError:
            active = connection.execute(
                """SELECT * FROM quiz_attempts
                   WHERE account_id = ? AND quiz_id = ?
                     AND status = 'in_progress' ORDER BY started_at LIMIT 1""",
                (account["id"], REAL_NUMBERS_QUIZ_ID),
            ).fetchone()
            if active is None:
                raise
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)
        attempt = _load_quiz_attempt(connection, cursor.lastrowid, account["id"])
        return _quiz_response(attempt, now)


@app.get("/api/quiz/real-numbers/attempts/{attempt_id}")
def get_real_numbers_quiz_state(
    attempt_id: int,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quiz_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_response(attempt, now)


@app.post("/api/quiz/real-numbers/attempts/{attempt_id}/answer")
def save_real_numbers_quiz_answer(
    attempt_id: int,
    payload: QuizAnswerRequest,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quiz_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        if payload.question_index >= len(_attempt_questions(attempt)):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        if payload.question_index != attempt["current_question"]:
            raise HTTPException(status_code=409, detail="Navigate to this question before answering it.")
        states = json.loads(attempt["question_states_json"])
        if states.get(str(payload.question_index), {}).get("locked"):
            raise HTTPException(status_code=409, detail="This question's timer has expired.")
        answers = json.loads(attempt["answers_json"])
        answers[str(payload.question_index)] = payload.option
        connection.execute(
            "UPDATE quiz_attempts SET answers_json = ? WHERE id = ?",
            (json.dumps(answers), attempt_id),
        )
        attempt = _load_quiz_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/real-numbers/attempts/{attempt_id}/navigate")
def navigate_real_numbers_quiz(
    attempt_id: int,
    payload: QuizNavigationRequest,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quiz_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        questions = _attempt_questions(attempt)
        if payload.question_index >= len(questions):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        _, question_timer_seconds = _attempt_timer_seconds(attempt)
        states = json.loads(attempt["question_states_json"])
        target_key = str(payload.question_index)
        if target_key not in states:
            states[target_key] = {
                "remaining_seconds": question_timer_seconds,
                "active_since": None,
                "locked": False,
            }
        previous_state = states.get(str(attempt["current_question"]))
        if previous_state is not None:
            previous_state["active_since"] = None
        target = states[target_key]
        target["active_since"] = now if not target.get("locked") else None
        connection.execute(
            """UPDATE quiz_attempts SET current_question = ?, question_states_json = ?
               WHERE id = ?""",
            (payload.question_index, json.dumps(states), attempt_id),
        )
        attempt = _load_quiz_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/real-numbers/attempts/{attempt_id}/submit")
def submit_real_numbers_quiz(
    attempt_id: int,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quiz_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] == "in_progress":
            attempt = _finish_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/real-numbers/attempts/{attempt_id}/results")
def get_real_numbers_quiz_results(
    attempt_id: int,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quiz_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/real-numbers/history")
def real_numbers_quiz_history(account: CurrentAccount) -> dict[str, object]:
    with database() as connection:
        rows = connection.execute(
            """SELECT id, started_at, submitted_at, correct_count, incorrect_count,
                      unanswered_count, final_score, accuracy, time_taken_seconds,
                      quiz_id, question_snapshot_json
               FROM quiz_attempts WHERE account_id = ? AND quiz_id IN (?, ?)
                 AND status = 'submitted' ORDER BY started_at DESC""",
            (account["id"], REAL_NUMBERS_QUIZ_ID, LEGACY_REAL_NUMBERS_QUIZ_ID),
        ).fetchall()
    attempts = []
    for row in rows:
        attempt = dict(row)
        attempt["total_questions"] = len(_attempt_questions(row))
        attempt.pop("quiz_id", None)
        attempt.pop("question_snapshot_json", None)
        attempts.append(attempt)
    return {"attempts": attempts}


@app.post("/api/quiz/polynomials/attempts")
def start_or_resume_polynomials_quiz(account: CurrentAccount) -> dict[str, object]:
    require_polynomials_eligibility(account)
    now = quiz_now()
    with database() as connection:
        active = connection.execute(
            "SELECT * FROM quiz_attempts WHERE account_id = ? AND quiz_id = ? AND status = 'in_progress' ORDER BY started_at LIMIT 1",
            (account["id"], POLYNOMIALS_QUIZ_ID),
        ).fetchone()
        if active is not None:
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)
        states = {"0": {"remaining_seconds": POLYNOMIALS_QUESTION_TIMER_SECONDS, "active_since": now, "locked": False}}
        try:
            cursor = connection.execute(
                """INSERT INTO quiz_attempts
                   (account_id, quiz_id, started_at, overall_deadline_at, status,
                    current_question, question_states_json, answers_json, question_snapshot_json)
                   VALUES (?, ?, ?, ?, 'in_progress', 0, ?, '{}', ?)""",
                (account["id"], POLYNOMIALS_QUIZ_ID, now, now + POLYNOMIALS_OVERALL_TIMER_SECONDS,
                 json.dumps(states), json.dumps(POLYNOMIALS_QUESTIONS, ensure_ascii=False)),
            )
        except sqlite3.IntegrityError:
            active = connection.execute(
                "SELECT * FROM quiz_attempts WHERE account_id = ? AND quiz_id = ? AND status = 'in_progress' ORDER BY started_at LIMIT 1",
                (account["id"], POLYNOMIALS_QUIZ_ID),
            ).fetchone()
            if active is None:
                raise
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)
        attempt = _load_polynomials_attempt(connection, cursor.lastrowid, account["id"])
        return _quiz_response(attempt, now)


@app.get("/api/quiz/polynomials/attempts/{attempt_id}")
def get_polynomials_quiz_state(attempt_id: int, account: CurrentAccount) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_polynomials_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_response(attempt, now)


@app.post("/api/quiz/polynomials/attempts/{attempt_id}/answer")
def save_polynomials_quiz_answer(
    attempt_id: int, payload: QuizAnswerRequest, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_polynomials_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        if payload.question_index >= len(_attempt_questions(attempt)):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        if payload.question_index != attempt["current_question"]:
            raise HTTPException(status_code=409, detail="Navigate to this question before answering it.")
        states = json.loads(attempt["question_states_json"])
        if states.get(str(payload.question_index), {}).get("locked"):
            raise HTTPException(status_code=409, detail="This question's timer has expired.")
        answers = json.loads(attempt["answers_json"])
        answers[str(payload.question_index)] = payload.option
        connection.execute("UPDATE quiz_attempts SET answers_json = ? WHERE id = ?", (json.dumps(answers), attempt_id))
        attempt = _load_polynomials_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/polynomials/attempts/{attempt_id}/navigate")
def navigate_polynomials_quiz(
    attempt_id: int, payload: QuizNavigationRequest, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_polynomials_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        questions = _attempt_questions(attempt)
        if payload.question_index >= len(questions):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        states = json.loads(attempt["question_states_json"])
        key = str(payload.question_index)
        if key not in states:
            states[key] = {"remaining_seconds": POLYNOMIALS_QUESTION_TIMER_SECONDS, "active_since": None, "locked": False}
        previous = states.get(str(attempt["current_question"]))
        if previous is not None:
            previous["active_since"] = None
        states[key]["active_since"] = now if not states[key].get("locked") else None
        connection.execute(
            "UPDATE quiz_attempts SET current_question = ?, question_states_json = ? WHERE id = ?",
            (payload.question_index, json.dumps(states), attempt_id),
        )
        attempt = _load_polynomials_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/polynomials/attempts/{attempt_id}/submit")
def submit_polynomials_quiz(attempt_id: int, account: CurrentAccount) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_polynomials_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] == "in_progress":
            attempt = _finish_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/polynomials/attempts/{attempt_id}/results")
def get_polynomials_quiz_results(attempt_id: int, account: CurrentAccount) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_polynomials_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/polynomials/history")
def polynomials_quiz_history(account: CurrentAccount) -> dict[str, object]:
    with database() as connection:
        rows = connection.execute(
            """SELECT id, started_at, submitted_at, correct_count AS correct, correct_count, incorrect_count,
                      unanswered_count, final_score, accuracy, time_taken_seconds
               FROM quiz_attempts WHERE account_id = ? AND quiz_id = ? AND status = 'submitted'
               ORDER BY started_at DESC""",
            (account["id"], POLYNOMIALS_QUIZ_ID),
        ).fetchall()
    return {"attempts": [dict(row) for row in rows]}


@app.post("/api/quiz/linear-equations/attempts")
def start_or_resume_linear_equations_quiz(account: CurrentAccount) -> dict[str, object]:
    require_linear_equations_eligibility(account)
    now = quiz_now()
    with database() as connection:
        active = connection.execute(
            """SELECT * FROM quiz_attempts
               WHERE account_id = ? AND quiz_id = ? AND status = 'in_progress'
               ORDER BY started_at LIMIT 1""",
            (account["id"], LINEAR_EQUATIONS_QUIZ_ID),
        ).fetchone()
        if active is not None:
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)

        states = {"0": {
            "remaining_seconds": LINEAR_EQUATIONS_QUESTION_TIMER_SECONDS,
            "active_since": now,
            "locked": False,
        }}
        try:
            cursor = connection.execute(
                """INSERT INTO quiz_attempts
                   (account_id, quiz_id, started_at, overall_deadline_at, status,
                    current_question, question_states_json, answers_json,
                    question_snapshot_json)
                   VALUES (?, ?, ?, ?, 'in_progress', 0, ?, '{}', ?)""",
                (account["id"], LINEAR_EQUATIONS_QUIZ_ID, now,
                 now + LINEAR_EQUATIONS_OVERALL_TIMER_SECONDS, json.dumps(states),
                 json.dumps(LINEAR_EQUATIONS_QUESTIONS, ensure_ascii=False)),
            )
        except sqlite3.IntegrityError:
            active = connection.execute(
                """SELECT * FROM quiz_attempts
                   WHERE account_id = ? AND quiz_id = ? AND status = 'in_progress'
                   ORDER BY started_at LIMIT 1""",
                (account["id"], LINEAR_EQUATIONS_QUIZ_ID),
            ).fetchone()
            if active is None:
                raise
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)
        attempt = _load_linear_equations_attempt(connection, cursor.lastrowid, account["id"])
        return _quiz_response(attempt, now)


@app.get("/api/quiz/linear-equations/attempts/{attempt_id}")
def get_linear_equations_quiz_state(
    attempt_id: int,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_linear_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_response(attempt, now)


@app.post("/api/quiz/linear-equations/attempts/{attempt_id}/answer")
def save_linear_equations_quiz_answer(
    attempt_id: int,
    payload: QuizAnswerRequest,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_linear_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        if payload.question_index >= len(_attempt_questions(attempt)):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        if payload.question_index != attempt["current_question"]:
            raise HTTPException(status_code=409, detail="Navigate to this question before answering it.")
        states = json.loads(attempt["question_states_json"])
        if states.get(str(payload.question_index), {}).get("locked"):
            raise HTTPException(status_code=409, detail="This question's timer has expired.")
        answers = json.loads(attempt["answers_json"])
        answers[str(payload.question_index)] = payload.option
        connection.execute(
            "UPDATE quiz_attempts SET answers_json = ? WHERE id = ?",
            (json.dumps(answers), attempt_id),
        )
        attempt = _load_linear_equations_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/linear-equations/attempts/{attempt_id}/navigate")
def navigate_linear_equations_quiz(
    attempt_id: int,
    payload: QuizNavigationRequest,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_linear_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        questions = _attempt_questions(attempt)
        if payload.question_index >= len(questions):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        states = json.loads(attempt["question_states_json"])
        target_key = str(payload.question_index)
        if target_key not in states:
            states[target_key] = {
                "remaining_seconds": LINEAR_EQUATIONS_QUESTION_TIMER_SECONDS,
                "active_since": None,
                "locked": False,
            }
        previous_state = states.get(str(attempt["current_question"]))
        if previous_state is not None:
            previous_state["active_since"] = None
        target = states[target_key]
        target["active_since"] = now if not target.get("locked") else None
        connection.execute(
            """UPDATE quiz_attempts SET current_question = ?, question_states_json = ?
               WHERE id = ?""",
            (payload.question_index, json.dumps(states), attempt_id),
        )
        attempt = _load_linear_equations_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/linear-equations/attempts/{attempt_id}/submit")
def submit_linear_equations_quiz(
    attempt_id: int,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_linear_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] == "in_progress":
            attempt = _finish_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/linear-equations/attempts/{attempt_id}/results")
def get_linear_equations_quiz_results(
    attempt_id: int,
    account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_linear_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/linear-equations/history")
def linear_equations_quiz_history(account: CurrentAccount) -> dict[str, object]:
    with database() as connection:
        rows = connection.execute(
            """SELECT id, started_at, submitted_at, correct_count AS correct, correct_count, incorrect_count,
                      unanswered_count, final_score, accuracy, time_taken_seconds
               FROM quiz_attempts WHERE account_id = ? AND quiz_id = ?
                 AND status = 'submitted' ORDER BY started_at DESC""",
            (account["id"], LINEAR_EQUATIONS_QUIZ_ID),
        ).fetchall()
    return {"attempts": [dict(row) for row in rows]}


@app.post("/api/quiz/quadratic-equations/attempts")
def start_or_resume_quadratic_equations_quiz(account: CurrentAccount) -> dict[str, object]:
    require_quadratic_equations_eligibility(account)
    now = quiz_now()
    with database() as connection:
        active = connection.execute(
            """SELECT * FROM quiz_attempts
               WHERE account_id = ? AND quiz_id = ? AND status = 'in_progress'
               ORDER BY started_at LIMIT 1""",
            (account["id"], QUADRATIC_EQUATIONS_QUIZ_ID),
        ).fetchone()
        if active is not None:
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)

        states = {"0": {
            "remaining_seconds": QUADRATIC_EQUATIONS_QUESTION_TIMER_SECONDS,
            "active_since": now,
            "locked": False,
        }}
        try:
            cursor = connection.execute(
                """INSERT INTO quiz_attempts
                   (account_id, quiz_id, started_at, overall_deadline_at, status,
                    current_question, question_states_json, answers_json,
                    question_snapshot_json)
                   VALUES (?, ?, ?, ?, 'in_progress', 0, ?, '{}', ?)""",
                (account["id"], QUADRATIC_EQUATIONS_QUIZ_ID, now,
                 now + QUADRATIC_EQUATIONS_OVERALL_TIMER_SECONDS, json.dumps(states),
                 json.dumps(QUADRATIC_EQUATIONS_QUESTIONS, ensure_ascii=False)),
            )
        except sqlite3.IntegrityError:
            active = connection.execute(
                """SELECT * FROM quiz_attempts
                   WHERE account_id = ? AND quiz_id = ? AND status = 'in_progress'
                   ORDER BY started_at LIMIT 1""",
                (account["id"], QUADRATIC_EQUATIONS_QUIZ_ID),
            ).fetchone()
            if active is None:
                raise
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)
        attempt = _load_quadratic_equations_attempt(connection, cursor.lastrowid, account["id"])
        return _quiz_response(attempt, now)


@app.get("/api/quiz/quadratic-equations/attempts/{attempt_id}")
def get_quadratic_equations_quiz_state(
    attempt_id: int, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quadratic_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_response(attempt, now)


@app.post("/api/quiz/quadratic-equations/attempts/{attempt_id}/answer")
def save_quadratic_equations_quiz_answer(
    attempt_id: int, payload: QuizAnswerRequest, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quadratic_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        if payload.question_index >= len(_attempt_questions(attempt)):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        if payload.question_index != attempt["current_question"]:
            raise HTTPException(status_code=409, detail="Navigate to this question before answering it.")
        states = json.loads(attempt["question_states_json"])
        if states.get(str(payload.question_index), {}).get("locked"):
            raise HTTPException(status_code=409, detail="This question's timer has expired.")
        answers = json.loads(attempt["answers_json"])
        answers[str(payload.question_index)] = payload.option
        connection.execute(
            "UPDATE quiz_attempts SET answers_json = ? WHERE id = ?",
            (json.dumps(answers), attempt_id),
        )
        attempt = _load_quadratic_equations_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/quadratic-equations/attempts/{attempt_id}/navigate")
def navigate_quadratic_equations_quiz(
    attempt_id: int, payload: QuizNavigationRequest, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quadratic_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        questions = _attempt_questions(attempt)
        if payload.question_index >= len(questions):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        states = json.loads(attempt["question_states_json"])
        target_key = str(payload.question_index)
        if target_key not in states:
            states[target_key] = {
                "remaining_seconds": QUADRATIC_EQUATIONS_QUESTION_TIMER_SECONDS,
                "active_since": None,
                "locked": False,
            }
        previous = states.get(str(attempt["current_question"]))
        if previous is not None:
            previous["active_since"] = None
        target = states[target_key]
        target["active_since"] = now if not target.get("locked") else None
        connection.execute(
            "UPDATE quiz_attempts SET current_question = ?, question_states_json = ? WHERE id = ?",
            (payload.question_index, json.dumps(states), attempt_id),
        )
        attempt = _load_quadratic_equations_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/quadratic-equations/attempts/{attempt_id}/submit")
def submit_quadratic_equations_quiz(
    attempt_id: int, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quadratic_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] == "in_progress":
            attempt = _finish_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/quadratic-equations/attempts/{attempt_id}/results")
def get_quadratic_equations_quiz_results(
    attempt_id: int, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_quadratic_equations_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/quadratic-equations/history")
def quadratic_equations_quiz_history(account: CurrentAccount) -> dict[str, object]:
    with database() as connection:
        rows = connection.execute(
            """SELECT id, started_at, submitted_at, correct_count AS correct, incorrect_count,
                      unanswered_count, final_score, accuracy, time_taken_seconds
               FROM quiz_attempts WHERE account_id = ? AND quiz_id = ?
                 AND status = 'submitted' ORDER BY started_at DESC""",
            (account["id"], QUADRATIC_EQUATIONS_QUIZ_ID),
        ).fetchall()
    return {"attempts": [dict(row) for row in rows]}


@app.post("/api/quiz/arithmetic-progressions/attempts")
def start_or_resume_arithmetic_progressions_quiz(account: CurrentAccount) -> dict[str, object]:
    require_arithmetic_progressions_eligibility(account)
    now = quiz_now()
    with database() as connection:
        active = connection.execute(
            """SELECT * FROM quiz_attempts
               WHERE account_id = ? AND quiz_id = ? AND status = 'in_progress'
               ORDER BY started_at LIMIT 1""",
            (account["id"], ARITHMETIC_PROGRESSIONS_QUIZ_ID),
        ).fetchone()
        if active is not None:
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)

        states = {"0": {
            "remaining_seconds": ARITHMETIC_PROGRESSIONS_QUESTION_TIMER_SECONDS,
            "active_since": now,
            "locked": False,
        }}
        try:
            cursor = connection.execute(
                """INSERT INTO quiz_attempts
                   (account_id, quiz_id, started_at, overall_deadline_at, status,
                    current_question, question_states_json, answers_json,
                    question_snapshot_json)
                   VALUES (?, ?, ?, ?, 'in_progress', 0, ?, '{}', ?)""",
                (account["id"], ARITHMETIC_PROGRESSIONS_QUIZ_ID, now,
                 now + ARITHMETIC_PROGRESSIONS_OVERALL_TIMER_SECONDS,
                 json.dumps(states), json.dumps(ARITHMETIC_PROGRESSIONS_QUESTIONS, ensure_ascii=False)),
            )
        except sqlite3.IntegrityError:
            active = connection.execute(
                """SELECT * FROM quiz_attempts
                   WHERE account_id = ? AND quiz_id = ? AND status = 'in_progress'
                   ORDER BY started_at LIMIT 1""",
                (account["id"], ARITHMETIC_PROGRESSIONS_QUIZ_ID),
            ).fetchone()
            if active is None:
                raise
            active = _tick_quiz_attempt(connection, active, now)
            return _quiz_response(active, now)
        attempt = _load_arithmetic_progressions_attempt(connection, cursor.lastrowid, account["id"])
        return _quiz_response(attempt, now)


@app.get("/api/quiz/arithmetic-progressions/attempts/{attempt_id}")
def get_arithmetic_progressions_quiz_state(
    attempt_id: int, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_arithmetic_progressions_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_response(attempt, now)


@app.post("/api/quiz/arithmetic-progressions/attempts/{attempt_id}/answer")
def save_arithmetic_progressions_quiz_answer(
    attempt_id: int, payload: QuizAnswerRequest, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_arithmetic_progressions_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        if payload.question_index >= len(_attempt_questions(attempt)):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        if payload.question_index != attempt["current_question"]:
            raise HTTPException(status_code=409, detail="Navigate to this question before answering it.")
        states = json.loads(attempt["question_states_json"])
        if states.get(str(payload.question_index), {}).get("locked"):
            raise HTTPException(status_code=409, detail="This question's timer has expired.")
        answers = json.loads(attempt["answers_json"])
        answers[str(payload.question_index)] = payload.option
        connection.execute(
            "UPDATE quiz_attempts SET answers_json = ? WHERE id = ?",
            (json.dumps(answers), attempt_id),
        )
        attempt = _load_arithmetic_progressions_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/arithmetic-progressions/attempts/{attempt_id}/navigate")
def navigate_arithmetic_progressions_quiz(
    attempt_id: int, payload: QuizNavigationRequest, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_arithmetic_progressions_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] != "in_progress":
            return _quiz_result_payload(attempt)
        questions = _attempt_questions(attempt)
        if payload.question_index >= len(questions):
            raise HTTPException(status_code=422, detail="That question is outside this quiz.")
        states = json.loads(attempt["question_states_json"])
        target_key = str(payload.question_index)
        if target_key not in states:
            states[target_key] = {
                "remaining_seconds": ARITHMETIC_PROGRESSIONS_QUESTION_TIMER_SECONDS,
                "active_since": None,
                "locked": False,
            }
        previous = states.get(str(attempt["current_question"]))
        if previous is not None:
            previous["active_since"] = None
        target = states[target_key]
        target["active_since"] = now if not target.get("locked") else None
        connection.execute(
            "UPDATE quiz_attempts SET current_question = ?, question_states_json = ? WHERE id = ?",
            (payload.question_index, json.dumps(states), attempt_id),
        )
        attempt = _load_arithmetic_progressions_attempt(connection, attempt_id, account["id"])
        return _quiz_response(attempt, now)


@app.post("/api/quiz/arithmetic-progressions/attempts/{attempt_id}/submit")
def submit_arithmetic_progressions_quiz(
    attempt_id: int, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_arithmetic_progressions_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        if attempt["status"] == "in_progress":
            attempt = _finish_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/arithmetic-progressions/attempts/{attempt_id}/results")
def get_arithmetic_progressions_quiz_results(
    attempt_id: int, account: CurrentAccount,
) -> dict[str, object]:
    now = quiz_now()
    with database() as connection:
        attempt = _load_arithmetic_progressions_attempt(connection, attempt_id, account["id"])
        attempt = _tick_quiz_attempt(connection, attempt, now)
        return _quiz_result_payload(attempt)


@app.get("/api/quiz/arithmetic-progressions/history")
def arithmetic_progressions_quiz_history(account: CurrentAccount) -> dict[str, object]:
    with database() as connection:
        rows = connection.execute(
            """SELECT id, started_at, submitted_at, correct_count AS correct, incorrect_count,
                      unanswered_count, final_score, accuracy, time_taken_seconds
               FROM quiz_attempts WHERE account_id = ? AND quiz_id = ?
                 AND status = 'submitted' ORDER BY started_at DESC""",
            (account["id"], ARITHMETIC_PROGRESSIONS_QUIZ_ID),
        ).fetchall()
    return {"attempts": [dict(row) for row in rows]}


@app.get("/api/quiz/progress")
def quiz_progress(account: CurrentAccount) -> dict[str, object]:
    """Return real, private summaries of this learner's submitted chapter quizzes."""
    titles = {
        LEGACY_REAL_NUMBERS_QUIZ_ID: ("Real Numbers · previous version", "/real-numbers/quiz"),
        REAL_NUMBERS_QUIZ_ID: ("Real Numbers", "/real-numbers/quiz"),
        POLYNOMIALS_QUIZ_ID: ("Polynomials", "/polynomials/quiz"),
        LINEAR_EQUATIONS_QUIZ_ID: ("Pair of Linear Equations", "/linear-equations/quiz"),
        QUADRATIC_EQUATIONS_QUIZ_ID: ("Quadratic Equations", "/quadratic-equations/quiz"),
        ARITHMETIC_PROGRESSIONS_QUIZ_ID: ("Arithmetic Progressions", "/arithmetic-progressions/quiz"),
    }
    with database() as connection:
        rows = connection.execute(
            """SELECT quiz_id, submitted_at, final_score, accuracy, time_taken_seconds,
                      question_snapshot_json
               FROM quiz_attempts WHERE account_id = ? AND status = 'submitted'
               ORDER BY submitted_at DESC""",
            (account["id"],),
        ).fetchall()
    grouped: dict[str, list[sqlite3.Row]] = {}
    for row in rows:
        if row["quiz_id"] in titles:
            grouped.setdefault(row["quiz_id"], []).append(row)
    quizzes = []
    for quiz_id, quiz_rows in grouped.items():
        title, href = titles[quiz_id]
        best_attempt = max(quiz_rows, key=lambda row: row["accuracy"])
        quizzes.append({
            "quizId": quiz_id,
            "title": title,
            "href": href,
            "attemptCount": len(quiz_rows),
            "bestScore": best_attempt["final_score"],
            "bestTotalQuestions": len(json.loads(best_attempt["question_snapshot_json"] or "[]")),
            "latestScore": quiz_rows[0]["final_score"],
            "latestTotalQuestions": len(json.loads(quiz_rows[0]["question_snapshot_json"] or "[]")),
            "latestAccuracy": quiz_rows[0]["accuracy"],
            "latestSubmittedAt": quiz_rows[0]["submitted_at"],
            "latestTimeTakenSeconds": quiz_rows[0]["time_taken_seconds"],
        })
    total_attempts = sum(item["attemptCount"] for item in quizzes)
    average_accuracy = (
        round(sum(float(row["accuracy"]) for quiz_id in grouped for row in grouped[quiz_id]) / total_attempts, 1)
        if total_attempts else None
    )
    return {"totalAttempts": total_attempts, "averageAccuracy": average_accuracy, "quizzes": quizzes}


@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register(
    payload: RegisterRequest,
    request: Request,
    response: Response,
) -> dict[str, int | str | None]:
    rate_limiter.check("register", client_address(request), limit=5, window=900)
    salt, password_hash = hash_password(payload.password)
    now = int(time.time())

    try:
        with database() as connection:
            cursor = connection.execute(
                """
                INSERT INTO accounts (
                    name, email, age, exam, password_salt, password_hash, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    payload.name,
                    payload.email,
                    payload.age,
                    payload.exam,
                    salt,
                    password_hash,
                    now,
                ),
            )
            account_id = cursor.lastrowid
            if account_id is None:
                raise RuntimeError("The database did not return the new account ID.")
            account = connection.execute(
                """
                SELECT id, name, email, age, exam, exam_focus, preparation_level,
                       school_class
                FROM accounts WHERE id = ?
                """,
                (account_id,),
            ).fetchone()
    except sqlite3.IntegrityError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with that email already exists.",
        ) from error

    token, expires_at = create_session(account_id, remember=False)
    set_session_cookie(response, token, expires_at)
    return public_account(account)


@app.post("/api/auth/login")
def login(
    payload: LoginRequest,
    request: Request,
    response: Response,
) -> dict[str, int | str | None]:
    rate_limiter.check("login", client_address(request), limit=10, window=900)
    with database() as connection:
        row = connection.execute(
            """
            SELECT id, name, email, age, exam, exam_focus, preparation_level,
                   school_class, password_salt, password_hash
            FROM accounts
            WHERE email = ? COLLATE NOCASE
            """,
            (payload.email,),
        ).fetchone()

    if row is None:
        hash_password(payload.password, salt=b"apex-dummy-salt")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email or password is incorrect.",
        )

    _, supplied_hash = hash_password(payload.password, salt=row["password_salt"])
    if not hmac.compare_digest(supplied_hash, row["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email or password is incorrect.",
        )

    token, expires_at = create_session(row["id"], remember=payload.remember)
    set_session_cookie(response, token, expires_at)
    return public_account(row)


@app.get("/api/auth/me")
def current_session(account: CurrentAccount) -> dict[str, int | str | None]:
    return account


@app.post("/api/profile/focus")
def save_olympiad_focus(
    payload: OlympiadFocusRequest,
    account: CurrentAccount,
) -> dict[str, int | str | None]:
    exam = account["exam"]
    if not isinstance(exam, str) or exam not in OLYMPIAD_FOCI:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Choose Math Olympiad or Science Olympiad before selecting an olympiad.",
        )
    if payload.exam_focus not in OLYMPIAD_FOCI[exam]:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="That olympiad does not match your learning goal.",
        )

    with database() as connection:
        connection.execute(
            """
            UPDATE accounts
            SET exam_focus = ?, preparation_level = ?, school_class = ?
            WHERE id = ?
            """,
            (
                payload.exam_focus,
                payload.preparation_level,
                payload.school_class,
                account["id"],
            ),
        )
        row = connection.execute(
            """
            SELECT id, name, email, age, exam, exam_focus, preparation_level,
                   school_class
            FROM accounts WHERE id = ?
            """,
            (account["id"],),
        ).fetchone()
    if row is None:
        raise RuntimeError("The signed-in account could not be loaded after saving.")
    return public_account(row)


@app.post("/api/auth/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(request: Request, response: Response) -> Response:
    token = request.cookies.get(SESSION_COOKIE)
    if token:
        token_hash = hashlib.sha256(token.encode("utf-8")).digest()
        with database() as connection:
            connection.execute(
                "DELETE FROM sessions WHERE token_hash = ?",
                (token_hash,),
            )

    response.delete_cookie(
        key=SESSION_COOKIE,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        path="/",
    )
    response.status_code = status.HTTP_204_NO_CONTENT
    return response
