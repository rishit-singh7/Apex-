"""Server-only question bank for the Class 10 Arithmetic Progressions quiz."""

QUIZ_ID = "arithmetic-progressions-class-10-v1"
QUESTION_COUNT = 10
COURSE_COUNT = 5
OLYMPIAD_COUNT = 5
OVERALL_TIMER_SECONDS = 20 * 60
QUESTION_TIMER_SECONDS = 120

QUESTIONS = (
    {
        "id": "ap-v1-01",
        "category": "course",
        "prompt": "Which option correctly identifies an arithmetic progression and gives its first term a and common difference d?",
        "options": {
            "A": "7, 3, −1, −5; a = 7, d = −4",
            "B": "7, 3, 0, −5; a = 7, d = −4",
            "C": "7, 4, 0, −4; a = 7, d = −3",
            "D": "7, 3, −1, −5; a = 3, d = −4",
        },
        "correct": "A",
        "explanation": (
            "An arithmetic progression has the same difference between every pair of consecutive terms. In option A, 3 − 7 = −4, −1 − 3 = −4, and −5 − (−1) = −4, so the common difference is consistently −4. Its first term is the first listed value, 7. Option B has differences −4, −3 and −5, so it is not an AP. In C the differences are −3, −4 and −4, also not constant. D has the right sequence and difference but incorrectly calls the second term the first term. Therefore A is the only fully correct choice."
        ),
    },
    {
        "id": "ap-v1-02",
        "category": "course",
        "prompt": "What is the common difference of the constant sequence 2.5, 2.5, 2.5, 2.5, …?",
        "options": {"A": "2.5", "B": "1", "C": "0", "D": "It is not an AP"},
        "correct": "C",
        "explanation": (
            "The common difference is found by subtracting a term from the term immediately after it. Here 2.5 − 2.5 = 0 each time. A sequence with zero common difference is still an arithmetic progression: every consecutive difference is the same, namely zero. The first term is 2.5 and all later terms remain 2.5. Option C is correct."
        ),
    },
    {
        "id": "ap-v1-03",
        "category": "course",
        "prompt": "An AP has first term a = 3/2 and common difference d = −1/2. What is its 9th term?",
        "options": {"A": "−5/2", "B": "−3/2", "C": "5/2", "D": "−7/2"},
        "correct": "A",
        "explanation": (
            "The nth term of an AP is aₙ = a + (n − 1)d. Substitute a = 3/2, d = −1/2 and n = 9: a₉ = 3/2 + (9 − 1)(−1/2) = 3/2 − 8/2 = −5/2. There are eight equal steps from the first term to the ninth, not nine. The negative difference means the terms decrease by one-half each step. Option A is correct."
        ),
    },
    {
        "id": "ap-v1-04",
        "category": "course",
        "prompt": "How many terms are in the finite AP 47, 43, 39, …, −25?",
        "options": {"A": "18", "B": "19", "C": "20", "D": "21"},
        "correct": "B",
        "explanation": (
            "The first term is a = 47, the common difference is d = 43 − 47 = −4, and the last term is −25. Use aₙ = a + (n − 1)d: −25 = 47 + (n − 1)(−4). Subtract 47 to get −72 = −4(n − 1), so n − 1 = 18 and n = 19. The extra 1 counts the first term itself; the number of steps is one less than the number of terms. Option B is correct."
        ),
    },
    {
        "id": "ap-v1-05",
        "category": "course",
        "prompt": "An auditorium has 12 rows. The first row has 18 seats, and each next row has 2 more seats than the previous row. How many seats are there altogether?",
        "options": {"A": "336", "B": "348", "C": "360", "D": "372"},
        "correct": "B",
        "explanation": (
            "The row sizes form an AP with a = 18, d = 2 and n = 12. First find the last row: l = a + (n − 1)d = 18 + 11(2) = 40 seats. Use the sum formula Sₙ = n/2(a + l): S₁₂ = 12/2(18 + 40) = 6 × 58 = 348. As a check with the other sum form, 12/2[2(18) + 11(2)] = 6(58) = 348. There are 348 seats, option B."
        ),
    },
    {
        "id": "ap-v1-06",
        "category": "olympiad",
        "prompt": "In an AP, the 5th term is 18 and the 12th term is 46. What is the 20th term?",
        "options": {"A": "74", "B": "76", "C": "78", "D": "82"},
        "correct": "C",
        "explanation": (
            "Write both conditions using aₙ = a + (n − 1)d: a + 4d = 18 and a + 11d = 46. Subtract the first equation from the second to eliminate a: 7d = 28, so d = 4. Substitute into a + 4d = 18 to get a = 2. Now calculate the requested term rather than confusing its position with the number of steps: a₂₀ = 2 + 19(4) = 78. The data also check: a₅ = 2 + 16 = 18 and a₁₂ = 2 + 44 = 46. Option C is correct."
        ),
    },
    {
        "id": "ap-v1-07",
        "category": "olympiad",
        "prompt": "Three positive, increasing consecutive terms of an AP have sum 21 and product 315. What is the common difference?",
        "options": {"A": "1", "B": "2", "C": "3", "D": "4"},
        "correct": "B",
        "explanation": (
            "Represent three consecutive AP terms symmetrically as x − d, x, x + d. Their sum is 3x = 21, so the middle term is x = 7. Their product is (7 − d)·7·(7 + d) = 7(49 − d²) = 315. Divide by 7: 49 − d² = 45, so d² = 4. This gives d = 2 or −2 algebraically, but the question specifies that the terms are increasing, so the common difference must be positive: d = 2. The terms are 5, 7, 9; their sum is 21 and product is 315. Option B is correct."
        ),
    },
    {
        "id": "ap-v1-08",
        "category": "olympiad",
        "prompt": "The first 19 terms of an AP are 3, 7, 11, … . What is the sum of the terms in odd-numbered positions (1st, 3rd, …, 19th)?",
        "options": {"A": "380", "B": "390", "C": "399", "D": "418"},
        "correct": "B",
        "explanation": (
            "The original AP has a = 3 and d = 4. Taking every other term creates a new AP: 3, 11, 19, …, whose common difference is 8. The odd-numbered positions among the first 19 are 1, 3, 5, …, 19, which gives (19 + 1)/2 = 10 selected terms. The last selected value is the original 19th term, 3 + 18(4) = 75. Sum this selected AP: 10/2(3 + 75) = 5 × 78 = 390. This also shows why there are ten selected terms, not nineteen. Option B is correct."
        ),
    },
    {
        "id": "ap-v1-09",
        "category": "olympiad",
        "prompt": "For the AP 1, 2, 3, 4, …, which positive integer n satisfies Sₙ = 3aₙ?",
        "options": {"A": "3", "B": "5", "C": "6", "D": "9"},
        "correct": "B",
        "explanation": (
            "Here the nth term is aₙ = n, and the sum of the first n positive integers is Sₙ = n(n + 1)/2. Set the two quantities in the condition equal: n(n + 1)/2 = 3n. Since n is a positive integer, divide by n to get (n + 1)/2 = 3, so n + 1 = 6 and n = 5. (If one solves before using n > 0, the algebraic equation also has n = 0, but zero is not a valid positive term count.) Check: S₅ = 15 and 3a₅ = 3 × 5 = 15. Option B is correct."
        ),
    },
    {
        "id": "ap-v1-10",
        "category": "olympiad",
        "prompt": "What is the sum of the first 25 positive odd integers?",
        "options": {"A": "575", "B": "600", "C": "625", "D": "650"},
        "correct": "C",
        "explanation": (
            "The positive odd integers form the AP 1, 3, 5, … with a = 1 and d = 2. Its 25th term is a₂₅ = 1 + 24(2) = 49. Therefore S₂₅ = 25/2(1 + 49) = 25/2 × 50 = 625. A useful pattern check is to pair the first and last terms (1 + 49 = 50), the second and second-last (3 + 47 = 50), and so on: 25 terms have average 25, so their sum is 25 × 25 = 625. Option C is correct."
        ),
    },
)
