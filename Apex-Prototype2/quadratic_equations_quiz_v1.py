"""Server-only question bank for the Class 10 Quadratic Equations quiz."""

QUIZ_ID = "quadratic-equations-class-10-v1"
QUESTION_COUNT = 10
COURSE_COUNT = 5
OLYMPIAD_COUNT = 5
OVERALL_TIMER_SECONDS = 20 * 60
QUESTION_TIMER_SECONDS = 120

QUESTIONS = (
    {
        "id": "quadratic-v1-01",
        "category": "course",
        "prompt": "Rewrite 3x(2x − 1) = 4 in standard form ax² + bx + c = 0. Which coefficient triple (a, b, c) is correct?",
        "options": {"A": "(6, −3, −4)", "B": "(6, 3, −4)", "C": "(6, −3, 4)", "D": "(3, −1, −4)"},
        "correct": "A",
        "explanation": (
            "First expand the left side: 3x(2x − 1) = 6x² − 3x. The equation is therefore 6x² − 3x = 4. Standard form has zero on the right, so subtract 4 from both sides to obtain 6x² − 3x − 4 = 0. Comparing term by term with ax² + bx + c = 0 gives a = 6, b = −3 and c = −4. The leading coefficient is non-zero, so this is a quadratic equation. Option A is correct."
        ),
    },
    {
        "id": "quadratic-v1-02",
        "category": "course",
        "prompt": "Solve x² − x − 12 = 0 by factorisation. Which pair gives all its roots?",
        "options": {"A": "−3 and 4", "B": "3 and −4", "C": "−2 and 6", "D": "−4 and 3"},
        "correct": "A",
        "explanation": (
            "To factor x² − x − 12, find two numbers whose product is −12 and whose sum is −1. The numbers −4 and 3 work, so x² − x − 12 = (x − 4)(x + 3). A product is zero only when at least one factor is zero: x − 4 = 0 gives x = 4, and x + 3 = 0 gives x = −3. Check: 16 − 4 − 12 = 0 and 9 + 3 − 12 = 0. The roots are −3 and 4, option A."
        ),
    },
    {
        "id": "quadratic-v1-03",
        "category": "course",
        "prompt": "Use the quadratic formula to solve 2x² − 3x − 2 = 0. Which pair is correct?",
        "options": {"A": "2 and −1/2", "B": "−2 and 1/2", "C": "1 and −2", "D": "3/2 and −2/3"},
        "correct": "A",
        "explanation": (
            "Here a = 2, b = −3 and c = −2. The discriminant is D = b² − 4ac = 9 − 4(2)(−2) = 25. The quadratic formula gives x = (−b ± √D)/(2a) = (3 ± 5)/4. The plus sign gives x = 8/4 = 2; the minus sign gives x = −2/4 = −1/2. Substitution checks both values in the original equation. Thus the complete root pair is 2 and −1/2, option A."
        ),
    },
    {
        "id": "quadratic-v1-04",
        "category": "course",
        "prompt": "Without solving 3x² + 2x + 1 = 0, use its discriminant to decide how many real roots it has.",
        "options": {"A": "Two distinct real roots", "B": "One repeated real root", "C": "No real roots", "D": "Infinitely many real roots"},
        "correct": "C",
        "explanation": (
            "For ax² + bx + c = 0, the discriminant is D = b² − 4ac. Here a = 3, b = 2 and c = 1, so D = 2² − 4(3)(1) = 4 − 12 = −8. A negative discriminant means the square root in the quadratic formula is not real. Therefore the equation has no real roots (it has a pair of non-real complex roots), option C. The sign test is enough; no formula calculation is needed."
        ),
    },
    {
        "id": "quadratic-v1-05",
        "category": "course",
        "prompt": "A rectangular garden has width x metres and length (x + 3) metres. Its area is 40 m². What is its width?",
        "options": {"A": "4 m", "B": "5 m", "C": "8 m", "D": "10 m"},
        "correct": "B",
        "explanation": (
            "Area equals length times width, so x(x + 3) = 40. Rearranging gives x² + 3x − 40 = 0. Factor: (x + 8)(x − 5) = 0, giving x = −8 or x = 5. A physical width must be positive, so discard −8 and take x = 5 m. The length is then 8 m, and 5 × 8 = 40 m², which verifies the model and answer. Option B is correct."
        ),
    },
    {
        "id": "quadratic-v1-06",
        "category": "olympiad",
        "prompt": "For which value of k does x² − (k + 2)x + 2k = 0 have equal roots?",
        "options": {"A": "k = −2", "B": "k = 0", "C": "k = 2", "D": "k = 4"},
        "correct": "C",
        "explanation": (
            "Equal roots occur precisely when the discriminant is zero. In this equation a = 1, b = −(k + 2) and c = 2k. Thus D = (k + 2)² − 8k = k² − 4k + 4 = (k − 2)². Setting D = 0 forces k = 2. Substituting gives x² − 4x + 4 = (x − 2)², which indeed has the repeated root x = 2. Since a square is zero only at k = 2, no other listed value works. Option C is correct."
        ),
    },
    {
        "id": "quadratic-v1-07",
        "category": "olympiad",
        "prompt": "For which values of the real parameter k does 2x² + (k − 3)x + 2 = 0 have two distinct real roots?",
        "options": {"A": "−1 < k < 7", "B": "k < −1 or k > 7", "C": "k = −1 or k = 7", "D": "All real values of k"},
        "correct": "B",
        "explanation": (
            "Two distinct real roots require a positive discriminant. Here a = 2, b = k − 3 and c = 2, so D = (k − 3)² − 4(2)(2) = (k − 3)² − 16. We need (k − 3)² > 16, or |k − 3| > 4. Splitting this absolute-value inequality gives k − 3 < −4 or k − 3 > 4; hence k < −1 or k > 7. At k = −1 or 7 the discriminant is zero and the roots coincide; between those values it is negative and there are no real roots. Option B is correct."
        ),
    },
    {
        "id": "quadratic-v1-08",
        "category": "olympiad",
        "prompt": "A monic quadratic has two positive integer roots whose product is 18 and whose difference is 3. Which equation is it?",
        "options": {"A": "x² − 9x + 18 = 0", "B": "x² + 9x + 18 = 0", "C": "x² − 3x − 18 = 0", "D": "x² − 18x + 3 = 0"},
        "correct": "A",
        "explanation": (
            "List positive factor pairs of 18 and compare their differences: (1, 18) differs by 17, (2, 9) by 7, and (3, 6) by 3. Therefore the roots must be 3 and 6, whose sum is 9. A monic quadratic with roots r and s is (x − r)(x − s) = x² − (r + s)x + rs. Substituting the sum 9 and product 18 gives x² − 9x + 18 = 0. Its factors are (x − 3)(x − 6), confirming both conditions. Option A is correct."
        ),
    },
    {
        "id": "quadratic-v1-09",
        "category": "olympiad",
        "prompt": "The roots α and β of x² − 4x + 1 = 0 are non-zero. Without solving for them, find α² + 1/α².",
        "options": {"A": "10", "B": "12", "C": "14", "D": "16"},
        "correct": "C",
        "explanation": (
            "By the product of roots, αβ = 1. Hence 1/α = β, so the requested expression is α² + β². The sum of roots is α + β = 4. Apply α² + β² = (α + β)² − 2αβ = 4² − 2(1) = 14. The key insight is to replace the reciprocal using the product before doing any root calculation. The roots are indeed non-zero because their product is 1. Option C is correct."
        ),
    },
    {
        "id": "quadratic-v1-10",
        "category": "olympiad",
        "prompt": "What is the minimum value of x² − 6x + 13 over all real x?",
        "options": {"A": "−4", "B": "0", "C": "3", "D": "4"},
        "correct": "D",
        "explanation": (
            "Complete the square around the x-term: x² − 6x + 13 = (x² − 6x + 9) + 4 = (x − 3)² + 4. A square is always at least zero, so this expression is at least 4. It reaches 4 when x = 3, making 4 the minimum. Equivalently, the related equation x² − 6x + 13 = 0 has discriminant 36 − 52 = −16 and no real zeros, consistent with the graph staying above zero. Option D is correct."
        ),
    },
)
