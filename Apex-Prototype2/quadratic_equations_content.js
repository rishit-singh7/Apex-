window.apexQuadraticTopics = [
  {
    id: "foundations",
    title: "Understanding Quadratic Equations",
    level: ["Core · Class 10", "Prerequisite Revision"],
    summary: "Recognise quadratic equations, write standard form, and identify a, b and c.",
    intro: "A rectangle’s area can depend on a length multiplied by itself. That squared variable is the clue that an equation may be quadratic.",
    visual: "anatomy",
    sections: [
      {
        title: "Expression, equation, and solution",
        paragraphs: [
          "An expression such as x² − 5x + 6 has no equals sign. An equation says that two quantities are equal: x² − 5x + 6 = 0. A solution is a value of x that makes the equation true.",
          "A quadratic equation in one variable can be written ax² + bx + c = 0, where a, b and c are real numbers and a ≠ 0. The coefficient a cannot be zero: if it were, the x² term would disappear and the equation would not be quadratic.",
          "The coefficients can be zero individually: b = 0 or c = 0 is allowed. Only a must be non-zero."
        ],
        examples: [
          { title: "Identify the coefficients in 3x² − 5x + 2 = 0", steps: ["Compare each term with ax² + bx + c = 0.", "The x² coefficient is a = 3; the x coefficient is b = −5.", "The constant is c = 2. Keep the minus sign with b."] },
          { title: "Put 2x² + 3x = 5 into standard form", steps: ["Subtract 5 from both sides: 2x² + 3x − 5 = 0.", "Now a = 2, b = 3, c = −5.", "The equation is quadratic because a = 2 is not zero."] },
          { title: "Spot a non-quadratic equation", steps: ["In 4x + 7 = 0, there is no x² term, so a = 0.", "It is a linear equation, not a quadratic equation.", "In x³ − x = 0, the highest power is 3, so it is cubic rather than quadratic."] }
        ]
      },
      {
        title: "A quick recognition checklist",
        bullets: [
          "Move all terms to one side so the equation equals zero.",
          "Combine like terms and look at the highest power of x.",
          "It is quadratic exactly when the highest power is 2 and its coefficient is non-zero.",
          "An equation with a denominator or square root may still simplify to a quadratic, but check for excluded values before clearing denominators."
        ]
      }
    ],
    examples: [
      { title: "Rewrite and identify x² − 4 = 3x", steps: ["Subtract 3x from both sides: x² − 3x − 4 = 0.", "Read the coefficients: a = 1, b = −3, c = −4.", "The equation is quadratic because its x² coefficient is 1."] }
    ],
    olympiad: "Before using a quadratic formula, simplify the equation. For example, 2x² = 8x can be divided by 2 to become x² − 4x = 0. Dividing by a non-zero common factor preserves the solutions and makes the coefficients smaller.",
    mistake: "When moving terms, keep their signs. In 2x² + 3x = 5, the standard-form constant is −5, not +5.",
    fact: {
      question: "Can a quadratic equation have b = 0 or c = 0?",
      answer: "Yes. For example, x² − 9 = 0 has b = 0, and x² + 4x = 0 has c = 0. The only required non-zero coefficient is a, the coefficient of x²."
    },
    questions: [
      { prompt: "Which equation is quadratic in x?", level: "Core", options: ["3x² − 2x + 1 = 0", "3x + 2 = 0", "x³ − 1 = 0", "2/x + 1 = 0"], answer: 0, steps: ["A quadratic equation has highest power 2 after simplifying.", "The first equation has a non-zero x² coefficient and no higher power.", "The others are linear, cubic, or not in quadratic polynomial form."] },
      { prompt: "What are a, b and c in 4x² − 7x + 9 = 0?", level: "Core", options: ["a = 4, b = −7, c = 9", "a = 4, b = 7, c = 9", "a = −7, b = 4, c = 9", "a = 9, b = −7, c = 4"], answer: 0, steps: ["Match the equation to ax² + bx + c = 0.", "The x² coefficient is 4, the x coefficient is −7, and the constant is 9.", "Therefore a = 4, b = −7, c = 9."] },
      { prompt: "Write 2x² + 5 = 7x in standard form.", level: "Core", options: ["2x² + 7x + 5 = 0", "2x² − 7x + 5 = 0", "2x² + 7x − 5 = 0", "7x − 2x² + 5 = 0"], answer: 1, steps: ["Subtract 7x from both sides to bring all terms to the left.", "This gives 2x² − 7x + 5 = 0.", "The x coefficient is negative after moving 7x."] },
      { prompt: "Why must a be non-zero in ax² + bx + c = 0?", level: "Core", options: ["Otherwise the equation would have no constant.", "Otherwise the x² term disappears and the equation is not quadratic.", "Because b and c must then be positive.", "Because every quadratic has two integer roots."], answer: 1, steps: ["The defining feature of a quadratic is a non-zero x² term.", "If a = 0, the equation reduces to bx + c = 0 or a constant equation.", "So a must not be zero."] },
      { prompt: "Which equation has a = 1, b = 0 and c = −16?", level: "Challenge", options: ["x² − 16 = 0", "x² + 16x = 0", "−x² + 16 = 0", "x² − 16x = 0"], answer: 0, steps: ["Substitute the coefficients into ax² + bx + c = 0.", "This gives x² + 0x − 16 = 0.", "That is x² − 16 = 0."] }
    ]
  },
  {
    id: "factorisation",
    title: "Solving by Factorisation",
    level: ["Core · Class 10", "Prerequisite Revision"],
    summary: "Factor the quadratic and use the zero-product property to find its roots.",
    intro: "A product is zero only when at least one of its factors is zero. Factoring lets us turn one quadratic equation into two simple choices.",
    visual: "factor-branches",
    sections: [
      {
        title: "Factor, then set each factor to zero",
        paragraphs: [
          "The zero-product property says that if A × B = 0, then A = 0 or B = 0. It is the key step that turns a factorisation into solutions.",
          "For a monic quadratic x² + px + q, look for two numbers whose product is q and whose sum is p. For other coefficients, splitting the middle term can help: find two terms that add to b and multiply to ac.",
          "After factoring, set each factor equal to zero, solve both small equations, and substitute each root into the original equation."
        ],
        examples: [
          { title: "Solve x² − 5x + 6 = 0", steps: ["Find two numbers with product 6 and sum −5: −2 and −3.", "Factor: (x − 2)(x − 3) = 0.", "So x − 2 = 0 or x − 3 = 0, giving x = 2 or x = 3.", "Check: 2² − 5(2) + 6 = 0 and 3² − 5(3) + 6 = 0."] },
          { title: "Solve 2x² + 7x + 3 = 0 by splitting the middle term", steps: ["Here ac = 2 × 3 = 6. The numbers 6 and 1 multiply to 6 and add to 7.", "Split 7x: 2x² + 6x + x + 3 = 0.", "Group: 2x(x + 3) + 1(x + 3) = 0, so (2x + 1)(x + 3) = 0.", "Thus x = −1/2 or x = −3."] }
        ]
      },
      {
        title: "When factoring is not quick",
        paragraphs: [
          "Not every quadratic factors neatly into integer factors. If a factor pair is hard to spot, do not force a guess: use the quadratic formula instead.",
          "Always check a factorisation by multiplying it out. A sign error in the middle term changes the roots."
        ]
      }
    ],
    examples: [
      { title: "Solve x² + x − 12 = 0", steps: ["Choose numbers with product −12 and sum 1: 4 and −3.", "Factor: (x + 4)(x − 3) = 0.", "The roots are x = −4 and x = 3.", "Check: (−4)² − 4 − 12 = 0; 3² + 3 − 12 = 0."] }
    ],
    olympiad: "For integer-coefficient quadratics, an integer root must divide the constant term. Testing the divisors of the constant can find a factor quickly—but only use this shortcut when you are looking for integer roots.",
    mistake: "From (x − 2)(x − 3) = 0, the roots are 2 and 3, not −2 and −3. Solve each factor equation carefully.",
    fact: {
      question: "If a product of three factors is zero, can more than one factor be zero?",
      answer: "Yes. The product is zero if at least one factor is zero, and two or more factors could be zero at the same value. For example, (x − 1)²(x + 2) = 0 has x = 1 as a repeated root and x = −2 as another root."
    },
    questions: [
      { prompt: "Solve x² − 7x + 12 = 0.", level: "Core", options: ["x = 3 or x = 4", "x = −3 or x = −4", "x = 2 or x = 6", "x = 1 or x = 12"], answer: 0, steps: ["Find two numbers whose product is 12 and sum is −7: −3 and −4.", "Factor: (x − 3)(x − 4) = 0.", "Therefore x = 3 or x = 4; substitution makes the original equation zero for both."] },
      { prompt: "Solve 2x² + 7x + 3 = 0.", level: "Core", options: ["x = −3 or x = −1/2", "x = 3 or x = 1/2", "x = −1 or x = −3/2", "x = 3 or x = −1/2"], answer: 0, steps: ["Split 7x into 6x + x: 2x² + 6x + x + 3.", "Factor by grouping: (2x + 1)(x + 3) = 0.", "Thus x = −1/2 or x = −3."] },
      { prompt: "Which factorisation equals x² + x − 12?", level: "Core", options: ["(x + 4)(x − 3)", "(x − 4)(x + 3)", "(x + 6)(x − 2)", "(x − 6)(x + 2)"], answer: 0, steps: ["The constants in the factors must multiply to −12.", "The pair 4 and −3 also adds to 1, the coefficient of x.", "Multiplying (x + 4)(x − 3) gives x² + x − 12."] },
      { prompt: "If (x + 2)(x − 5) = 0, what are the solutions?", level: "Core", options: ["x = 2 or x = 5", "x = −2 or x = 5", "x = 2 or x = −5", "x = −2 or x = −5"], answer: 1, steps: ["By the zero-product property, x + 2 = 0 or x − 5 = 0.", "Solving gives x = −2 or x = 5.", "Each value makes one factor zero."] },
      { prompt: "Which is the best next method if a quadratic does not factor easily over integers?", level: "Challenge", options: ["Assume it has integer roots.", "Use the quadratic formula.", "Discard the equation.", "Change its constant term."], answer: 1, steps: ["Some quadratics do not have simple integer factors.", "The quadratic formula applies to every quadratic with a ≠ 0 and gives the real roots when they exist.", "So use the formula rather than forcing an integer factorisation."] }
    ]
  },
  {
    id: "completing-square",
    title: "Completing the Square",
    level: ["Olympiad Extension · Supporting derivation", "Prerequisite Revision"],
    summary: "Build a perfect square visually and see the key idea behind the quadratic formula.",
    intro: "What small piece turns x² + 6x into a perfect square? Completing the square adds exactly the missing area.",
    visual: "square-area",
    sections: [
      {
        title: "The area model",
        paragraphs: [
          "A square with side x has area x². Add two rectangular strips, each x by 3, and one 3-by-3 corner square. Together they make a larger square with side x + 3.",
          "So x² + 3x + 3x + 9 = (x + 3)². The matching rule is x² + 2px + p² = (x + p)².",
          "For x² + bx, half of b is b/2. Add (b/2)² to make a square: x² + bx + (b/2)² = (x + b/2)²."
        ],
        examples: [
          { title: "Complete x² + 8x", steps: ["Half the x coefficient 8: half is 4.", "Square 4: add 16.", "Then x² + 8x + 16 = (x + 4)².", "The added 16 completes the square; it must also be added to the other side of an equation."] }
        ]
      },
      {
        title: "Solve by completing the square",
        paragraphs: [
          "The NCERT chapter also demonstrates solving by completing the square. The 2026–27 CBSE curriculum lists factorisation and the quadratic formula as the solving methods; this chapter presents completing the square as enrichment and as the derivation behind the formula, not as a separately prescribed CBSE method.",
          "For a non-monic equation, first divide by a (which is non-zero), then add the square of half the x coefficient to both sides."
        ],
        examples: [
          { title: "Solve x² + 6x + 5 = 0 by completing the square", steps: ["Move 5: x² + 6x = −5.", "Half of 6 is 3; add 3² = 9 to both sides: x² + 6x + 9 = 4.", "Write the left side as a square: (x + 3)² = 4.", "Take both square roots: x + 3 = 2 or x + 3 = −2.", "Thus x = −1 or x = −5. Both satisfy the original equation."] }
        ]
      }
    ],
    examples: [
      { title: "Complete x² − 10x + 7 = 0", steps: ["Move the constant: x² − 10x = −7.", "Half of −10 is −5; add (−5)² = 25 to each side.", "Then (x − 5)² = 18.", "So x = 5 ± √18 = 5 ± 3√2. The two real roots are exact, even though they are not integers."] }
    ],
    olympiad: "Keep both square-root branches. From (x − 5)² = 18, writing only x − 5 = √18 would lose the smaller root.",
    mistake: "Completing the square requires adding the same number to both sides. Adding it to just one side changes the equation.",
    fact: {
      question: "Why do we add the square of half the x coefficient?",
      answer: "Expanding (x + p)² gives x² + 2px + p². To match bx, choose p = b/2, so the missing constant is p² = (b/2)²."
    },
    questions: [
      { prompt: "What number completes x² + 10x to a perfect square?", level: "Core", options: ["5", "10", "25", "100"], answer: 2, steps: ["Take half the coefficient of x: 10/2 = 5.", "Square it: 5² = 25.", "Thus x² + 10x + 25 = (x + 5)²."] },
      { prompt: "Which identity is correct?", level: "Core", options: ["x² + 6x + 9 = (x + 3)²", "x² + 6x + 9 = (x + 9)²", "x² + 6x + 9 = (x − 3)²", "x² + 6x + 9 = (x + 6)²"], answer: 0, steps: ["Expand (x + 3)² = x² + 6x + 9.", "The middle term is twice x times 3, and the final term is 3².", "The first identity is correct."] },
      { prompt: "Solve x² + 6x + 5 = 0 by completing the square.", level: "Challenge", options: ["x = 1 or x = 5", "x = −1 or x = −5", "x = −3 only", "No real solutions"], answer: 1, steps: ["Move 5: x² + 6x = −5.", "Add 9: (x + 3)² = 4.", "So x + 3 = ±2, giving x = −1 or x = −5; substitution verifies both."] },
      { prompt: "When completing the square in x² − 8x = 3, what should be added to both sides?", level: "Core", options: ["8", "16", "−16", "64"], answer: 1, steps: ["Half of −8 is −4.", "Square −4 to get 16.", "Add 16 to each side, giving (x − 4)² = 19."] },
      { prompt: "Why does completing the square lead to both plus and minus roots?", level: "Challenge", options: ["Every number has two signs.", "A positive square has two real square roots, one positive and one negative.", "The equation is multiplied by two.", "The constant term changes sign."], answer: 1, steps: ["If u² = k with k > 0, then both u = √k and u = −√k square to k.", "Both branches must be considered when solving.", "Leaving out one branch would miss a root."] }
    ]
  },
  {
    id: "quadratic-formula",
    title: "The Quadratic Formula",
    level: ["Core · Class 10"],
    summary: "Derive and use the formula for the real roots of any quadratic equation.",
    intro: "When a quadratic refuses to factor neatly, the formula is a reliable route. It is not magic: it comes from completing the square.",
    visual: "formula-flow",
    sections: [
      {
        title: "Derive the formula",
        paragraphs: [
          "Start with ax² + bx + c = 0, where a ≠ 0. Divide by a so the coefficient of x² is 1: x² + (b/a)x + c/a = 0.",
          "Move the constant and add the square of half the x coefficient to both sides: x² + (b/a)x + (b/2a)² = (b² − 4ac)/(4a²).",
          "The left side is (x + b/2a)². Multiply both sides by 4a² to get (2ax + b)² = b² − 4ac.",
          "Take both square roots: 2ax + b = ±√(b² − 4ac). Subtract b and divide by 2a, which is non-zero because a ≠ 0. Therefore x = (−b ± √(b² − 4ac))/(2a).",
          "The ± means calculate both branches. A real answer exists only when the quantity under the square root is non-negative."
        ],
        examples: [
          { title: "Solve x² − 5x + 1 = 0", steps: ["Read a = 1, b = −5, c = 1.", "The discriminant is b² − 4ac = 25 − 4 = 21.", "Substitute: x = (5 ± √21)/2.", "Check either sign: x² − 5x + 1 = [(23 ± 5√21) − (25 ± 5√21)]/2 + 1 = 0.", "So both exact real roots, (5 + √21)/2 and (5 − √21)/2, satisfy the original equation."] },
          { title: "Solve 2x² + x − 3 = 0", steps: ["Here a = 2, b = 1, c = −3.", "D = 1² − 4(2)(−3) = 25.", "x = (−1 ± 5)/4, so x = 1 or x = −3/2.", "Check: 2(1)² + 1 − 3 = 0; for −3/2, 2(9/4) − 3/2 − 3 = 0."] }
        ]
      },
      {
        title: "Which method should you choose?",
        paragraphs: [
          "If integer factors are easy to see, factorisation is often quicker. If the roots are awkward, fractional, or not rational, use the formula.",
          "Before substituting, write a, b and c with their signs. A negative b changes −b, and a negative c changes the sign in −4ac."
        ]
      }
    ],
    examples: [
      { title: "Solve 3x² − 2x − 1 = 0", steps: ["Read a = 3, b = −2 and c = −1.", "D = (−2)² − 4(3)(−1) = 16.", "x = (2 ± 4)/6.", "The roots are x = 1 and x = −1/3.", "Check: 3 − 2 − 1 = 0; and 3(1/9) + 2/3 − 1 = 0."] }
    ],
    olympiad: "If the discriminant is a perfect square, the formula may simplify to rational roots. Still reduce the final fractions and check both signs before deciding whether the roots are integers.",
    mistake: "The denominator is 2a, not just 2. Preserve parentheses around the signed values of b and c when calculating the discriminant.",
    fact: {
      question: "Why does the formula contain both + and −?",
      answer: "After completing the square we reach (2ax + b)² = D. When D > 0, a quantity whose square is D can be √D or −√D, so both branches produce roots."
    },
    questions: [
      { prompt: "Solve x² − 5x + 1 = 0.", level: "Core", options: ["(5 ± √21)/2", "(-5 ± √21)/2", "(5 ± √29)/2", "(5 ± 21)/2"], answer: 0, steps: ["Here a = 1, b = −5, c = 1.", "D = (−5)² − 4(1)(1) = 21.", "The formula gives x = (5 ± √21)/2.", "Substitution gives x² − 5x + 1 = [(23 ± 5√21) − (25 ± 5√21)]/2 + 1 = 0 for either sign."] },
      { prompt: "Solve 2x² + x − 3 = 0.", level: "Core", options: ["x = 1 or x = −3/2", "x = −1 or x = 3/2", "x = 1/2 or x = −3", "x = 3 or x = −1/2"], answer: 0, steps: ["a = 2, b = 1, c = −3, so D = 25.", "x = (−1 ± 5)/4.", "This gives x = 1 or x = −3/2; substitution confirms both."] },
      { prompt: "Solve 3x² − 2x − 1 = 0.", level: "Core", options: ["x = 1 or x = −1/3", "x = −1 or x = 1/3", "x = 1/3 or x = −1", "x = 2 or x = −1"], answer: 0, steps: ["D = (−2)² − 4(3)(−1) = 16.", "x = (2 ± 4)/6.", "The results are 1 and −1/3; both make the original expression zero."] },
      { prompt: "For x² + 2x − 2 = 0, what are the roots?", level: "Challenge", options: ["−1 ± √3", "1 ± √3", "−2 ± √3", "−1 ± √2"], answer: 0, steps: ["a = 1, b = 2, c = −2, so D = 4 + 8 = 12.", "x = (−2 ± √12)/2.", "Since √12 = 2√3, the roots are −1 ± √3."] },
      { prompt: "For which equation should the quadratic formula be preferred over guessing integer factors?", level: "Challenge", options: ["x² − 5x + 6 = 0", "x² − 9 = 0", "2x² + 2x − 1 = 0", "x² + 5x + 6 = 0"], answer: 2, steps: ["The first, second, and fourth equations factor readily over integers.", "For 2x² + 2x − 1, no integer factor pair gives the middle term and constant.", "The formula applies directly and produces the exact roots."] }
    ]
  },
  {
    id: "discriminant",
    title: "Discriminant and Nature of Real Roots",
    level: ["Core · Class 10"],
    summary: "Use D = b² − 4ac to predict the number of real roots before solving.",
    intro: "A parabola may cross the x-axis twice, touch it once, or miss it completely. The discriminant predicts which picture belongs to a quadratic.",
    sections: [
      {
        title: "Why the discriminant decides",
        paragraphs: [
          "In the quadratic formula, x = (−b ± √D)/(2a), where D = b² − 4ac. For real roots, the square root √D must be real.",
          "If D > 0, √D is positive and the plus/minus branches give two distinct real roots. If D = 0, both branches give the same real root. If D < 0, no real number has square D, so the equation has no real roots.",
          "This chapter studies real roots only; it does not introduce complex-number solutions for D < 0."
        ],
        examples: [
          { title: "Classify x² − 5x + 6 = 0", steps: ["a = 1, b = −5, c = 6.", "D = 25 − 24 = 1 > 0.", "There are two distinct real roots; factoring gives x = 2 and x = 3."] },
          { title: "Classify x² − 4x + 4 = 0", steps: ["D = (−4)² − 4(1)(4) = 16 − 16 = 0.", "There is one repeated real root.", "The equation is (x − 2)² = 0, so the repeated root is 2."] },
          { title: "Classify x² + 1 = 0", steps: ["a = 1, b = 0, c = 1.", "D = 0 − 4 = −4 < 0.", "There are no real roots because a real square cannot be negative."] }
        ]
      }
    ],
    graphs: [
      { title: "D > 0 · two distinct real roots", a: 1, b: -5, c: 6, xMin: -1, xMax: 6, yMin: -2, yMax: 12, rootLabels: ["2", "3"] },
      { title: "D = 0 · one repeated real root", a: 1, b: -4, c: 4, xMin: -1, xMax: 5, yMin: -2, yMax: 12, rootLabels: ["2"] },
      { title: "D < 0 · no real roots", a: 1, b: 0, c: 1, xMin: -3, xMax: 3, yMin: -1, yMax: 10, rootLabels: [] }
    ],
    examples: [
      { title: "Find k so x² + kx + 9 = 0 has equal real roots", steps: ["Equal roots require D = 0.", "D = k² − 4(1)(9) = k² − 36.", "Set k² − 36 = 0: (k − 6)(k + 6) = 0.", "Therefore k = 6 or k = −6."] }
    ],
    olympiad: "If a parameter question asks only for the nature of the roots, use D directly. You often do not need to calculate either root.",
    mistake: "D < 0 means no real roots, not “no roots of any kind”. This chapter makes no claim about complex roots.",
    fact: {
      question: "Can D > 0 give two real roots that are not integers?",
      answer: "Yes. For x² − 2 = 0, D = 8 > 0 and the roots are √2 and −√2. They are two distinct real roots, but neither is an integer."
    },
    questions: [
      { prompt: "What does D > 0 tell us about a quadratic equation?", level: "Core", options: ["Two distinct real roots", "One repeated real root", "No real roots", "It is not quadratic"], answer: 0, steps: ["D is the quantity under the square root in the formula.", "When D > 0, √D is positive and the plus/minus values differ.", "Therefore there are two distinct real roots."] },
      { prompt: "How many real roots does x² − 4x + 4 = 0 have?", level: "Core", options: ["No real roots", "One repeated real root", "Two distinct real roots", "Three real roots"], answer: 1, steps: ["D = (−4)² − 4(1)(4) = 0.", "A zero discriminant makes the plus/minus formula branches equal.", "The repeated root is x = 2."] },
      { prompt: "How many real roots does x² + 1 = 0 have?", level: "Core", options: ["Two distinct real roots", "One repeated real root", "No real roots", "One real root at 1"], answer: 2, steps: ["D = 0² − 4(1)(1) = −4.", "The square root of a negative number is not real.", "Thus the equation has no real roots."] },
      { prompt: "For what values of k does x² + kx + 9 = 0 have equal real roots?", level: "Challenge", options: ["k = 3 or −3", "k = 6 or −6", "k = 9 only", "k = 0 only"], answer: 1, steps: ["Equal roots require D = 0.", "k² − 36 = 0, so (k − 6)(k + 6) = 0.", "Thus k is 6 or −6."] },
      { prompt: "Which equation has two distinct real roots that are not integers?", level: "Challenge", options: ["x² − 2 = 0", "x² − 4 = 0", "x² = 0", "x² + 2 = 0"], answer: 0, steps: ["For x² − 2 = 0, the roots are ±√2, two distinct real non-integers.", "x² − 4 has integer roots ±2; x² has one repeated root.", "x² + 2 has no real roots."] }
    ]
  },
  {
    id: "roots-coefficients",
    title: "Roots and Coefficients",
    level: ["Connection to Polynomials · Olympiad Extension"],
    summary: "Derive the sum and product of roots and build equations from known roots.",
    intro: "If you know the roots, you can build the quadratic. If you know the coefficients, their pattern reveals the sum and product of the roots.",
    sections: [
      {
        title: "Derive the relationships",
        paragraphs: [
          "Suppose a quadratic ax² + bx + c = 0 has two real roots α and β, counted with repetition. Its factor form is a(x − α)(x − β) = 0.",
          "Expand: a[x² − (α + β)x + αβ] = ax² − a(α + β)x + aαβ. Compare coefficients with ax² + bx + c.",
          "Therefore α + β = −b/a and αβ = c/a. These require a ≠ 0 and the roots to be understood as the two roots of the quadratic.",
          "This is connected to the relationship between zeroes and coefficients in the Polynomials chapter. The syllabus does not present it as a separate core Quadratic Equations method, so applications here are labelled as an extension."
        ],
        examples: [
          { title: "Find the sum and product of roots of 2x² − 7x + 3 = 0", steps: ["Here a = 2, b = −7, c = 3.", "Sum = −b/a = 7/2.", "Product = c/a = 3/2.", "Factoring gives roots 3 and 1/2; their sum is 7/2 and product is 3/2."] },
          { title: "Build a monic quadratic with roots 4 and −2", steps: ["A monic quadratic with roots α and β is (x − α)(x − β) = 0.", "Substitute α = 4 and β = −2: (x − 4)(x + 2) = 0.", "Expand: x² − 2x − 8 = 0.", "Its roots have sum 2 and product −8, as expected."] }
        ]
      },
      {
        title: "Use root information carefully",
        paragraphs: [
          "For roots with a given sum S and product P, a monic quadratic is x² − Sx + P = 0. Multiplying the whole equation by any non-zero constant does not change its roots.",
          "When transforming roots, derive the new sum and product from the stated transformation; do not assume a memorised rule applies to every change."
        ]
      }
    ],
    examples: [
      { title: "New roots are one more than the old roots", steps: ["Let the old roots be α and β, with sum S = α + β and product P = αβ.", "The new roots are α + 1 and β + 1.", "Their sum is (α + 1) + (β + 1) = S + 2.", "Their product is (α + 1)(β + 1) = P + S + 1."] }
    ],
    olympiad: "If a question asks for a symmetric expression such as α² + β², use α² + β² = (α + β)² − 2αβ. This identity follows by expanding the square.",
    mistake: "For ax² + bx + c = 0, the root sum is −b/a, not −b, and the product is c/a, not c. The formulas assume a ≠ 0.",
    fact: {
      question: "If both roots are increased by 1, is the new product just the old product plus 1?",
      answer: "Not generally. (α + 1)(β + 1) = αβ + α + β + 1. The new product is the old product plus the old sum plus 1."
    },
    questions: [
      { prompt: "What is the sum of the roots of 2x² − 7x + 3 = 0?", level: "Challenge", options: ["−7/2", "7/2", "3/2", "−3/2"], answer: 1, steps: ["For ax² + bx + c = 0, the sum is −b/a.", "Here a = 2 and b = −7.", "The sum is −(−7)/2 = 7/2."] },
      { prompt: "What is the product of the roots of 3x² + 2x − 5 = 0?", level: "Challenge", options: ["−5/3", "5/3", "2/3", "−2/3"], answer: 0, steps: ["The product of roots is c/a.", "Here c = −5 and a = 3.", "Therefore the product is −5/3."] },
      { prompt: "Which monic quadratic has roots 4 and −2?", level: "Challenge", options: ["x² − 2x − 8 = 0", "x² + 2x − 8 = 0", "x² − 6x + 8 = 0", "x² + 6x − 8 = 0"], answer: 0, steps: ["Use (x − 4)(x − (−2)) = (x − 4)(x + 2).", "Expand: x² − 2x − 8.", "Thus x² − 2x − 8 = 0 has roots 4 and −2."] },
      { prompt: "If roots α and β have sum 5 and product 6, what is α² + β²?", level: "Olympiad", options: ["13", "25", "19", "1"], answer: 0, steps: ["Use α² + β² = (α + β)² − 2αβ.", "Substitute the sum and product: 5² − 2(6).", "The result is 25 − 12 = 13."] },
      { prompt: "If the roots α and β are each increased by 1, what is their new product?", level: "Olympiad", options: ["αβ + 1", "αβ + α + β + 1", "α + β + 2", "αβ + 2"], answer: 1, steps: ["The new roots are α + 1 and β + 1.", "Multiply: (α + 1)(β + 1) = αβ + α + β + 1.", "The expression includes both the old product and the old sum."] }
    ]
  },
  {
    id: "word-problems",
    title: "Quadratic Equations in Daily Life",
    level: ["Core · Class 10"],
    summary: "Model area, consecutive-number, and age problems, then interpret both roots.",
    intro: "A quadratic often appears when two changing lengths are multiplied to make an area—or when a number is multiplied by a related number.",
    visual: "rectangle",
    sections: [
      {
        title: "Model, solve, interpret",
        paragraphs: [
          "Define the unknown and translate the story into an equation. Use units, and write relationships such as “4 more than” before multiplying.",
          "Solve the equation, then check every root against the original situation. A negative length or an age that violates the story must be rejected even if it solves the algebra."
        ],
        examples: [
          { title: "A rectangle has area 96 cm² and length 4 cm more than its width", steps: ["Let the width be w cm, so the length is w + 4 cm.", "Area = length × width gives w(w + 4) = 96.", "Rearrange: w² + 4w − 96 = 0 = (w + 12)(w − 8).", "The roots are w = −12 or w = 8. A width cannot be negative, so w = 8 cm.", "The length is 12 cm. Check: 8 × 12 = 96 cm²."] },
          { title: "Two consecutive positive integers have product 72", steps: ["Let the smaller integer be n; the next is n + 1.", "n(n + 1) = 72 gives n² + n − 72 = 0.", "Factor: (n + 9)(n − 8) = 0, so n = −9 or n = 8.", "The question asks for positive integers, so choose 8 and 9; their product is 72."] },
          { title: "Two ages differ by 6 years and have product 160", steps: ["Let the younger age be t years, so the older is t + 6.", "Their product gives t(t + 6) = 160, or t² + 6t − 160 = 0.", "Factor: (t + 16)(t − 10) = 0, so t = −16 or t = 10.", "Age cannot be negative here, so the ages are 10 and 16 years. Their product is 160."] }
        ]
      }
    ],
    examples: [
      { title: "A square has area 49 m²", steps: ["Let its side length be s metres. Then s² = 49.", "Solving gives s = 7 or s = −7.", "A side length must be positive, so s = 7 m. The negative algebraic root is not meaningful in this context."] }
    ],
    olympiad: "Use restrictions before and after solving. A positive integer condition can eliminate a mathematically valid negative root, while a rational-looking answer may still fail an integer requirement.",
    mistake: "Do not accept every algebraic root as a real-world answer. State why a root is rejected using the context and its units.",
    fact: {
      question: "Why does the rectangle equation also have a negative root?",
      answer: "The polynomial equation describes the algebraic relation for all real w, including negative values. The physical problem adds a restriction that width must be positive, so only w = 8 cm is meaningful."
    },
    questions: [
      { prompt: "A rectangle has area 96 cm² and length 4 cm more than width. What are its dimensions?", level: "Core", options: ["8 cm by 12 cm", "−12 cm by −8 cm", "6 cm by 16 cm", "4 cm by 24 cm"], answer: 0, steps: ["Let width be w; length is w + 4. Then w(w + 4) = 96.", "Factor w² + 4w − 96 = (w + 12)(w − 8) = 0.", "Reject w = −12 as a length; w = 8 and length = 12 satisfy the area."] },
      { prompt: "Two consecutive positive integers have product 72. What are they?", level: "Core", options: ["7 and 8", "8 and 9", "9 and 10", "−9 and −8"], answer: 1, steps: ["Let the smaller be n. Then n(n + 1) = 72.", "n² + n − 72 = (n + 9)(n − 8) = 0, so n = −9 or 8.", "The positive pair is 8 and 9; 8 × 9 = 72."] },
      { prompt: "Two ages differ by 6 years and their product is 160. What are the positive ages?", level: "Challenge", options: ["8 and 14", "10 and 16", "12 and 18", "16 and 22"], answer: 1, steps: ["Let the younger age be t. Then t(t + 6) = 160.", "t² + 6t − 160 = (t + 16)(t − 10) = 0.", "The positive age is t = 10; the older age is 16."] },
      { prompt: "A square has area 49 m². What side length is physically possible?", level: "Core", options: ["−7 m only", "7 m only", "Both −7 m and 7 m", "49 m"], answer: 1, steps: ["The equation is s² = 49, giving s = ±7 algebraically.", "A physical side length is positive.", "Therefore the square's side is 7 m."] },
      { prompt: "A positive number and the next integer have product 90. What is the smaller number?", level: "Challenge", options: ["8", "9", "10", "11"], answer: 1, steps: ["Let the smaller be n: n(n + 1) = 90.", "n² + n − 90 = (n + 10)(n − 9) = 0.", "The positive root is 9, and 9 × 10 = 90."] }
    ]
  },
  {
    id: "olympiad-lab",
    title: "Olympiad Problem-Solving Lab",
    level: ["Olympiad Extension"],
    summary: "Tackle parameters, integer and rational roots, transformations, and multi-step challenges.",
    intro: "This lab rewards careful structure-spotting. The problems are original and go beyond routine textbook practice while using familiar quadratic ideas.",
    sections: [
      {
        title: "A strategy before the calculation",
        paragraphs: [
          "First identify what the question asks: roots, their nature, a parameter, or an expression in the roots. You may not need to solve the whole equation.",
          "Check the discriminant for real-root conditions, use the rational-root theorem only with its integer-coefficient conditions, and test a transformed-root rule by deriving it from the original roots.",
          "For integer roots of a monic integer-coefficient quadratic, the sum and product are integers. This condition is useful but should be combined with the equation and checked directly."
        ],
        examples: [
          { title: "A parameter for repeated roots", steps: ["For x² + (k − 3)x + 4 = 0, equal roots require D = 0.", "D = (k − 3)² − 16 = 0, so k − 3 = 4 or k − 3 = −4.", "Thus k = 7 or k = −1.", "Each value makes D zero, so each gives a repeated real root."] },
          { title: "Transform roots without memorising", steps: ["Let α and β be roots with sum S and product P.", "If the new roots are 2α and 2β, their sum is 2S.", "Their product is (2α)(2β) = 4P.", "Build the monic equation x² − 2Sx + 4P = 0."] }
        ]
      }
    ],
    examples: [
      { title: "Could x² − 6x + k = 0 have two distinct positive integer roots?", steps: ["If the roots are positive integers with sum 6 and product k, the positive integer pairs with sum 6 are (1,5) and (2,4).", "Their products are 5 and 8.", "So this is possible exactly when k = 5 or k = 8.", "The equations factor as (x − 1)(x − 5) = 0 or (x − 2)(x − 4) = 0."] }
    ],
    olympiad: "Pause before expanding. A target such as α² + β² is often simpler as (α + β)² − 2αβ, and a parameter about equal roots is usually just D = 0.",
    mistake: "A rational-root test does not say every rational root is an integer. For non-monic integer-coefficient equations, rational roots can have non-unit denominators.",
    fact: {
      question: "Can multiplying all three coefficients by the same non-zero number change the roots?",
      answer: "No. If λ ≠ 0, then λ(ax² + bx + c) = 0 is equivalent to ax² + bx + c = 0 because we can divide both sides by λ. The equation’s written coefficients change, but its roots do not."
    },
    questions: [
      { prompt: "For which values of k does x² + (k − 3)x + 4 = 0 have equal real roots?", level: "Olympiad", options: ["k = 7 or −1", "k = 3 or 7", "k = 1 or 5", "k = 7 only"], answer: 0, steps: ["Equal roots require D = 0: (k − 3)² − 16 = 0.", "Thus k − 3 = ±4.", "So k = 7 or k = −1. Substitution into D gives zero for both."] },
      { prompt: "For what values of k does x² − 6x + k = 0 have two distinct positive integer roots?", level: "Olympiad", options: ["k = 5 or 8", "k = 6 only", "k = 9 or 12", "Every positive k"], answer: 0, steps: ["Two positive integer roots with sum 6 can only be 1 and 5, or 2 and 4.", "Their products are 5 and 8.", "These values give the factorizations (x − 1)(x − 5) and (x − 2)(x − 4), each with distinct positive integer roots."] },
      { prompt: "If α and β are roots with sum 5 and product 6, what is α² + β²?", level: "Olympiad", options: ["13", "19", "25", "1"], answer: 0, steps: ["Use α² + β² = (α + β)² − 2αβ.", "Substitute 5 and 6: 25 − 12.", "The answer is 13."] },
      { prompt: "If α and β are roots of a monic quadratic with sum S and product P, what equation has roots 2α and 2β?", level: "Olympiad", options: ["x² − 2Sx + 4P = 0", "x² − Sx + 2P = 0", "x² + 2Sx + 4P = 0", "x² − 4Sx + 2P = 0"], answer: 0, steps: ["The transformed roots have sum 2α + 2β = 2S.", "Their product is (2α)(2β) = 4P.", "A monic quadratic with root sum 2S and product 4P is x² − 2Sx + 4P = 0."] },
      { prompt: "Which quadratic has roots 1 and 5?", level: "Challenge", options: ["x² − 6x + 5 = 0", "x² + 6x + 5 = 0", "x² − 5x + 6 = 0", "x² + 4x − 5 = 0"], answer: 0, steps: ["The monic equation is (x − 1)(x − 5) = 0.", "Expand: x² − 6x + 5 = 0.", "Substitution confirms both 1 and 5 are roots."] },
      { prompt: "For what value of m does 2x² + mx + 8 = 0 have equal real roots?", level: "Olympiad", options: ["m = ±8", "m = ±4", "m = 8 only", "m = ±16"], answer: 0, steps: ["Set D = m² − 4(2)(8) = 0.", "Then m² − 64 = 0.", "Therefore m = 8 or m = −8; in each case D = 0."] },
      { prompt: "Which equation has rational but non-integer roots?", level: "Olympiad", options: ["2x² − 5x + 2 = 0", "x² − 5x + 6 = 0", "x² − 2 = 0", "x² + 1 = 0"], answer: 0, steps: ["Factor 2x² − 5x + 2 = (2x − 1)(x − 2).", "Its roots are 1/2 and 2, both rational, and 1/2 is not an integer.", "The other equations have integer roots, irrational roots, or no real roots."] },
      { prompt: "If x² − 4x + 1 = 0 has roots α and β, what is (α + 1)(β + 1)?", level: "Olympiad", options: ["2", "4", "5", "6"], answer: 3, steps: ["The roots have sum 4 and product 1.", "(α + 1)(β + 1) = αβ + α + β + 1.", "Substitute: 1 + 4 + 1 = 6, which is option D."] },
      { prompt: "A student says the roots of x² − 3x + 2 = 0 are −1 and −2 because the factors are (x − 1)(x − 2). What is the error?", level: "Challenge", options: ["There is no error; the roots are −1 and −2.", "From x − 1 = 0 and x − 2 = 0, the roots are 1 and 2.", "The factors should be (x + 1)(x + 2).", "A quadratic cannot be factorised."], answer: 1, steps: ["The factorisation (x − 1)(x − 2) is correct.", "Set each factor equal to zero: x − 1 = 0 gives x = 1; x − 2 = 0 gives x = 2.", "The student changed the signs when solving the factors."] },
      { prompt: "If x² − 5x + 6 = 0 has roots α and β, what are the roots after each is increased by 1?", level: "Olympiad", options: ["2 and 3", "3 and 4", "1 and 2", "−1 and −2"], answer: 1, steps: ["Factor the original equation: (x − 2)(x − 3) = 0, so α = 2 and β = 3.", "Increase each root by 1: 2 + 1 = 3 and 3 + 1 = 4.", "The transformed roots are 3 and 4."] },
      { prompt: "For which integer values of k does x² + kx + 12 = 0 have integer roots?", level: "Olympiad", options: ["k = ±7, ±8, or ±13", "k = ±5 or ±12", "k = ±7 only", "Every integer k"], answer: 0, steps: ["Integer roots r and s satisfy rs = 12 and r + s = −k.", "Positive factor pairs are (1,12), (2,6), and (3,4), with sums 13, 8, and 7.", "The corresponding negative pairs have sums −13, −8, and −7. Thus k can be ±13, ±8, or ±7."] },
      { prompt: "Which value of k makes the equation x² − 2x + k = 0 have no real roots?", level: "Olympiad", options: ["k = 0", "k = 1", "k = 2", "k = −1"], answer: 2, steps: ["The discriminant is D = (−2)² − 4k = 4 − 4k.", "No real roots require D < 0, so 4 − 4k < 0 and k > 1.", "Among the options, only k = 2 satisfies k > 1."] }
    ]
  },
  {
    id: "revision",
    title: "Revision and Formula Sheet",
    level: ["Core · Class 10", "Quick revision"],
    summary: "Review the standard form, solving methods, discriminant, and scope labels.",
    intro: "Use this page to choose a method and check your reasoning before an exam or Olympiad practice set.",
    sections: [
      {
        title: "Core Class 10 facts",
        bullets: [
          "Standard form: ax² + bx + c = 0, with a ≠ 0.",
          "Factorisation: write a product equal to zero, then set each factor equal to zero.",
          "Quadratic formula: x = (−b ± √(b² − 4ac))/(2a), where a ≠ 0.",
          "Discriminant D = b² − 4ac: D > 0 means two distinct real roots; D = 0 means equal real roots; D < 0 means no real roots.",
          "For word problems, define variables, build an equation, solve, and reject roots that do not fit the real situation."
        ],
        examples: [
          { title: "Quick method choice", steps: ["If a quadratic factors neatly, use factorisation.", "If it does not, use the quadratic formula.", "If only the type of real roots is needed, calculate D and stop."] }
        ]
      },
      {
        title: "Connections and extensions",
        bullets: [
          "Completing the square is demonstrated in the NCERT chapter and explains the derivation of the quadratic formula; the CBSE 2026–27 routine solving methods are factorisation and the formula.",
          "For roots α and β: α + β = −b/a and αβ = c/a. This is a connection to Polynomials and is labelled extension here.",
          "A non-zero multiple of an equation has the same roots.",
          "The relationship between zeroes and coefficients is valid only when a ≠ 0."
        ]
      },
      {
        title: "Final accuracy checklist",
        bullets: [
          "Move every term to one side before reading a, b and c.",
          "Include signs: b may be negative and c may be negative.",
          "Check factorisation by expanding.",
          "In the formula, use 2a in the denominator and evaluate both ± branches.",
          "Verify roots in the original equation and check contextual restrictions."
        ]
      }
    ],
    examples: [
      { title: "Classify before solving: 2x² + 4x + 5 = 0", steps: ["D = 4² − 4(2)(5) = 16 − 40 = −24.", "Since D < 0, there are no real roots.", "No formula calculation of the roots is needed for this real-root question."] }
    ],
    olympiad: "The fastest valid method depends on the question: factor for neat roots, use D for root nature, or use root relationships for symmetric expressions. Always check the method’s assumptions.",
    mistake: "A formula sheet is a reminder, not a substitute for checking signs and hypotheses. In particular, a must be non-zero.",
    fact: {
      question: "Can a quadratic have exactly one distinct real root?",
      answer: "Yes. It happens when D = 0. For example, x² − 4x + 4 = (x − 2)² has the repeated root 2."
    },
    questions: [
      { prompt: "What is the standard form of a quadratic equation?", level: "Core", options: ["ax² + bx + c = 0, a ≠ 0", "ax + b = 0, a ≠ 0", "ax³ + bx² + c = 0", "a + bx + c = 1"], answer: 0, steps: ["A quadratic equation has degree 2.", "Its standard form is ax² + bx + c = 0 with a ≠ 0.", "The other forms are linear, cubic, or not the stated standard form."] },
      { prompt: "Which method gives the number of real roots without calculating them?", level: "Core", options: ["Discriminant", "Adding the coefficients", "Taking the reciprocal", "Graphing only one point"], answer: 0, steps: ["The discriminant D = b² − 4ac appears under the square root in the formula.", "Its sign determines whether there are two, one, or no real roots.", "So calculate D to determine the nature of the real roots."] },
      { prompt: "For x² − 4x + 4 = 0, what is true?", level: "Core", options: ["Two distinct real roots", "One repeated real root", "No real roots", "It is linear"], answer: 1, steps: ["D = 16 − 16 = 0.", "A zero discriminant gives equal formula branches.", "The equation is (x − 2)² = 0, with one repeated root 2."] },
      { prompt: "Which is a common correct check after solving a quadratic?", level: "Core", options: ["Substitute each root into the original equation.", "Check only the larger root.", "Change each negative root to positive.", "Round every root to a whole number."], answer: 0, steps: ["Algebraic steps can contain sign or arithmetic errors.", "Substituting each answer into the original equation tests it directly.", "Rounding or changing signs may alter a valid solution."] },
      { prompt: "Which topic is explicitly presented here as a Polynomials connection/extension rather than a separate core method?", level: "Challenge", options: ["Solving by factorisation", "Quadratic formula", "Root sum and product", "Using the discriminant for real roots"], answer: 2, steps: ["The chapter labels root sum and product as a connection to the Polynomials chapter.", "Factorisation, the quadratic formula, and discriminant-based root nature are core quadratic topics.", "Therefore root sum and product is the extension choice."] }
    ]
  }
];
