window.apexLinearEquationTopics = [
  {
    id: "fundamentals",
    title: "Linear Equations Fundamentals",
    level: ["Core · Class 10"],
    summary: "Recognise linear equations, their solutions, and the points that lie on a line.",
    intro: "A single equation can describe many possible pairs. A second equation adds another condition, helping us find the pair that satisfies both.",
    sections: [
      {
        title: "What makes an equation linear?",
        paragraphs: [
          "A linear equation in two variables can be written as ax + by = c, where a, b and c are real numbers and a and b are not both zero. The variables x and y have power 1; there is no x², y² or xy term.",
          "For example, 2x + 3y = 6 is linear. So are 4x = 12 (b = 0) and y = −2 (a = 0). In contrast, x² + y = 4, xy = 6 and √x + y = 5 are not linear equations in x and y.",
          "An expression such as x + 2y has no equals sign. Writing x + 2y = 5 makes it an equation, which can be solved."
        ],
        examples: [
          { title: "Read the coefficients in 3x − 2y = 7", steps: ["Compare with ax + by = c.", "Here a = 3, b = −2 and c = 7.", "Both variable terms are to the first power, so the equation is linear."] },
          { title: "Find points on 3x + 2y = 12", steps: ["Choose x = 0: then 2y = 12, so y = 6. This gives (0, 6).", "Choose x = 2: then 6 + 2y = 12, so y = 3. This gives (2, 3).", "Choose y = 0: then 3x = 12, so x = 4. This gives (4, 0).", "Each pair makes the equation true; the points lie on one straight line."] }
        ]
      },
      {
        title: "A solution is an ordered pair",
        paragraphs: [
          "A pair (x, y) is a solution when substituting its values makes the equation true. A single linear equation usually has infinitely many real solutions: choose a value for x, then calculate the matching y (when b ≠ 0).",
          "A pair of equations asks for a point that lies on both lines. That shared point, if there is exactly one, is the solution to the pair."
        ],
        examples: [
          { title: "Check whether (2, 3) solves x + 2y = 8", steps: ["Substitute x = 2 and y = 3.", "The left side is 2 + 2(3) = 8.", "The equation is true, so (2, 3) is a solution."] }
        ]
      }
    ],
    examples: [
      { title: "Check a pair of equations", steps: ["Test (3, 2) in x + y = 5: 3 + 2 = 5.", "Test it in x − y = 1: 3 − 2 = 1.", "It satisfies both equations, so it solves the pair."] }
    ],
    olympiad: "If one equation is known and you are given one solution, substitute it first. Rearranging the equation can reveal a whole family of solutions without testing pairs at random.",
    mistake: "Do not mix up an expression and an equation. Also, a solution is an ordered pair: (2, 3) and (3, 2) are different and must be checked in that order.",
    fact: {
      question: "Can one linear equation in two variables have more than one solution?",
      answer: "Yes. For x + y = 3, the pairs (0, 3), (1, 2), and (4, −1) all work. In fact, a line contains infinitely many points, so the equation has infinitely many real solutions."
    },
    questions: [
      { prompt: "Which is a linear equation in x and y?", options: ["2x + 3y = 7", "x² + y = 7", "xy = 7", "√x + y = 7"], answer: 0, steps: ["In a linear equation, each variable has power 1 and variables are not multiplied together.", "The first equation has only first-power x and y terms.", "The other choices contain x², xy, or √x, so they are not linear equations in x and y."] },
      { prompt: "Which ordered pair satisfies 2x + 3y = 12?", options: ["(0, 4)", "(1, 2)", "(2, 2)", "(4, 2)"], answer: 0, steps: ["Substitute (0, 4): 2(0) + 3(4) = 12.", "For (1, 2), the left side is 8; for (2, 2), it is 10; for (4, 2), it is 14.", "Only (0, 4) makes the equation true."] },
      { prompt: "In 4x − 5y = 9, what is the coefficient of y?", options: ["4", "5", "−5", "9"], answer: 2, steps: ["The y-term is −5y.", "The coefficient includes its sign.", "Therefore the coefficient of y is −5."] },
      { prompt: "What is x + 2y, before an equals sign is added?", options: ["A linear equation", "An expression", "A solution pair", "A graph"], answer: 1, steps: ["An equation contains an equals sign.", "x + 2y has no equals sign, so it is an expression.", "For example, x + 2y = 5 is an equation."] },
      { prompt: "How many real solutions does the single equation x + y = 3 have?", options: ["None", "Exactly one", "Exactly two", "Infinitely many"], answer: 3, steps: ["Choose any real x, then set y = 3 − x.", "For example, x = 0 gives y = 3, while x = 1 gives y = 2.", "There are infinitely many choices of x, so there are infinitely many solution pairs."] }
    ]
  },
  {
    id: "graphical-method",
    title: "Graphical Solution Method",
    level: ["Core · Class 10"],
    summary: "Plot each equation as a line and read their common point as the solution.",
    intro: "What if the answer to two equations were hiding where their lines meet? A graph lets us see a solution, then substitution lets us check it exactly.",
    sections: [
      {
        title: "Plot a line using two points",
        paragraphs: [
          "To draw a line, find two points that satisfy its equation. For x + y = 5, setting x = 0 gives (0, 5), and setting y = 0 gives (5, 0). Plot the points and join them with a straight line.",
          "For a pair of equations, plot both lines using the same axes and scale. The coordinates of their intersection satisfy both equations."
        ],
        examples: [
          { title: "Find the graphical solution of x + y = 5 and x − y = 1", steps: ["For x + y = 5, two points are (0, 5) and (5, 0).", "For x − y = 1, two points are (1, 0) and (3, 2).", "The lines meet at (3, 2).", "Check: 3 + 2 = 5 and 3 − 2 = 1, so the intersection is the solution."] }
        ]
      },
      {
        title: "Read the graph carefully",
        paragraphs: [
          "The graph below uses the equations x + y = 5 and x − y = 1. Its axes have labelled, equally spaced grid marks; the highlighted point is their intersection.",
          "A hand-drawn graph may only show an approximate intersection. Use substitution or elimination when an exact answer is needed, and then use the graph as a visual check."
        ]
      }
    ],
    graph: {
      title: "Two intersecting lines have one shared point",
      lines: [
        { a: 1, b: 1, c: 5, label: "x + y = 5", color: "first" },
        { a: 1, b: -1, c: 1, label: "x − y = 1", color: "second" }
      ],
      intersection: { x: 3, y: 2 }
    },
    examples: [
      { title: "Plot x + y = 4 and x − y = 0", steps: ["For x + y = 4, the intercepts are (0, 4) and (4, 0).", "For x − y = 0, points (0, 0) and (2, 2) lie on the line.", "The lines meet at (2, 2); checking gives 2 + 2 = 4 and 2 − 2 = 0."] }
    ],
    olympiad: "Before drawing, estimate the intersection by solving mentally or checking convenient grid points. This helps you spot a badly plotted point or a scale error.",
    mistake: "Do not read only the x-coordinate or y-coordinate of the crossing. A solution is the ordered pair (x, y), and the scale on each axis matters.",
    fact: {
      question: "Can a graph show an exact solution even when the crossing is between grid marks?",
      answer: "The graph can help estimate the point, but a drawn crossing may not be exact. Substitute the estimated coordinates into both original equations or solve algebraically to confirm the exact answer."
    },
    questions: [
      { prompt: "The lines x + y = 5 and x − y = 1 intersect at which point?", options: ["(2, 3)", "(3, 2)", "(1, 4)", "(4, 1)"], answer: 1, steps: ["Add the equations: 2x = 6, so x = 3.", "Substitute into x + y = 5: y = 2.", "The intersection is (3, 2), which also satisfies x − y = 1."] },
      { prompt: "Which point is an x-intercept of x + y = 5?", options: ["(0, 5)", "(5, 0)", "(2, 3)", "(1, 1)"], answer: 1, steps: ["At an x-intercept, y = 0.", "Set y = 0 in x + y = 5 to get x = 5.", "So the x-intercept is (5, 0)."] },
      { prompt: "What does the intersection of two line graphs represent?", options: ["A point satisfying both equations", "The slope of the first line", "A point satisfying neither equation", "The y-intercept only"], answer: 0, steps: ["Every point on the first line satisfies its equation.", "Every point on the second line satisfies its equation.", "A shared point lies on both lines, so its ordered pair satisfies both equations."] },
      { prompt: "What is the graphical solution of 2x + 2y = 8 and x + y = 4?", options: ["No solution", "One solution: (4, 4)", "Infinitely many solutions", "One solution: (0, 0)"], answer: 2, steps: ["Divide the first equation by 2 to get x + y = 4.", "Both equations describe exactly the same line.", "Every point on that line satisfies both, so there are infinitely many solutions."] },
      { prompt: "Why should an estimated graph intersection be checked algebraically?", options: ["A hand-drawn graph may only give an approximate point.", "A line has no points.", "The axes cannot show negative values.", "Every graph has infinitely many intersections."], answer: 0, level: "Olympiad", steps: ["A hand-drawn line has finite thickness and plotting can be imprecise.", "The apparent crossing may lie near, but not exactly at, the true solution.", "Substitution into both equations checks the pair exactly."] }
    ]
  },
  {
    id: "substitution",
    title: "Algebraic Method: Substitution",
    level: ["Core · Class 10"],
    summary: "Make one variable the subject, substitute it into the other equation, and solve.",
    intro: "Substitution is like replacing a puzzle piece with the value it represents. Once one variable is written in terms of the other, the pair becomes a one-variable equation.",
    sections: [
      {
        title: "The substitution steps",
        paragraphs: [
          "First, rearrange one equation to write x in terms of y or y in terms of x. Choosing a variable with coefficient 1 often keeps the arithmetic simple.",
          "Replace that variable in the second equation, solve the resulting equation in one variable, then substitute back to find the other variable.",
          "Finally, check the ordered pair in both original equations. Parentheses help keep negative signs and fractions under control."
        ],
        examples: [
          { title: "Solve x + y = 6 and 2x − 3y = 1", steps: ["From x + y = 6, make x the subject: x = 6 − y.", "Substitute into the second equation: 2(6 − y) − 3y = 1.", "Expand and collect terms: 12 − 5y = 1, so y = 11/5.", "Then x = 6 − 11/5 = 19/5.", "Check: 2(19/5) − 3(11/5) = 1. The solution is (19/5, 11/5)."] }
        ]
      }
    ],
    examples: [
      { title: "Choose the easiest variable to isolate", steps: ["Use x = 2y + 1 and x + y = 10.", "Replace x in the second equation: (2y + 1) + y = 10.", "Then 3y = 9, so y = 3 and x = 7.", "The pair (7, 3) satisfies both equations."] }
    ],
    olympiad: "If an equation already has x or y by itself, start there. A good rearrangement can avoid fractions and make sign errors less likely.",
    mistake: "When substituting x = 6 − y into 2x − 3y, use 2(6 − y) − 3y. The 2 multiplies both terms inside the parentheses.",
    fact: {
      question: "Does it matter which equation you rearrange first?",
      answer: "No, provided the rearrangement is valid. In practice, choose the equation and variable that make the substitution shortest."
    },
    questions: [
      { prompt: "Solve x + y = 6 and 2x − 3y = 1.", options: ["(19/5, 11/5)", "(11/5, 19/5)", "(3, 3)", "(2, 4)"], answer: 0, steps: ["From the first equation, x = 6 − y.", "Substitute: 2(6 − y) − 3y = 1, so 12 − 5y = 1 and y = 11/5.", "Then x = 6 − 11/5 = 19/5, giving (19/5, 11/5)."] },
      { prompt: "If x = 2y + 1 and x + y = 10, what is (x, y)?", options: ["(3, 7)", "(7, 3)", "(6, 4)", "(5, 5)"], answer: 1, steps: ["Substitute x = 2y + 1 into x + y = 10.", "Then 2y + 1 + y = 10, so 3y = 9 and y = 3.", "Therefore x = 2(3) + 1 = 7; the pair is (7, 3)."] },
      { prompt: "For 3x + y = 11 and x = 2, what value of y satisfies both?", options: ["3", "5", "7", "9"], answer: 1, steps: ["Substitute x = 2 into 3x + y = 11.", "This gives 6 + y = 11.", "Subtract 6 to get y = 5."] },
      { prompt: "Solve 2x + y = 8 and x − y = 1.", options: ["(2, 4)", "(3, 2)", "(4, 0)", "(1, 6)"], answer: 1, steps: ["From x − y = 1, write y = x − 1.", "Substitute: 2x + (x − 1) = 8, so 3x = 9 and x = 3.", "Then y = 2, so the solution is (3, 2)."] },
      { prompt: "Which is the correct substitution of x = 4 − y into 3x + 2y = 10?", options: ["3(4 − y) + 2y = 10", "3(4) − y + 2y = 10", "4 − 3y + 2y = 10", "3x + 2(4 − y) = 10"], answer: 0, steps: ["The entire value 4 − y replaces x.", "The coefficient 3 multiplies the whole substituted expression, so use 3(4 − y).", "The equation becomes 3(4 − y) + 2y = 10."] }
    ]
  },
  {
    id: "elimination",
    title: "Algebraic Method: Elimination",
    level: ["Core · Class 10"],
    summary: "Add or subtract equivalent equations to remove one variable.",
    intro: "Think of the equations as balanced scales. Multiply an equation on both sides when needed, then add or subtract to cancel one variable without changing the solution.",
    sections: [
      {
        title: "Eliminate, solve, substitute back",
        paragraphs: [
          "Write the equations with x-terms, y-terms and constants aligned. Choose a variable to eliminate.",
          "If its coefficients are not already equal or opposites, multiply every term on one or both sides of an equation by a suitable number. Then add or subtract the equations to cancel that variable.",
          "Solve the remaining one-variable equation and substitute back to find the second variable. Check both original equations."
        ],
        examples: [
          { title: "Solve 3x + 2y = 16 and 2x − 4y = −2", steps: ["Multiply the first equation by 2: 6x + 4y = 32.", "Multiply the second equation by 3: 6x − 12y = −6.", "Subtract the second new equation from the first: 16y = 38, so y = 19/8.", "Use 3x + 2y = 16: 3x + 19/4 = 16, so x = 15/4.", "Check: 2(15/4) − 4(19/8) = −2. The solution is (15/4, 19/8)."] }
        ]
      }
    ],
    examples: [
      { title: "Eliminate y from 2x + 3y = 13 and 2x − y = 5", steps: ["Subtract the second equation from the first: 4y = 8.", "So y = 2.", "Substitute into 2x − y = 5: 2x − 2 = 5, hence x = 7/2.", "The pair (7/2, 2) satisfies both equations."] }
    ],
    olympiad: "If one variable’s coefficients are already opposites, add straight away. If they match, subtract. Simplifying common factors before aligning coefficients can save time.",
    mistake: "If you multiply an equation to align coefficients, multiply every term on both sides. When subtracting, keep the minus sign on every term in the second equation.",
    fact: {
      question: "Why is it valid to multiply both sides of an equation by the same non-zero number?",
      answer: "Equal quantities remain equal when both are multiplied by the same number. The new equation has the same solutions as the old one as long as the multiplier is non-zero."
    },
    questions: [
      { prompt: "Solve 3x + 2y = 16 and 2x − 4y = −2.", options: ["(15/4, 19/8)", "(19/8, 15/4)", "(4, 2)", "(3, 4)"], answer: 0, steps: ["Multiply the first equation by 2 and the second by 3: 6x + 4y = 32 and 6x − 12y = −6.", "Subtract to get 16y = 38, so y = 19/8.", "Substitution gives x = 15/4. The solution is (15/4, 19/8)."] },
      { prompt: "Solve x + y = 7 and x − y = 1 by adding the equations.", options: ["(3, 4)", "(4, 3)", "(7, 1)", "(1, 7)"], answer: 1, steps: ["Add: (x + y) + (x − y) = 7 + 1, so 2x = 8.", "Therefore x = 4.", "Substitute into x + y = 7 to get y = 3."] },
      { prompt: "Subtract 2x − y = 5 from 2x + 3y = 13. What equation results?", options: ["4y = 8", "2x + 2y = 18", "4x + 2y = 8", "−4y = 18"], answer: 0, steps: ["Write the subtraction with brackets: (2x + 3y) − (2x − y) = 13 − 5.", "The x-terms cancel and 3y − (−y) = 4y.", "Thus 4y = 8."] },
      { prompt: "What happens when 6x + 4y = 24 is subtracted from 6x + 4y = 24?", options: ["The result is 0 = 0.", "The result is 0 = 24.", "The result is x = 4.", "The result is y = 6."], answer: 0, steps: ["Subtract equal left sides: (6x + 4y) − (6x + 4y) = 0.", "Subtract equal right sides: 24 − 24 = 0.", "The result 0 = 0 is an identity, indicating the equations are equivalent."] },
      { prompt: "Which equations produce a contradiction when their left sides are subtracted?", options: ["2x + y = 5 and 2x + y = 7", "x + y = 5 and x − y = 1", "3x + 6y = 9 and x + 2y = 3", "4x − y = 6 and 4x − y = 6"], answer: 0, level: "Olympiad", steps: ["In the first pair, subtracting left sides gives 0, while the right sides give 5 − 7 = −2.", "This leads to 0 = −2, which is impossible.", "The remaining systems either have a unique solution or equivalent equations."] }
    ]
  },
  {
    id: "solution-types",
    title: "Solution Types: Consistent and Inconsistent Systems",
    level: ["Core · Class 10"],
    summary: "Tell whether two lines intersect once, never meet, or coincide.",
    intro: "Two straight lines can meet once, never meet, or lie on top of each other. These three pictures explain whether a pair of equations has one, no, or infinitely many solutions.",
    sections: [
      {
        title: "The three possibilities",
        paragraphs: [
          "A consistent pair has at least one solution. Intersecting lines give one solution; coincident lines describe the same line and give infinitely many solutions. An inconsistent pair has no solution: its lines are parallel and distinct.",
          "For equations a₁x + b₁y = c₁ and a₂x + b₂y = c₂, the usual ratio test (when the denominators are non-zero) is: a₁/a₂ ≠ b₁/b₂ gives one solution; a₁/a₂ = b₁/b₂ ≠ c₁/c₂ gives no solution; all three ratios equal gives infinitely many solutions.",
          "To avoid dividing by zero, use the determinant D = a₁b₂ − a₂b₁. If D ≠ 0, there is one solution. If D = 0, compare the constants too: proportional equations coincide; non-proportional constants mean no solution."
        ],
        examples: [
          { title: "Same line: infinitely many solutions", steps: ["Compare 2x + 4y = 6 with x + 2y = 3.", "The first equation is twice the second, including its right side.", "They represent the same line; for example, (3, 0) and (1, 1) satisfy both.", "There are infinitely many shared points."] },
          { title: "Parallel lines: no solution", steps: ["Compare 2x + 4y = 6 with 2x + 4y = 10.", "The left sides are identical, but the same expression cannot equal both 6 and 10.", "The lines are distinct and parallel, so there is no solution."] },
          { title: "A single intersection", steps: ["For x + y = 5 and x − y = 1, the coefficient determinant is 1(−1) − 1(1) = −2.", "Since it is non-zero, there is exactly one solution.", "Solving gives (3, 2)."] }
        ]
      }
    ],
    graphs: [
      {
        title: "One solution: intersecting lines",
        lines: [{ a: 1, b: 1, c: 5, label: "x + y = 5", color: "first" }, { a: 1, b: -1, c: 1, label: "x − y = 1", color: "second" }],
        intersection: { x: 3, y: 2 }
      },
      {
        title: "No solution: parallel lines",
        lines: [{ a: 1, b: 1, c: 4, label: "x + y = 4", color: "first" }, { a: 1, b: 1, c: 6, label: "x + y = 6", color: "second" }]
      },
      {
        title: "Infinitely many: coincident lines",
        lines: [{ a: 1, b: 1, c: 4, label: "x + y = 4", color: "first" }, { a: 2, b: 2, c: 8, label: "2x + 2y = 8", color: "second" }]
      }
    ],
    examples: [
      { title: "Classify 3x + 6y = 9 and x + 2y = 5", steps: ["Divide the first equation by 3: x + 2y = 3.", "The second equation says x + 2y = 5.", "The same expression cannot equal both 3 and 5, so the pair is inconsistent and has no solution."] }
    ],
    olympiad: "Check proportionality before doing a full solve. If the x- and y-coefficients have the same ratio, compare the constants next to distinguish coincident lines from parallel ones.",
    mistake: "Consistent does not mean “exactly one solution”; it includes infinitely many solutions. Also, use the ratio test only when the denominators are defined.",
    fact: {
      question: "What does elimination reveal for coincident and parallel lines?",
      answer: "Equivalent equations reduce to 0 = 0, so they have infinitely many solutions. Parallel distinct lines reduce to a false statement such as 0 = 2, so they have no solution."
    },
    questions: [
      { prompt: "How many solutions do 2x + 4y = 6 and x + 2y = 3 have?", options: ["None", "Exactly one", "Infinitely many", "Exactly two"], answer: 2, steps: ["Multiply x + 2y = 3 by 2 to get 2x + 4y = 6.", "The equations describe the same line.", "Every point on that line satisfies both, so there are infinitely many solutions."] },
      { prompt: "How many solutions do 2x + 4y = 6 and 2x + 4y = 10 have?", options: ["None", "Exactly one", "Infinitely many", "Exactly two"], answer: 0, steps: ["The left-hand expressions are identical.", "A single value of 2x + 4y cannot be both 6 and 10.", "The system is inconsistent and has no solution."] },
      { prompt: "What is the solution count for x + y = 4 and x − y = 2?", options: ["No solution", "One solution", "Infinitely many solutions", "Cannot be determined"], answer: 1, steps: ["The coefficient determinant is 1(−1) − 1(1) = −2.", "It is non-zero, so the lines intersect once.", "Solving gives x = 3 and y = 1."] },
      { prompt: "What is the solution count for 2x + 3y = 5 and 4x + 6y = 10?", options: ["No solution", "One solution", "Infinitely many solutions", "Exactly two"], answer: 2, steps: ["The second equation is exactly twice the first, including its constant.", "They are the same line, not two distinct lines.", "There are infinitely many common points."] },
      { prompt: "Classify 3x + 6y = 9 and x + 2y = 5.", options: ["One solution", "No solution", "Infinitely many solutions", "The equations are identical"], answer: 1, steps: ["Divide the first equation by 3 to get x + 2y = 3.", "The second equation requires x + 2y = 5.", "These are distinct parallel lines, so there is no solution."] }
    ]
  },
  {
    id: "word-problems",
    title: "Application Word Problems",
    level: ["Core · Class 10"],
    summary: "Translate real situations into two equations, solve, and interpret the answer.",
    intro: "A word problem gives clues in sentences. Name the unknowns first, turn each relationship into an equation, then solve and check that the answer makes sense.",
    sections: [
      {
        title: "A reliable translation plan",
        paragraphs: [
          "Read the question and decide what the two variables represent. Include units where useful, such as rupees, years or centimetres.",
          "Translate each independent statement into an equation. Words such as total, difference, twice, and more than indicate relationships—but write the relationship carefully.",
          "Solve the pair, then interpret the values in context. Check that they satisfy both equations and any conditions such as positive lengths."
        ],
        examples: [
          { title: "Divide ₹50 so one share is ₹3 more", steps: ["Let x be the larger share and y the smaller share, in rupees.", "The total gives x + y = 50; the difference gives x − y = 3.", "Add the equations: 2x = 53, so x = 26.5.", "Then y = 50 − 26.5 = 23.5.", "The shares are ₹26.50 and ₹23.50; their total is ₹50 and the difference is ₹3."] },
          { title: "Find a rectangle’s dimensions", steps: ["Let l be the length and w the width, in centimetres.", "The length is 3 more: l − w = 3. The perimeter gives 2l + 2w = 26, so l + w = 13.", "Add l − w = 3 and l + w = 13: 2l = 16, so l = 8.", "Then w = 5. Both are positive and the perimeter is 2(8) + 2(5) = 26 cm."] }
        ]
      }
    ],
    examples: [
      { title: "Two ages with a known sum and difference", steps: ["Let the older and younger ages be o and y years.", "Their total is 40: o + y = 40. The older person is 6 years older: o − y = 6.", "Add to get 2o = 46, so o = 23; then y = 17.", "The ages 23 and 17 total 40 and differ by 6."] }
    ],
    olympiad: "Choose variables to match the question’s structure. If a total and a difference are given, adding and subtracting the equations often reveals the two values quickly.",
    mistake: "“x is 3 more than y” means x = y + 3, not y = x + 3. Define which quantity each variable represents before writing equations.",
    fact: {
      question: "Why should you check units and context after solving?",
      answer: "Algebra checks the relationships, while the story supplies meaning. A negative rectangle width or a share with the wrong currency unit signals a modelling or interpretation error."
    },
    questions: [
      { prompt: "₹50 is divided into two shares; one is ₹3 more than the other. What are the shares?", options: ["₹26.50 and ₹23.50", "₹27 and ₹23", "₹28 and ₹22", "₹25 and ₹25"], answer: 0, steps: ["Let the shares be x and y, with x larger. Then x + y = 50 and x − y = 3.", "Adding gives 2x = 53, so x = 26.5.", "Then y = 23.5. The values total 50 and differ by 3."] },
      { prompt: "A rectangle’s length is 3 cm more than its width and its perimeter is 26 cm. What are its dimensions?", options: ["7 cm by 6 cm", "8 cm by 5 cm", "9 cm by 4 cm", "10 cm by 3 cm"], answer: 1, steps: ["Let length l and width w. Then l − w = 3 and l + w = 13.", "Adding gives 2l = 16, so l = 8.", "Then w = 5. The perimeter is 2(8 + 5) = 26 cm."] },
      { prompt: "Two numbers total 10, and the first is twice the second. What is the ordered pair (first, second)?", options: ["(5, 5)", "(20/3, 10/3)", "(10/3, 20/3)", "(6, 4)"], answer: 1, steps: ["Let the numbers be x and y. Then x + y = 10 and x = 2y.", "Substitute: 2y + y = 10, so y = 10/3.", "Then x = 20/3; the pair is (20/3, 10/3)."] },
      { prompt: "A box has 20 adult and child tickets. Adult tickets cost ₹5 and child tickets ₹3; the total is ₹76. How many of each were sold?", options: ["8 adults and 12 children", "10 adults and 10 children", "12 adults and 8 children", "6 adults and 14 children"], answer: 0, steps: ["Let a be adult tickets and c be child tickets. Then a + c = 20 and 5a + 3c = 76.", "Substitute c = 20 − a: 5a + 3(20 − a) = 76.", "This gives 2a = 16, so a = 8 and c = 12. The total is 40 + 36 = ₹76."] },
      { prompt: "The sum of two ages is 40 years and the older is 6 years older. What are the ages?", options: ["23 and 17", "24 and 16", "22 and 18", "26 and 14"], answer: 0, level: "Olympiad", steps: ["Let the ages be o and y. Then o + y = 40 and o − y = 6.", "Add the equations: 2o = 46, so o = 23.", "Then y = 17. Both ages meet the stated sum and difference."] }
    ]
  },
  {
    id: "olympiad-problem-solving",
    title: "Advanced Problem Solving and Olympiad Tips",
    level: ["Olympiad Extension"],
    summary: "Use symmetry, equation combinations, and integer restrictions to solve efficiently.",
    intro: "Olympiad questions often reward noticing a useful combination before doing long calculations. The same two-equation ideas still apply—now we choose the shortest route.",
    sections: [
      {
        title: "Combine equations to find a target",
        paragraphs: [
          "Sometimes a question asks for an expression such as 5x + 3y, not x and y separately. If that expression can be made by adding multiples of the given equations, combine their right-hand sides directly.",
          "Symmetry can also help. Adding equations may give x + y, while subtracting them may give x − y. If the question restricts x and y to integers, test the divisibility conditions before listing values."
        ],
        examples: [
          { title: "Find 5x + 3y without solving separately", steps: ["Given 3x + 4y = 7 and 2x − y = 4, add the equations.", "The left side becomes 5x + 3y, exactly the requested expression.", "The right side is 7 + 4 = 11, so 5x + 3y = 11."] },
          { title: "Use symmetry to find x + y", steps: ["Given 3x + 2y = 13 and 2x + 3y = 12, add them.", "The left side is 5x + 5y = 5(x + y).", "The right side is 25, so x + y = 5."] }
        ]
      },
      {
        title: "Parameters and integer restrictions",
        paragraphs: [
          "If one equation is a multiple of another, the right-hand sides must have the same multiplier for the lines to coincide. Otherwise the system is inconsistent.",
          "For integer-solution questions, the equations may have infinitely many real points but only a few integer pairs. Check divisibility and any positive/non-negative restrictions stated in the question."
        ],
        examples: [
          { title: "Find k for infinitely many solutions", steps: ["The pair is 2x + 3y = 13 and 4x + 6y = k.", "The second left side is twice the first: 4x + 6y = 2(2x + 3y).", "For the same line, its right side must also double: k = 2(13) = 26.", "When k = 26 the equations coincide and have infinitely many solutions."] }
        ]
      }
    ],
    examples: [
      { title: "Count non-negative integer pairs for 2x + 3y = 12", steps: ["Since x and y are non-negative integers, test y values that keep 12 − 3y non-negative.", "For y = 0, x = 6; for y = 1, x = 9/2, not an integer.", "For y = 2, x = 3; for y = 3, x = 3/2, not an integer.", "For y = 4, x = 0. The pairs are (6, 0), (3, 2), and (0, 4): three pairs."] }
    ],
    olympiad: "Look at the exact expression the question asks for. If it is a linear combination of the given left sides, use the same combination on their right sides and you may avoid solving for both variables.",
    mistake: "A shortcut is valid only when the coefficients really match the target expression. Verify each coefficient after combining equations.",
    fact: {
      question: "Can a pair of dependent equations have only a few integer solutions?",
      answer: "Yes. Coincident lines have infinitely many real points, but integer restrictions can leave a finite number of integer pairs. The equation and the stated domain both matter."
    },
    questions: [
      { prompt: "If 3x + 4y = 7 and 2x − y = 4, what is 5x + 3y?", options: ["7", "11", "15", "21"], answer: 1, steps: ["Add the two equations.", "The left side becomes (3x + 2x) + (4y − y) = 5x + 3y.", "The right side is 7 + 4 = 11, so the requested value is 11."] },
      { prompt: "For which value of k do 2x + 3y = 13 and 4x + 6y = k have infinitely many solutions?", options: ["13", "26", "39", "52"], answer: 1, steps: ["The second left side is twice the first.", "For the equations to be identical, the second right side must also be twice 13.", "Therefore k = 26."] },
      { prompt: "Given 3x + 2y = 13 and 2x + 3y = 12, what is x + y?", options: ["3", "4", "5", "25"], answer: 2, steps: ["Add the equations: 5x + 5y = 25.", "Factor the left side: 5(x + y) = 25.", "Divide by 5 to get x + y = 5."] },
      { prompt: "How many non-negative integer pairs (x, y) satisfy 2x + 3y = 12?", options: ["2", "3", "4", "5"], answer: 1, steps: ["Try non-negative integer y values from 0 to 4.", "y = 0 gives x = 6; y = 1 gives no integer x; y = 2 gives x = 3.", "y = 3 gives no integer x; y = 4 gives x = 0. There are three pairs."] },
      { prompt: "If 2x + 3y = 13 and 4x + 6y = 25, what is true?", options: ["One solution", "No solution", "Infinitely many solutions", "Exactly two solutions"], answer: 1, level: "Olympiad", steps: ["The second left-hand side is twice the first.", "If both equations had a solution, the second right-hand side would need to be 2 × 13 = 26.", "It is 25 instead, which gives a contradiction. There is no solution."] }
    ]
  },
  {
    id: "revision-formula-sheet",
    title: "Revision and Formula Sheet",
    level: ["Core · Class 10", "Quick revision"],
    summary: "Review the main equation form, solution methods, and consistency conditions.",
    intro: "Use this page as a final map: identify the system, choose a method, and verify that the answer satisfies both equations.",
    sections: [
      {
        title: "Core ideas at a glance",
        bullets: [
          "Linear equation in two variables: ax + by = c, with a and b not both zero.",
          "A solution is an ordered pair (x, y) that makes both equations true.",
          "Graphical method: plot both lines; their shared point is the solution.",
          "Substitution: isolate one variable, replace it in the other equation, solve, and substitute back.",
          "Elimination: align coefficients, add or subtract to cancel one variable, solve, and substitute back.",
          "Check the final ordered pair in both original equations."
        ],
        examples: [
          { title: "Quick solve: x + y = 5 and x − y = 1", steps: ["Add to get 2x = 6, so x = 3.", "Substitute into x + y = 5 to get y = 2.", "Check both equations: 3 + 2 = 5 and 3 − 2 = 1."] }
        ]
      },
      {
        title: "Classify the solution count",
        paragraphs: [
          "For a₁x + b₁y = c₁ and a₂x + b₂y = c₂, let D = a₁b₂ − a₂b₁.",
          "If D ≠ 0, there is one solution. If D = 0, compare the constants: proportional equations have infinitely many solutions; otherwise there is no solution. When the ratio denominators are non-zero, this is the familiar coefficient-ratio test."
        ],
        bullets: [
          "Intersecting lines → one solution → consistent.",
          "Parallel distinct lines → no solution → inconsistent.",
          "Coincident lines → infinitely many solutions → consistent and dependent."
        ]
      },
      {
        title: "Frequent checks and mistakes",
        bullets: [
          "Define both variables and their units before forming word-problem equations.",
          "Multiplying an equation means multiplying every term on both sides.",
          "When subtracting equations, distribute the minus sign to every term in the second equation.",
          "Do not divide by zero in a ratio test; use the determinant or compare equations directly.",
          "Check that the result makes sense in the story, as well as in the algebra."
        ]
      }
    ],
    examples: [
      { title: "Choose an efficient method", steps: ["If a variable is already isolated, use substitution.", "If coefficients match or are opposites, use elimination.", "If a question asks how the lines relate, compare coefficients or sketch a graph.", "Whichever method you choose, check the ordered pair in both equations."] }
    ],
    olympiad: "Look for the method that preserves the structure of the question. A requested sum may come from adding equations; a parameter question may only require checking whether two equations are proportional.",
    mistake: "A correct-looking pair is not enough: substitute it into both original equations. A check can catch arithmetic or sign errors immediately.",
    fact: {
      question: "Can there be exactly two solutions to a pair of linear equations in two variables?",
      answer: "No. Two straight lines either do not meet, meet once, or coincide. Therefore a pair has zero, one, or infinitely many real solutions—not exactly two."
    },
    questions: [
      { prompt: "What is the first step of substitution when one equation is y = 2x + 1?", options: ["Replace y in the other equation with 2x + 1", "Set x equal to zero", "Add 2 to both equations", "Graph only the first line"], answer: 0, steps: ["The equation already expresses y using x.", "Substitute the entire expression 2x + 1 for y in the other equation.", "Then solve the resulting equation in x."] },
      { prompt: "What does a non-zero determinant D = a₁b₂ − a₂b₁ tell us?", options: ["No solution", "Exactly one solution", "Infinitely many solutions", "The equations are expressions"], answer: 1, steps: ["A non-zero determinant means the coefficient pairs are not proportional.", "The corresponding lines are not parallel and are distinct.", "They intersect at exactly one point, so there is one solution."] },
      { prompt: "Which graph corresponds to infinitely many solutions?", options: ["Two intersecting lines", "Two parallel distinct lines", "Two coincident lines", "A circle and a line"], answer: 2, steps: ["Infinitely many shared solutions require infinitely many shared points.", "Coincident lines share every point on the line.", "Thus coincident lines represent infinitely many solutions."] },
      { prompt: "After finding x and y, what is the best final check?", options: ["Check only the equation with smaller numbers", "Substitute into both original equations", "Round both values to integers", "Swap x and y"], answer: 1, steps: ["A solution to the pair must satisfy each original equation.", "Substitute the ordered pair into both left-hand sides.", "If both equal their stated right-hand sides, the pair is verified."] },
      { prompt: "Which statement about a pair of linear equations is true?", options: ["It can have exactly two real solutions.", "It always has one solution.", "It may have zero, one, or infinitely many solutions.", "It can never have infinitely many solutions."], answer: 2, steps: ["Two distinct non-parallel lines meet once.", "Parallel distinct lines do not meet; coincident lines share every point.", "So the possible counts are zero, one, or infinitely many."] }
    ]
  }
];
