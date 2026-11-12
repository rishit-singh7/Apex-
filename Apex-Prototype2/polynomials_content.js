window.apexPolynomialTopics = [
  {
    id: "fundamentals",
    title: "Polynomial Fundamentals — Build the Foundation",
    level: ["Prerequisite Revision", "Foundation"],
    summary: "Meet variables, terms, coefficients, degree, and the rules that make an expression a polynomial.",
    intro: "A polynomial is a tidy algebraic expression built from powers of a variable. Before finding its zeroes, let’s learn to recognise its parts—and spot expressions that do not belong.",
    sections: [
      {
        title: "The parts of a polynomial",
        paragraphs: [
          "An algebraic expression combines numbers, variables, and operations. In a polynomial in x, every exponent of x must be a non-negative integer: 0, 1, 2, 3, and so on.",
          "A term is a piece separated by + or −. Its numerical multiplier is its coefficient; a letter such as x is a variable; and a number without a variable is a constant. Write terms in descending powers to get standard form."
        ],
        examples: [
          { title: "Read the parts of 2x³ + 3x² − 7", steps: ["The terms are 2x³, 3x², and −7.", "The coefficients of the variable terms are 2 and 3; the constant term is −7.", "The highest exponent is 3, so its degree is 3."] },
          { title: "Which expressions are polynomials?", steps: ["3x + 5, x² − 5x + 6, and 2x³ + 3x² − 7 are polynomials: their exponents are non-negative integers.", "5 is a non-zero constant polynomial of degree 0.", "0 is the zero polynomial; its degree is undefined in the usual school-level convention.", "1/x = x⁻¹ is not a polynomial because −1 is a negative exponent.", "√x + 2 = x¹ᐟ² + 2 is not a polynomial because 1/2 is not an integer exponent."] }
        ]
      },
      {
        title: "Degree and familiar names",
        paragraphs: [
          "The degree of a non-zero polynomial in one variable is the largest exponent whose coefficient is not zero. Degree 1 is linear, degree 2 is quadratic, and degree 3 is cubic.",
          "A non-zero constant has degree 0. The zero polynomial is special: its degree is not defined in the usual school-level convention. The degree is an exponent, not a coefficient."
        ],
        examples: [
          { title: "Name each polynomial", steps: ["3x + 5 has degree 1, so it is linear.", "x² − 5x + 6 has degree 2, so it is quadratic.", "2x³ + 3x² − 7 has degree 3, so it is cubic."] },
          { title: "Expression or equation?", steps: ["x² − 4 is a polynomial expression; it has no equals sign.", "x² − 4 = 0 is a polynomial equation. Solving the equation asks which x-values make the expression equal zero."] }
        ]
      }
    ],
    olympiad: "When checking a complicated expression, simplify it first and then inspect the powers. A term with a negative or fractional exponent cannot be rescued by the other terms. Also combine like terms before deciding the degree: in x² + 3x², the result is 4x², not a degree-1 polynomial.",
    mistake: "Do not call the largest coefficient the degree. In 9x⁴ − 20x + 1, the degree is 4; 9 is the leading coefficient.",
    fact: {
      question: "Can a polynomial have a coefficient of zero?",
      answer: "Yes. For example, x³ + 0x² + 2 is the same polynomial as x³ + 2. Zero-coefficient terms are usually omitted; they do not change the degree."
    },
    examples: [
      { title: "Beginner · Find the degree", steps: ["For 7x² + 4x − 9, the highest exponent with a non-zero coefficient is 2.", "So the polynomial is quadratic and has degree 2."] },
      { title: "Intermediate · Put in standard form", steps: ["Start with 4 − 2x³ + x.", "Arrange terms by descending powers: −2x³ + x + 4.", "Its degree is 3 and its leading coefficient is −2."] },
      { title: "Olympiad thinking · Find the parameter", steps: ["For which value of k does (k − 2)x² + 3x + 1 have degree 1?", "The x² term must disappear, so k − 2 = 0.", "Therefore k = 2; the remaining polynomial 3x + 1 has degree 1."] }
    ],
    questions: [
      { prompt: "What is the degree of 3x⁴ − 2x² + 7?", options: ["2", "3", "4", "7"], answer: 2, steps: ["The degree is the greatest exponent with a non-zero coefficient.", "The greatest exponent here is 4.", "Therefore, the degree is 4."] },
      { prompt: "Which expression is not a polynomial in x?", options: ["2x² + 1", "x³ − x", "1/x + 2", "5"], answer: 2, steps: ["Rewrite 1/x as x⁻¹.", "A polynomial may only have non-negative integer exponents.", "The exponent −1 is negative, so 1/x + 2 is not a polynomial."] },
      { prompt: "What is the degree of the non-zero constant polynomial 5?", options: ["0", "1", "5", "Undefined"], answer: 0, steps: ["A non-zero constant can be written as 5x⁰.", "Its only exponent is 0.", "So its degree is 0. (It is the zero polynomial, not a non-zero constant, whose degree is undefined in the school-level convention.)"] },
      { prompt: "Which statement about the zero polynomial is correct in the usual school-level convention?", options: ["Its degree is 0.", "Its degree is 1.", "It has no variable, so it is not a polynomial.", "Its degree is undefined."], answer: 3, steps: ["The zero polynomial has every coefficient equal to zero.", "There is no highest exponent with a non-zero coefficient.", "Its degree is therefore left undefined in the usual school-level convention."] },
      { prompt: "For what value of k does (k − 3)x² + 2x + 1 have degree 1?", options: ["0", "2", "3", "4"], answer: 2, steps: ["For degree 1, the x² term must vanish.", "Set its coefficient k − 3 equal to zero.", "Solving gives k = 3; the remaining expression 2x + 1 is linear."] }
    ]
  },
  {
    id: "zeroes",
    title: "Zeroes of a Polynomial",
    level: ["Core Class 10", "Foundation"],
    summary: "Understand what a zero means and find zeroes by solving p(x) = 0.",
    intro: "Imagine p(x) as a machine. A zero is an input that makes the output exactly zero. The machine’s input is the number; the output is p(number).",
    sections: [
      {
        title: "What is a zero?",
        paragraphs: [
          "A number α is a zero of p(x) if p(α) = 0. To find zeroes algebraically, solve the equation p(x) = 0.",
          "A polynomial and its equation are related but different: x² − 5x + 6 is an expression; x² − 5x + 6 = 0 is the equation whose solutions are its zeroes."
        ],
        examples: [
          { title: "Find the zero of 3x − 12", steps: ["Set the polynomial equal to zero: 3x − 12 = 0.", "Add 12 to both sides: 3x = 12.", "Divide by 3: x = 4. Check: 3(4) − 12 = 0."] },
          { title: "Find the zeroes of x² − 5x + 6", steps: ["Set x² − 5x + 6 = 0.", "Factor: (x − 2)(x − 3) = 0.", "A product is zero when at least one factor is zero, so x = 2 or x = 3.", "Check: p(2) = 4 − 10 + 6 = 0 and p(3) = 9 − 15 + 6 = 0."] }
        ]
      },
      {
        title: "Repeated zeroes and conditions",
        paragraphs: [
          "A quadratic may have a repeated zero. For example, x² − 4x + 4 = (x − 2)², so its only distinct zero is 2, even though the factor occurs twice.",
          "If a question tells you a value is a zero, substitute it into p(x) and set the result equal to zero. This often reveals an unknown coefficient."
        ],
        examples: [
          { title: "Find k if 1 is a zero of 2x² + kx + 3", steps: ["Substitute x = 1: p(1) = 2 + k + 3.", "Since 1 is a zero, p(1) = 0, so k + 5 = 0.", "Therefore k = −5."] },
          { title: "Find k if 2 is a zero of x² + kx − 6", steps: ["Substitute x = 2: 4 + 2k − 6 = 0.", "Simplify: 2k − 2 = 0.", "Therefore k = 1."] }
        ]
      }
    ],
    olympiad: "Before factoring a quadratic, check simple integer candidates using factors of its constant term. If one candidate makes p(x) = 0, division or factorisation may become much easier. Always substitute your final zeroes back into the original polynomial.",
    mistake: "A zero of a polynomial is an input value, not the zero polynomial itself. For example, 2 is a zero of x − 2 because p(2) = 0; the polynomial x − 2 is not the number zero.",
    fact: {
      question: "Can the same zero appear more than once in a factorisation?",
      answer: "Yes. x² − 4x + 4 = (x − 2)² has zero 2 twice, but only one distinct zero. The repeated factor records multiplicity, not a second different value."
    },
    examples: [
      { title: "Beginner · Solve a linear polynomial", steps: ["Set 5x + 10 equal to zero.", "5x = −10, so x = −2.", "Check: 5(−2) + 10 = 0."] },
      { title: "Intermediate · Factor a quadratic", steps: ["Set x² − 9 = 0.", "Use difference of squares: (x − 3)(x + 3) = 0.", "The zeroes are 3 and −3."] },
      { title: "Olympiad thinking · Find a coefficient", steps: ["Suppose 3 is a zero of x² + kx − 12.", "Substitute 3: 9 + 3k − 12 = 0.", "Then 3k = 3, so k = 1. Check: 9 + 3 − 12 = 0."] }
    ],
    questions: [
      { prompt: "What are the zeroes of x² − 5x + 6?", options: ["−2 and −3", "2 and 3", "−2 and 3", "1 and 6"], answer: 1, steps: ["Factor the polynomial: x² − 5x + 6 = (x − 2)(x − 3).", "Set each factor equal to zero.", "The zeroes are 2 and 3. Substitution gives zero for both."] },
      { prompt: "What is the zero of 4x − 20?", options: ["−5", "4", "5", "20"], answer: 2, steps: ["Set 4x − 20 = 0.", "Then 4x = 20, so x = 5.", "Check: 4(5) − 20 = 0."] },
      { prompt: "How many distinct real zeroes does (x − 4)² have?", options: ["0", "1", "2", "4"], answer: 1, steps: ["Set (x − 4)² = 0.", "This gives x − 4 = 0, hence x = 4.", "The factor is repeated, but the only distinct zero is 4."] },
      { prompt: "If 1 is a zero of 2x² + kx + 3, what is k?", options: ["−5", "−1", "1", "5"], answer: 0, steps: ["Substitute x = 1 and set the result to zero: 2 + k + 3 = 0.", "Combine constants: k + 5 = 0.", "Therefore k = −5."] },
      { prompt: "If 2 is a zero of x² + kx − 6, what is k?", options: ["−1", "0", "1", "2"], answer: 2, steps: ["Substitute x = 2: 4 + 2k − 6 = 0.", "Simplify to 2k − 2 = 0.", "Therefore k = 1."] }
    ]
  },
  {
    id: "graphs",
    title: "Geometrical Meaning of Zeroes",
    level: ["Core Class 10", "Olympiad Extension", "Visual learning"],
    summary: "See zeroes as x-coordinates where a polynomial graph meets the x-axis.",
    intro: "A graph lets us see every input and output at once. Wherever the curve reaches output y = 0, it meets the x-axis—and the x-coordinate there is a zero.",
    sections: [
      {
        title: "Read zeroes from a graph",
        paragraphs: [
          "For y = p(x), points on the x-axis have y = 0. Therefore, the x-coordinates of the graph’s intersections with the x-axis are exactly the real zeroes of p(x).",
          "A curve may cross the axis or just touch it. Count distinct x-values, not how many times the curve touches or crosses at the same value."
        ],
        examples: [
          { title: "A line: y = x − 3", steps: ["Set y = 0 to locate the x-intercept: x − 3 = 0.", "So x = 3; the line meets the x-axis at (3, 0).", "The polynomial has one real zero, 3."] },
          { title: "Three quadratic pictures", steps: ["For y = x² − 4, the graph crosses at x = −2 and x = 2: two distinct real zeroes.", "For y = x², the graph touches the axis at x = 0: one distinct real zero.", "For y = x² + 4, the graph stays above the axis: no real zeroes."] }
        ]
      },
      {
        title: "What degree tells us",
        paragraphs: [
          "A non-zero polynomial of degree n has at most n distinct real zeroes. A quadratic can therefore have 0, 1, or 2 distinct real zeroes.",
          "A repeated zero such as 0 for x² counts as one distinct real zero, although its factor x occurs twice. At this level we describe the visible real intersections; complex roots are beyond this chapter’s core."
        ],
        examples: [
          { title: "Read the number of zeroes", steps: ["The red dots on each graph mark x-intercepts.", "The first graph has two dots, so it has two distinct zeroes.", "The second graph has one dot, so it has one distinct zero.", "The third graph has no dots on the x-axis, so it has no real zeroes."] }
        ]
      }
    ],
    graphs: [
      { title: "Two zeroes · crosses twice", equation: "y = x² − 4", kind: "crosses", roots: [-2, 2] },
      { title: "One distinct zero · touches once", equation: "y = x²", kind: "touches", roots: [0] },
      { title: "No real zeroes · no meeting", equation: "y = x² + 4", kind: "none", roots: [] }
    ],
    olympiad: "When a graph is unfamiliar, first mark every place it meets y = 0, then read the x-coordinate. A curve can turn sharply or look unusual; the zeroes are still determined only by those x-axis intersections.",
    mistake: "Do not report the y-coordinate of an x-intercept. Every x-intercept has y = 0; its x-coordinate is the zero.",
    fact: {
      question: "Can a quadratic graph touch the x-axis without crossing it?",
      answer: "Yes. The graph y = x² touches the x-axis at (0, 0) and turns upward. Its polynomial has one distinct real zero, x = 0."
    },
    examples: [
      { title: "Beginner · Find the intercept", steps: ["For y = 2x + 6, the x-axis has y = 0.", "Solve 2x + 6 = 0 to get x = −3.", "The graph crosses at (−3, 0); −3 is the zero."] },
      { title: "Intermediate · Count intersections", steps: ["A quadratic curve crosses the x-axis at x = 1 and x = 5.", "These are two different x-coordinates.", "So the quadratic has two distinct real zeroes."] },
      { title: "Olympiad thinking · A tangent point", steps: ["A quadratic graph touches the x-axis at x = 4 and turns back.", "It has one x-intersection, at (4, 0).", "Therefore it has one distinct real zero, even if its algebraic factor is repeated."] }
    ],
    questions: [
      { prompt: "How many distinct real zeroes does y = x² − 4 have?", options: ["0", "1", "2", "4"], answer: 2, steps: ["Set y = 0: x² − 4 = 0.", "Factor: (x − 2)(x + 2) = 0, so x = 2 or x = −2.", "There are two distinct x-intercepts and therefore two distinct real zeroes."] },
      { prompt: "How many distinct real zeroes does y = x² have?", options: ["0", "1", "2", "Cannot be determined"], answer: 1, steps: ["Set x² = 0.", "The only solution is x = 0.", "The graph touches the x-axis once, so there is one distinct real zero."] },
      { prompt: "How many real zeroes does y = x² + 4 have?", options: ["0", "1", "2", "4"], answer: 0, steps: ["For every real x, x² is at least 0.", "Thus x² + 4 is at least 4 and cannot equal 0.", "The graph does not meet the x-axis, so there are no real zeroes."] },
      { prompt: "A graph crosses the x-axis at x = −1 and x = 4. What are its zeroes?", options: ["−1 and 4", "1 and −4", "−1 and 0", "0 and 4"], answer: 0, steps: ["At an x-intercept, y = 0.", "The x-coordinates of the two intersections are −1 and 4.", "Those x-coordinates are the zeroes."] },
      { prompt: "What is the greatest possible number of distinct real zeroes of a non-zero cubic polynomial?", options: ["1", "2", "3", "4"], answer: 2, steps: ["A non-zero polynomial of degree n has at most n distinct real zeroes.", "A cubic has degree 3.", "So it can have at most 3 distinct real zeroes."] }
    ]
  },
  {
    id: "relationships",
    title: "Relationship Between Zeroes and Coefficients",
    level: ["Core Class 10", "Core skill"],
    summary: "Derive and use the sum and product formulas for quadratic zeroes.",
    intro: "The coefficients of a quadratic quietly encode its zeroes. We can read the sum and product of those zeroes without solving the equation first.",
    sections: [
      {
        title: "Derive the formulas",
        paragraphs: [
          "Let p(x) = ax² + bx + c, with a ≠ 0, and let its zeroes be α and β. A quadratic with these zeroes can be written p(x) = a(x − α)(x − β).",
          "Expand: a[x² − (α + β)x + αβ] = ax² − a(α + β)x + aαβ. Compare the coefficients of x and the constant term with ax² + bx + c."
        ],
        examples: [
          { title: "Compare coefficients", steps: ["The coefficient of x gives b = −a(α + β), so α + β = −b/a.", "The constant term gives c = aαβ, so αβ = c/a.", "These formulas require a ≠ 0, so the expression really is quadratic."] },
          { title: "Check with 2x² − 7x + 3", steps: ["Here a = 2, b = −7, and c = 3.", "Sum of zeroes = −b/a = 7/2; product = c/a = 3/2.", "Factor: 2x² − 7x + 3 = (2x − 1)(x − 3), so the zeroes are 1/2 and 3.", "Check: 1/2 + 3 = 7/2, and (1/2)(3) = 3/2."] }
        ]
      },
      {
        title: "Use the relationships intelligently",
        paragraphs: [
          "The sum’s sign and product’s sign can help check possible roots. A negative product means the two real roots have opposite signs; a positive product means they have the same sign if both are real and non-zero.",
          "If roots are known, compare their sum and product with the coefficients. If one coefficient is unknown, the same equations can determine it."
        ],
        examples: [
          { title: "Find the missing coefficient", steps: ["Suppose x² + kx + 6 has zeroes 2 and 3.", "Their sum is 5, while the formula gives −k.", "So −k = 5 and k = −5. Their product 6 agrees with the constant term."] },
          { title: "Find c when the zeroes are −2 and 4", steps: ["For 3x² + bx + c, a = 3.", "The product of zeroes is c/3; the given product is (−2)(4) = −8.", "Therefore c/3 = −8 and c = −24."] }
        ]
      }
    ],
    olympiad: "Sometimes the question asks for a symmetric expression such as α + β or αβ. Use the coefficient relationships directly instead of calculating both roots; it is shorter and often avoids messy fractions.",
    mistake: "The sum is −b/a, not b/a. The product is c/a. Keep the leading coefficient a in both denominators, and check that a ≠ 0.",
    fact: {
      question: "If a quadratic has zeroes with a negative product, what can you conclude?",
      answer: "If the zeroes are real, one is positive and the other is negative because their product is less than zero. This is a useful sign check, but it does not give their exact values."
    },
    examples: [
      { title: "Beginner · Sum and product", steps: ["For  x² − 3x + 2, a = 1, b = −3, c = 2.", "Sum = −b/a = 3 and product = c/a = 2.", "The zeroes 1 and 2 confirm both results."] },
      { title: "Intermediate · Check proposed zeroes", steps: ["Could 2 and 4 be the zeroes of 2x² − 12x + 16?", "The coefficient formulas give sum 12/2 = 6 and product 16/2 = 8.", "The proposed zeroes have sum 6 and product 8, so they agree. Indeed, 2x² − 12x + 16 = 2(x − 2)(x − 4)."] },
      { title: "Olympiad thinking · Determine a parameter", steps: ["For x² + kx + 8, suppose the zeroes have sum −6.", "The sum formula gives −k = −6.", "Therefore k = 6; the product is 8, a useful independent check."] }
    ],
    questions: [
      { prompt: "What is the product of the zeroes of 2x² − 7x + 3?", options: ["−7/2", "7/2", "3/2", "3"], answer: 2, steps: ["For ax² + bx + c, the product is c/a.", "Here c = 3 and a = 2.", "The product is 3/2."] },
      { prompt: "What is the sum of the zeroes of 3x² − 8x + 4?", options: ["−8/3", "8/3", "4/3", "−4/3"], answer: 1, steps: ["The sum is −b/a.", "Here b = −8 and a = 3, so −b/a = −(−8)/3.", "The sum is 8/3."] },
      { prompt: "The zeroes of x² + kx + 6 are 2 and 3. What is k?", options: ["−5", "−1", "1", "5"], answer: 0, steps: ["The sum of the given zeroes is 2 + 3 = 5.", "For a monic quadratic x² + kx + 6, the sum is −k.", "So −k = 5 and k = −5."] },
      { prompt: "For 3x² + bx + c with zeroes −2 and 4, what is c?", options: ["−24", "−8", "8", "24"], answer: 0, steps: ["The product of the zeroes is (−2)(4) = −8.", "The product formula says c/a = c/3 = −8.", "Therefore c = −24."] },
      { prompt: "Which pair of numbers could be the zeroes of x² − 7x + 10?", options: ["2 and 5", "−2 and −5", "1 and 10", "−1 and 10"], answer: 0, steps: ["The sum must be 7 and the product must be 10.", "The pair 2 and 5 has sum 7 and product 10.", "The other pairs fail at least one check; indeed x² − 7x + 10 = (x − 2)(x − 5)."] }
    ]
  },
  {
    id: "forming",
    title: "Forming Quadratic Polynomials",
    level: ["Core Class 10", "Core skill"],
    summary: "Build a quadratic from its zeroes, their sum and product, or a specified leading coefficient.",
    intro: "Knowing the zeroes is like knowing where a quadratic’s graph meets the x-axis. Those two values are enough to build a monic quadratic.",
    sections: [
      {
        title: "Build the monic polynomial",
        paragraphs: [
          "If the zeroes are α and β, then (x − α)(x − β) expands to x² − (α + β)x + αβ. This is the monic quadratic: its leading coefficient is 1.",
          "Any non-zero scalar multiple k[x² − (α + β)x + αβ], where k ≠ 0, has the same zeroes. A unique polynomial is obtained only when a leading coefficient—often 1—is specified."
        ],
        examples: [
          { title: "Zeroes −2 and 5", steps: ["Sum = −2 + 5 = 3; product = (−2)(5) = −10.", "The monic quadratic is x² − 3x − 10.", "Check: (−2)² − 3(−2) − 10 = 0 and 5² − 3(5) − 10 = 0."] },
          { title: "Zeroes 1/2 and −3, with integer coefficients", steps: ["Sum = 1/2 − 3 = −5/2; product = −3/2.", "The monic polynomial is x² + (5/2)x − 3/2.", "Multiplying by 2 gives 2x² + 5x − 3, which has the same zeroes."] }
        ]
      },
      {
        title: "Use a specified leading coefficient",
        paragraphs: [
          "For leading coefficient a, use a[x² − (α + β)x + αβ]. Multiply a through each term to write the polynomial in standard form.",
          "A quick check is to substitute each given zero. The result should be zero."
        ],
        examples: [
          { title: "Leading coefficient 3; zeroes 1 and 4", steps: ["The sum is 5 and product is 4.", "Start with x² − 5x + 4.", "Multiply by 3: 3x² − 15x + 12."] },
          { title: "Given sum 4, product −5, and leading coefficient 2", steps: ["The monic form is x² − 4x − 5.", "Multiply every term by 2.", "The required polynomial is 2x² − 8x − 10."] }
        ]
      }
    ],
    olympiad: "If a problem gives only the zeroes, first state that the monic answer is unique but non-monic answers are its non-zero multiples. If a coefficient or integer-coefficient condition is added, apply that condition after forming the monic expression.",
    mistake: "Do not write x² + (α + β)x + αβ. The middle term has a minus sign: x² − (sum)x + product.",
    fact: {
      question: "Do two quadratics with the same zeroes have to be identical?",
      answer: "No. For example, x² − 5x + 6 and 2x² − 10x + 12 differ by a non-zero factor of 2, but both have zeroes 2 and 3."
    },
    examples: [
      { title: "Beginner · Zeroes 2 and 3", steps: ["Sum = 5; product = 6.", "The monic polynomial is x² − 5x + 6.", "Substitution: p(2) = 4 − 10 + 6 = 0 and p(3) = 9 − 15 + 6 = 0."] },
      { title: "Intermediate · Zeroes −1 and 6, leading coefficient 2", steps: ["Sum = 5 and product = −6.", "The monic form is x² − 5x − 6.", "Multiply by 2: 2x² − 10x − 12."] },
      { title: "Olympiad thinking · Use sum and product", steps: ["Suppose the zeroes have sum 1 and product −12.", "The monic polynomial is x² − 1x − 12.", "Factorisation gives (x − 4)(x + 3), whose zeroes 4 and −3 have the stated sum and product."] }
    ],
    questions: [
      { prompt: "What is the monic quadratic with zeroes −2 and 5?", options: ["x² − 3x − 10", "x² + 3x − 10", "x² − 7x + 10", "x² + 7x + 10"], answer: 0, steps: ["The sum is −2 + 5 = 3 and the product is −10.", "Use x² − (sum)x + product.", "The polynomial is x² − 3x − 10."] },
      { prompt: "What is the monic quadratic with zeroes 1 and 4?", options: ["x² + 5x + 4", "x² − 5x + 4", "x² − 4x + 5", "x² + 3x − 4"], answer: 1, steps: ["The sum is 1 + 4 = 5; the product is 4.", "The monic form is x² − 5x + 4.", "It factors as (x − 1)(x − 4), confirming the zeroes."] },
      { prompt: "A quadratic has zeroes 2 and 3 and leading coefficient 3. Which is it?", options: ["x² − 5x + 6", "3x² − 5x + 6", "3x² − 15x + 18", "3x² + 15x + 18"], answer: 2, steps: ["The monic quadratic is x² − 5x + 6.", "Multiply every term by the required leading coefficient 3.", "The result is 3x² − 15x + 18."] },
      { prompt: "The zeroes have sum 4 and product −5. What is the monic quadratic?", options: ["x² + 4x − 5", "x² − 4x − 5", "x² − 5x + 4", "x² + 5x + 4"], answer: 1, steps: ["For a monic quadratic, use x² − (sum)x + product.", "Substitute sum 4 and product −5.", "The result is x² − 4x − 5."] },
      { prompt: "What is a polynomial with zeroes 1/2 and −3 and integer coefficients?", options: ["x² + 5x/2 − 3/2", "2x² + 5x − 3", "2x² − 5x − 3", "x² − 5x/2 + 3/2"], answer: 1, steps: ["The sum is −5/2 and product is −3/2, so the monic form is x² + (5/2)x − 3/2.", "Multiply by 2 to clear denominators; multiplying by a non-zero constant preserves zeroes.", "One such integer-coefficient polynomial is 2x² + 5x − 3."] }
    ]
  },
  {
    id: "applications",
    title: "Olympiad Applications of Zeroes and Coefficients",
    level: ["Core Class 10", "Olympiad Extension"],
    summary: "Use the sum and product of roots to solve harder problems without finding each root.",
    intro: "Olympiad problems often ask for a new expression involving the zeroes—not for the zeroes themselves. A few identities let us answer directly from the coefficients.",
    sections: [
      {
        title: "Let the sum be S and the product be P",
        paragraphs: [
          "Write S = α + β and P = αβ. Then α² + β² = (α + β)² − 2αβ = S² − 2P.",
          "(α − β)² = (α + β)² − 4αβ = S² − 4P. Also α³ + β³ = (α + β)³ − 3αβ(α + β) = S³ − 3PS.",
          "When P ≠ 0, 1/α + 1/β = (α + β)/(αβ) = S/P. The non-zero condition matters because reciprocals of zero are undefined."
        ],
        examples: [
          { title: "Find α² + β² when S = 5 and P = 6", steps: ["Use α² + β² = S² − 2P.", "Substitute: 5² − 2(6) = 25 − 12.", "Therefore α² + β² = 13."] },
          { title: "Find α³ + β³ when S = 4 and P = 3", steps: ["Use α³ + β³ = S³ − 3PS.", "Substitute: 4³ − 3(3)(4) = 64 − 36.", "Therefore α³ + β³ = 28."] },
          { title: "Find the reciprocal sum when S = 5 and P = 6", steps: ["Since P = 6 ≠ 0, neither root is zero.", "Use 1/α + 1/β = S/P = 5/6.", "No individual root calculation is needed."] }
        ]
      },
      {
        title: "Build new equations from conditions",
        paragraphs: [
          "Coefficient relationships can also turn a condition on the roots into a condition on coefficients. First identify what the question gives you, then choose the matching identity.",
          "For expressions involving transformed roots, calculate their sum and product first; those two values determine a monic quadratic with the transformed roots."
        ],
        examples: [
          { title: "Roots of x² − 5x + 6: find the square-sum", steps: ["The original roots have S = 5 and P = 6.", "Their square-sum is S² − 2P = 25 − 12 = 13.", "Check by factoring: roots are 2 and 3, and 2² + 3² = 13."] },
          { title: "Build the quadratic for roots α + 1 and β + 1", steps: ["Their sum is (α + β) + 2 = S + 2.", "Their product is (α + 1)(β + 1) = P + S + 1.", "The monic quadratic is x² − (S + 2)x + (P + S + 1)."] }
        ]
      }
    ],
    olympiad: "A useful habit: pause before solving for α and β. If the target is symmetric in the two roots—unchanged when α and β swap—rewrite it using S and P first. This often removes unnecessary radicals or long calculations.",
    mistake: "Do not use S/P for reciprocal roots when P = 0. If the product is zero, at least one root is zero, so its reciprocal does not exist.",
    fact: {
      question: "Can α² + β² be found without knowing α and β individually?",
      answer: "Yes. If their sum is S and product is P, then α² + β² = (α + β)² − 2αβ = S² − 2P."
    },
    examples: [
      { title: "Beginner · Square-sum from coefficients", steps: ["For x² − 5x + 6, S = 5 and P = 6.", "α² + β² = S² − 2P = 25 − 12 = 13.", "Factoring gives roots 2 and 3, which verify 4 + 9 = 13."] },
      { title: "Intermediate · Difference squared", steps: ["Suppose S = 7 and P = 10.", "Use (α − β)² = S² − 4P.", "So (α − β)² = 49 − 40 = 9."] },
      { title: "Olympiad thinking · Cubes without roots", steps: ["Suppose S = 4 and P = 3.", "Use α³ + β³ = S³ − 3PS.", "The value is 64 − 36 = 28, without solving for either root."] }
    ],
    questions: [
      { prompt: "If α + β = 5 and αβ = 6, what is α² + β²?", options: ["13", "19", "25", "37"], answer: 0, steps: ["Use α² + β² = (α + β)² − 2αβ.", "Substitute: 5² − 2(6) = 25 − 12.", "The answer is 13."] },
      { prompt: "If α + β = 4 and αβ = 3, what is α³ + β³?", options: ["16", "28", "37", "64"], answer: 1, steps: ["Use α³ + β³ = (α + β)³ − 3αβ(α + β).", "Substitute: 4³ − 3(3)(4) = 64 − 36.", "The answer is 28."] },
      { prompt: "If α + β = 7 and αβ = 10, what is (α − β)²?", options: ["9", "29", "49", "89"], answer: 0, steps: ["Use (α − β)² = (α + β)² − 4αβ.", "Substitute: 7² − 4(10) = 49 − 40.", "The answer is 9."] },
      { prompt: "If α + β = 5 and αβ = 6, what is 1/α + 1/β?", options: ["5/6", "6/5", "11/6", "1/6"], answer: 0, steps: ["The product 6 is non-zero, so both reciprocals exist.", "Combine: 1/α + 1/β = (α + β)/(αβ).", "The value is 5/6."] },
      { prompt: "The roots of a quadratic have sum 3 and product 2. What is their square-sum?", options: ["1", "5", "9", "13"], answer: 1, steps: ["Use α² + β² = S² − 2P.", "Substitute S = 3 and P = 2: 9 − 4 = 5.", "The square-sum is 5."] }
    ]
  },
  {
    id: "toolkit",
    title: "Previous-Class Polynomial Toolkit",
    level: ["Prerequisite Revision", "Enrichment"],
    summary: "Refresh essential algebraic operations, identities, and factorisation used in this chapter.",
    intro: "These tools support the Class 10 core; they are revision, not extra Class 10 syllabus claims. A confident factorisation can turn a long equation into a short one.",
    sections: [
      {
        title: "Combine, multiply, and factor",
        paragraphs: [
          "Add or subtract like terms: terms are like when their variable parts and exponents match. To multiply polynomials, use the distributive property and then combine like terms.",
          "Factorisation reverses multiplication. Look for a common factor, a difference of squares, or a familiar quadratic pattern."
        ],
        examples: [
          { title: "Add like terms", steps: ["(2x² + 3x) + (x² − 5x + 4)", "Combine x² terms and x terms: 3x² − 2x + 4.", "Unlike powers cannot be combined."] },
          { title: "Multiply two binomials", steps: ["(x + 2)(x + 3) = x(x + 3) + 2(x + 3).", "Expand: x² + 3x + 2x + 6.", "Combine: x² + 5x + 6."] },
          { title: "Factor a difference of squares", steps: ["x² − 9 = x² − 3².", "Use a² − b² = (a − b)(a + b).", "So x² − 9 = (x − 3)(x + 3), and its zeroes are 3 and −3."] }
        ]
      },
      {
        title: "Useful identities",
        paragraphs: [
          "Square identities: (a + b)² = a² + 2ab + b² and (a − b)² = a² − 2ab + b².",
          "Difference of squares: a² − b² = (a − b)(a + b). For cubes: a³ + b³ = (a + b)(a² − ab + b²), and a³ − b³ = (a − b)(a² + ab + b²).",
          "Use each identity only when the expression matches its pattern. Remainder and Factor Theorems are not needed for the Class 10 core lessons here, so they are not presented as prescribed content."
        ],
        examples: [
          { title: "Use a square identity", steps: ["Expand (x − 4)² using (a − b)².", "The result is x² − 8x + 16.", "Check by multiplying (x − 4)(x − 4)."] },
          { title: "Use a cube identity", steps: ["Factor x³ − 8 as x³ − 2³.", "Apply a³ − b³ = (a − b)(a² + ab + b²).", "So x³ − 8 = (x − 2)(x² + 2x + 4)."] }
        ]
      }
    ],
    olympiad: "When a quadratic looks difficult, search for a common factor or identity before reaching for a formula. Factorisation is especially useful when the coefficients are small integers and the product of the constant and leading coefficients has only a few factor pairs.",
    mistake: "Do not combine unlike terms: x² + x is not 2x². Their exponents differ, so they represent different kinds of terms.",
    fact: {
      question: "Why does a² − b² factor but a² + b² usually not factor into real linear factors?",
      answer: "The difference identity gives a² − b² = (a − b)(a + b). A sum of two real squares is non-negative and has no corresponding real linear factorisation in general."
    },
    examples: [
      { title: "Beginner · Combine like terms", steps: ["Simplify 5x + 2x − 3.", "Combine the x terms: 7x − 3.", "The constant −3 remains separate."] },
      { title: "Intermediate · Factorise", steps: ["Factor x² + 7x + 12.", "Find two numbers with product 12 and sum 7: 3 and 4.", "Thus x² + 7x + 12 = (x + 3)(x + 4)."] },
      { title: "Olympiad thinking · Choose a useful identity", steps: ["Factor 25y² − 1.", "Recognise (5y)² − 1², a difference of squares.", "So 25y² − 1 = (5y − 1)(5y + 1)."] }
    ],
    questions: [
      { prompt: "Simplify (2x² + 3x) + (x² − 5x + 4).", options: ["3x² − 2x + 4", "3x² + 8x + 4", "2x² − 2x + 4", "3x² − 2x − 4"], answer: 0, steps: ["Combine the x² terms: 2x² + x² = 3x².", "Combine the x terms: 3x − 5x = −2x.", "Keep the constant 4; the result is 3x² − 2x + 4."] },
      { prompt: "What is (x + 2)(x + 3)?", options: ["x² + 5x + 6", "x² + 6x + 5", "x² + x + 6", "x² + 5"], answer: 0, steps: ["Multiply each term: x·x + x·3 + 2·x + 2·3.", "This gives x² + 3x + 2x + 6.", "Combine like terms: x² + 5x + 6."] },
      { prompt: "Factor x² − 16.", options: ["(x − 8)(x + 2)", "(x − 4)(x + 4)", "(x − 4)²", "(x − 16)(x + 1)"], answer: 1, steps: ["Recognise x² − 16 = x² − 4².", "Apply a² − b² = (a − b)(a + b).", "The factorisation is (x − 4)(x + 4)."] },
      { prompt: "Expand (x − 3)².", options: ["x² − 9", "x² − 6x + 9", "x² + 6x + 9", "x² − 3x + 9"], answer: 1, steps: ["Use (a − b)² = a² − 2ab + b².", "With a = x and b = 3, the middle term is −6x.", "The result is x² − 6x + 9."] },
      { prompt: "Factor x³ − 8.", options: ["(x − 2)(x² + 2x + 4)", "(x − 2)(x² − 2x + 4)", "(x + 2)(x² + 2x + 4)", "(x − 4)(x² + 2)"], answer: 0, steps: ["Write x³ − 8 as x³ − 2³.", "Use a³ − b³ = (a − b)(a² + ab + b²).", "The result is (x − 2)(x² + 2x + 4)."] }
    ]
  },
  {
    id: "revision",
    title: "Formula Sheet and Revision",
    level: ["Core Class 10", "Olympiad Extension", "Quick revision"],
    summary: "Review key definitions, formulas, graph facts, conditions, and common traps.",
    intro: "A good formula sheet is a map, not a replacement for understanding. Use this page to refresh the ideas, then try the short worked examples and practice set.",
    sections: [
      {
        title: "Core facts at a glance",
        paragraphs: [
          "Polynomial in x: a finite sum of terms whose exponents are non-negative integers. The degree is the greatest exponent with a non-zero coefficient; the zero polynomial’s degree is undefined in the usual school-level convention.",
          "Zero: α is a zero of p(x) exactly when p(α) = 0. Graphically, real zeroes are the x-coordinates where y = p(x) meets the x-axis.",
          "For p(x) = ax² + bx + c with a ≠ 0 and zeroes α, β: α + β = −b/a and αβ = c/a."
        ],
        examples: [
          { title: "Derive a monic quadratic from its zeroes", steps: ["For zeroes α and β, multiply (x − α)(x − β).", "Expansion gives x² − (α + β)x + αβ.", "If a different leading coefficient is required, multiply the whole polynomial by that non-zero value."] },
          { title: "Useful derived identities", steps: ["Let S = α + β and P = αβ.", "α² + β² = S² − 2P; (α − β)² = S² − 4P.", "α³ + β³ = S³ − 3PS.", "If P ≠ 0, 1/α + 1/β = S/P."] }
        ]
      },
      {
        title: "A quick checking routine",
        paragraphs: [
          "Before finishing: verify the leading coefficient is non-zero when using quadratic formulas; check signs in −b/a; substitute proposed zeroes into the original polynomial; and state when a reciprocal requires non-zero roots.",
          "Keep prescribed Class 10 ideas separate from prerequisite revision and enrichment. A useful technique is not automatically an official syllabus requirement."
        ],
        examples: [
          { title: "Fast check: 3x² − 8x + 4", steps: ["Sum of zeroes = −(−8)/3 = 8/3.", "Product of zeroes = 4/3.", "Factor: (3x − 2)(x − 2); roots are 2/3 and 2.", "Check: sum = 8/3 and product = 4/3."] }
        ]
      }
    ],
    olympiad: "For a symmetric expression in two roots, first translate the information into S = α + β and P = αβ. Then choose an identity. This compact routine is often more reliable than solving for each root and substituting.",
    mistake: "Common traps: dropping the minus sign in −b/a; forgetting to divide by a; confusing the root with its graph’s y-coordinate; and using a reciprocal formula when a root is zero.",
    fact: {
      question: "What is the fastest independent check on a proposed pair of quadratic zeroes?",
      answer: "Check both their sum and product against −b/a and c/a. If either fails, the proposed pair cannot be the zeroes."
    },
    examples: [
      { title: "Beginner · Read the formulas", steps: ["For x² − 9, a = 1, b = 0, c = −9.", "Sum of zeroes is 0; product is −9.", "The roots 3 and −3 verify these values."] },
      { title: "Intermediate · Use the square-sum formula", steps: ["For 2x² − 7x + 3, S = 7/2 and P = 3/2.", "α² + β² = S² − 2P = 49/4 − 3.", "So α² + β² = 37/4."] },
      { title: "Olympiad thinking · Avoid solving", steps: ["A quadratic has root sum 6 and product 5. Find the square-sum.", "Use S² − 2P = 36 − 10.", "The answer is 26; the actual roots are not needed."] }
    ],
    questions: [
      { prompt: "What is the sum of the zeroes of 3x² − 8x + 4?", options: ["−8/3", "8/3", "4/3", "−4/3"], answer: 1, steps: ["Use sum = −b/a.", "Here a = 3 and b = −8, so the sum is 8/3.", "The factorisation (3x − 2)(x − 2) confirms roots 2/3 and 2, whose sum is 8/3."] },
      { prompt: "What is the product of the zeroes of 3x² − 8x + 4?", options: ["−8/3", "8/3", "4/3", "−4/3"], answer: 2, steps: ["Use product = c/a.", "Here c = 4 and a = 3.", "The product is 4/3."] },
      { prompt: "How many distinct real zeroes does x² − 9 have?", options: ["0", "1", "2", "9"], answer: 2, steps: ["Factor x² − 9 = (x − 3)(x + 3).", "The zeroes are 3 and −3.", "They are distinct, so there are two."] },
      { prompt: "If α + β = 6 and αβ = 5, what is α² + β²?", options: ["16", "26", "36", "46"], answer: 1, steps: ["Use α² + β² = (α + β)² − 2αβ.", "Substitute: 6² − 2(5) = 36 − 10.", "The answer is 26."] },
      { prompt: "Which condition is required for the quadratic zero-coefficient formulas for ax² + bx + c?", options: ["a = 0", "a ≠ 0", "b = 0", "c ≠ 0"], answer: 1, steps: ["The formulas divide by the leading coefficient a.", "A quadratic must have a non-zero x² coefficient.", "Therefore the required condition is a ≠ 0."] }
    ]
  }
];
