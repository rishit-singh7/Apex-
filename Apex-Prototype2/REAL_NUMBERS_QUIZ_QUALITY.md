# Real Numbers quiz: question-quality report

## Scope and distribution

The quiz contains exactly 20 four-option questions: Q1–Q10 are course-based and Q11–Q20 are Olympiad reasoning questions. The questions stay within real-number topics: prime factorisation and the Fundamental Theorem of Arithmetic, HCF/LCM, rational and irrational numbers, decimal expansions, radicals, and divisibility reasoning. The 2026–27 CBSE Class X syllabus names the Fundamental Theorem of Arithmetic and proofs of irrationality of √2, √3, and √5 under Real Numbers, with competencies including real-number properties, radical powers, and applying prime factorisation. The SOF Class 10 IMO syllabus includes Real Numbers and a higher-order-thinking section based on its mathematics syllabus.

Sources: [CBSE Class X Mathematics curriculum 2026–27](https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1X_2026-27.pdf) and [SOF IMO Class 10 syllabus](https://sofworld.org/imo/class-10/imo-syllabus/imo-syllabus-class-10).

## Independent answer and explanation checks

Each answer below was checked independently from the item’s answer key. The accompanying solution states the same calculation or theorem used for that check. `test_real_numbers_quiz.py` also compares the full answer key against a separately written expected-answer map and verifies four distinct options and the 10 + 10 distribution.

| # | Type | Answer | Independent check |
|---:|---|:---:|---|
| 1 | Course | B | 360 ÷ 2³ = 45 = 3² × 5; so 360 = 2³ × 3² × 5. |
| 2 | Course | B | 72 = 2³·3² and 120 = 2³·3·5; min exponents give HCF 24, max exponents give LCM 360. |
| 3 | Course | C | A = 16, B = 6/5, D = 1/8 are rational; C contains nonzero 3√2 plus 7 and is irrational. |
| 4 | Course | A | Reduced denominator 40 has only 2 and 5; 90, 75, and 84 contain 3 or 7, so only 7/40 terminates. |
| 5 | Course | D | 6ⁿ ends in 6 for every positive n; adding 2 gives units digit 8. |
| 6 | Course | B | 26 = 2·13 and 91 = 7·13; HCF 13 and LCM 2·7·13 = 182. |
| 7 | Course | C | Divisor count is (3 + 1)(2 + 1) = 12. |
| 8 | Course | A | From p² = 5q², 5|p; writing p=5k yields q²=5k², so 5|q too, contradicting lowest terms. |
| 9 | Course | C | 7/75 is reduced and 75 = 3·5²; the denominator has a prime other than 2 or 5, so the decimal recurs without terminating. |
| 10 | Course | B | 12ᵏ contributes 2²ᵏ·3ᵏ; bounds are 2k≤4 and k≤3, so the largest k is 2. |
| 11 | Olympiad | B | √2·√8 = √2·2√2 = 4, a rational product of two irrational numbers. |
| 12 | Olympiad | C | √12/√3 = √4 = 2; the other choices reduce to √2+√3, √2, and 4√2, all irrational. |
| 13 | Olympiad | C | 540 = 2²·3³·5; multiplying by 15 gives 2²·3⁴·5² = 90². Both odd exponents are repaired with the least factor. |
| 14 | Olympiad | A | Coprimality keeps each prime in ab wholly in one factor; since exponents in a square are even, each factor has only even exponents. |
| 15 | Olympiad | A | n²−1=(n−1)(n+1); for odd n these are even and differ by 2, so one is divisible by 4 and the other by 2. |
| 16 | Olympiad | B | 1.4²=1.96<2<2.25=1.5²<3; 1.75² and 2² exceed 3. |
| 17 | Olympiad | B | Multiplying by the conjugate yields (√5+√3)/(5−3) = (√5+√3)/2. |
| 18 | Olympiad | C | A prime n>3 is odd and not divisible by 3; n²−1 is divisible by 8 and 3, hence 24. n=5 gives 24, so 48 is not guaranteed. |
| 19 | Olympiad | A | HCF uses minimum prime exponents: 2³·3² = 72. |
| 20 | Olympiad | A | 0.(27)=27/99 and 0.(72)=72/99; their sum is 99/99 = 1. |

## Ambiguity and explanation review

- Each item has four distinct options and one key. Q12 names that exactly one option is rational; Q18 asks for the largest listed guaranteed divisor to avoid also accepting 12; Q20 defines the repeating-decimal notation.
- The explanations justify the keyed option and identify why the relevant alternatives fail where that distinction is essential. In particular, Q11 says the example demonstrates that an irrational-by-irrational product *can* be rational, not that every such product is rational.
- Unanswered items are counted separately from incorrect attempted answers. Results return explanations only after the server changes the attempt to `submitted`.

## XP rule

Each submitted attempt awards `10 + (2 × number correct)` XP, from 10 XP for a submitted attempt with no correct answers to 50 XP for 20 correct answers. A unique `xp_transactions.attempt_id` prevents a second award for the same attempt. XP is stored in the backend only and is not returned by the results API or displayed by the frontend.
