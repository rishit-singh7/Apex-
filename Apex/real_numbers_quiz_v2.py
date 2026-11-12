"""Version 2 of the server-only Class 10 Real Numbers quiz bank."""

QUIZ_ID = "real-numbers-class-10-v2"
QUESTION_COUNT = 10
COURSE_COUNT = 5
OLYMPIAD_COUNT = 5
OVERALL_TIMER_SECONDS = 20 * 60
QUESTION_TIMER_SECONDS = 120

QUESTIONS = (
    {
        "id": "rn-v2-01", "category": "course",
        "prompt": "Write 360 as a product of prime powers.",
        "options": {"A": "2² × 3² × 5", "B": "2³ × 3² × 5", "C": "2³ × 3 × 5²", "D": "2² × 3³ × 5"},
        "correct": "B",
        "explanation": (
            "The Fundamental Theorem of Arithmetic says every integer greater than 1 has a unique prime factorisation, apart from the order of its factors. Divide 360 by 2 repeatedly: 360 = 2 × 180 = 2² × 90 = 2³ × 45. Then factor 45 = 3² × 5. Therefore 360 = 2³ × 3² × 5, which is option B. The exponents 3, 2 and 1 show how many times each prime occurs."
        ),
    },
    {
        "id": "rn-v2-02", "category": "course",
        "prompt": "What are the HCF and LCM of 72 and 120, in that order?",
        "options": {"A": "12 and 360", "B": "24 and 360", "C": "24 and 720", "D": "48 and 180"},
        "correct": "B",
        "explanation": (
            "First write both numbers as prime powers: 72 = 2³ × 3² and 120 = 2³ × 3 × 5. For the HCF, use each shared prime with the smaller exponent: 2³ × 3 = 24. For the LCM, use every prime that appears with the larger exponent: 2³ × 3² × 5 = 360. So the ordered pair is 24 and 360 (option B). A useful check is HCF × LCM = 24 × 360 = 72 × 120."
        ),
    },
    {
        "id": "rn-v2-03", "category": "course",
        "prompt": "Which expression is irrational?",
        "options": {"A": "√49 + √81", "B": "√(36/25)", "C": "7 + 3√2", "D": "0.125"},
        "correct": "C",
        "explanation": (
            "A rational number can be written as a ratio of integers; an irrational number cannot. Check the options: A = 7 + 9 = 16, B = 6/5, and D = 1/8, so all three are rational. √2 is irrational, so multiplying it by the non-zero rational number 3 remains irrational; adding the rational number 7 cannot make it rational. Thus 7 + 3√2 (option C) is the only irrational expression."
        ),
    },
    {
        "id": "rn-v2-04", "category": "course",
        "prompt": "In the standard contradiction proof that √5 is irrational, suppose √5 = p/q in lowest terms. Which conclusion gives the contradiction?",
        "options": {"A": "5 divides p, so 5 also divides q", "B": "5 divides q, so 5 also divides p", "C": "p and q must both be even", "D": "p² = q²"},
        "correct": "A",
        "explanation": (
            "Assume for contradiction that √5 = p/q, where p and q have no common factor. Squaring gives p² = 5q², so 5 divides p². Because 5 is prime, Euclid’s lemma implies 5 divides p; write p = 5k. Substituting gives 25k² = 5q², hence q² = 5k², so 5 also divides q. Now p and q share the factor 5, contradicting that the fraction was in lowest terms. That is exactly option A, so the original assumption must be false."
        ),
    },
    {
        "id": "rn-v2-05", "category": "course",
        "prompt": "What is the greatest integer k for which 12ᵏ divides 2⁴ × 3³ × 5²?",
        "options": {"A": "1", "B": "2", "C": "3", "D": "4"},
        "correct": "B",
        "explanation": (
            "Use prime exponents instead of expanding the large number. Since 12 = 2² × 3, its kth power is 12ᵏ = 2²ᵏ × 3ᵏ. To divide 2⁴ × 3³ × 5², the exponent of 2 requires 2k ≤ 4, so k ≤ 2; the exponent of 3 requires k ≤ 3. Both conditions must hold, so k can be at most 2. For k = 2, 12² = 2⁴ × 3² does divide the given number, making option B the greatest possible value."
        ),
    },
    {
        "id": "rn-v2-06", "category": "olympiad",
        "prompt": "Exactly one of these expressions is rational. Which one?",
        "options": {"A": "√2 + √3", "B": "√8 − √2", "C": "√12 / √3", "D": "√18 + √2"},
        "correct": "C",
        "explanation": (
            "Simplify each expression before deciding. Option B becomes 2√2 − √2 = √2, and option D becomes 3√2 + √2 = 4√2; both remain irrational. For option A, if r = √2 + √3 were rational, then r² = 5 + 2√6 would be rational, forcing √6 = (r² − 5)/2 to be rational, which is impossible. In option C, √12/√3 = √(12/3) = √4 = 2, a rational number. Therefore C is the only rational expression."
        ),
    },
    {
        "id": "rn-v2-07", "category": "olympiad",
        "prompt": "What is the least positive integer m such that 540m is a perfect square?",
        "options": {"A": "3", "B": "5", "C": "15", "D": "30"},
        "correct": "C",
        "explanation": (
            "A perfect square has an even exponent for every prime in its factorisation. Factor 540 = 54 × 10 = 2² × 3³ × 5. The exponent of 3 and the exponent of 5 are odd, so the multiplier must contribute one more 3 and one more 5. The smallest such multiplier is 3 × 5 = 15, and 540 × 15 = 2² × 3⁴ × 5² = 90². Multipliers 3 or 5 repair only one odd exponent; 15 repairs both with the least product, so option C is correct."
        ),
    },
    {
        "id": "rn-v2-08", "category": "olympiad",
        "prompt": "If positive integers a and b are coprime and ab is a perfect square, what must be true?",
        "options": {"A": "Both a and b are perfect squares", "B": "Exactly one of a and b is a perfect square", "C": "Their sum is a perfect square", "D": "Their HCF is greater than 1"},
        "correct": "A",
        "explanation": (
            "Write a and b as prime factorisations. Coprime means no prime appears in both numbers. Since ab is a square, every prime has an even exponent in the product. Each such exponent therefore comes entirely from a or entirely from b, and must already be even in that factor. This holds for every prime, so both a and b are perfect squares. Option D directly contradicts the given coprimality."
        ),
    },
    {
        "id": "rn-v2-09", "category": "olympiad",
        "prompt": "If n is odd, why is n² − 1 always divisible by 8?",
        "options": {"A": "n − 1 and n + 1 are consecutive even numbers, one divisible by 4", "B": "Every odd square is divisible by 8", "C": "n² is always a multiple of 8", "D": "Both n − 1 and n + 1 are divisible by 4"},
        "correct": "A",
        "explanation": (
            "The useful insight is to factor the difference of squares: n² − 1 = (n − 1)(n + 1). When n is odd, both factors are even, and they are two apart. Of two even numbers two apart, one is divisible by 4 and the other is divisible by 2; their product is therefore divisible by 8. This proves option A. Options B and C confuse the difference n² − 1 with n² itself; for example, 3² = 9 is not divisible by 8, but 3² − 1 = 8 is."
        ),
    },
    {
        "id": "rn-v2-10", "category": "olympiad",
        "prompt": "For every prime n greater than 3, which is the largest listed number guaranteed to divide n² − 1?",
        "options": {"A": "12", "B": "18", "C": "24", "D": "48"},
        "correct": "C",
        "explanation": (
            "A prime n greater than 3 is odd and is not divisible by 3. First, n² − 1 = (n − 1)(n + 1); the two even factors are two apart, so one is divisible by 4 and the other by 2. Thus 8 divides n² − 1. Also, because n is not divisible by 3, its remainder modulo 3 is 1 or 2; either way n² has remainder 1, so 3 divides n² − 1. Since 8 and 3 are coprime, their product 24 divides it. The question asks for the largest guaranteed listed number: 48 is not guaranteed (n = 5 gives 24), so option C is the answer."
        ),
    },
)


def public_question(index: int) -> dict[str, object]:
    """Return only the question content safe to show before submission."""
    question = QUESTIONS[index]
    return {
        "index": index,
        "id": question["id"],
        "category": question["category"],
        "prompt": question["prompt"],
        "options": question["options"],
    }
