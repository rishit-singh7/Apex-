import re
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from fastapi.testclient import TestClient

import backend
import real_numbers_quiz as legacy_quiz
import real_numbers_quiz_v2 as quiz


EXPECTED_ANSWERS = {
    "rn-v2-01": "B", "rn-v2-02": "B", "rn-v2-03": "C", "rn-v2-04": "A",
    "rn-v2-05": "B", "rn-v2-06": "C", "rn-v2-07": "C", "rn-v2-08": "A",
    "rn-v2-09": "A", "rn-v2-10": "C",
}


class RealNumbersQuizQualityTests(unittest.TestCase):
    def test_exact_distribution_unique_options_and_independently_checked_key(self) -> None:
        self.assertEqual(len(quiz.QUESTIONS), 10)
        self.assertEqual(sum(q["category"] == "course" for q in quiz.QUESTIONS), 5)
        self.assertEqual(sum(q["category"] == "olympiad" for q in quiz.QUESTIONS), 5)
        self.assertEqual({q["id"]: q["correct"] for q in quiz.QUESTIONS}, EXPECTED_ANSWERS)
        for question in quiz.QUESTIONS:
            self.assertEqual(set(question["options"]), {"A", "B", "C", "D"})
            self.assertEqual(len(set(question["options"].values())), 4)
            self.assertIn(question["correct"], question["options"])
            self.assertGreater(len(question["explanation"]), 250)


class RealNumbersQuizApiTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.original_database_path = backend.DATABASE_PATH
        backend.DATABASE_PATH = Path(self.temporary_directory.name) / "quiz-test.sqlite3"
        backend.rate_limiter = backend.RateLimiter()
        self.now = 1_800_000_000.0
        self.clock_patch = patch("backend.quiz_now", side_effect=lambda: self.now)
        self.clock_patch.start()
        self.client_context = TestClient(backend.app)
        self.client = self.client_context.__enter__()
        response = self.client.post(
            "/api/auth/register",
            json={
                "name": "Quiz Learner", "email": "quiz@example.com", "age": 15,
                "exam": "Math Olympiad", "password": "correct horse battery",
            },
        )
        self.assertEqual(response.status_code, 201)
        focus = self.client.post(
            "/api/profile/focus",
            json={"exam_focus": "SOF IMO", "preparation_level": "beginner", "school_class": 10},
        )
        self.assertEqual(focus.status_code, 200)

    def tearDown(self) -> None:
        self.client_context.__exit__(None, None, None)
        self.clock_patch.stop()
        backend.DATABASE_PATH = self.original_database_path
        self.temporary_directory.cleanup()

    def start(self):
        response = self.client.post("/api/quiz/real-numbers/attempts")
        self.assertEqual(response.status_code, 200, response.text)
        return response.json()

    def db_rows(self, query: str):
        connection = sqlite3.connect(backend.DATABASE_PATH)
        try:
            return connection.execute(query).fetchall()
        finally:
            connection.close()

    def test_quiz_route_and_authentication(self) -> None:
        page = self.client.get("/real-numbers/quiz")
        self.assertEqual(page.status_code, 200)
        self.assertIn("Show what you know", page.text)
        self.assertIn("results-chart", page.text)
        css = self.client.get("/real-numbers-quiz.css")
        self.assertEqual(css.status_code, 200)
        for color in ("chart-bar.correct", "chart-bar.incorrect", "chart-bar.unanswered", "chart-bar.time"):
            self.assertIn(color, css.text)
        quiz_script = self.client.get("/real-numbers-quiz.js")
        self.assertEqual(quiz_script.status_code, 200)
        self.assertIn("review-options", quiz_script.text)
        frontend = page.text + (Path(backend.PROJECT_DIR) / "real_numbers_quiz.js").read_text(encoding="utf-8")
        self.assertIsNone(re.search(r"\bXP\b", frontend, re.IGNORECASE))
        self.client.post("/api/auth/logout")
        self.assertEqual(self.client.post("/api/quiz/real-numbers/attempts").status_code, 401)

    def test_pre_submission_responses_never_contain_answer_key_or_explanations(self) -> None:
        state = self.start()
        self.assertEqual(state["questionCount"], 10)
        self.assertEqual(state["overallRemainingSeconds"], 20 * 60)
        self.assertEqual(state["questionRemainingSeconds"], 120)
        self.assertEqual(state["question"]["index"], 0)
        self.assertNotIn("correct", state["question"])
        self.assertNotIn("explanation", state["question"])
        self.assertNotIn("correctOption", state)
        self.assertNotIn("explanation", state)
        pre_submit = self.client.get(f"/api/quiz/real-numbers/attempts/{state['attemptId']}/results")
        self.assertEqual(pre_submit.status_code, 409)

    def test_attempt_snapshot_preserves_question_options_and_solution(self) -> None:
        state = self.start()
        attempt_id = state["attemptId"]
        saved = self.db_rows(
            "SELECT question_snapshot_json FROM quiz_attempts WHERE id = 1"
        )[0][0]
        snapshot = json.loads(saved)
        self.assertEqual(len(snapshot), 10)
        original_prompt = snapshot[0]["prompt"]
        original_options = snapshot[0]["options"]
        changed_first = dict(quiz.QUESTIONS[0])
        changed_first["prompt"] = "This bank changed after the attempt began."
        with patch("backend.REAL_NUMBERS_QUESTIONS", (changed_first,)):
            result = self.client.post(
                f"/api/quiz/real-numbers/attempts/{attempt_id}/submit"
            ).json()
        self.assertEqual(result["questions"][0]["prompt"], original_prompt)
        self.assertEqual(result["questions"][0]["options"], original_options)
        self.assertEqual(result["questions"][0]["explanation"], snapshot[0]["explanation"])
        self.assertEqual(set(result["questions"][0]["options"]), {"A", "B", "C", "D"})

    def test_legacy_attempt_keeps_its_original_questions_and_timer(self) -> None:
        state = self.start()
        attempt_id = state["attemptId"]
        connection = sqlite3.connect(backend.DATABASE_PATH)
        try:
            connection.execute(
                """UPDATE quiz_attempts SET quiz_id = ?, question_snapshot_json = NULL,
                   overall_deadline_at = ? WHERE id = ?""",
                (legacy_quiz.QUIZ_ID, self.now + legacy_quiz.OVERALL_TIMER_SECONDS, attempt_id),
            )
            connection.commit()
        finally:
            connection.close()
        resumed = self.client.get(f"/api/quiz/real-numbers/attempts/{attempt_id}").json()
        self.assertEqual(resumed["questionCount"], 20)
        self.assertEqual(resumed["overallRemainingSeconds"], 40 * 60)
        result = self.client.post(f"/api/quiz/real-numbers/attempts/{attempt_id}/submit").json()
        self.assertEqual(result["totalQuestions"], 20)
        self.assertEqual(result["overallTimeLimitSeconds"], 40 * 60)
        self.assertEqual(result["questions"][0]["prompt"], legacy_quiz.QUESTIONS[0]["prompt"])

    def test_new_quiz_version_starts_without_resuming_a_legacy_attempt(self) -> None:
        legacy_state = self.start()
        legacy_attempt_id = legacy_state["attemptId"]
        connection = sqlite3.connect(backend.DATABASE_PATH)
        try:
            connection.execute(
                "UPDATE quiz_attempts SET quiz_id = ? WHERE id = ?",
                (legacy_quiz.QUIZ_ID, legacy_attempt_id),
            )
            connection.commit()
        finally:
            connection.close()

        updated_state = self.start()

        self.assertNotEqual(updated_state["attemptId"], legacy_attempt_id)
        self.assertEqual(updated_state["questionCount"], 10)
        self.assertEqual(updated_state["overallRemainingSeconds"], 20 * 60)
        self.assertEqual(
            self.db_rows(
                "SELECT quiz_id, status FROM quiz_attempts ORDER BY id"
            ),
            [(legacy_quiz.QUIZ_ID, "in_progress"), (quiz.QUIZ_ID, "in_progress")],
        )

    def test_refresh_and_navigation_resume_question_time_without_reset(self) -> None:
        state = self.start()
        attempt_id = state["attemptId"]
        self.now += 45
        refreshed = self.client.get(f"/api/quiz/real-numbers/attempts/{attempt_id}").json()
        self.assertEqual(refreshed["questionRemainingSeconds"], 75)
        self.assertEqual(refreshed["overallRemainingSeconds"], 1155)

        next_state = self.client.post(
            f"/api/quiz/real-numbers/attempts/{attempt_id}/navigate",
            json={"question_index": 1},
        ).json()
        self.assertEqual(next_state["questionRemainingSeconds"], 120)
        self.now += 20
        back_state = self.client.post(
            f"/api/quiz/real-numbers/attempts/{attempt_id}/navigate",
            json={"question_index": 0},
        ).json()
        self.assertEqual(back_state["questionRemainingSeconds"], 75)

    def test_answers_can_be_changed_and_only_one_active_attempt_exists(self) -> None:
        state = self.start()
        attempt_id = state["attemptId"]
        resumed = self.start()
        self.assertEqual(resumed["attemptId"], attempt_id)
        self.assertEqual(self.db_rows("SELECT COUNT(*) FROM quiz_attempts"), [(1,)])

        for option in ("A", "B"):
            response = self.client.post(
                f"/api/quiz/real-numbers/attempts/{attempt_id}/answer",
                json={"question_index": 0, "option": option},
            )
            self.assertEqual(response.status_code, 200)
        latest = self.client.get(f"/api/quiz/real-numbers/attempts/{attempt_id}").json()
        self.assertEqual(latest["selectedOption"], "B")
        result = self.client.post(f"/api/quiz/real-numbers/attempts/{attempt_id}/submit").json()
        self.assertEqual(result["correct"], 1)
        self.assertEqual(result["questions"][0]["selectedOption"], "B")

    def test_expired_question_is_locked_and_overall_timeout_auto_submits(self) -> None:
        state = self.start()
        attempt_id = state["attemptId"]
        self.now += 120
        question_state = self.client.get(f"/api/quiz/real-numbers/attempts/{attempt_id}").json()
        self.assertTrue(question_state["questions"][0]["locked"])
        answer = self.client.post(
            f"/api/quiz/real-numbers/attempts/{attempt_id}/answer",
            json={"question_index": 0, "option": "B"},
        )
        self.assertEqual(answer.status_code, 409)
        self.client.post(f"/api/quiz/real-numbers/attempts/{attempt_id}/submit")

        self.now = 1_800_000_000.0
        timed = self.start()
        timed_id = timed["attemptId"]
        self.now += 20 * 60
        submitted = self.client.get(f"/api/quiz/real-numbers/attempts/{timed_id}").json()
        self.assertEqual(submitted["status"], "submitted")
        self.assertEqual(submitted["unanswered"], 10)
        self.assertEqual(len(submitted["questions"]), 10)

    def test_score_attempt_history_explanations_and_xp_are_server_owned(self) -> None:
        state = self.start()
        attempt_id = state["attemptId"]
        answer_response = self.client.post(
            f"/api/quiz/real-numbers/attempts/{attempt_id}/answer",
            json={"question_index": 0, "option": "B"},
        )
        self.assertEqual(answer_response.status_code, 200)
        self.client.post(
            f"/api/quiz/real-numbers/attempts/{attempt_id}/navigate",
            json={"question_index": 1},
        )
        self.client.post(
            f"/api/quiz/real-numbers/attempts/{attempt_id}/answer",
            json={"question_index": 1, "option": "A"},
        )

        result = self.client.post(f"/api/quiz/real-numbers/attempts/{attempt_id}/submit").json()
        self.assertEqual(result["correct"], 1)
        self.assertEqual(result["incorrect"], 1)
        self.assertEqual(result["unanswered"], 8)
        self.assertEqual(result["score"], 1)
        self.assertEqual(result["accuracy"], 10.0)
        self.assertEqual(result["totalQuestions"], 10)
        self.assertEqual(result["overallTimeLimitSeconds"], 20 * 60)
        self.assertEqual(len(result["questions"]), 10)
        self.assertEqual(result["questions"][0]["correctOption"], "B")
        self.assertEqual(result["questions"][0]["outcome"], "correct")
        self.assertEqual(result["questions"][1]["outcome"], "incorrect")
        self.assertEqual(result["questions"][2]["outcome"], "unanswered")
        self.assertEqual(set(result["questions"][0]["options"]), {"A", "B", "C", "D"})
        self.assertEqual(result["questions"][0]["options"]["B"], result["questions"][0]["correctLabel"])
        self.assertIn("Divide", result["questions"][0]["explanation"])
        self.assertIsNone(result["questions"][2]["selectedOption"])

        self.assertNotIn("xpAwarded", result)
        self.assertNotIn("xp", result.keys())
        rows = self.db_rows("SELECT amount FROM xp_transactions")
        self.assertEqual(rows, [(12,)])
        repeated = self.client.post(f"/api/quiz/real-numbers/attempts/{attempt_id}/submit")
        self.assertEqual(repeated.status_code, 200)
        self.assertEqual(self.db_rows("SELECT COUNT(*) FROM xp_transactions"), [(1,)])
        history = self.client.get("/api/quiz/real-numbers/history").json()
        self.assertEqual(len(history["attempts"]), 1)
        self.assertEqual(history["attempts"][0]["unanswered_count"], 8)

    def test_second_attempt_is_separate_and_another_user_cannot_read_it(self) -> None:
        first = self.start()
        self.client.post(f"/api/quiz/real-numbers/attempts/{first['attemptId']}/submit")
        second = self.start()
        self.assertNotEqual(first["attemptId"], second["attemptId"])
        self.assertEqual(self.db_rows("SELECT COUNT(*) FROM quiz_attempts"), [(2,)])

        self.client.post("/api/auth/logout")
        self.client.post(
            "/api/auth/register",
            json={"name": "Other Learner", "email": "other@example.com", "age": 15,
                  "exam": "Math Olympiad", "password": "correct horse battery"},
        )
        self.client.post(
            "/api/profile/focus",
            json={"exam_focus": "SOF IMO", "preparation_level": "beginner", "school_class": 10},
        )
        private = self.client.get(f"/api/quiz/real-numbers/attempts/{second['attemptId']}")
        self.assertEqual(private.status_code, 404)

    def test_unqualified_profile_cannot_start_this_chapter_quiz(self) -> None:
        self.client.post("/api/auth/logout")
        self.client.post(
            "/api/auth/register",
            json={"name": "Other Class", "email": "class@example.com", "age": 14,
                  "exam": "Math Olympiad", "password": "correct horse battery"},
        )
        response = self.client.post("/api/quiz/real-numbers/attempts")
        self.assertEqual(response.status_code, 403)

    def test_schema_migration_adds_snapshot_without_replacing_attempt_records(self) -> None:
        legacy_path = Path(self.temporary_directory.name) / "pre-snapshot.sqlite3"
        connection = sqlite3.connect(legacy_path)
        try:
            connection.executescript(
                """
                CREATE TABLE accounts (
                    id INTEGER PRIMARY KEY, name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE, age INTEGER NOT NULL,
                    exam TEXT NOT NULL, exam_focus TEXT, preparation_level TEXT,
                    school_class INTEGER, password_salt BLOB NOT NULL,
                    password_hash BLOB NOT NULL, created_at INTEGER NOT NULL
                );
                CREATE TABLE quiz_attempts (
                    id INTEGER PRIMARY KEY, account_id INTEGER NOT NULL,
                    quiz_id TEXT NOT NULL, started_at REAL NOT NULL,
                    overall_deadline_at REAL NOT NULL, status TEXT NOT NULL,
                    current_question INTEGER NOT NULL, question_states_json TEXT NOT NULL,
                    answers_json TEXT NOT NULL, submitted_at REAL, time_taken_seconds INTEGER,
                    correct_count INTEGER, incorrect_count INTEGER, unanswered_count INTEGER,
                    final_score INTEGER, accuracy REAL, xp_awarded INTEGER NOT NULL DEFAULT 0
                );
                INSERT INTO accounts VALUES (7, 'Test Only', 'test@example.invalid', 15,
                    'Math Olympiad', 'SOF IMO', 'beginner', 10, X'01', X'02', 1);
                INSERT INTO quiz_attempts
                    (id, account_id, quiz_id, started_at, overall_deadline_at, status,
                     current_question, question_states_json, answers_json)
                VALUES (42, 7, 'real-numbers-class-10-v1', 100, 2500, 'in_progress',
                    0, '{""0"":{""remaining_seconds"":120,""active_since"":100,""locked"":false}}', '{}');
                """
            )
            connection.commit()
        finally:
            connection.close()

        original_path = backend.DATABASE_PATH
        try:
            backend.DATABASE_PATH = legacy_path
            backend.initialize_database()
            connection = sqlite3.connect(legacy_path)
            try:
                columns = {row[1] for row in connection.execute("PRAGMA table_info(quiz_attempts)")}
                saved = connection.execute(
                    "SELECT id, quiz_id, status, question_snapshot_json FROM quiz_attempts WHERE id = 42"
                ).fetchone()
            finally:
                connection.close()
        finally:
            backend.DATABASE_PATH = original_path
        self.assertIn("question_snapshot_json", columns)
        self.assertEqual(saved[:3], (42, legacy_quiz.QUIZ_ID, "in_progress"))
        self.assertEqual(json.loads(saved[3]), list(legacy_quiz.QUESTIONS))


if __name__ == "__main__":
    unittest.main()
