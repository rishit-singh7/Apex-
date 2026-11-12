# Quadratic Equations quiz quality report

## Scope and balance

The question bank contains exactly 10 multiple-choice questions: 5 course questions and 5 Olympiad questions. Each has four options, a single verified key, and a worked explanation. Coverage includes standard form and coefficients, factorisation, the quadratic formula, discriminant and real-root count, a contextual area model, equal-root parameters, root–coefficient relationships, constructing an equation from root constraints, reciprocal-root reasoning, and completing the square.

The course items align with Class X quadratic-equation methods and real-root analysis. Completing the square is used as an enrichment insight, consistent with the chapter's distinction between the NCERT derivation and the current CBSE routine solving methods. References: [CBSE Class X Mathematics curriculum 2026–27](https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1X_2026-27.pdf), [NCERT Class X Mathematics, Quadratic Equations](https://ncert.nic.in/textbook/pdf/jemh104.pdf), and [SOF IMO Class 10 syllabus](https://sofworld.org/imo/class-10/imo-syllabus/imo-syllabus-class-10).

## Independent answer checks

| # | Type | Independent verification | Distractor check | Key |
|---|---|---|---|---|
| 1 | Course | Expand and move all terms left: `3x(2x−1)=4` becomes `6x²−3x−4=0`; coefficients are `(6,−3,−4)`. | B changes the sign of `b`; C leaves 4 on the wrong side; D fails to multiply through by 3. | A |
| 2 | Course | `x²−x−12=(x−4)(x+3)`; roots are `4` and `−3`, and each gives zero on substitution. | B and D have incorrect signs; C's pair has product −12 but sum 4, not 1. | A |
| 3 | Course | `D=25`; formula yields `(3±5)/4`, hence roots `2` and `−1/2`. | B flips both signs; C and D do not satisfy the original equation on substitution. | A |
| 4 | Course | `D=2²−4·3·1=−8<0`, so there are no real roots. | A assumes positive discriminant; B assumes zero; D is impossible for a non-zero quadratic. | C |
| 5 | Course | `x(x+3)=40` gives `(x+8)(x−5)=0`; only positive width is `5 m`, with length `8 m`. | A, C and D do not satisfy `x(x+3)=40` as positive widths; C is the length, not width. | B |
| 6 | Olympiad | `D=(k+2)²−8k=(k−2)²`; equality requires `k=2`, producing `(x−2)²=0`. | At −2, 0 and 4 the square is positive, so the roots are distinct rather than equal. | C |
| 7 | Olympiad | `D=(k−3)²−16>0` requires `|k−3|>4`, hence `k<−1` or `k>7`; the endpoints give equal roots and values between give no real roots. | A gives negative discriminant; C gives zero; D includes all three possible discriminant signs. | B |
| 8 | Olympiad | Positive factor pairs of 18 with difference 3 are `3,6`; their sum is 9, giving `x²−9x+18=0`. | B has negative roots; C's roots have sum 3 and product −18; D has sum 18 and product 3. | A |
| 9 | Olympiad | `αβ=1` implies `1/α=β`; therefore `α²+1/α²=α²+β²=4²−2=14`. Roots are non-zero because their product is 1. | 10, 12 and 16 do not equal the identity result `S²−2P=16−2`. | C |
| 10 | Olympiad | `x²−6x+13=(x−3)²+4`; the minimum is 4 at `x=3`. The discriminant is also `−16`, consistent with the expression always positive. | −4 and 0 are below the square-based lower bound; 3 is the minimizing input, not the minimum value. | D |

## Shared quiz safeguards

- The bank and keys are server-side. In-progress state returns only the current question and options; results and explanations require a submitted attempt.
- Each attempt stores its own question snapshot and answers in the existing `quiz_attempts` table.
- Timers use the existing Polynomials values: 20 minutes overall and 120 seconds per question; the backend enforces expiry and automatic submission.
- XP uses the shared reward formula (`10 + 2 × correct answers`) and the existing unique attempt transaction to prevent duplicates. The frontend does not display XP.
- Quiz Progress summaries use submitted attempt rows for the authenticated learner; no dummy progress values are generated.
