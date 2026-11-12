# Real Numbers quiz v2: question-quality report

## Distribution and scope

Each new attempt has exactly 10 questions: Q1–Q5 are course-based and Q6–Q10 are Olympiad reasoning. The set covers unique prime factorisation, HCF/LCM, rational and irrational expressions, the contradiction proof for √5, divisibility through prime exponents, radical simplification, perfect-square factorisation, coprime factors, parity, and divisibility by 24.

This scope follows the [CBSE Class X Mathematics curriculum 2026–27](https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1X_2026-27.pdf), which lists the Fundamental Theorem of Arithmetic and irrationality proofs for √2, √3, and √5 under Real Numbers, and the [SOF IMO Class 10 syllabus](https://sofworld.org/imo/class-10/imo-syllabus-class-10), which includes Real Numbers and higher-order-thinking questions.

## Independent answer and solution checks

The answer key was checked separately from the bank and is asserted by a separate expected-answer map in test_real_numbers_quiz.py. The calculation or proof below also checks that each explanation supports its answer and that the distractors do not produce a second correct choice.

| # | Type | Answer | Independent check |
|---:|---|:---:|---|
| 1 | Course | B | Repeated division gives 360 = 2³ × 45 = 2³ × 3² × 5. |
| 2 | Course | B | 72 = 2³·3² and 120 = 2³·3·5; minimum exponents give HCF 24, maximum exponents give LCM 360. |
| 3 | Course | C | A = 16, B = 6/5, and D = 1/8 are rational. 7 + 3√2 is irrational because √2 is irrational and 3 is non-zero. |
| 4 | Course | A | From p²=5q², 5|p; substituting p=5k gives q²=5k², so 5|q too, contradicting lowest terms. |
| 5 | Course | B | 12ᵏ = 2²ᵏ·3ᵏ; 2²ᵏ must divide 2⁴, so k≤2. k=2 also satisfies the exponent-of-3 bound. |
| 6 | Olympiad | C | B simplifies to √2 and D to 4√2. If √2+√3 were rational, squaring would make √6 rational, a contradiction. C simplifies to 2. |
| 7 | Olympiad | C | 540=2²·3³·5; the odd exponents require one extra factor 3 and one factor 5. The least multiplier is 15, giving 90². |
| 8 | Olympiad | A | Coprimality means each prime in ab belongs to only one factor. Since ab is square, all those exponents are even, so a and b are each squares. |
| 9 | Olympiad | A | n²−1=(n−1)(n+1); for odd n, one even factor is divisible by 4 and the other by 2, giving a product divisible by 8. |
| 10 | Olympiad | C | Prime n>3 is odd and not divisible by 3. Thus 8 and 3 both divide n²−1; since coprime, 24 divides it. n=5 rules out 48 as guaranteed. |

## Explanation and answer-review checks

- Course solutions explain the underlying concept and show the factorisation or proof step by step. Olympiad solutions make the key insight explicit, including radical reasoning, exponent parity, coprimality, and factoring a difference of squares.
- All 10 items have four distinct options and one correct answer.
- After submission, the review includes the exact prompt, all four options, the learner's selected option, the correct option, correctness status, and the complete saved explanation.
- New attempts persist a server-created snapshot of the question bank. The prior 20-question bank remains versioned for attempts created before this update.
- Correct answers and explanations remain absent from in-progress API responses.

## Timer and reward behavior

New attempts use a 20-minute overall timer and 120 seconds per question, both ON. XP continues to use the existing rule: 10 + (2 × correct answers), so current attempts award 10–30 XP. The backend records one XP transaction per attempt and does not send XP to the frontend.
