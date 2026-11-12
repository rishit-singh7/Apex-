"""Server-only question bank for the Class 10 Polynomials chapter quiz."""

QUIZ_ID = "polynomials-class-10-v1"
QUESTION_COUNT = 10
COURSE_COUNT = 5
OLYMPIAD_COUNT = 5
OVERALL_TIMER_SECONDS = 20 * 60
QUESTION_TIMER_SECONDS = 120

QUESTIONS = (
    {
        "id": "poly-v1-01",
        "category": "course",
        "prompt": "What is the degree of 5x⁴ − 3x² + 1?",
        "options": {"A": "2", "B": "3", "C": "4", "D": "5"},
        "correct": "C",
        "explanation": (
            "The degree of a non-zero polynomial is the greatest exponent of the variable whose coefficient is not zero. In 5x⁴ − 3x² + 1, the exponents that appear are 4, 2 and 0 (the constant term has degree 0). The largest is 4, so the degree is 4 and the polynomial is quartic. The coefficient 5 is not the degree; it multiplies the highest-power term. Therefore option C is correct."
        ),
    },
    {
        "id": "poly-v1-02",
        "category": "course",
        "prompt": "What are the zeroes of x² − 5x + 6?",
        "options": {"A": "−2 and −3", "B": "2 and 3", "C": "−2 and 3", "D": "1 and 6"},
        "correct": "B",
        "explanation": (
            "A zero is a value that makes the polynomial equal to zero. Factor the expression by finding two numbers whose product is 6 and whose sum is 5: 2 and 3. Thus x² − 5x + 6 = (x − 2)(x − 3). Setting each factor to zero gives x = 2 or x = 3. Check by substitution: p(2) = 4 − 10 + 6 = 0 and p(3) = 9 − 15 + 6 = 0. The zeroes are 2 and 3, option B."
        ),
    },
    {
        "id": "poly-v1-03",
        "category": "course",
        "prompt": "Which monic quadratic polynomial has zeroes 2 and −3?",
        "options": {"A": "x² + x − 6", "B": "x² − x − 6", "C": "x² + x + 6", "D": "x² − 5x + 6"},
        "correct": "A",
        "explanation": (
            "For a monic quadratic with zeroes α and β, the polynomial is (x − α)(x − β) = x² − (α + β)x + αβ. Here the sum is 2 + (−3) = −1 and the product is 2 × (−3) = −6. Substituting those values gives x² − (−1)x − 6 = x² + x − 6. As a check, it factors as (x − 2)(x + 3), whose zeroes are 2 and −3. Option A is correct."
        ),
    },
    {
        "id": "poly-v1-04",
        "category": "course",
        "prompt": "If 2 is a zero of p(x) = x² + kx − 6, what is k?",
        "options": {"A": "−2", "B": "−1", "C": "1", "D": "2"},
        "correct": "C",
        "explanation": (
            "A given zero must make p(x) equal zero. Substitute x = 2 into the polynomial: p(2) = 2² + 2k − 6 = 0. This simplifies to 4 + 2k − 6 = 0, so 2k − 2 = 0 and 2k = 2. Therefore k = 1. Checking: p(2) = 4 + 2 − 6 = 0. The substitution works because a zero is defined as an input whose output is zero; option C is the only listed value that satisfies that condition."
        ),
    },
    {
        "id": "poly-v1-05",
        "category": "course",
        "prompt": "The graph of y = p(x) crosses the x-axis at x = −2 and x = 3, and nowhere else. What are the real zeroes of p(x)?",
        "options": {"A": "−2 and 3", "B": "2 and −3", "C": "−2 only", "D": "3 only"},
        "correct": "A",
        "explanation": (
            "A point on the x-axis has y-coordinate 0. On the graph y = p(x), this means p(x) = 0, so the x-coordinates where the curve meets the x-axis are exactly the real zeroes. The graph crosses at x = −2 and x = 3 and has no other x-axis intersections. Therefore the real zeroes are −2 and 3, option A. The y-coordinate is zero at each intersection; the zeroes are the x-coordinates."
        ),
    },
    {
        "id": "poly-v1-06",
        "category": "olympiad",
        "prompt": "If α and β are the zeroes of 2x² − 5x + 2, what is α² + β²?",
        "options": {"A": "9/4", "B": "13/4", "C": "17/4", "D": "25/4"},
        "correct": "C",
        "explanation": (
            "Use the coefficient relationships instead of solving for the roots individually. For ax² + bx + c, α + β = −b/a and αβ = c/a. Here α + β = 5/2 and αβ = 1. The identity α² + β² = (α + β)² − 2αβ then gives (5/2)² − 2(1) = 25/4 − 8/4 = 17/4. This avoids finding two separate roots and gives option C."
        ),
    },
    {
        "id": "poly-v1-07",
        "category": "olympiad",
        "prompt": "The zeroes α and β of a quadratic satisfy α + β = 4 and αβ = 1. What is (α − 1)(β − 1)?",
        "options": {"A": "−2", "B": "−1", "C": "2", "D": "4"},
        "correct": "A",
        "explanation": (
            "Expand the requested expression before substituting: (α − 1)(β − 1) = αβ − α − β + 1. Group the given symmetric quantities to get αβ − (α + β) + 1. Now use αβ = 1 and α + β = 4: 1 − 4 + 1 = −2. The individual zeroes are not needed; recognizing the sum and product structure is the shortcut. Option A is correct."
        ),
    },
    {
        "id": "poly-v1-08",
        "category": "olympiad",
        "prompt": "A monic quadratic has two zeroes, one of which is twice the other. Their sum is −3. Which polynomial is it?",
        "options": {"A": "x² + 3x + 2", "B": "x² − 3x + 2", "C": "x² + 3x − 2", "D": "x² − 2x − 3"},
        "correct": "A",
        "explanation": (
            "Let one zero be r and the other be 2r. Their sum is r + 2r = 3r = −3, so r = −1 and the two zeroes are −1 and −2. Their product is 2. A monic quadratic with sum of zeroes −3 and product 2 is x² − (−3)x + 2 = x² + 3x + 2. Check: it factors as (x + 1)(x + 2), with zeroes −1 and −2; one is twice the other. Option A is correct."
        ),
    },
    {
        "id": "poly-v1-09",
        "category": "olympiad",
        "prompt": "If α and β are the zeroes of x² − 3x + 1, what is α³ + β³?",
        "options": {"A": "9", "B": "18", "C": "24", "D": "27"},
        "correct": "B",
        "explanation": (
            "The roots of x² − 3x + 1 have sum α + β = 3 and product αβ = 1. Use the identity α³ + β³ = (α + β)³ − 3αβ(α + β), which follows by expanding the cube of a sum. Substitution gives 3³ − 3(1)(3) = 27 − 9 = 18. The identity lets us evaluate the expression without solving the quadratic or introducing radicals. Option B is correct."
        ),
    },
    {
        "id": "poly-v1-10",
        "category": "olympiad",
        "prompt": "The zeroes of x² − 3x + c are reciprocals of each other. What is c?",
        "options": {"A": "−2", "B": "−1", "C": "1", "D": "2"},
        "correct": "C",
        "explanation": (
            "If two non-zero numbers are reciprocals, their product is 1. For a quadratic ax² + bx + c, the product of its zeroes is c/a. In x² − 3x + c, the leading coefficient a is 1, so the product is c. Set c = 1. The resulting polynomial x² − 3x + 1 has two real zeroes because its discriminant is 9 − 4 = 5 > 0; their product is 1, and neither is zero, so they are reciprocals. Therefore option C is correct."
        ),
    },
)
