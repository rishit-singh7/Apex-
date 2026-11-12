# Polynomials quiz question quality report

## Scope and structure

The bank contains 10 fixed questions: 5 course questions and 5 Olympiad reasoning questions. Each question has four distinct options and one key. The server saves the full prompt, options, key, category and explanation in each attempt snapshot. Current attempt responses expose only the active prompt and options; keys and explanations are returned by the results endpoint only after the attempt is submitted.

The course items cover polynomial degree, finding zeroes by factorisation, forming a monic quadratic from zeroes, the zero condition, and reading zeroes from a graph. Olympiad questions use coefficient relationships and symmetric identities. The Class 10 CBSE chapter scope includes zeroes and their relationship to coefficients; the course items stay within that scope, with degree and elementary factoring used as foundational skills. The extension items stay within quadratic zero/coefficient reasoning. References: [CBSE Class X Mathematics curriculum, 2026–27](https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1X_2026-27.pdf) and [SOF IMO Class 10 syllabus](https://sofworld.org/imo/class-10/imo-syllabus/imo-syllabus-class-10).

## Independent answer check

| # | Type | Independent check | Verified answer |
|---|---|---|---|
| 1 | Course | The non-zero terms have exponents 4, 2 and 0; the largest exponent is 4. | C — 4 |
| 2 | Course | `x² − 5x + 6 = (x − 2)(x − 3)`; substitution confirms both roots. The other listed pairs do not make both factors zero. | B — 2 and 3 |
| 3 | Course | `(x − 2)(x + 3) = x² + x − 6`; its roots are exactly 2 and −3 and its leading coefficient is 1. | A — `x² + x − 6` |
| 4 | Course | Setting `p(2)=0` gives `4 + 2k − 6 = 0`, hence `k=1`. | C — 1 |
| 5 | Course | A zero is an x-coordinate where `p(x)=0`, i.e. where the graph meets the x-axis. Those coordinates are −2 and 3. | A — −2 and 3 |
| 6 | Olympiad | Sum `α+β=5/2`; product `αβ=1`; thus `α²+β²=(α+β)²−2αβ=25/4−2=17/4`. | C — `17/4` |
| 7 | Olympiad | Expand: `(α−1)(β−1)=αβ−(α+β)+1=1−4+1=−2`. | A — −2 |
| 8 | Olympiad | Put roots `r` and `2r`. Their sum gives `3r=−3`, so roots are −1 and −2, with product 2. The monic polynomial is `x²+3x+2=(x+1)(x+2)`. | A — `x² + 3x + 2` |
| 9 | Olympiad | For `x²−3x+1`, sum is 3 and product is 1. `α³+β³=(α+β)³−3αβ(α+β)=27−9=18`. | B — 18 |
| 10 | Olympiad | For `x²−3x+c`, root product is `c`. Reciprocal roots have product 1, so `c=1`. Discriminant is 5, so the roots are real and non-zero; they are reciprocals. | C — 1 |

## Ambiguity and explanation review

- Each question has exactly one option matching the calculation or definition. Distractors vary sign, coefficient relationship or common misconception; none duplicates the keyed value.
- Question 10 uses a monic quadratic with positive discriminant, avoiding a hidden assumption about non-real roots. Its real roots have product 1, and neither root is zero, so they are reciprocals.
- The question 8 explanation identifies the roots as `r` and `2r` without calling either the smaller root, because both roots are negative.
- All explanations are stored server-side and give the concept or identity, reasoning steps and answer check. They are available for correct, incorrect and unanswered items after submission.
- The quiz uses the shared XP formula `10 + 2 × correct answers`; no XP value is sent to the quiz frontend. The attempt ID uniqueness rule prevents duplicate transactions.
