"""Server-only Class 10 Pair of Linear Equations quiz question bank."""

QUIZ_ID = "linear-equations-class-10-v1"
QUESTION_COUNT = 10
COURSE_COUNT = 5
OLYMPIAD_COUNT = 5
OVERALL_TIMER_SECONDS = 20 * 60
QUESTION_TIMER_SECONDS = 120

QUESTIONS = (
    {
        "id": "linear-v1-01",
        "category": "course",
        "prompt": "Solve the pair 2x + y = 13 and x − y = 2. Which ordered pair (x, y) satisfies both equations?",
        "options": {"A": "(5, 3)", "B": "(3, 5)", "C": "(4, 5)", "D": "(6, 1)"},
        "correct": "A",
        "explanation": (
            "Use substitution. From x − y = 2, isolate x to get x = y + 2. Substitute this into the first equation: 2(y + 2) + y = 13. Expanding gives 3y + 4 = 13, so 3y = 9 and y = 3. Then x = y + 2 = 5. Check both original equations: 2(5) + 3 = 13 and 5 − 3 = 2. Thus (x, y) = (5, 3), option A."
        ),
    },
    {
        "id": "linear-v1-02",
        "category": "course",
        "prompt": "How many solutions does the pair 3x − 2y = 4 and 6x − 4y = 11 have?",
        "options": {"A": "Exactly one", "B": "None", "C": "Infinitely many", "D": "Exactly two"},
        "correct": "B",
        "explanation": (
            "Compare the equations. Doubling 3x − 2y = 4 gives 6x − 4y = 8, but the second equation requires 6x − 4y = 11. The same left-hand expression cannot equal both 8 and 11, so no ordered pair satisfies both equations. Geometrically, the two lines have proportional x- and y-coefficients but different constants, so they are distinct parallel lines. The pair is inconsistent and has no solution: option B."
        ),
    },
    {
        "id": "linear-v1-03",
        "category": "course",
        "prompt": "The graphs of x + y = 5 and x − y = 1 intersect at which point?",
        "options": {"A": "(2, 3)", "B": "(3, 2)", "C": "(4, 1)", "D": "(1, 4)"},
        "correct": "B",
        "explanation": (
            "The intersection must lie on both lines, so its coordinates must satisfy both equations. Add x + y = 5 and x − y = 1 to eliminate y: 2x = 6, hence x = 3. Substitute into x + y = 5 to get y = 2. Check: 3 + 2 = 5 and 3 − 2 = 1. Therefore the lines meet at (3, 2), option B. On a graph, this intersection point is the common solution of the pair."
        ),
    },
    {
        "id": "linear-v1-04",
        "category": "course",
        "prompt": "One adult ticket and two child tickets cost ₹260. Two adult tickets and one child ticket cost ₹310. What is the price of one child ticket?",
        "options": {"A": "₹60", "B": "₹70", "C": "₹80", "D": "₹90"},
        "correct": "B",
        "explanation": (
            "Let a be the adult-ticket price and c the child-ticket price. The statements give a + 2c = 260 and 2a + c = 310. Double the first equation: 2a + 4c = 520. Subtract the second equation to eliminate a: 3c = 210, so c = 70. Then a = 260 − 2(70) = 120. Check the totals: 120 + 140 = 260 and 240 + 70 = 310. The child ticket costs ₹70, option B."
        ),
    },
    {
        "id": "linear-v1-05",
        "category": "course",
        "prompt": "What is the number of solutions of 4x + 6y = 18 and 2x + 3y = 9?",
        "options": {"A": "No solution", "B": "Exactly one solution", "C": "Infinitely many solutions", "D": "Exactly two solutions"},
        "correct": "C",
        "explanation": (
            "Divide the first equation by 2: it becomes 2x + 3y = 9, exactly the second equation. Both equations therefore describe the same line, rather than two different lines. Every point on that line satisfies both equations, so the pair has infinitely many solutions. Equivalently, the coefficient and constant ratios are all equal: 4/2 = 6/3 = 18/9 = 2. Option C is correct."
        ),
    },
    {
        "id": "linear-v1-06",
        "category": "olympiad",
        "prompt": "Numbers p and q satisfy p + q = 12 and p − q = 4. Without finding p and q separately, what is p² − q²?",
        "options": {"A": "16", "B": "32", "C": "48", "D": "64"},
        "correct": "C",
        "explanation": (
            "Look for an identity that uses the two expressions already given. The difference of squares factors as p² − q² = (p + q)(p − q). Substitute the known sum and difference: 12 × 4 = 48. This is more efficient than solving for p and q first; indeed, those values would be 8 and 4 and their squares differ by 64 − 16 = 48. Therefore option C is correct."
        ),
    },
    {
        "id": "linear-v1-07",
        "category": "olympiad",
        "prompt": "For which value of k does the pair kx + 2y = 5 and 3x + 6y = 10 have no solution?",
        "options": {"A": "k = 0", "B": "k = 1", "C": "k = 2", "D": "k = 3"},
        "correct": "B",
        "explanation": (
            "For no solution, the two lines must be parallel but distinct. Their y-coefficients have ratio 2/6 = 1/3. Make the x-coefficient ratio match it: k/3 = 1/3, giving k = 1. With k = 1, the equations are x + 2y = 5 and 3x + 6y = 10. Dividing the second equation by 3 gives x + 2y = 10/3, which contradicts x + 2y = 5. Thus the lines are parallel and different, so there is no solution. For any k other than 1, the coefficient determinant 6k − 6 is non-zero and the pair has one solution. Option B is uniquely correct."
        ),
    },
    {
        "id": "linear-v1-08",
        "category": "olympiad",
        "prompt": "A pair of equations is 3x + 2y = 16 and 2x + 3y = 14. What is the product xy?",
        "options": {"A": "6", "B": "8", "C": "10", "D": "12"},
        "correct": "B",
        "explanation": (
            "Use the symmetry in the coefficients. Add the equations to obtain 5x + 5y = 30, so x + y = 6. Subtract the second equation from the first: x − y = 2. Adding these simpler relations gives 2x = 8, so x = 4; then y = 2. The requested product is xy = 4 × 2 = 8. Check in the original pair: 3(4) + 2(2) = 16 and 2(4) + 3(2) = 14. Option B is correct."
        ),
    },
    {
        "id": "linear-v1-09",
        "category": "olympiad",
        "prompt": "A two-digit number has digits whose sum is 11. Reversing the digits makes a number 27 greater than the original. What is the original number?",
        "options": {"A": "38", "B": "47", "C": "56", "D": "65"},
        "correct": "B",
        "explanation": (
            "Let t be the tens digit and u the units digit. The digit sum gives t + u = 11. The original number is 10t + u and the reversed number is 10u + t. Their difference is 27, so (10u + t) − (10t + u) = 27, which simplifies to 9(u − t) = 27 and u − t = 3. Add this to t + u = 11: 2u = 14, hence u = 7 and t = 4. The original number is 10(4) + 7 = 47. Check: 74 − 47 = 27. Option B is correct."
        ),
    },
    {
        "id": "linear-v1-10",
        "category": "olympiad",
        "prompt": "Can positive integers x and y satisfy both x + y = 7 and 7x + 11y = 59?",
        "options": {"A": "Yes; (x, y) = (4, 3)", "B": "Yes; (x, y) = (3, 4)", "C": "Yes; there are infinitely many pairs", "D": "No; there is no integer pair"},
        "correct": "D",
        "explanation": (
            "Use x + y = 7 to eliminate x from the weighted equation. Multiply the sum equation by 7: 7x + 7y = 49. Subtract it from 7x + 11y = 59 to get 4y = 10, so y = 5/2. This is not an integer, so no positive-integer pair can satisfy both conditions. The pair does have a unique real solution: y = 5/2 and x = 7 − 5/2 = 9/2, which confirms that the issue is the integer restriction, not inconsistency over the real numbers. Option D is correct."
        ),
    },
)
