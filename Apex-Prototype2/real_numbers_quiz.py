"""Server-only question bank for the Class 10 Real Numbers chapter quiz.

Correct options and explanations must never be included in in-progress API
responses. Keep this module imported only by the backend and its tests.
"""

QUIZ_ID = "real-numbers-class-10-v1"
QUESTION_COUNT = 20
COURSE_COUNT = 10
OLYMPIAD_COUNT = 10
OVERALL_TIMER_SECONDS = 40 * 60
QUESTION_TIMER_SECONDS = 120

QUESTIONS = (
    {
        "id": "rn-01", "category": "course", "prompt": "Write 360 as a product of prime powers.",
        "options": {"A": "2² × 3² × 5", "B": "2³ × 3² × 5", "C": "2³ × 3 × 5²", "D": "2² × 3³ × 5"},
        "correct": "B",
        "explanation": "Divide by primes: 360 = 2 × 180 = 2² × 90 = 2³ × 45 = 2³ × 3² × 5. The exponents are 3, 2 and 1.",
    },
    {
        "id": "rn-02", "category": "course", "prompt": "What are the HCF and LCM of 72 and 120, in that order?",
        "options": {"A": "12 and 360", "B": "24 and 360", "C": "24 and 720", "D": "48 and 180"},
        "correct": "B",
        "explanation": "72 = 2³ × 3² and 120 = 2³ × 3 × 5. The HCF uses the smaller exponents, giving 2³ × 3 = 24. The LCM uses the larger exponents, giving 2³ × 3² × 5 = 360.",
    },
    {
        "id": "rn-03", "category": "course", "prompt": "Which expression is irrational?",
        "options": {"A": "√49 + √81", "B": "√(36/25)", "C": "7 + 3√2", "D": "0.125"},
        "correct": "C",
        "explanation": "√49 + √81 = 7 + 9 = 16, √(36/25) = 6/5, and 0.125 = 1/8 are rational. Since √2 is irrational, 3√2 is irrational, and adding the rational number 7 keeps it irrational.",
    },
    {
        "id": "rn-04", "category": "course", "prompt": "Which fraction has a terminating decimal expansion?",
        "options": {"A": "7/40", "B": "11/90", "C": "13/75", "D": "17/84"},
        "correct": "A",
        "explanation": "A reduced fraction terminates exactly when its denominator has no prime factors other than 2 and 5. 40 = 2³ × 5, so 7/40 terminates. The other denominators contain 3 or 7.",
    },
    {
        "id": "rn-05", "category": "course", "prompt": "For every positive integer n, what is the units digit of 6ⁿ + 2?",
        "options": {"A": "2", "B": "4", "C": "6", "D": "8"},
        "correct": "D",
        "explanation": "Every positive power of 6 ends in 6: multiplying a number ending in 6 by 6 again gives a number ending in 6. Adding 2 therefore gives a units digit of 8.",
    },
    {
        "id": "rn-06", "category": "course", "prompt": "What are the HCF and LCM of 26 and 91, in that order?",
        "options": {"A": "1 and 2366", "B": "13 and 182", "C": "13 and 2366", "D": "26 and 91"},
        "correct": "B",
        "explanation": "26 = 2 × 13 and 91 = 7 × 13, so their HCF is 13 and their LCM is 2 × 7 × 13 = 182. As a check, 13 × 182 = 26 × 91.",
    },
    {
        "id": "rn-07", "category": "course", "prompt": "How many positive divisors does 2³ × 3² have?",
        "options": {"A": "5", "B": "6", "C": "12", "D": "18"},
        "correct": "C",
        "explanation": "A divisor can use 2 to any exponent from 0 through 3 (4 choices) and 3 to any exponent from 0 through 2 (3 choices). The total is 4 × 3 = 12.",
    },
    {
        "id": "rn-08", "category": "course", "prompt": "In the standard contradiction proof that √5 is irrational, suppose √5 = p/q in lowest terms. Which conclusion gives the contradiction?",
        "options": {"A": "5 divides p, so 5 also divides q", "B": "5 divides q, so 5 also divides p", "C": "p and q must both be even", "D": "p² = q²"},
        "correct": "A",
        "explanation": "Squaring gives p² = 5q², so 5 divides p² and therefore the prime 5 divides p. Write p = 5k; substitution gives q² = 5k², so 5 divides q too. That contradicts p/q being in lowest terms.",
    },
    {
        "id": "rn-09", "category": "course", "prompt": "What kind of decimal expansion does 7/75 have?",
        "options": {"A": "Terminating", "B": "Non-terminating and non-recurring", "C": "Non-terminating and recurring", "D": "An integer"},
        "correct": "C",
        "explanation": "75 = 3 × 5², and 7/75 is already in lowest terms. A reduced rational number has a terminating decimal only when its denominator has prime factors 2 and/or 5. The factor 3 means this decimal is non-terminating and recurring.",
    },
    {
        "id": "rn-10", "category": "course", "prompt": "What is the greatest integer k for which 12ᵏ divides 2⁴ × 3³ × 5²?",
        "options": {"A": "1", "B": "2", "C": "3", "D": "4"},
        "correct": "B",
        "explanation": "Since 12 = 2² × 3, 12ᵏ = 2²ᵏ × 3ᵏ. The available exponents require 2k ≤ 4 and k ≤ 3, so k ≤ 2. Thus the greatest possible k is 2.",
    },
    {
        "id": "rn-11", "category": "olympiad", "prompt": "Which statement about the product of irrational numbers is demonstrated by √2 × √8?",
        "options": {"A": "It is irrational because both factors are irrational", "B": "It is rational because the product equals 4", "C": "It is irrational because the product equals 2√2", "D": "It cannot be simplified"},
        "correct": "B",
        "explanation": "√8 = 2√2, so √2 × √8 = 2(√2 × √2) = 2 × 2 = 4. This example shows that the product of two irrational numbers can be rational; it does not claim every such product is rational.",
    },
    {
        "id": "rn-12", "category": "olympiad", "prompt": "Exactly one of these expressions is rational. Which one?",
        "options": {"A": "√2 + √3", "B": "√8 − √2", "C": "√12 / √3", "D": "√18 + √2"},
        "correct": "C",
        "explanation": "√12 / √3 = √(12/3) = √4 = 2, which is rational. √8 − √2 = √2, and √18 + √2 = 4√2, both irrational. If √2 + √3 were rational, its square, 5 + 2√6, would be rational, forcing √6 to be rational; that is impossible. So C is the only rational expression.",
    },
    {
        "id": "rn-13", "category": "olympiad", "prompt": "What is the least positive integer m such that 540m is a perfect square?",
        "options": {"A": "3", "B": "5", "C": "15", "D": "30"},
        "correct": "C",
        "explanation": "Prime factorise 540 = 2² × 3³ × 5. For a perfect square every prime exponent must be even. Multiplying by 3 × 5 gives 540 × 15 = 2² × 3⁴ × 5² = 90². Both odd exponents are repaired, so 15 is the least multiplier.",
    },
    {
        "id": "rn-14", "category": "olympiad", "prompt": "If positive integers a and b are coprime and ab is a perfect square, what must be true?",
        "options": {"A": "Both a and b are perfect squares", "B": "Exactly one of a and b is a perfect square", "C": "Their sum is a perfect square", "D": "Their HCF is greater than 1"},
        "correct": "A",
        "explanation": "In the prime factorisation of a perfect square, every exponent is even. Because a and b are coprime, no prime factor occurs in both. Each prime's full exponent in ab therefore belongs to just one of a or b, and must be even there. Thus each of a and b is itself a square.",
    },
    {
        "id": "rn-15", "category": "olympiad", "prompt": "If n is odd, why is n² − 1 always divisible by 8?",
        "options": {"A": "n − 1 and n + 1 are consecutive even numbers, one divisible by 4", "B": "Every odd square is divisible by 8", "C": "n² is always a multiple of 8", "D": "Both n − 1 and n + 1 are divisible by 4"},
        "correct": "A",
        "explanation": "Factor n² − 1 = (n − 1)(n + 1). These are even numbers that differ by 2. One is divisible by 4 and the other by 2, so their product is divisible by 8. For example, 3² itself is not divisible by 8; the difference 3² − 1 is.",
    },
    {
        "id": "rn-16", "category": "olympiad", "prompt": "Which terminating decimal lies strictly between √2 and √3?",
        "options": {"A": "1.4", "B": "1.5", "C": "1.75", "D": "2.0"},
        "correct": "B",
        "explanation": "All values are positive, so compare squares: 1.4² = 1.96 < 2, while 1.5² = 2.25 is between 2 and 3. Also 1.75² = 3.0625 > 3 and 2² = 4. Therefore only 1.5 lies strictly between √2 and √3.",
    },
    {
        "id": "rn-17", "category": "olympiad", "prompt": "Rationalise the denominator of 1/(√5 − √3). What is the result?",
        "options": {"A": "(√5 − √3)/2", "B": "(√5 + √3)/2", "C": "√5 + √3", "D": "1/2"},
        "correct": "B",
        "explanation": "Multiply numerator and denominator by the conjugate √5 + √3. The denominator becomes (√5)² − (√3)² = 5 − 3 = 2, and the numerator is √5 + √3. The result is (√5 + √3)/2.",
    },
    {
        "id": "rn-18", "category": "olympiad", "prompt": "For every prime n greater than 3, which is the largest listed number guaranteed to divide n² − 1?",
        "options": {"A": "12", "B": "18", "C": "24", "D": "48"},
        "correct": "C",
        "explanation": "A prime greater than 3 is odd and is not divisible by 3. Thus n² − 1 is divisible by 8: write it as (n − 1)(n + 1), whose even factors differ by 2. Also n² ≡ 1 (mod 3), so 3 divides n² − 1. Since 8 and 3 are coprime, their product 24 divides it. 48 does not always divide it; for n = 5, n² − 1 = 24.",
    },
    {
        "id": "rn-19", "category": "olympiad", "prompt": "Find the HCF of 2⁵ × 3² and 2³ × 3⁴ without expanding the numbers.",
        "options": {"A": "2³ × 3² = 72", "B": "2⁵ × 3⁴", "C": "2² × 3² = 36", "D": "2³ × 3⁴ = 648"},
        "correct": "A",
        "explanation": "For the HCF, take the smaller exponent of each shared prime: min(5, 3) = 3 for 2 and min(2, 4) = 2 for 3. Thus the HCF is 2³ × 3² = 8 × 9 = 72.",
    },
    {
        "id": "rn-20", "category": "olympiad", "prompt": "Let x = 0.(27) and y = 0.(72), where the parentheses mark the repeating two-digit block. What is x + y?",
        "options": {"A": "1", "B": "11/9", "C": "99/100", "D": "1/11"},
        "correct": "A",
        "explanation": "A two-digit repeating decimal gives x = 27/99 and y = 72/99. Therefore x + y = 99/99 = 1. Equivalently, the repeating blocks add to 99 hundredths per cycle, which is exactly 1 overall.",
    },
)


def public_question(index: int) -> dict[str, object]:
    """Return only content safe to show before submission."""
    question = QUESTIONS[index]
    return {
        "index": index,
        "id": question["id"],
        "category": question["category"],
        "prompt": question["prompt"],
        "options": question["options"],
    }

