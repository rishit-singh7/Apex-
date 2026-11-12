import sqlite3
import tempfile
import unittest
from pathlib import Path

from fastapi.testclient import TestClient

import backend


class AccountApiTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.original_database_path = backend.DATABASE_PATH
        backend.DATABASE_PATH = Path(self.temporary_directory.name) / "test.sqlite3"
        backend.rate_limiter = backend.RateLimiter()
        self.client_context = TestClient(backend.app)
        self.client = self.client_context.__enter__()

    def tearDown(self) -> None:
        self.client_context.__exit__(None, None, None)
        backend.DATABASE_PATH = self.original_database_path
        self.temporary_directory.cleanup()

    def register_account(
        self,
        *,
        email: str = "learner@example.com",
        password: str = "correct horse battery",
        exam: str = "Math Olympiad",
    ):
        return self.client.post(
            "/api/auth/register",
            json={
                "name": "Alex Learner",
                "email": email,
                "age": 13,
                "exam": exam,
                "password": password,
            },
        )

    def test_registration_hashes_password_and_creates_session(self) -> None:
        response = self.register_account()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["email"], "learner@example.com")
        self.assertIsNone(response.json()["exam_focus"])
        self.assertIsNone(response.json()["preparation_level"])
        self.assertIsNone(response.json()["school_class"])
        self.assertNotIn("password", response.json())
        self.assertIn("apex_session", response.cookies)
        self.assertIn("httponly", response.headers["set-cookie"].lower())

        connection = sqlite3.connect(backend.DATABASE_PATH)
        try:
            saved_password = connection.execute(
                "SELECT password_salt, password_hash FROM accounts"
            ).fetchone()
        finally:
            connection.close()
        self.assertIsNotNone(saved_password)
        self.assertNotEqual(saved_password[1], b"correct horse battery")

        session_response = self.client.get("/api/auth/me")
        self.assertEqual(session_response.status_code, 200)
        self.assertEqual(session_response.json()["name"], "Alex Learner")

    def test_login_logout_and_invalid_password(self) -> None:
        self.assertEqual(self.register_account().status_code, 201)
        logout_response = self.client.post("/api/auth/logout")
        self.assertEqual(logout_response.status_code, 204)
        self.assertEqual(self.client.get("/api/auth/me").status_code, 401)

        wrong_password = self.client.post(
            "/api/auth/login",
            json={
                "email": "learner@example.com",
                "password": "not the right password",
                "remember": False,
            },
        )
        self.assertEqual(wrong_password.status_code, 401)

        login_response = self.client.post(
            "/api/auth/login",
            json={
                "email": "LEARNER@example.com",
                "password": "correct horse battery",
                "remember": True,
            },
        )
        self.assertEqual(login_response.status_code, 200)
        self.assertIn("max-age=2592000", login_response.headers["set-cookie"].lower())
        self.assertEqual(self.client.get("/api/auth/me").status_code, 200)

    def test_rejects_duplicate_accounts_and_invalid_signup_fields(self) -> None:
        self.assertEqual(self.register_account().status_code, 201)
        duplicate = self.register_account(email="LEARNER@example.com")
        self.assertEqual(duplicate.status_code, 409)

        invalid = self.client.post(
            "/api/auth/register",
            json={
                "name": "A",
                "email": "not-an-email",
                "age": 4,
                "exam": "Math Olympiad",
                "password": "short",
            },
        )
        self.assertEqual(invalid.status_code, 422)

    def test_password_whitespace_is_preserved(self) -> None:
        password = "  correct horse battery  "
        self.assertEqual(self.register_account(password=password).status_code, 201)

        response = self.client.post(
            "/api/auth/login",
            json={"email": "learner@example.com", "password": password},
        )
        self.assertEqual(response.status_code, 200)

    def test_page_and_health_check_are_served(self) -> None:
        page = self.client.get("/")
        script = self.client.get("/login_page.js")
        onboarding_page = self.client.get("/onboarding")
        onboarding_script = self.client.get("/onboarding.js")
        profile_page = self.client.get("/profile")
        profile_script = self.client.get("/profile.js")
        real_numbers_page = self.client.get("/real-numbers")
        real_numbers_script = self.client.get("/real-numbers.js")
        real_numbers_content = self.client.get("/real-numbers-content.js")
        real_numbers_quiz_page = self.client.get("/real-numbers/quiz")
        real_numbers_quiz_script = self.client.get("/real-numbers-quiz.js")
        real_numbers_quiz_styles = self.client.get("/real-numbers-quiz.css")
        polynomials_page = self.client.get("/polynomials")
        polynomials_script = self.client.get("/polynomials.js")
        polynomials_content_script = self.client.get("/polynomials-content.js")
        linear_equations_page = self.client.get("/linear-equations")
        linear_equations_script = self.client.get("/linear-equations.js")
        linear_equations_content = self.client.get("/linear-equations-content.js")
        quadratic_page = self.client.get("/quadratic-equations")
        quadratic_script = self.client.get("/quadratic-equations.js")
        quadratic_content = self.client.get("/quadratic-equations-content.js")
        arithmetic_progressions_page = self.client.get("/arithmetic-progressions")
        arithmetic_progressions_script = self.client.get("/arithmetic-progressions.js")
        arithmetic_progressions_content = self.client.get("/arithmetic-progressions-content.js")
        health = self.client.get("/api/health")

        self.assertEqual(page.status_code, 200)
        self.assertIn('src="login_page.js"', page.text)
        self.assertNotIn('value="JEE Foundation"', page.text)
        self.assertIn("no-cache", page.headers["cache-control"])
        self.assertEqual(script.status_code, 200)
        self.assertIn("no-cache", script.headers["cache-control"])
        self.assertIn("/api/auth/register", script.text)
        self.assertEqual(onboarding_page.status_code, 200)
        self.assertIn('src="/onboarding.js"', onboarding_page.text)
        self.assertIn(
            "How would you describe your current preparation?",
            " ".join(onboarding_page.text.split()),
        )
        self.assertIn('["SOF IMO"', onboarding_script.text)
        self.assertIn('["IOQM"', onboarding_script.text)
        self.assertNotIn('["RMO"', onboarding_script.text)
        self.assertNotIn('["INMO"', onboarding_script.text)
        self.assertNotIn('["IMO"', onboarding_script.text)
        self.assertIn('["SOF NSO"', onboarding_script.text)
        self.assertNotIn('["NSEJS"', onboarding_script.text)
        self.assertNotIn('["NSEA"', onboarding_script.text)
        self.assertNotIn('["NSEB"', onboarding_script.text)
        self.assertNotIn('["NSEC"', onboarding_script.text)
        self.assertNotIn('["NSEP"', onboarding_script.text)
        self.assertNotIn('["IJSO"', onboarding_script.text)
        self.assertIn('id="school-class"', onboarding_page.text)
        self.assertIn("window.location.assign(\"/onboarding\")", script.text)
        self.assertIn('window.location.assign("/profile")', script.text)
        self.assertEqual(onboarding_script.status_code, 200)
        self.assertIn("/api/profile/focus", onboarding_script.text)
        self.assertEqual(profile_page.status_code, 200)
        self.assertIn("Choose what to practice", profile_page.text)
        self.assertIn("Everyday progress", profile_page.text)
        self.assertIn("Updates", profile_page.text)
        self.assertIn("My profile", profile_page.text)
        self.assertIn("Logical Reasoning", profile_page.text)
        self.assertIn('data-topic="Logical Reasoning"', profile_page.text)
        self.assertIn("Chemical Reactions and Equations", profile_script.text)
        self.assertIn("Acids, Bases and Salts", profile_script.text)
        self.assertIn("Metals and Non-metals", profile_script.text)
        self.assertIn("Carbon and its Compounds", profile_script.text)
        self.assertIn("Light – Reflection and Refraction", profile_script.text)
        self.assertIn("The Human Eye and the Colourful World", profile_script.text)
        self.assertIn("Magnetic Effects of Electric Current", profile_script.text)
        self.assertIn("Control and Coordination", profile_script.text)
        self.assertIn("Reproduction in Organisms", profile_script.text)
        self.assertIn("Heredity", profile_script.text)
        self.assertIn("Our Environment", profile_script.text)
        self.assertIn("Higher-Order Thinking Questions (HOTs)", profile_script.text)
        self.assertIn('account.exam_focus === "SOF NSO"', profile_script.text)
        self.assertIn("account.school_class === 10", profile_script.text)
        self.assertNotIn("Verbal Reasoning", profile_page.text)
        self.assertNotIn("Non-Verbal Reasoning", profile_page.text)
        for chapter in (
            "Real Numbers",
            "Polynomials",
            "Pair of Linear Equations in Two Variables",
            "Quadratic Equations",
            "Arithmetic Progressions",
            "Triangles",
            "Coordinate Geometry",
            "Introduction to Trigonometry",
            "Some Applications of Trigonometry",
            "Circles",
            "Areas Related to Circles",
            "Surface Areas and Volumes",
            "Statistics",
            "Probability",
        ):
            self.assertIn(chapter, profile_script.text)
        self.assertIn('account.exam_focus === "SOF IMO"', profile_script.text)
        self.assertIn('account.exam_focus === "SOF NSO"', profile_script.text)
        self.assertIn("account.school_class === 10", profile_script.text)
        self.assertIn('id="sof-nso-class-10-content"', profile_page.text)
        self.assertIn("aria-label=\"Main navigation\"", profile_page.text)
        self.assertIn('src="/profile.js"', profile_page.text)
        self.assertEqual(profile_script.status_code, 200)
        self.assertIn("/api/auth/me", profile_script.text)
        self.assertIn('data-view="progress"', profile_page.text)
        self.assertIn('data-view="updates"', profile_page.text)
        self.assertIn('data-view="profile"', profile_page.text)
        self.assertIn('window.location.assign("/real-numbers")', profile_script.text)
        self.assertIn('button.href = "/polynomials"', profile_script.text)
        self.assertIn("topicName === \"Polynomials\"", profile_script.text)
        self.assertIn('button.href = "/linear-equations"', profile_script.text)
        self.assertIn("Pair of Linear Equations in Two Variables", profile_script.text)
        self.assertIn('button.href = "/quadratic-equations"', profile_script.text)
        self.assertIn("topicName === \"Quadratic Equations\"", profile_script.text)
        self.assertIn('button.href = "/arithmetic-progressions"', profile_script.text)
        self.assertIn('topicName === "Arithmetic Progressions"', profile_script.text)
        self.assertEqual(polynomials_page.status_code, 200)
        self.assertIn('src="/polynomials-content.js"', polynomials_page.text)
        self.assertIn('src="/polynomials.js"', polynomials_page.text)
        self.assertIn('id="landing-view"', polynomials_page.text)
        self.assertIn('id="lesson-view"', polynomials_page.text)
        self.assertIn('id="polynomial-topic-list"', polynomials_page.text)
        self.assertEqual(polynomials_script.status_code, 200)
        self.assertIn("validateTopicContent", polynomials_script.text)
        self.assertIn('account.school_class !== 10', polynomials_script.text)
        self.assertIn("Polynomials lessons are currently available for Class 10 SOF IMO learners.", polynomials_script.text)
        self.assertEqual(polynomials_content_script.status_code, 200)
        for topic in (
            "Polynomial Fundamentals",
            "Zeroes of a Polynomial",
            "Geometrical Meaning of Zeroes",
            "Relationship Between Zeroes and Coefficients",
            "Forming Quadratic Polynomials",
            "Olympiad Applications",
            "Previous-Class Polynomial Toolkit",
            "Formula Sheet and Revision",
        ):
            self.assertIn(topic, polynomials_content_script.text)
        self.assertEqual(polynomials_content_script.text.count("prompt:"), 40)
        self.assertIn("Core Class 10", polynomials_content_script.text)
        self.assertIn("Prerequisite Revision", polynomials_content_script.text)
        self.assertIn("Olympiad Extension", polynomials_content_script.text)
        self.assertIn("Did you know?", polynomials_script.text)
        self.assertIn("Show answer & explanation", polynomials_script.text)
        self.assertIn("graph-gridline", polynomials_page.text)
        self.assertEqual(real_numbers_page.status_code, 200)
        self.assertIn('src="/real-numbers-content.js"', real_numbers_page.text)
        self.assertIn('src="/real-numbers.js"', real_numbers_page.text)
        self.assertIn('id="real-number-topic-list"', real_numbers_page.text)
        self.assertIn('href="/profile?tab=progress"', real_numbers_page.text)
        self.assertEqual(real_numbers_script.status_code, 200)
        self.assertIn("validateTopics", real_numbers_script.text)
        self.assertIn("account.school_class !== 10", real_numbers_script.text)
        self.assertEqual(real_numbers_content.status_code, 200)
        self.assertEqual(real_numbers_quiz_page.status_code, 200)
        self.assertIn('href="/real-numbers-quiz.css"', real_numbers_quiz_page.text)
        self.assertIn('src="/real-numbers-quiz.js"', real_numbers_quiz_page.text)
        self.assertIn("Chapter quiz", real_numbers_page.text)
        self.assertIn('href="/real-numbers/quiz"', real_numbers_page.text)
        self.assertEqual(real_numbers_quiz_script.status_code, 200)
        self.assertEqual(real_numbers_quiz_styles.status_code, 200)
        for topic in (
            "Number System Review",
            "Rational Numbers and Decimal Tests",
            "Irrational Numbers and Proofs",
            "Real Numbers and Classification",
            "Decimal Expansions and Conversions",
            "Number Line Representation",
            "Properties of Real Numbers",
            "Euclid’s Algorithm and the Fundamental Theorem of Arithmetic",
            "Surds and Simplifying Radicals",
            "Advanced: Linear Combinations and Expressions",
            "Formula Sheet and Revision",
        ):
            self.assertIn(topic, real_numbers_content.text)
        self.assertEqual(real_numbers_content.text.count("{ prompt:"), 55)
        self.assertIn("2026–27", real_numbers_page.text)
        self.assertIn("Fundamental Theorem of Arithmetic", real_numbers_content.text)
        self.assertIn("√2", real_numbers_content.text)
        self.assertIn("√3", real_numbers_content.text)
        self.assertIn("√5", real_numbers_content.text)
        self.assertIn("Core · Class 10", real_numbers_content.text)
        self.assertIn("Prerequisite Revision · Class 9", real_numbers_content.text)
        self.assertIn("Olympiad Extension", real_numbers_content.text)
        self.assertIn("number-line", real_numbers_content.text)
        self.assertIn("Maths_SecP1X_2026-27.pdf", real_numbers_page.text)
        self.assertIn("imo-syllabus-class-10", real_numbers_page.text)
        self.assertIn("Show answer & explanation", real_numbers_script.text)
        self.assertEqual(linear_equations_page.status_code, 200)
        self.assertIn('src="/linear-equations-content.js"', linear_equations_page.text)
        self.assertIn('src="/linear-equations.js"', linear_equations_page.text)
        self.assertIn('id="linear-equation-topic-list"', linear_equations_page.text)
        self.assertIn("CBSE Class X Mathematics 2026–27", linear_equations_page.text)
        self.assertIn("Maths_SecP1X_2026-27.pdf", linear_equations_page.text)
        self.assertIn("imo-syllabus-class-10", linear_equations_page.text)
        self.assertEqual(linear_equations_script.status_code, 200)
        self.assertIn("validateTopicContent", linear_equations_script.text)
        self.assertIn("Show answer & explanation", linear_equations_script.text)
        self.assertIn("graph-intersection", linear_equations_page.text)
        self.assertEqual(linear_equations_content.status_code, 200)
        for topic in (
            "Linear Equations Fundamentals",
            "Graphical Solution Method",
            "Algebraic Method: Substitution",
            "Algebraic Method: Elimination",
            "Solution Types: Consistent and Inconsistent Systems",
            "Application Word Problems",
            "Advanced Problem Solving and Olympiad Tips",
            "Revision and Formula Sheet",
        ):
            self.assertIn(topic, linear_equations_content.text)
        self.assertEqual(linear_equations_content.text.count("prompt:"), 40)
        self.assertIn("Core · Class 10", linear_equations_content.text)
        self.assertIn("Olympiad Extension", linear_equations_content.text)
        self.assertIn("D = a₁b₂ − a₂b₁", linear_equations_content.text)
        self.assertEqual(quadratic_page.status_code, 200)
        self.assertIn('src="/quadratic-equations-content.js"', quadratic_page.text)
        self.assertIn('src="/quadratic-equations.js"', quadratic_page.text)
        self.assertIn('id="quadratic-topic-list"', quadratic_page.text)
        self.assertIn("Maths_SecP1X_2026-27.pdf", quadratic_page.text)
        self.assertIn("jemh104.pdf", quadratic_page.text)
        self.assertIn("imo-syllabus-class-10", quadratic_page.text)
        self.assertEqual(quadratic_script.status_code, 200)
        self.assertIn("validateTopics", quadratic_script.text)
        self.assertIn("renderFormulaFlow", quadratic_script.text)
        self.assertIn("Quadratic Equations lessons are currently available", quadratic_script.text)
        self.assertEqual(quadratic_content.status_code, 200)
        for topic in (
            "Understanding Quadratic Equations",
            "Solving by Factorisation",
            "Completing the Square",
            "The Quadratic Formula",
            "Discriminant and Nature of Real Roots",
            "Roots and Coefficients",
            "Quadratic Equations in Daily Life",
            "Olympiad Problem-Solving Lab",
            "Revision and Formula Sheet",
        ):
            self.assertIn(topic, quadratic_content.text)
        self.assertEqual(quadratic_content.text.count("prompt:"), 52)
        self.assertIn("Core · Class 10", quadratic_content.text)
        self.assertIn("Olympiad Extension", quadratic_content.text)
        self.assertIn("D = b² − 4ac", quadratic_content.text)
        self.assertIn("rootLabels", quadratic_content.text)
        self.assertIn(
            "The 2026–27 CBSE curriculum lists factorisation and the quadratic formula as the solving methods",
            quadratic_content.text,
        )
        self.assertEqual(arithmetic_progressions_page.status_code, 200)
        self.assertIn('src="/arithmetic-progressions-content.js"', arithmetic_progressions_page.text)
        self.assertIn('src="/arithmetic-progressions.js"', arithmetic_progressions_page.text)
        self.assertIn('id="ap-topic-list"', arithmetic_progressions_page.text)
        self.assertIn("Maths_SecP1X_2026-27.pdf", arithmetic_progressions_page.text)
        self.assertIn("jemh105.pdf", arithmetic_progressions_page.text)
        self.assertIn("imo-syllabus-class-10", arithmetic_progressions_page.text)
        self.assertEqual(arithmetic_progressions_script.status_code, 200)
        self.assertIn("validateTopics", arithmetic_progressions_script.text)
        self.assertIn("renderApGraph", arithmetic_progressions_script.text)
        self.assertIn("Arithmetic Progressions lessons are currently available", arithmetic_progressions_script.text)
        self.assertEqual(arithmetic_progressions_content.status_code, 200)
        for topic in (
            "Introduction to Sequences and AP",
            "The nth Term of an AP",
            "Sum of the First n Terms",
            "Arithmetic Mean and Special Properties",
            "Word Problems with AP",
            "Graphical Representation of an AP",
            "Advanced Olympiad Problems",
            "Revision and Formula Sheet",
        ):
            self.assertIn(topic, arithmetic_progressions_content.text)
        self.assertEqual(arithmetic_progressions_content.text.count("prompt:"), 40)
        self.assertIn("Core Class 10", arithmetic_progressions_content.text)
        self.assertIn("Prerequisite Revision", arithmetic_progressions_content.text)
        self.assertIn("Olympiad Extension", arithmetic_progressions_content.text)
        self.assertIn("aₙ = a + (n − 1)d", arithmetic_progressions_content.text)
        self.assertIn("Sₙ = n/2", arithmetic_progressions_content.text)
        self.assertIn("Show answer & explanation", arithmetic_progressions_script.text)
        self.assertIn(".grid-line", arithmetic_progressions_page.text)
        self.assertEqual(health.json(), {"status": "ok"})

    def test_saves_and_validates_olympiad_focus(self) -> None:
        self.assertEqual(self.register_account().status_code, 201)

        saved = self.client.post(
            "/api/profile/focus",
            json={
                "exam_focus": "IOQM",
                "preparation_level": "some-preparation",
                "school_class": 8,
            },
        )
        self.assertEqual(saved.status_code, 200)
        self.assertEqual(saved.json()["exam_focus"], "IOQM")
        self.assertEqual(
            saved.json()["preparation_level"],
            "some-preparation",
        )
        self.assertEqual(saved.json()["school_class"], 8)
        self.assertEqual(
            self.client.get("/api/auth/me").json()["exam_focus"],
            "IOQM",
        )
        self.assertEqual(
            self.client.get("/api/auth/me").json()["preparation_level"],
            "some-preparation",
        )
        self.assertEqual(self.client.get("/api/auth/me").json()["school_class"], 8)

        invalid_for_math = self.client.post(
            "/api/profile/focus",
            json={
                "exam_focus": "NSEA",
                "preparation_level": "beginner",
                "school_class": 8,
            },
        )
        self.assertEqual(invalid_for_math.status_code, 422)

        removed_math_option = self.client.post(
            "/api/profile/focus",
            json={
                "exam_focus": "RMO",
                "preparation_level": "beginner",
                "school_class": 8,
            },
        )
        self.assertEqual(removed_math_option.status_code, 422)

        self.client.post("/api/auth/logout")
        unauthorized = self.client.post(
            "/api/profile/focus",
            json={
                "exam_focus": "RMO",
                "preparation_level": "beginner",
                "school_class": 8,
            },
        )
        self.assertEqual(unauthorized.status_code, 401)

    def test_rejects_invalid_preparation_level(self) -> None:
        self.assertEqual(self.register_account().status_code, 201)
        response = self.client.post(
            "/api/profile/focus",
            json={
                "exam_focus": "IOQM",
                "preparation_level": "expert",
                "school_class": 8,
            },
        )
        self.assertEqual(response.status_code, 422)

    def test_rejects_school_class_outside_school_range(self) -> None:
        self.assertEqual(self.register_account().status_code, 201)
        response = self.client.post(
            "/api/profile/focus",
            json={
                "exam_focus": "IOQM",
                "preparation_level": "beginner",
                "school_class": 13,
            },
        )
        self.assertEqual(response.status_code, 422)

    def test_science_account_can_choose_science_olympiad(self) -> None:
        self.assertEqual(
            self.register_account(exam="Science Olympiad").status_code,
            201,
        )
        saved = self.client.post(
            "/api/profile/focus",
            json={
                "exam_focus": "SOF NSO",
                "preparation_level": "focused-revision",
                "school_class": 7,
            },
        )
        self.assertEqual(saved.status_code, 200)
        self.assertEqual(saved.json()["exam_focus"], "SOF NSO")
        self.assertEqual(saved.json()["preparation_level"], "focused-revision")
        self.assertEqual(saved.json()["school_class"], 7)

    def test_science_account_cannot_choose_other_science_olympiads(self) -> None:
        self.assertEqual(
            self.register_account(exam="Science Olympiad").status_code,
            201,
        )
        response = self.client.post(
            "/api/profile/focus",
            json={
                "exam_focus": "NSEJS",
                "preparation_level": "beginner",
                "school_class": 7,
            },
        )
        self.assertEqual(response.status_code, 422)

    def test_initializes_existing_accounts_database_with_focus_column(self) -> None:
        legacy_path = Path(self.temporary_directory.name) / "legacy.sqlite3"
        connection = sqlite3.connect(legacy_path)
        try:
            connection.execute(
                """
                CREATE TABLE accounts (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                    age INTEGER NOT NULL,
                    exam TEXT NOT NULL,
                    password_salt BLOB NOT NULL,
                    password_hash BLOB NOT NULL,
                    created_at INTEGER NOT NULL
                )
                """
            )
            connection.commit()
        finally:
            connection.close()

        active_path = backend.DATABASE_PATH
        try:
            backend.DATABASE_PATH = legacy_path
            backend.initialize_database()
            connection = sqlite3.connect(legacy_path)
            try:
                columns = {
                    row[1] for row in connection.execute("PRAGMA table_info(accounts)")
                }
            finally:
                connection.close()
            self.assertIn("exam_focus", columns)
            self.assertIn("preparation_level", columns)
            self.assertIn("school_class", columns)
        finally:
            backend.DATABASE_PATH = active_path


if __name__ == "__main__":
    unittest.main()
