window.apexRealNumberTopics = [
  {
    id: "number-system-review",
    title: "Number System Review",
    level: ["Prerequisite Revision · Class 9", "Foundation"],
    summary: "Refresh the number sets that fit inside the real number system.",
    intro: "Before exploring real numbers, let’s make sure the family tree of numbers feels familiar. Each set adds new numbers to the collection.",
    sections: [
      {
        title: "A quick tour of the number sets",
        paragraphs: [
          "Natural numbers N = {1, 2, 3, …} are used for counting. Whole numbers W add zero. Integers Z add the negative whole numbers.",
          "Rational numbers Q can be written as p/q, where p and q are integers and q ≠ 0. Irrational numbers cannot be written in that form.",
          "Real numbers R contain both rational and irrational numbers: R = Q ∪ (irrational numbers). Every point on the ordinary number line represents one real number."
        ],
        bullets: [
          "N ⊂ W ⊂ Z ⊂ Q ⊂ R",
          "Examples: −4 is an integer; 3/7 is rational; √2 is irrational; all three are real."
        ],
        examples: [
          { title: "Classify 0, −5, 2/3 and √7", steps: ["0 is a whole number, an integer, a rational number (0 = 0/1), and a real number.", "−5 is an integer, so it is also rational (−5 = −5/1) and real.", "2/3 is rational and real.", "√7 is irrational and real because 7 is not a perfect square."] },
          { title: "Find the smallest set for 8", steps: ["8 is a natural number.", "Every natural number is also whole, integer, rational and real.", "The smallest set in the list containing 8 is N."] }
        ]
      }
    ],
    olympiad: "Classify a number using its simplest set first, then remember it also belongs to every larger set. For example, an integer is automatically rational because it can be written over 1.",
    mistake: "Do not say that every square root is irrational. √9 = 3 is rational; a square root of a non-square positive integer, such as √2, is irrational.",
    fact: {
      question: "Is zero rational?",
      answer: "Yes. Zero can be written as 0/1, and its denominator is non-zero. It is also a whole number, an integer and a real number."
    },
    examples: [
      { title: "A number-set chain", steps: ["Start with −3: it belongs to Z.", "Write −3 = −3/1, so it also belongs to Q.", "Every rational number is real, so −3 belongs to R."] }
    ],
    questions: [
      { prompt: "Which number is irrational?", options: ["−8", "0.25", "√3", "7/9"], answer: 2, steps: ["An irrational number cannot be written as a ratio of integers.", "−8, 0.25 = 1/4 and 7/9 are rational.", "3 is not a perfect square, so √3 is irrational."] },
      { prompt: "Which is the smallest set in this list that contains −6: N, W, Z, Q?", options: ["N", "W", "Z", "Q"], answer: 2, steps: ["−6 is negative, so it is not natural or whole.", "It is an integer, so it belongs to Z.", "Thus Z is the smallest listed set containing it."] },
      { prompt: "Which statement is true?", options: ["Every integer is rational.", "Every rational number is an integer.", "Every real number is rational.", "Zero is irrational."], answer: 0, steps: ["Any integer n can be written as n/1.", "That makes every integer rational.", "The reverse is false: 1/2 is rational but not an integer."] },
      { prompt: "Which inclusion chain is correct?", options: ["N ⊂ Z ⊂ W ⊂ Q", "N ⊂ W ⊂ Z ⊂ Q", "Q ⊂ Z ⊂ W ⊂ N", "W ⊂ N ⊂ Z ⊂ Q"], answer: 1, steps: ["Whole numbers include natural numbers and zero.", "Integers include positive whole numbers, zero and negative whole numbers.", "So N ⊂ W ⊂ Z ⊂ Q is correct."] },
      { prompt: "Which number is both an integer and a rational number?", options: ["√5", "−3", "π", "√2"], answer: 1, steps: ["An integer has no fractional part; −3 is an integer.", "It is rational because −3 = −3/1.", "The other listed numbers are irrational."] }
    ]
  },
  {
    id: "rational-numbers",
    title: "Rational Numbers and Decimal Tests",
    level: ["Prerequisite Revision · Class 9", "Foundation"],
    summary: "Recognise p/q numbers and predict whether their decimals terminate or recur.",
    intro: "A fraction can wear two decimal disguises: it may stop, or its digits may repeat forever. The denominator in simplest form tells us which.",
    sections: [
      {
        title: "The denominator test",
        paragraphs: [
          "A rational number is p/q, with integers p and q and q ≠ 0. First reduce the fraction to lowest terms.",
          "Its decimal terminates exactly when the reduced denominator has no prime factors other than 2 and 5. If any other prime factor remains, its decimal is non-terminating recurring.",
          "Why 2 and 5? A denominator with only those factors can be scaled to 10, 100, 1000, and so on."
        ],
        examples: [
          { title: "Predict the decimal of 7/40", steps: ["The fraction is already in lowest terms.", "40 = 2³ × 5, so its only prime factors are 2 and 5.", "The decimal terminates: 7/40 = 0.175."] },
          { title: "Predict the decimal of 5/12", steps: ["The fraction is in lowest terms and 12 = 2² × 3.", "The denominator contains a prime factor 3 other than 2 or 5.", "Therefore its decimal is non-terminating and recurring: 5/12 = 0.41666…, with 6 repeating."] },
          { title: "Why does 1/3 repeat?", steps: ["Divide 1 by 3. The quotient begins 0.3…, with remainder 1.", "The same remainder 1 appears again, so the division repeats the same step.", "Thus 1/3 = 0.333…, with 3 repeating."] }
        ]
      },
      {
        title: "A repeating decimal is still rational",
        paragraphs: [
          "A repeating decimal can be converted into a fraction by multiplying by a power of 10 and subtracting to cancel the repeating tail.",
          "For example, if x = 0.272727…, then 100x = 27.272727…. Subtracting x leaves 99x = 27."
        ],
        examples: [
          { title: "Convert 0.272727… to a fraction", steps: ["Let x = 0.272727…, with 27 repeating.", "Then 100x = 27.272727….", "Subtract: 100x − x = 27, so 99x = 27.", "Therefore x = 27/99 = 3/11."] }
        ]
      }
    ],
    olympiad: "Reduce the fraction before applying the denominator test. For instance, 6/15 reduces to 2/5 and therefore terminates; inspecting 15 without reducing would give the wrong conclusion.",
    mistake: "A finite decimal is rational, but rational decimals do not all terminate. For example, 1/3 is rational and has a recurring decimal.",
    fact: {
      question: "How can 0.999… equal 1?",
      answer: "Let x = 0.999… . Then 10x = 9.999… . Subtracting gives 9x = 9, so x = 1. The repeating decimal is exactly 1, not merely close to it."
    },
    examples: [
      { title: "Intermediate · Which fraction terminates?", steps: ["Reduce 21/50: it is already reduced and 50 = 2 × 5², so it terminates.", "Reduce 7/18: 18 = 2 × 3², so it recurs.", "The denominator test applies only after reduction."] }
    ],
    questions: [
      { prompt: "Which fraction has a terminating decimal expansion?", options: ["7/30", "11/40", "5/21", "13/18"], answer: 1, steps: ["A reduced denominator must contain only 2s and 5s.", "40 = 2³ × 5; 11/40 is reduced.", "The other denominators contain 3 or 7, so 11/40 is the terminating choice."] },
      { prompt: "What is 3/8 as a decimal?", options: ["0.375", "0.38", "0.625", "0.875"], answer: 0, steps: ["Make the denominator 1000: 3/8 = 375/1000.", "Therefore 3/8 = 0.375.", "This terminates because 8 is a power of 2."] },
      { prompt: "What type of decimal expansion does 7/45 have?", options: ["Terminating", "Non-terminating recurring", "Non-terminating non-recurring", "An integer"], answer: 1, steps: ["The fraction is reduced; 45 = 3² × 5.", "The denominator includes a prime factor 3 besides 2 and 5.", "A rational number with such a reduced denominator is non-terminating recurring."] },
      { prompt: "Convert 0.818181… (with 81 repeating) to a fraction in lowest terms.", options: ["81/100", "9/11", "81/99", "8/11"], answer: 1, steps: ["Let x = 0.818181… . Then 100x = 81.818181… .", "Subtract to get 99x = 81, so x = 81/99.", "Reduce by 9: x = 9/11."] },
      { prompt: "Which is the reduced denominator test for a terminating rational decimal?", options: ["The denominator is prime.", "The denominator has only factors 2 and 5.", "The numerator is even.", "The denominator is odd."], answer: 1, level: "Olympiad", steps: ["Write the rational number in lowest terms first.", "A terminating decimal has a denominator that divides some power of 10.", "Powers of 10 contain only prime factors 2 and 5, giving the stated test."] }
    ]
  },
  {
    id: "irrationality-proofs",
    title: "Irrational Numbers and Proofs",
    level: ["Core · Class 10", "Proofs"],
    summary: "Understand irrational numbers and follow the classic proofs for √2, √3 and √5.",
    intro: "Why can’t √2 be written as a fraction? We’ll assume it can, then follow that assumption until it contradicts a basic fact about even and odd numbers.",
    sections: [
      {
        title: "What does irrational mean?",
        paragraphs: [
          "A real number is irrational if it cannot be written as p/q for integers p and q with q ≠ 0. Its decimal expansion is non-terminating and non-recurring.",
          "Examples include √2, √3, √5 and π. But √4 = 2 is rational: the number under the square root matters."
        ],
        examples: [
          { title: "Sort the square roots", steps: ["√4 = 2, so it is rational.", "√9 = 3, so it is rational.", "√5 is irrational because 5 is not a perfect square; its irrationality is proved in the next examples."] }
        ]
      },
      {
        title: "Proof: √2 is irrational",
        paragraphs: [
          "We use proof by contradiction. Suppose √2 = p/q in lowest terms, where p and q are positive integers.",
          "Squaring gives p² = 2q², so p² is even and therefore p is even. Write p = 2k. Substitution gives q² = 2k², so q is even too.",
          "Then p and q share a factor 2, contradicting that p/q was in lowest terms. Therefore √2 is irrational."
        ],
        examples: [
          { title: "Notice the contradiction", steps: ["Assume √2 = p/q with p/q reduced.", "The equation p² = 2q² forces p to be even.", "Writing p = 2k forces q to be even as well.", "Both are even, so the fraction was not reduced: contradiction."] }
        ]
      },
      {
        title: "Proof pattern: √3 and √5",
        paragraphs: [
          "For √3, suppose √3 = p/q in lowest terms. Then p² = 3q², so 3 divides p² and hence p. Put p = 3k. Substitution gives q² = 3k², so 3 divides q too—a contradiction.",
          "For √5, the same argument works with 5: p² = 5q² forces 5 to divide p; substituting p = 5k forces 5 to divide q. This again contradicts lowest terms.",
          "These proofs use the fact that if a prime divides a square, it divides the number. The official Class 10 curriculum specifically names proofs for √2, √3 and √5."
        ],
        examples: [
          { title: "Try the √5 proof in four steps", steps: ["Assume √5 = p/q in lowest terms.", "Square: p² = 5q², so 5 divides p; write p = 5k.", "Substitute and simplify: q² = 5k², so 5 divides q.", "Both p and q are divisible by 5, contradicting lowest terms."] }
        ]
      }
    ],
    olympiad: "The useful pattern is not tied to these three examples: if a prime factor occurs to an odd exponent in an integer’s prime factorisation, its square root cannot be rational. This broader pattern is an extension of the named Class 10 proofs.",
    mistake: "When assuming a fraction p/q, explicitly say it is in lowest terms. Otherwise finding a common factor does not produce a contradiction.",
    fact: {
      question: "Why does an even square imply that its integer square root is even?",
      answer: "An odd integer has the form 2k + 1, and its square is 4k² + 4k + 1, which is odd. Therefore an even square cannot come from an odd integer; its root must be even."
    },
    examples: [
      { title: "Core proof · √3", steps: ["Assume √3 = p/q in lowest terms, so p² = 3q².", "Since 3 divides p² and 3 is prime, 3 divides p. Write p = 3k.", "Then 9k² = 3q², so q² = 3k² and 3 divides q.", "This contradicts lowest terms. Hence √3 is irrational."] }
    ],
    questions: [
      { prompt: "Which assumption begins the standard contradiction proof that √2 is irrational?", options: ["Assume √2 is an integer.", "Assume √2 = p/q in lowest terms.", "Assume √2 = 2.", "Assume p = q = 0."], answer: 1, steps: ["To prove a number irrational, assume the opposite: it is rational.", "Write it as p/q with integers p, q and q ≠ 0, chosen in lowest terms.", "The contradiction proof then shows both p and q share a factor."] },
      { prompt: "If p² is even for an integer p, what follows?", options: ["p is odd.", "p is even.", "p is zero only.", "No conclusion is possible."], answer: 1, steps: ["If p were odd, p = 2k + 1.", "Then p² = 4k² + 4k + 1, which is odd.", "So p² even implies p itself is even."] },
      { prompt: "Which statement is correct?", options: ["√4 is irrational.", "√5 is rational.", "√9 is rational.", "Every square root is irrational."], answer: 2, steps: ["√9 = 3, an integer and therefore rational.", "√4 = 2 is rational too; √5 is irrational.", "Thus the correct statement is √9 is rational."] },
      { prompt: "In the standard proof for √3, what contradiction is reached?", options: ["p and q must both be divisible by 3 despite being in lowest terms.", "p must equal q.", "q must be zero.", "3 must be even."], answer: 0, steps: ["Assume √3 = p/q in lowest terms.", "From p² = 3q², show 3 divides p; substituting then shows 3 divides q.", "That common factor contradicts lowest terms."] },
      { prompt: "Which three square roots are explicitly named for irrationality proofs in the Class 10 curriculum?", options: ["√2, √3 and √5", "√2, √4 and √9", "√3, √6 and √8", "√5, √10 and √25"], answer: 0, steps: ["The current CBSE Class X mathematics syllabus explicitly names proofs of irrationality for √2, √3 and √5.", "The perfect-square roots √4 and √9 are rational.", "So the first option matches the named core proofs."] }
    ]
  },
  {
    id: "real-classification",
    title: "Real Numbers and Classification",
    level: ["Prerequisite Revision · Class 9", "Foundation"],
    summary: "See how rational and irrational numbers together make the real numbers.",
    intro: "The real numbers are the complete number line: fractions and non-fractional numbers, positive, negative and zero.",
    sections: [
      {
        title: "Two large families",
        paragraphs: [
          "Every real number is either rational or irrational. These families do not overlap: a number cannot both be expressible as a fraction of integers and not expressible that way.",
          "R = Q ∪ I, where I denotes the irrational numbers. Also Q ∩ I = ∅.",
          "The familiar inclusions N ⊂ W ⊂ Z ⊂ Q ⊂ R fit inside this larger picture."
        ],
        bullets: [
          "Rational examples: −2, 0, 3/5, 0.125 and 0.666…, with 6 repeating.",
          "Irrational examples: √2, π and √7."
        ],
        examples: [
          { title: "Classify 0.125 and √7", steps: ["0.125 = 125/1000 = 1/8, so it is rational.", "7 is not a perfect square, and √7 is irrational.", "Both numbers are real, so each has a point on the number line."] }
        ]
      },
      {
        title: "Rationals and irrationals are both everywhere",
        paragraphs: [
          "Between any two distinct real numbers there is a rational number. If the endpoints are rational, their midpoint is an easy example; for arbitrary real endpoints, the midpoint need not be rational. A general proof uses the Archimedean property; here is a practical illustration for rational endpoints.",
          "For two distinct rational endpoints a < b, choose a sufficiently large integer n so that 1/n < b − a, then a suitable multiple of 1/n lies between them. Irrational numbers also occur densely; for any interval one can shift a rational inside it by a sufficiently small irrational amount while staying inside.",
          "This density fact is enrichment; the key review idea is that the number line contains both kinds of real numbers between its marked points."
        ],
        examples: [
          { title: "Find a rational between 1/3 and 1/2", steps: ["Use the midpoint: (1/3 + 1/2)/2.", "Add inside: 5/6, then divide by 2 to get 5/12.", "Since 1/3 = 4/12 < 5/12 < 6/12 = 1/2, the number works."] }
        ]
      }
    ],
    olympiad: "When classifying a complicated value, first ask whether it can be simplified to a rational number. For example, √12 = 2√3 remains irrational, while √(9/16) = 3/4 is rational.",
    mistake: "A decimal that looks long is not automatically irrational. A finite decimal or an eventually repeating decimal is rational.",
    fact: {
      question: "Is there a real number between any two different real numbers?",
      answer: "Yes. If a < b, their midpoint (a + b)/2 is a real number strictly between them. The stronger fact that both rational and irrational numbers are dense is an enrichment result."
    },
    examples: [
      { title: "Use a midpoint", steps: ["Between 2 and 3, take (2 + 3)/2 = 2.5.", "It satisfies 2 < 2.5 < 3.", "This particular midpoint is rational; intervals also contain irrational numbers."] }
    ],
    questions: [
      { prompt: "Which statement describes the real numbers?", options: ["Only positive integers", "The union of rational and irrational numbers", "Only fractions", "Only irrational numbers"], answer: 1, steps: ["Real numbers include rational numbers and irrational numbers.", "Their sets are disjoint and together cover the real line.", "Therefore R = Q ∪ I."] },
      { prompt: "Which pair are both irrational real numbers?", options: ["√2 and π", "√4 and 3/5", "−2 and √9", "0.25 and 1/3"], answer: 0, steps: ["√2 is irrational because 2 is not a perfect square; π is irrational.", "√4 = 2, and the values in the other options are rational.", "So √2 and π are both irrational real numbers."] },
      { prompt: "Which number is rational?", options: ["√11", "π", "0.666… (6 repeats)", "√3"], answer: 2, steps: ["A repeating decimal is rational.", "0.666… = 2/3.", "The other options are irrational."] },
      { prompt: "What is the midpoint between 1/3 and 1/2?", options: ["5/12", "2/5", "1/6", "5/6"], answer: 0, steps: ["The midpoint is the average: (1/3 + 1/2)/2.", "Inside the brackets, 1/3 + 1/2 = 5/6.", "Half of 5/6 is 5/12, which lies between the endpoints."] },
      { prompt: "Which statement is true about rational and irrational numbers?", options: ["Some numbers are both rational and irrational.", "Every real number is rational.", "No number is both rational and irrational.", "Every irrational number is an integer."], answer: 2, level: "Olympiad", steps: ["Rational means expressible as p/q; irrational means not expressible that way.", "The definitions rule out overlap.", "So no number is both rational and irrational."] }
    ]
  },
  {
    id: "decimal-expansions",
    title: "Decimal Expansions and Conversions",
    level: ["Prerequisite Revision · Class 9", "Decimal skill"],
    summary: "Convert between fractions and recurring decimals and identify irrational decimal behaviour.",
    intro: "A decimal expansion is another way to write a number. The pattern—or lack of a repeating pattern—tells us which number family it belongs to.",
    sections: [
      {
        title: "Three decimal patterns",
        paragraphs: [
          "A rational number has either a terminating decimal or a non-terminating recurring decimal. Long division explains why: only finitely many remainders are possible, so eventually a remainder repeats.",
          "An irrational number has a non-terminating, non-recurring decimal expansion. Its digits continue without a repeating block.",
          "A bar is often used to mark the repeating block: 0.818181… has 81 repeating."
        ],
        examples: [
          { title: "Convert 0.818181… to a fraction (81 repeats)", steps: ["Let x = 0.818181… .", "Multiply by 100: 100x = 81.818181… .", "Subtract x: 99x = 81.", "So x = 81/99 = 9/11."] },
          { title: "Convert 0.16666… to a fraction (6 repeats)", steps: ["Let x = 0.16666… .", "Then 10x = 1.6666… and 100x = 16.6666… .", "Subtract: 100x − 10x = 15, so 90x = 15.", "Therefore x = 15/90 = 1/6."] },
          { title: "Recognise √2", steps: ["√2 is irrational.", "Its decimal begins 1.414213… and does not terminate or repeat.", "The digits shown are an approximation, not the exact value."] }
        ]
      },
      {
        title: "Check a fraction before converting",
        paragraphs: [
          "For a reduced fraction p/q, its decimal terminates precisely when q has no prime factors other than 2 and 5. Otherwise it recurs.",
          "To prove a repeating-decimal conversion, define a variable, shift the decimal point to align the repeating parts, subtract, and simplify."
        ],
        examples: [
          { title: "Convert 0.333… (3 repeats)", steps: ["Let x = 0.333… .", "Then 10x = 3.333… .", "Subtract to get 9x = 3, hence x = 1/3."] }
        ]
      }
    ],
    olympiad: "For a mixed decimal such as 0.12343434… (34 repeats after the first two places), choose powers of ten that line up the start and end of the repeating block, then subtract. The same cancellation idea works even when the repeat does not begin immediately.",
    mistake: "Do not write a repeating decimal as if the ellipsis were a rounding mark. 0.818181… (81 repeats) is exactly 9/11; 0.81 is only 81/100.",
    fact: {
      question: "Does every non-terminating decimal represent an irrational number?",
      answer: "No. A recurring decimal such as 0.333… is non-terminating but rational (it equals 1/3). Irrational decimals are non-terminating and non-recurring."
    },
    examples: [
      { title: "Classify 0.375", steps: ["It terminates after three decimal places.", "Write 0.375 = 375/1000 = 3/8.", "Therefore it is rational."] }
    ],
    questions: [
      { prompt: "What is 0.818181… (with 81 repeating) in lowest terms?", options: ["81/100", "9/11", "81/90", "8/11"], answer: 1, steps: ["Set x = 0.818181… .", "Then 100x − x = 81, so 99x = 81.", "Reduce 81/99 by 9 to get 9/11."] },
      { prompt: "Which decimal describes an irrational number?", options: ["Terminating", "Eventually recurring", "Non-terminating and non-recurring", "An integer followed by zeroes"], answer: 2, steps: ["Terminating decimals are fractions with denominators powers of 10.", "Recurring decimals are rational as shown by shifting and subtracting.", "Irrational decimals are non-terminating and non-recurring."] },
      { prompt: "Convert 0.666… (6 repeats) to a fraction.", options: ["1/6", "2/3", "3/5", "6/10"], answer: 1, steps: ["Let x = 0.666… . Then 10x = 6.666… .", "Subtract: 9x = 6.", "Thus x = 6/9 = 2/3."] },
      { prompt: "Which statement about 0.81 and 0.818181… (81 repeats) is correct?", options: ["They are equal.", "0.81 = 9/11.", "0.818181… = 9/11.", "Both are irrational."], answer: 2, steps: ["0.81 has two decimal places, so it is 81/100.", "For x = 0.818181…, 100x − x = 81, giving x = 81/99 = 9/11.", "The repeating decimal, not 0.81, equals 9/11."] },
      { prompt: "What is 0.16666… (with 6 repeating after the first decimal digit) in lowest terms?", options: ["1/6", "16/100", "5/6", "1/5"], answer: 0, steps: ["Let x = 0.1666… . Then 100x − 10x = 15.", "So 90x = 15 and x = 15/90.", "Reduce to 1/6."] }
    ]
  },
  {
    id: "number-line",
    title: "Number Line Representation",
    level: ["Prerequisite Revision · Class 9", "Visual learning"],
    summary: "Place familiar rational and irrational numbers at their correct positions.",
    intro: "The number line is a map where distance and direction matter. Every real number has exactly one point, and every point corresponds to exactly one real number.",
    sections: [
      {
        title: "Read the number line",
        paragraphs: [
          "Zero is the origin. Positive numbers lie to its right and negative numbers to its left. Equal gaps represent equal distances.",
          "The distance of a number x from zero is its absolute value |x|. For example, |−1| = 1, so −1 and 1 are equally far from zero.",
          "The diagram marks −1, 0, 1/2, 1, √2 ≈ 1.414 and π ≈ 3.142. The irrational positions use decimal approximations only to show where they lie."
        ],
        examples: [
          { title: "Locate −3/2", steps: ["−3/2 = −1.5, which is halfway between −1 and −2.", "It lies to the left of zero because it is negative.", "Its distance from zero is |−3/2| = 3/2."] },
          { title: "Compare √2 and 3/2", steps: ["√2 ≈ 1.414 and 3/2 = 1.5.", "Since 1.414 < 1.5, √2 lies to the left of 3/2.", "The comparison uses a decimal approximation accurate enough to distinguish them."] }
        ]
      },
      {
        title: "Constructing an irrational length",
        paragraphs: [
          "A right triangle with legs 1 and 1 has hypotenuse √2 by Pythagoras’ theorem. With a compass, that length can be transferred onto a number line exactly.",
          "A ruler with only whole-unit markings cannot measure √2 exactly; a compass construction can. A decimal ruler measurement gives an approximation."
        ],
        examples: [
          { title: "Why the diagonal of a unit square is √2", steps: ["Each side of the square has length 1.", "The diagonal is the hypotenuse of a right triangle with legs 1 and 1.", "By Pythagoras, diagonal² = 1² + 1² = 2, so its length is √2."] }
        ]
      }
    ],
    olympiad: "To compare nearby values, square both positive quantities when that preserves order. For example, to compare √2 and 7/5, compare 2 with 49/25 = 1.96; therefore √2 > 7/5.",
    mistake: "A plotted decimal approximation to π or √2 is not its exact location. The exact point exists even though its decimal coordinates do not terminate.",
    fact: {
      question: "Can √2 be constructed exactly even though it is irrational?",
      answer: "Yes. Construct a right triangle with legs 1 and 1. Its hypotenuse has length √2 by Pythagoras, and a compass transfers that length onto the number line."
    },
    examples: [
      { title: "Mark 1/2 and π", steps: ["1/2 is halfway between 0 and 1.", "π is approximately 3.142, so it lies just to the right of 3.", "Its exact location is not a terminating decimal mark."] }
    ],
    numberLine: true,
    questions: [
      { prompt: "Which marked value lies between 1 and 3/2?", options: ["−1", "1/2", "√2", "π"], answer: 2, steps: ["√2 is approximately 1.414.", "Since 1 < 1.414 < 1.5, √2 lies between 1 and 3/2.", "The other listed values do not lie in that interval."] },
      { prompt: "What is the distance of −1 from zero?", options: ["−1", "0", "1", "2"], answer: 2, steps: ["Distance is never negative; it is the absolute value.", "|−1| = 1.", "So −1 is one unit from zero."] },
      { prompt: "Where does −2 lie on a number line?", options: ["Two units right of zero", "Two units left of zero", "At zero", "One unit left of zero"], answer: 1, steps: ["Negative numbers lie to the left of zero.", "The magnitude 2 gives the distance.", "So −2 is two units left of zero."] },
      { prompt: "Which comparison is correct?", options: ["√2 < 7/5", "√2 = 7/5", "√2 > 7/5", "√2 < 1"], answer: 2, steps: ["Both quantities are positive, so compare squares.", "(7/5)² = 49/25 = 1.96, while (√2)² = 2.", "Since 2 > 1.96, √2 > 7/5."] },
      { prompt: "What is the exact length of the diagonal of a square with side 1?", options: ["1", "2", "√2", "π"], answer: 2, level: "Olympiad", steps: ["The diagonal forms a right triangle with legs 1 and 1.", "By Pythagoras, d² = 1² + 1² = 2.", "The positive length is d = √2."] }
    ]
  },
  {
    id: "properties",
    title: "Properties of Real Numbers",
    level: ["Prerequisite Revision · Class 9", "Olympiad Extension"],
    summary: "Review closure, operation laws, identities and inverses—with their important conditions.",
    intro: "Imagine picking apples: three apples plus two apples gives the same total whichever group you count first. That’s the associative property of addition in action.",
    sections: [
      {
        title: "The operation laws",
        paragraphs: [
          "Commutative: a + b = b + a and ab = ba. Addition and multiplication can swap order; subtraction and division generally cannot.",
          "Associative: (a + b) + c = a + (b + c) and (ab)c = a(bc). Addition and multiplication can regroup; subtraction and division generally cannot.",
          "Distributive: a(b + c) = ab + ac. Multiplication distributes over addition and subtraction.",
          "Closure: real numbers are closed under addition, subtraction and multiplication. They are closed under division only when the divisor is non-zero."
        ],
        examples: [
          { title: "Apples and commutativity", steps: ["Three apples plus two apples gives 5 apples.", "Two apples plus three apples also gives 5 apples.", "So 3 + 2 = 2 + 3; addition is commutative."] },
          { title: "Division is not commutative", steps: ["Take 8 ÷ 2 = 4.", "Reverse the order: 2 ÷ 8 = 1/4.", "The results differ, so division is not commutative."] },
          { title: "Use distributivity", steps: ["Calculate 7 × 13 as 7 × (10 + 3).", "Distribute: 7 × 10 + 7 × 3 = 70 + 21.", "The result is 91."] }
        ]
      },
      {
        title: "Identities, inverses and an integer lemma",
        paragraphs: [
          "Additive identity: 0, because a + 0 = a. Multiplicative identity: 1, because a × 1 = a.",
          "The additive inverse of a is −a. The multiplicative inverse of a is 1/a, which exists in the real numbers only when a ≠ 0.",
          "For positive integers a and b, HCF(a,b) × LCM(a,b) = ab. This integer result is useful alongside prime factorisation; it is not a closure law for all real numbers."
        ],
        examples: [
          { title: "Find the inverses of 7 and −3", steps: ["The additive inverse of 7 is −7 because 7 + (−7) = 0.", "The multiplicative inverse of 7 is 1/7 because 7 × 1/7 = 1.", "For −3, the additive inverse is 3 and the multiplicative inverse is −1/3."] }
        ]
      }
    ],
    olympiad: "When an expression contains many terms, use commutativity to rearrange and associativity to group convenient pairs. Keep the operation fixed: swapping or regrouping is not valid for subtraction or division in general.",
    mistake: "Division by zero is undefined, so the real numbers are not closed under division without the non-zero divisor condition.",
    fact: {
      question: "Is the multiplicative inverse of zero a real number?",
      answer: "No. There is no real number x with 0 × x = 1, because 0 × x is always 0. Division by zero is undefined."
    },
    examples: [
      { title: "HCF–LCM check for 12 and 18", steps: ["HCF(12,18) = 6 and LCM(12,18) = 36.", "Multiply: 6 × 36 = 216.", "The original product is 12 × 18 = 216, so the identity checks."] }
    ],
    questions: [
      { prompt: "Which property is shown by 4 + 9 = 9 + 4?", options: ["Associative", "Commutative", "Distributive", "Closure"], answer: 1, steps: ["The two addends exchange order.", "Their grouping is unchanged.", "That is the commutative property of addition."] },
      { prompt: "For which value of x is 1/x a real number?", options: ["x = 0 only", "Any real x", "Any real x except 0", "Only positive x"], answer: 2, steps: ["The reciprocal is defined by division: 1 ÷ x.", "Division by zero is undefined.", "So x may be any non-zero real number."] },
      { prompt: "Which operation is not commutative over the real numbers?", options: ["Addition", "Multiplication", "Subtraction", "Both addition and multiplication"], answer: 2, steps: ["Addition and multiplication can swap order.", "For example, 8 − 3 = 5 but 3 − 8 = −5.", "Subtraction is not commutative."] },
      { prompt: "If HCF(8,12) = 4, what is LCM(8,12)?", options: ["16", "20", "24", "96"], answer: 2, steps: ["For positive integers, HCF × LCM = product.", "4 × LCM = 8 × 12 = 96.", "LCM = 96/4 = 24."] },
      { prompt: "Which expression correctly uses distributivity?", options: ["3(4 + 5) = 3×4 + 3×5", "3(4 + 5) = 3 + 4×5", "3(4 + 5) = 12 + 5", "3(4 + 5) = 4 + 3×5"], answer: 0, steps: ["Distribute the outside factor to each term inside the brackets.", "This gives 3×4 + 3×5 = 12 + 15 = 27.", "The first equality is correct."] }
    ]
  },
  {
    id: "euclid-fta",
    title: "Euclid’s Algorithm and the Fundamental Theorem of Arithmetic",
    level: ["Core · Class 10 (FTA)", "Prerequisite / Enrichment (Euclid algorithm)", "Olympiad Extension"],
    summary: "Use prime factorisation and repeated division to understand unique factors and HCF.",
    intro: "Prime factorisation is a number’s unique set of building blocks. The Fundamental Theorem of Arithmetic guarantees that, apart from the order, those blocks cannot be rearranged into a different answer.",
    sections: [
      {
        title: "Fundamental Theorem of Arithmetic",
        paragraphs: [
          "Every integer greater than 1 is either prime or can be expressed as a product of primes. This factorisation is unique apart from the order of its factors.",
          "Example: 84 = 2² × 3 × 7. The Class 10 curriculum asks students to state the theorem after reviewing earlier work and using examples to motivate it."
        ],
        examples: [
          { title: "Prime-factorise 840", steps: ["840 = 84 × 10.", "84 = 2² × 3 × 7 and 10 = 2 × 5.", "Therefore 840 = 2³ × 3 × 5 × 7.", "The prime powers, apart from order, are unique."] },
          { title: "Find HCF and LCM of 84 and 120", steps: ["84 = 2² × 3 × 7; 120 = 2³ × 3 × 5.", "For HCF, take common primes with the smaller exponents: 2² × 3 = 12.", "For LCM, take every prime with the larger exponent: 2³ × 3 × 5 × 7 = 840.", "Check: 12 × 840 = 84 × 120 = 10080."] }
        ]
      },
      {
        title: "Euclid’s division algorithm for HCF",
        paragraphs: [
          "For positive integers a and b, with a ≥ b, write a = bq + r where 0 ≤ r < b. Repeating this division does not change the HCF: HCF(a,b) = HCF(b,r).",
          "Continue until the remainder is zero. The last non-zero remainder is the HCF. This algorithm is included here as a useful revision/extension method; the 2026–27 Class X syllabus entry specifically names the Fundamental Theorem of Arithmetic."
        ],
        examples: [
          { title: "Use Euclid’s algorithm to find HCF(252, 105)", steps: ["252 = 2×105 + 42, so HCF(252,105) = HCF(105,42).", "105 = 2×42 + 21, so HCF(105,42) = HCF(42,21).", "42 = 2×21 + 0.", "The last non-zero remainder is 21, so the HCF is 21."] }
        ]
      }
    ],
    olympiad: "Compare prime exponents to reason quickly. For HCF choose the smaller exponent of each shared prime; for LCM choose the larger exponent appearing in either factorisation.",
    mistake: "The Fundamental Theorem guarantees uniqueness of prime factorisation, not uniqueness of every factorisation into composite numbers. For example, 60 = 6×10 = 4×15, but its prime factorisation is always 2²×3×5.",
    fact: {
      question: "Why does Euclid’s algorithm preserve the HCF?",
      answer: "If a = bq + r, any common divisor of a and b divides r = a − bq. Conversely, any common divisor of b and r also divides a = bq + r. The common divisors—and therefore the HCF—are the same."
    },
    examples: [
      { title: "Use prime powers to compare HCF and LCM", steps: ["For 18 = 2×3² and 30 = 2×3×5, the HCF is 2×3 = 6.", "The LCM is 2×3²×5 = 90.", "Their product 6×90 = 540 equals 18×30."] }
    ],
    questions: [
      { prompt: "What is the prime factorisation of 840?", options: ["2³×3×5×7", "2²×3×5×7", "2³×3²×5", "2×3×5×7"], answer: 0, steps: ["840 = 84×10.", "84 = 2²×3×7 and 10 = 2×5.", "Combining factors gives 2³×3×5×7."] },
      { prompt: "What is HCF(84,120)?", options: ["6", "12", "24", "60"], answer: 1, steps: ["84 = 2²×3×7 and 120 = 2³×3×5.", "The common primes with smaller powers are 2² and 3.", "HCF = 4×3 = 12."] },
      { prompt: "What is LCM(84,120)?", options: ["420", "720", "840", "10080"], answer: 2, steps: ["Use the largest prime powers from both numbers: 2³×3×5×7.", "Calculate: 8×3×5×7 = 840.", "So the LCM is 840."] },
      { prompt: "Using Euclid’s algorithm, what is HCF(252,105)?", options: ["7", "21", "42", "63"], answer: 1, level: "Olympiad", steps: ["252 = 2×105 + 42.", "105 = 2×42 + 21.", "42 = 2×21 + 0, so the last non-zero remainder is 21."] },
      { prompt: "What does the Fundamental Theorem of Arithmetic guarantee for integers greater than 1?", options: ["Every number is even.", "Prime factorisation exists and is unique apart from order.", "Every number has exactly two factors.", "Every fraction terminates."], answer: 1, steps: ["A number greater than 1 is prime or is a product of primes.", "The theorem says that prime factorisation is unique except for the order of the factors.", "It does not say all numbers are prime or even."] }
    ]
  },
  {
    id: "surds",
    title: "Surds and Simplifying Radicals",
    level: ["Prerequisite Revision · Class 9", "Olympiad Extension"],
    summary: "Simplify square roots and rationalise simple denominators without mislabelling syllabus scope.",
    intro: "A square root can often be simplified by pulling out a perfect-square factor. We’ll use that skill carefully and keep rationalising denominators labelled as extension practice.",
    sections: [
      {
        title: "Simplify square roots",
        paragraphs: [
          "For non-negative a and b, √(ab) = √a × √b. If a factor is a perfect square, its square root can be taken outside the radical.",
          "A surd is an irrational root expression, such as √2, left in exact form. A radical such as √4 is not a surd because it simplifies to the rational number 2.",
          "Simplifying radicals supports number-system work; rationalising denominators is presented as optional enrichment rather than a named Class 10 core requirement."
        ],
        examples: [
          { title: "Simplify √72", steps: ["Factor 72 = 36×2.", "Then √72 = √36×√2.", "Since √36 = 6, the answer is 6√2."] },
          { title: "Simplify √48", steps: ["Write 48 = 16×3.", "√48 = √16×√3 = 4√3.", "Because 3 is not a perfect square, √3 remains."] }
        ]
      },
      {
        title: "Rationalise a simple denominator · extension",
        paragraphs: [
          "To rationalise 1/(√2 − 1), multiply top and bottom by the conjugate √2 + 1. The denominator becomes a difference of squares.",
          "This method removes the radical from the denominator; it does not change the value of the fraction."
        ],
        examples: [
          { title: "Rationalise 1/(√2 − 1)", steps: ["Multiply numerator and denominator by √2 + 1.", "The denominator is (√2 − 1)(√2 + 1) = 2 − 1 = 1.", "The expression becomes (√2 + 1)/1 = √2 + 1."] }
        ]
      }
    ],
    olympiad: "Look for the largest square factor first. For √180, use 180 = 36×5, giving 6√5. When denominators contain a binomial surd, its conjugate often turns the denominator into a difference of squares.",
    mistake: "√(a + b) is not generally √a + √b. For example, √(9 + 16) = 5, while √9 + √16 = 7.",
    fact: {
      question: "Why is √72 written as 6√2 instead of √36 + √2?",
      answer: "The square-root product rule applies to multiplication: √(36×2) = √36×√2 = 6√2. It does not split a sum, and 72 is 36 times 2, not 36 plus 2."
    },
    examples: [
      { title: "A common-sense check", steps: ["(6√2)² = 36×2 = 72.", "Both √72 and 6√2 are positive.", "Therefore √72 = 6√2."] }
    ],
    questions: [
      { prompt: "Simplify √72.", options: ["6√2", "4√3", "5√2", "12√2"], answer: 0, steps: ["Write 72 = 36×2.", "√72 = √36×√2.", "So √72 = 6√2."] },
      { prompt: "Simplify √48.", options: ["3√5", "4√3", "8√3", "3√4"], answer: 1, steps: ["Write 48 = 16×3.", "Take the perfect square outside: √48 = 4√3.", "Since 3 has no square factor, this is simplified."] },
      { prompt: "Which equality is correct?", options: ["√(9×2) = 3√2", "√(9+16) = 3+4", "√12 = 6√2", "√25 = 5√5"], answer: 0, steps: ["√(9×2) = √9×√2 = 3√2.", "But roots do not split over addition: √25 = 5, not 3+4.", "The first equality is correct."] },
      { prompt: "What is 1/(√2 − 1) after rationalising?", options: ["√2 − 1", "√2 + 1", "1 − √2", "2"], answer: 1, level: "Olympiad", steps: ["Multiply numerator and denominator by the conjugate √2 + 1.", "The denominator becomes (√2)² − 1² = 1.", "The result is √2 + 1."] },
      { prompt: "Which is not a surd because it is rational?", options: ["√2", "√3", "√4", "√5"], answer: 2, steps: ["√4 = 2, an integer.", "Integers are rational numbers.", "The other roots are irrational, so √4 is the non-surd choice."] }
    ]
  },
  {
    id: "linear-combinations",
    title: "Advanced: Linear Combinations and Expressions",
    level: ["Olympiad Extension"],
    summary: "Reason about sums and products involving irrational numbers—without unsafe assumptions.",
    intro: "Two irrational numbers can add to a rational number or an irrational one. The exact relationship matters. Let’s prove the cases instead of guessing from appearances.",
    sections: [
      {
        title: "A rational multiple plus a rational number",
        paragraphs: [
          "If x is irrational, a and b are rational, and b ≠ 0, then a + bx is irrational. Otherwise, if a + bx were rational, subtracting a and dividing by non-zero rational b would make x rational—a contradiction.",
          "If b = 0, the expression is simply a and is rational. This condition is essential."
        ],
        examples: [
          { title: "Show 5 + 2√3 is irrational", steps: ["Assume 5 + 2√3 is rational.", "Subtract 5 and divide by 2; then √3 would be rational.", "But √3 is irrational, giving a contradiction.", "Therefore 5 + 2√3 is irrational."] }
        ]
      },
      {
        title: "Aha! Prove √2 + √3 is irrational",
        paragraphs: [
          "Suppose √2 + √3 = r for a rational number r. Squaring gives r² = 5 + 2√6.",
          "Then √6 = (r² − 5)/2 would be rational, because rational numbers are closed under subtraction and division by a non-zero rational.",
          "But √6 is irrational: 6 is not a perfect square. This contradiction proves √2 + √3 is irrational."
        ],
        examples: [
          { title: "Two irrationals can have a rational sum", steps: ["√2 is irrational.", "Its negative −√2 is also irrational.", "Their sum is √2 + (−√2) = 0, which is rational."] },
          { title: "Two irrationals can have a rational product", steps: ["√2 and √8 are both irrational.", "Their product is √16 = 4.", "So irrational × irrational can be rational."] }
        ]
      }
    ],
    olympiad: "Before applying a rule to irrationals, test whether the problem gives a special relationship. There is no universal rule that the sum or product of two irrationals is irrational.",
    mistake: "Do not claim that irrational + irrational is always irrational. √2 + (−√2) = 0, and √2 × √8 = 4 are counterexamples.",
    fact: {
      question: "Can the sum of two irrational numbers be rational?",
      answer: "Yes. √2 and −√2 are both irrational, but their sum is 0. This is why a proof must use the particular structure of the numbers."
    },
    examples: [
      { title: "Use the linear-combination rule", steps: ["Let a = 3 and b = −4, both rational, and x = √5, irrational.", "Since b ≠ 0, a + bx = 3 − 4√5 is irrational.", "If it were rational, rearranging would make √5 rational, a contradiction."] }
    ],
    questions: [
      { prompt: "If a and b are rational, x is irrational, and b ≠ 0, what can be said about a + bx?", options: ["It is always rational.", "It is irrational.", "It is zero.", "It cannot be classified."], answer: 1, steps: ["Suppose a + bx were rational.", "Subtract rational a and divide by non-zero rational b; this would make x rational.", "That contradicts x irrational, so a + bx is irrational."] },
      { prompt: "Which sum of two irrational numbers is rational?", options: ["√2 + √3", "√5 + √5", "√2 + (−√2)", "√3 + 1"], answer: 2, steps: ["√2 and −√2 are both irrational.", "Their sum is 0, which is rational.", "The other listed expressions are irrational."] },
      { prompt: "What is √2 × √8?", options: ["2", "4", "8", "2√2"], answer: 1, steps: ["Combine the positive square roots: √2×√8 = √16.", "√16 = 4.", "Thus two irrational factors can have a rational product."] },
      { prompt: "Why is √2 + √3 irrational?", options: ["All sums of roots are irrational.", "If the sum were rational, squaring would make √6 rational.", "Because √2 equals √3.", "Because 2+3 is not a square."], answer: 1, steps: ["Assume √2 + √3 = r rational.", "Squaring gives r² = 5 + 2√6, so √6 = (r²−5)/2 would be rational.", "Since √6 is irrational, the assumption is impossible."] },
      { prompt: "Which is a counterexample to “the product of two irrationals is always irrational”?", options: ["√2 × √8 = 4", "√2 × 1 = √2", "√3 + √3", "√5 − √2"], answer: 0, level: "Olympiad", steps: ["√2 and √8 are irrational because 2 and 8 are not perfect squares.", "Their product is √16 = 4, a rational number.", "This disproves the word “always”."] }
    ]
  },
  {
    id: "formula-revision",
    title: "Formula Sheet and Revision",
    level: ["Core · Class 10", "Prerequisite Revision", "Quick revision"],
    summary: "Review the theorem, proof ideas, decimal tests and common number-system facts.",
    intro: "Use this page as a final map. The two explicitly named Class 10 core areas are the Fundamental Theorem of Arithmetic and irrationality proofs for √2, √3 and √5.",
    sections: [
      {
        title: "Core Class 10 facts",
        bullets: [
          "Fundamental Theorem of Arithmetic: every integer greater than 1 is prime or has a unique prime factorisation, apart from order.",
          "√2, √3 and √5 are irrational; prove each by assuming a reduced fraction and deriving a common prime factor in numerator and denominator.",
          "For HCF, choose common prime factors with the smaller exponents; for LCM, choose all prime factors with the larger exponents. These are useful applications of prime factorisation."
        ],
        examples: [
          { title: "Fast HCF and LCM from prime powers", steps: ["36 = 2²×3² and 60 = 2²×3×5.", "HCF = 2²×3 = 12.", "LCM = 2²×3²×5 = 180.", "Check: 12×180 = 36×60 = 2160."] }
        ]
      },
      {
        title: "Revision and extension facts",
        bullets: [
          "Rational: p/q with integers p,q and q ≠ 0. Irrational: not expressible in that form.",
          "Reduced denominator test: only 2s and 5s means terminating; another prime factor means recurring.",
          "R = Q ∪ I, with Q ∩ I = ∅. Real numbers correspond to points on the number line.",
          "For positive integers a,b: HCF(a,b)×LCM(a,b)=ab.",
          "For non-zero positive radicals, √(ab)=√a×√b; factor out perfect squares before simplifying.",
          "Do not assume irrational + irrational or irrational × irrational is always irrational."
        ],
        examples: [
          { title: "A final decimal check", steps: ["7/40 has reduced denominator 40 = 2³×5, so it terminates.", "7/45 has denominator 45 = 3²×5, so it recurs.", "Always reduce first."] }
        ]
      }
    ],
    olympiad: "For an unfamiliar question, label each number rational or irrational, reduce fractions first, and check whether prime factorisation or a contradiction proof is the shortest route. Never rely on a slogan without checking its conditions.",
    mistake: "The latest Class X CBSE unit does not list every number-line, surd, decimal-conversion or Euclid-algorithm topic as core. This chapter labels supporting revision and extension separately.",
    fact: {
      question: "What are the two topics explicitly named in the current CBSE Class X Real Numbers unit?",
      answer: "The Fundamental Theorem of Arithmetic, and proofs of irrationality of √2, √3 and √5. Other helpful number-system material in this module is labelled revision or extension."
    },
    examples: [
      { title: "Choose the right tool", steps: ["Need HCF of two large integers? Try prime powers or Euclid’s repeated-division algorithm.", "Need to prove √5 irrational? Use a reduced-fraction contradiction.", "Need to classify a fraction’s decimal? Reduce it and inspect the denominator’s prime factors."] }
    ],
    questions: [
      { prompt: "Which result is explicitly part of the current Class X CBSE Real Numbers unit?", options: ["Fundamental Theorem of Arithmetic", "Calculus of surds", "Complex roots", "Polynomial division algorithm"], answer: 0, steps: ["The 2026–27 Class X mathematics syllabus names the Fundamental Theorem of Arithmetic.", "It also names irrationality proofs of √2, √3 and √5.", "The other choices are not stated Class X Real Numbers core topics there."] },
      { prompt: "What is the HCF of 36 and 60?", options: ["6", "12", "18", "180"], answer: 1, steps: ["36 = 2²×3² and 60 = 2²×3×5.", "Take common prime factors with the smaller exponents: 2²×3.", "The HCF is 12."] },
      { prompt: "What is the LCM of 36 and 60?", options: ["60", "120", "180", "2160"], answer: 2, steps: ["Take each prime with its highest exponent: 2²×3²×5.", "Calculate: 4×9×5 = 180.", "The LCM is 180."] },
      { prompt: "Which reduced denominator gives a terminating decimal?", options: ["18", "21", "40", "45"], answer: 2, level: "Revision", steps: ["A terminating reduced fraction has a denominator containing only prime factors 2 and 5.", "40 = 2³×5.", "The other denominators contain 3 or 7, so 40 is the correct choice."] },
      { prompt: "Which statement about two irrational numbers is always true?", options: ["Their sum is irrational.", "Their product is irrational.", "Their sum and product are both rational.", "No general conclusion about sum or product follows without more information."], answer: 3, level: "Olympiad", steps: ["√2 + (−√2) = 0 is rational, but √2 + √3 is irrational.", "√2×√8 = 4 is rational, while √2×√3 = √6 is irrational.", "Therefore neither sum nor product has a single outcome for every pair."] }
    ]
  }
];
