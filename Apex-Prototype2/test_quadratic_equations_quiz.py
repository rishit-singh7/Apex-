import json
import re
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import backend
from quadratic_equations_quiz_v1 import QUESTIONS, QUIZ_ID


class QuadraticEquationsQuizTests(unittest.TestCase):
    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.original_database_path = backend.DATABASE_PATH
        backend.DATABASE_PATH = Path(self.temporary_directory.name) / "quadratic-equations-test.sqlite3"
        backend.initialize_database()
        self.account = self._create_account("learner@example.com")

    def tearDown(self):
        backend.DATABASE_PATH = self.original_database_path
        self.temporary_directory.cleanup()

    def _create_account(self, email):
        salt, password_hash = backend.hash_password("irrelevant test password")
        with backend.database() as connection:
            cursor = connection.execute(
                """INSERT INTO accounts
                   (name, email, age, exam, exam_focus, preparation_level, school_class,
                    password_salt, password_hash, created_at)
                   VALUES (?, ?, 14, 'Math Olympiad', 'SOF IMO', 'beginner', 10, ?, ?, 1)""",
                ("Apex Learner", email, salt, password_hash),
            )
            account_id = cursor.lastrowid
        return {"id": account_id, "exam": "Math Olympiad", "exam_focus": "SOF IMO", "school_class": 10}

    def _start(self):
        return backend.start_or_resume_quadratic_equations_quiz(self.account)

    def test_question_bank_has_exact_balanced_and_complete_question_set(self):
        self.assertEqual(len(QUESTIONS), 10)
        self.assertEqual(sum(q["category"] == "course" for q in QUESTIONS), 5)
        self.assertEqual(sum(q["category"] == "olympiad" for q in QUESTIONS), 5)
        self.assertEqual([q["correct"] for q in QUESTIONS], ["A", "A", "A", "C", "B", "C", "B", "A", "C", "D"])
        for question in QUESTIONS:
            self.assertEqual(set(question["options"]), {"A", "B", "C", "D"})
            self.assertEqual(len(set(question["options"].values())), 4)
            self.assertIn(question["correct"], question["options"])
            self.assertGreater(len(question["explanation"]), 250)

    def test_assets_and_chapter_entry_exist(self):
        root = Path(backend.PROJECT_DIR)
        page = (root / "quadratic_equations_quiz.html").read_text(encoding="utf-8")
        script = (root / "quadratic_equations_quiz.js").read_text(encoding="utf-8")
        chapter = (root / "quadratic_equations.html").read_text(encoding="utf-8")
        self.assertIn('href="/quadratic-equations-quiz.css"', page)
        self.assertIn('src="/quadratic-equations-quiz.js"', page)
        self.assertIn('href="/quadratic-equations/quiz"', chapter)
        self.assertIn('id="results-chart"', page)
        self.assertIn('id="attempt-history-list"', page)
        self.assertIsNone(re.search(r"\bxp\b", script, flags=re.IGNORECASE))
        registered_routes = {(route.path, tuple(sorted(route.methods or []))) for route in backend.app.routes}
        self.assertIn(("/quadratic-equations/quiz", ("GET",)), registered_routes)
        self.assertIn(("/api/quiz/quadratic-equations/attempts", ("POST",)), registered_routes)
        self.assertIn(("/api/quiz/progress", ("GET",)), registered_routes)

    def test_existing_real_numbers_attempt_still_uses_its_own_quiz(self):
        state = backend.start_or_resume_real_numbers_quiz(self.account)
        self.assertEqual(state["status"], "in_progress")
        self.assertEqual(state["questionCount"], 10)
        with backend.database() as connection:
            quiz_id = connection.execute(
                "SELECT quiz_id FROM quiz_attempts WHERE id = ?", (state["attemptId"],),
            ).fetchone()[0]
        self.assertEqual(quiz_id, backend.REAL_NUMBERS_QUIZ_ID)

    def test_server_state_hides_key_and_timer_survives_refresh(self):
        state = self._start()
        self.assertEqual(state["questionCount"], 10)
        self.assertEqual(state["overallRemainingSeconds"], 1200)
        self.assertEqual(state["questionRemainingSeconds"], 120)
        self.assertNotIn("correct", state["question"])
        self.assertNotIn("explanation", state["question"])
        attempt_id = state["attemptId"]
        with backend.database() as connection:
            row = connection.execute("SELECT question_states_json FROM quiz_attempts WHERE id = ?", (attempt_id,)).fetchone()
            states = json.loads(row[0])
            states["0"]["remaining_seconds"] = 37
            states["0"]["active_since"] = backend.quiz_now()
            connection.execute("UPDATE quiz_attempts SET question_states_json = ? WHERE id = ?", (json.dumps(states), attempt_id))
        refreshed = backend.get_quadratic_equations_quiz_state(attempt_id, self.account)
        self.assertLessEqual(refreshed["questionRemainingSeconds"], 37)
        self.assertGreater(refreshed["questionRemainingSeconds"], 0)
        backend.navigate_quadratic_equations_quiz(attempt_id, backend.QuizNavigationRequest(question_index=1), self.account)
        returned = backend.navigate_quadratic_equations_quiz(attempt_id, backend.QuizNavigationRequest(question_index=0), self.account)
        self.assertLessEqual(returned["questionRemainingSeconds"], 37)

    def test_question_timer_expiry_locks_item_without_answer(self):
        state = self._start()
        attempt_id = state["attemptId"]
        expiry_time = backend.quiz_now() + 121
        with patch.object(backend, "quiz_now", return_value=expiry_time):
            expired = backend.get_quadratic_equations_quiz_state(attempt_id, self.account)
            self.assertTrue(expired["questions"][0]["locked"])
            self.assertFalse(expired["questions"][0]["answered"])
            with self.assertRaises(backend.HTTPException) as error:
                backend.save_quadratic_equations_quiz_answer(
                    attempt_id,
                    backend.QuizAnswerRequest(question_index=0, option=QUESTIONS[0]["correct"]),
                    self.account,
                )
            self.assertEqual(error.exception.status_code, 409)

    def test_snapshot_review_scoring_history_and_xp_are_idempotent(self):
        state = self._start()
        attempt_id = state["attemptId"]
        for index, question in enumerate(QUESTIONS):
            if index:
                backend.navigate_quadratic_equations_quiz(attempt_id, backend.QuizNavigationRequest(question_index=index), self.account)
            backend.save_quadratic_equations_quiz_answer(
                attempt_id,
                backend.QuizAnswerRequest(question_index=index, option=question["correct"]),
                self.account,
            )
        active = backend.get_quadratic_equations_quiz_state(attempt_id, self.account)
        self.assertEqual(active["status"], "in_progress")
        self.assertNotIn("explanation", json.dumps(active))
        changed_bank = (dict(QUESTIONS[0], prompt="Changed after attempt"),) + QUESTIONS[1:]
        with patch.object(backend, "QUADRATIC_EQUATIONS_QUESTIONS", changed_bank):
            result = backend.submit_quadratic_equations_quiz(attempt_id, self.account)
        self.assertEqual(result["totalQuestions"], 10)
        self.assertEqual((result["correct"], result["incorrect"], result["unanswered"]), (10, 0, 0))
        self.assertEqual(result["accuracy"], 100)
        self.assertEqual(result["questions"][0]["prompt"], QUESTIONS[0]["prompt"])
        self.assertEqual(result["questions"][0]["options"], QUESTIONS[0]["options"])
        self.assertEqual(result["questions"][0]["outcome"], "correct")
        self.assertTrue(all(item["explanation"] for item in result["questions"]))
        again = backend.submit_quadratic_equations_quiz(attempt_id, self.account)
        self.assertEqual(again["score"], 10)
        self.assertEqual(len(backend.quadratic_equations_quiz_history(self.account)["attempts"]), 1)
        connection = sqlite3.connect(backend.DATABASE_PATH)
        try:
            xp_count, xp_amount = connection.execute(
                "SELECT COUNT(*), SUM(amount) FROM xp_transactions WHERE attempt_id = ?", (attempt_id,),
            ).fetchone()
            saved = connection.execute("SELECT quiz_id, question_snapshot_json FROM quiz_attempts WHERE id = ?", (attempt_id,)).fetchone()
        finally:
            connection.close()
        self.assertEqual((xp_count, xp_amount), (1, 30))
        self.assertEqual(saved[0], QUIZ_ID)
        self.assertEqual(len(json.loads(saved[1])), 10)

    def test_attempt_is_private_and_expired_overall_timer_auto_submits(self):
        attempt_id = self._start()["attemptId"]
        with backend.database() as connection:
            connection.execute("UPDATE quiz_attempts SET overall_deadline_at = ? WHERE id = ?", (backend.quiz_now() - 1, attempt_id))
        expired = backend.get_quadratic_equations_quiz_state(attempt_id, self.account)
        self.assertEqual(expired["status"], "submitted")
        self.assertEqual(expired["unanswered"], 10)
        other = self._create_account("other@example.com")
        with self.assertRaises(backend.HTTPException) as error:
            backend.get_quadratic_equations_quiz_state(attempt_id, other)
        self.assertEqual(error.exception.status_code, 404)
        self.assertEqual(backend.quadratic_equations_quiz_history(other)["attempts"], [])

    def test_quiz_progress_uses_real_attempts_and_is_account_scoped(self):
        attempt_id = self._start()["attemptId"]
        backend.submit_quadratic_equations_quiz(attempt_id, self.account)
        progress = backend.quiz_progress(self.account)
        self.assertEqual(progress["totalAttempts"], 1)
        self.assertEqual(len(progress["quizzes"]), 1)
        quiz = progress["quizzes"][0]
        self.assertEqual(quiz["quizId"], QUIZ_ID)
        self.assertEqual(quiz["attemptCount"], 1)
        self.assertEqual(quiz["latestScore"], 0)
        other = self._create_account("other-progress@example.com")
        self.assertEqual(backend.quiz_progress(other)["totalAttempts"], 0)


if __name__ == "__main__":
    unittest.main()


