# Arithmetic Progressions quiz quality report

## Coverage and balance

The server-only bank has exactly 10 questions: 5 course-based and 5 Olympiad-level, each with four distinct options, one key and a worked explanation. Topics include AP identification, negative and zero differences, fractional terms, the nth-term formula, finite-term counting, both sum formulae, a row-seating application, unknown AP parameters, symmetric consecutive terms, selected-position sums, a condition involving both `aₙ` and `Sₙ`, and the sum of consecutive odd numbers.

The course questions follow the Class X AP content in the existing Apex chapter and [NCERT Class X Mathematics, Arithmetic Progressions](https://ncert.nic.in/textbook/pdf/jemh105.pdf). The chapter page also references the [CBSE Class X Mathematics curriculum, 2026–27](https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1X_2026-27.pdf) and [SOF IMO Class 10 syllabus](https://sofworld.org/imo/class-10/imo-syllabus/imo-syllabus-class-10).

## Independent answer and option checks

| # | Type | Independent verification | Distractor check | Key |
|---|---|---|---|---|
| 1 | Course | Option A differences are all `−4`; the first term is 7. | B's differences are not constant; C's differences change; D misidentifies the first term. | A |
| 2 | Course | Every consecutive difference is `2.5−2.5=0`; a constant sequence is an AP. | 2.5 and 1 are not consecutive differences; zero difference does not invalidate an AP. | C |
| 3 | Course | `a₉=3/2+8(−1/2)=−5/2`. | The incorrect choices reflect step-count or sign errors and do not equal the formula result. | A |
| 4 | Course | `−25=47+(n−1)(−4)` gives `n=19`. | 18 is the number of steps; 20 and 21 do not end at −25. | B |
| 5 | Course | Last row `18+11·2=40`; total `12/2(18+40)=348`. | The remaining options do not match the AP sum; 360 also results from an incorrect average/term count. | B |
| 6 | Olympiad | `a+4d=18`, `a+11d=46` gives `d=4,a=2`; `a₂₀=2+19·4=78`. | 74, 76 and 82 use incorrect step counts or parameters. | C |
| 7 | Olympiad | Let the terms be `7−d,7,7+d`; product gives `7(49−d²)=315`, so `d²=4`. Increasing order selects `d=2`. | 1, 3 and 4 fail the product condition; `d=−2` is excluded by the stated increasing order. | B |
| 8 | Olympiad | Odd positions give 10 terms `3,11,…,75`; sum `10/2(3+75)=390`. | 380, 399 and 418 result from a wrong count, endpoint or selected-term spacing. | B |
| 9 | Olympiad | `Sₙ=n(n+1)/2` and `aₙ=n`; `Sₙ=3aₙ` with positive n gives `n=5`. | The algebraic root 0 is excluded because the prompt requires positive n; 3, 6 and 9 fail the equality. | B |
| 10 | Olympiad | For the AP of odd integers, `a=1,d=2`; `a₂₅=49`, so `S₂₅=25/2(1+49)=625`. | 575, 600 and 650 do not match the formula; pairing endpoints gives average 25 and total 625. | C |

## Shared quiz safeguards

- The question bank and keys stay on the server. In-progress state exposes only question text and options; the results endpoint returns a 409 until the attempt is submitted.
- Each attempt stores its question/option snapshot and answers in the existing `quiz_attempts` table so historical reviews remain exact.
- Timers copy Polynomials: 20 minutes overall and 120 seconds per question, both enabled and enforced by the shared server-side clock.
- Scoring and XP use the existing shared finalization handler (`10 + 2 × correct answers`); a unique XP transaction per attempt prevents duplicate rewards. XP stays hidden in the frontend.
- The Quiz Progress API includes submitted AP attempts for the authenticated account and summarizes saved scores/accuracy; it returns no synthetic statistics.
