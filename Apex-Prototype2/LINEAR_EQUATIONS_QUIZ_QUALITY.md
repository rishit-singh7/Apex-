# Pair of Linear Equations quiz quality report

## Scope and distribution

The quiz contains exactly 10 questions: 5 course questions and 5 Olympiad questions. Each has four distinct options, one unambiguous key and a detailed solution. The bank covers substitution, graphical intersections, no-solution and infinitely-many-solution cases, elimination in a contextual problem, parameter-based consistency, efficient linear combinations, digit modelling, and integer feasibility.

The Class X CBSE 2026–27 curriculum specifies graphical solution, consistency/inconsistency, algebraic conditions on the number of solutions, substitution, elimination, and simple situational problems. Cross-multiplication is not listed in that current Class X scope, so this bank does not make it a required method. Reference: [CBSE Class X Mathematics curriculum, 2026–27](https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1X_2026-27.pdf), Unit II, Pair of Linear Equations in Two Variables.

## Independent answer checks

| # | Type | Independent verification | Key |
|---|---|---|---|
| 1 | Course | Substitute `x=y+2` into `2x+y=13`: `3y+4=13`, so `(x,y)=(5,3)`. Checks: `10+3=13`, `5−3=2`. | A |
| 2 | Course | Doubling the first equation gives `6x−4y=8`, which conflicts with `6x−4y=11`; no common pair exists. | B |
| 3 | Course | Add equations to get `2x=6`; then `x=3,y=2`. Checks: `3+2=5`, `3−2=1`. | B |
| 4 | Course | `a+2c=260`, `2a+c=310`. Double the first and subtract the second: `3c=210`, hence `c=70`; then `a=120`. Both totals check. | B |
| 5 | Course | The first equation is exactly twice the second. They are the same line and therefore have infinitely many common points. | C |
| 6 | Olympiad | Identity `p²−q²=(p+q)(p−q)` gives `12×4=48`. Equivalently, `p=8,q=4` and `64−16=48`. | C |
| 7 | Olympiad | When `k=1`, the equations reduce to `x+2y=5` and `x+2y=10/3`, a contradiction. For `k≠1`, determinant `6(k−1)` is non-zero, so the pair has a unique solution. | B |
| 8 | Olympiad | Add the equations: `x+y=6`. Subtract: `x−y=2`. Thus `(x,y)=(4,2)`; substitution gives 16 and 14, and `xy=8`. | B |
| 9 | Olympiad | Let tens and units digits be `t,u`. Then `t+u=11`; reversal gives `9(u−t)=27`, so `u−t=3`. Hence `t=4,u=7`, original number 47; `74−47=27`. | B |
| 10 | Olympiad | Subtract `7(x+y)=49` from `7x+11y=59`: `4y=10`, so `y=5/2`, not an integer. The unique real pair is `(9/2,5/2)`, so no integer pair exists. | D |

## Review safeguards

- In-progress responses contain only the current prompt and options; answer keys and explanations remain server-side until submission.
- Each attempt stores its question and option snapshot, so later reviews use exactly what the learner saw.
- Both timers use the Polynomials configuration: 20 minutes overall and 120 seconds per question. The backend remains authoritative.
- XP uses the existing shared server-side rule and transaction idempotency; the quiz frontend does not display XP.
