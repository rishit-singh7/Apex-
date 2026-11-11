import hashlib
import hmac
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
            """
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


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


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
