window.apexArithmeticProgressionTopics = [
  {
    id: "ap-introduction",
    title: "Introduction to Sequences and AP",
    level: ["Core Class 10", "Prerequisite Revision"],
    summary: "Spot a constant step and name the first term and common difference.",
    intro: "Imagine stepping stones placed at the same distance. An arithmetic progression works the same way: each new term is reached by adding the same number.",
    visual: "number-line",
    sections: [
      {
        title: "A sequence with a steady step",
        paragraphs: [
          "A sequence is a list of numbers in a particular order. An arithmetic progression, or AP, is a sequence in which the difference between each pair of neighbouring terms stays the same.",
          "We call the first term a₁ and the fixed difference d. To find d, subtract a term from the term immediately after it: d = a₂ − a₁. The difference can be positive, negative, or zero.",
          "For 2, 5, 8, 11, … each step is +3, so a₁ = 2 and d = 3. For 12, 7, 2, −3, … each step is −5."
        ],
        examples: [
          { title: "Is 4, 9, 14, 19, … an AP?", steps: ["Subtract neighbouring terms: 9 − 4 = 5, 14 − 9 = 5, and 19 − 14 = 5.", "The difference stays 5, so the sequence is an AP.", "Its first term is 4 and its common difference is 5."] },
          { title: "Find the common difference of 6, 2, −2, −6, …", steps: ["Subtract the first term from the second: 2 − 6 = −4.", "Check the next step: −2 − 2 = −4.", "The common difference is −4, so this AP decreases by 4 each time."] }
        ],
        bullets: [
          "A constant sequence such as 7, 7, 7, … is also an AP: its common difference is 0.",
          "The first term does not have to be non-zero. For example, 0, 3, 6, 9, … is an AP.",
          "The ellipsis (…) means the pattern continues."
        ]
      }
    ],
    examples: [
      { title: "A fractional common difference", steps: ["For 1, 1½, 2, 2½, … subtract consecutive terms.", "Each difference is ½.", "So the sequence is an AP with a₁ = 1 and d = ½."] }
    ],
    olympiad: "To check a long list, compare every neighbouring difference. A pattern that looks steady at the beginning is not enough if a later step changes.",
    mistake: "Do not confuse the common difference with the second term. It is a₂ − a₁, not simply a₂.",
    fact: {
      question: "If we add the matching terms of two APs, do we always get another AP?",
      answer: "Yes, as long as we add terms with the same index. If the two APs have terms a + (n − 1)d and p + (n − 1)q, their termwise sum is (a + p) + (n − 1)(d + q), which is an AP."
    },
    questions: [
      { prompt: "What is the common difference of 8, 3, −2, −7, …?", level: "Core", options: ["−5", "5", "−3", "11"], answer: 0, steps: ["Subtract the first term from the next: 3 − 8 = −5.", "Check the next step: −2 − 3 = −5.", "The constant difference is −5, so option A is correct."] },
      { prompt: "Which list is an arithmetic progression?", level: "Core", options: ["2, 4, 8, 16, …", "5, 5, 5, 5, …", "1, 4, 9, 16, …", "1, 2, 4, 7, …"], answer: 1, steps: ["In option B every neighbouring difference is 0.", "The other lists have changing differences: doubling, square numbers, or steps 1, 2, 3.", "So the constant list is an AP, with d = 0."] },
      { prompt: "For the AP 2, 5, 8, 11, …, what are a₁ and d?", level: "Core", options: ["a₁ = 2, d = 3", "a₁ = 3, d = 2", "a₁ = 2, d = 5", "a₁ = 5, d = 3"], answer: 0, steps: ["The first listed term is a₁ = 2.", "Subtract neighbouring terms: 5 − 2 = 3.", "Therefore a₁ = 2 and d = 3."] },
      { prompt: "Which statement about an AP is always true?", level: "Challenge", options: ["Its common difference must be positive.", "Its first term cannot be zero.", "Its neighbouring differences are constant.", "Its terms must all be positive."], answer: 2, steps: ["The defining feature of an AP is the same difference between every pair of neighbouring terms.", "The difference may be negative or zero, and terms may be zero or negative.", "Only the constant-difference statement is always true."] },
      { prompt: "The common difference of an AP is −2½. If a₁ = 4, what is a₂?", level: "Challenge", options: ["6½", "1½", "−2½", "4"], answer: 1, steps: ["The second term is the first term plus one common difference.", "a₂ = 4 + (−2½) = 1½.", "So option B is correct."] }
    ]
  },
  {
    id: "ap-nth-term",
    title: "The nth Term of an AP",
    level: ["Core Class 10"],
    summary: "Build and use a formula for any term without listing every earlier term.",
    intro: "If you need the 100th term, writing 99 steps is slow. Let’s count how many equal jumps separate the first term from the term we want.",
    sections: [
      {
        title: "Count the jumps",
        paragraphs: [
          "Start with a₁ = a. The second term is a + d: one jump has been made. The third is a + 2d: two jumps. The fourth is a + 3d: three jumps.",
          "To reach term n from term 1, we make n − 1 jumps. Therefore aₙ = a + (n − 1)d. The formula works for positive, negative, and zero differences.",
          "There is no rule that a must be non-zero. The first term can be 0, and the formula still works."
        ],
        examples: [
          { title: "Find the 10th term of 3, 7, 11, …", steps: ["The first term is a = 3 and the common difference is d = 7 − 3 = 4.", "Use aₙ = a + (n − 1)d: a₁₀ = 3 + (10 − 1) × 4.", "So a₁₀ = 3 + 36 = 39."] },
          { title: "Find the 8th term of 12, 9, 6, …", steps: ["Here a = 12 and d = 9 − 12 = −3.", "a₈ = 12 + (8 − 1)(−3) = 12 − 21.", "The 8th term is −9."] },
          { title: "Find the 6th term when a = ½ and d = ¼", steps: ["There are 6 − 1 = 5 equal steps after the first term.", "a₆ = ½ + 5 × ¼ = ½ + 5/4.", "Since ½ = 2/4, a₆ = 7/4."] }
        ]
      },
      {
        title: "Finding which term a number is",
        paragraphs: [
          "If we know the term value, set aₙ equal to that value and solve for n. A valid term number must be a positive whole number.",
          "For example, in 4, 7, 10, …, solve 4 + (n − 1)3 = 40. This gives 3n + 1 = 40, so n = 13. Thus 40 is the 13th term."
        ]
      }
    ],
    examples: [
      { title: "Which term of 5, 9, 13, … is 101?", steps: ["Here a = 5 and d = 4. Set the nth-term formula equal to 101: 5 + (n − 1)4 = 101.", "Subtract 5: 4(n − 1) = 96. Divide by 4: n − 1 = 24.", "So n = 25. Check: a₂₅ = 5 + 24 × 4 = 101."] }
    ],
    olympiad: "If solving the term equation gives a non-integer n, that value is not a term of the AP. It may lie between two terms, but term positions are whole numbers.",
    mistake: "Use n − 1, not n, for the number of jumps. The first term needs zero jumps.",
    fact: {
      question: "Can an AP contain zero even if its first term is not zero?",
      answer: "Yes. For example, 10, 5, 0, −5, … is an AP with a = 10 and d = −5; its third term is 10 + 2(−5) = 0. In general, zero is a term precisely when a + (n − 1)d = 0 for some positive whole-number n."
    },
    questions: [
      { prompt: "What is the 10th term of 3, 7, 11, …?", level: "Core", options: ["35", "39", "40", "43"], answer: 1, steps: ["a = 3 and d = 4.", "a₁₀ = 3 + (10 − 1) × 4 = 3 + 36.", "The 10th term is 39, option B."] },
      { prompt: "Find the 8th term of 12, 9, 6, …", level: "Core", options: ["−9", "−12", "−6", "−3"], answer: 0, steps: ["a = 12 and d = −3.", "a₈ = 12 + 7(−3) = 12 − 21.", "Therefore a₈ = −9."] },
      { prompt: "Which term of 5, 9, 13, … is 101?", level: "Challenge", options: ["24th", "25th", "26th", "27th"], answer: 1, steps: ["Set 5 + (n − 1)4 = 101.", "Then 4(n − 1) = 96, so n − 1 = 24 and n = 25.", "Check: 5 + 24 × 4 = 101, so it is the 25th term."] },
      { prompt: "An AP has a = 0 and d = 3. What is its 6th term?", level: "Core", options: ["15", "18", "0", "3"], answer: 0, steps: ["Use aₙ = a + (n − 1)d.", "a₆ = 0 + 5 × 3 = 15.", "A zero first term is allowed; the 6th term is 15."] },
      { prompt: "In an AP, a = 7 and d = ½. What is the 9th term?", level: "Challenge", options: ["10½", "11", "11½", "12"], answer: 1, steps: ["There are 9 − 1 = 8 steps after the first term.", "a₉ = 7 + 8 × ½ = 7 + 4.", "The 9th term is 11, option B."] }
    ]
  },
  {
    id: "ap-sum",
    title: "Sum of the First n Terms",
    level: ["Core Class 10"],
    summary: "Pair the first and last terms to derive both AP sum formulas.",
    intro: "A long row of numbers can be easier to add from the two ends. In an AP, every outside-in pair has the same total.",
    visual: "sum-pairing",
    sections: [
      {
        title: "Pair forwards with backwards",
        paragraphs: [
          "Write the first n terms forwards: Sₙ = a + (a + d) + … + [a + (n − 1)d]. Now write the same terms backwards underneath.",
          "The first and last terms pair to a + aₙ. The second and second-last also pair to a + aₙ. Every column has this same total, and there are n columns.",
          "Adding the two rows gives 2Sₙ = n(a + aₙ). Divide by 2: Sₙ = n/2(a + aₙ). Since aₙ = a + (n − 1)d, we also get Sₙ = n/2[2a + (n − 1)d]."
        ],
        examples: [
          { title: "Add the first 6 terms of 2, 5, 8, …", steps: ["There are n = 6 terms, a = 2 and d = 3.", "Find the last term: a₆ = 2 + 5 × 3 = 17.", "Use S₆ = 6/2(2 + 17) = 3 × 19 = 57.", "Check by listing: 2 + 5 + 8 + 11 + 14 + 17 = 57."] },
          { title: "Find 1 + 2 + 3 + … + 100", steps: ["This AP has 100 terms, first term 1 and last term 100.", "Pairing the ends gives 1 + 100 = 101 in every pair.", "There are 100 terms, so S₁₀₀ = 100/2 × 101 = 5050."] }
        ]
      }
    ],
    examples: [
      { title: "Find the sum of the first 20 terms when a = 7 and d = 3", steps: ["Use Sₙ = n/2[2a + (n − 1)d].", "S₂₀ = 20/2[2(7) + 19(3)] = 10(14 + 57).", "So S₂₀ = 10 × 71 = 710."] }
    ],
    olympiad: "When a question gives the first and last terms, use Sₙ = n/2(a + aₙ). When it gives a and d, the formula with d saves a separate last-term calculation.",
    mistake: "The sum formula needs the number of terms n. Do not confuse the term value aₙ with the term count n.",
    fact: {
      question: "Why is the sum of the first n odd positive integers a square number?",
      answer: "The odd numbers 1, 3, 5, …, 2n − 1 form an AP with n terms. Its sum is n/2[1 + (2n − 1)] = n/2 × 2n = n². For example, 1 + 3 + 5 + 7 = 16 = 4²."
    },
    questions: [
      { prompt: "What is the sum of the first 10 positive integers?", level: "Core", options: ["45", "50", "55", "100"], answer: 2, steps: ["There are 10 terms, from 1 to 10.", "Pairing gives 1 + 10 = 11 in each pair, or use S = 10/2(1 + 10).", "S = 5 × 11 = 55."] },
      { prompt: "Find the sum of the first 6 terms of 2, 5, 8, …", level: "Core", options: ["54", "57", "60", "62"], answer: 1, steps: ["a = 2, d = 3, n = 6.", "The last term is a₆ = 2 + 5 × 3 = 17.", "S₆ = 6/2(2 + 17) = 3 × 19 = 57."] },
      { prompt: "An AP has 12 terms, first term 4 and last term 37. What is its sum?", level: "Core", options: ["246", "252", "264", "492"], answer: 0, steps: ["Use Sₙ = n/2(first term + last term).", "S₁₂ = 12/2(4 + 37) = 6 × 41.", "The sum is 246, option A."] },
      { prompt: "Find the sum of the first 20 terms when a = 7 and d = 3.", level: "Challenge", options: ["700", "710", "720", "730"], answer: 1, steps: ["S₂₀ = 20/2[2(7) + (20 − 1)3].", "This is 10(14 + 57) = 10 × 71.", "The sum is 710."] },
      { prompt: "What is the sum of the first 8 positive odd numbers?", level: "Challenge", options: ["49", "56", "64", "72"], answer: 2, steps: ["The eight terms are 1, 3, …, 15, with first term 1 and last term 15.", "S₈ = 8/2(1 + 15) = 4 × 16.", "The sum is 64 = 8²."] }
    ]
  },
  {
    id: "ap-means",
    title: "Arithmetic Mean and Special Properties",
    level: ["Core Class 10 connection", "Olympiad Extension"],
    summary: "Use the midpoint idea and equal steps to fill missing AP terms.",
    intro: "A number exactly halfway between two others is their average. In an AP, equal steps make every middle term an arithmetic mean of its neighbours.",
    sections: [
      {
        title: "The middle term balances its neighbours",
        paragraphs: [
          "For three consecutive AP terms x, y, z, the step from x to y equals the step from y to z: y − x = z − y.",
          "Add x + y to both sides to rearrange: 2y = x + z. So y = (x + z)/2, the arithmetic mean of the outside terms.",
          "This works for any three equally spaced terms in the AP, not only the first three. For instance, a₄, a₅, a₆ have a₅ as the mean of a₄ and a₆."
        ],
        examples: [
          { title: "Find the missing term: 4, __, 16", steps: ["The middle term is the average of the two ends.", "Middle = (4 + 16)/2 = 20/2.", "The missing term is 10; the list 4, 10, 16 has equal differences of 6."] },
          { title: "Insert three arithmetic means between 2 and 18", steps: ["There will be five equal gaps from 2 to 18: 2, __, __, __, 18.", "The common difference is (18 − 2)/4 = 4.", "Add 4 repeatedly: 2, 6, 10, 14, 18. The inserted means are 6, 10 and 14."] }
        ]
      },
      {
        title: "Symmetry in a block of AP terms",
        paragraphs: [
          "In any finite AP, terms equally far from the two ends have the same sum: a₁ + aₙ = a₂ + aₙ₋₁ = … .",
          "That is why the sum formula works. It also lets us pair terms quickly when the number of terms is even. When it is odd, the middle term pairs with itself."
        ]
      }
    ],
    examples: [
      { title: "Three consecutive AP terms add to 24 and have common difference 2", steps: ["Write the three terms around their middle: x − 2, x, x + 2.", "Their sum is (x − 2) + x + (x + 2) = 3x = 24.", "So x = 8 and the terms are 6, 8, 10. Their middle is the mean of 6 and 10."] }
    ],
    olympiad: "If an AP has an odd number of terms, its middle term equals the average of all its terms. Pair the terms equally far from the ends; each pair has the same total as twice the middle term.",
    mistake: "The arithmetic mean of two numbers is their sum divided by 2. Do not divide their difference by 2 unless you are finding half the gap.",
    fact: {
      question: "In an AP with 9 terms, what is the average of all nine terms?",
      answer: "It is the 5th term. Pair the 1st with the 9th, 2nd with the 8th, 3rd with the 7th, and 4th with the 6th. Each pair sums to twice the 5th term, and the middle term is left alone. Dividing the total by 9 gives exactly the 5th term."
    },
    questions: [
      { prompt: "What number belongs between 6 and 20 to make three terms in AP?", level: "Core", options: ["12", "13", "14", "26"], answer: 1, steps: ["The middle term is the arithmetic mean of the outside terms.", "It is (6 + 20)/2 = 26/2.", "The missing term is 13; both gaps are 7."] },
      { prompt: "Insert two arithmetic means between 3 and 15.", level: "Core", options: ["6 and 9", "7 and 11", "9 and 12", "5 and 10"], answer: 1, steps: ["There are three equal gaps between 3 and 15.", "The common difference is (15 − 3)/3 = 4.", "The sequence is 3, 7, 11, 15, so the means are 7 and 11."] },
      { prompt: "If x, 11, 17 are consecutive terms of an AP, what is x?", level: "Challenge", options: ["5", "6", "8", "23"], answer: 0, steps: ["Equal differences give 11 − x = 17 − 11 = 6.", "So 11 − x = 6, which gives x = 5.", "Check: 5, 11, 17 has common difference 6."] },
      { prompt: "An AP has 7 terms and its middle term is 12. What is the average of all 7 terms?", level: "Olympiad", options: ["7", "12", "24", "Cannot be found"], answer: 1, steps: ["In an odd-length AP, pair terms equally far from the middle.", "Each pair sums to 24, twice the middle term 12; the middle term itself is 12.", "The total divided by 7 is 12, so the average equals the middle term."] },
      { prompt: "Three consecutive terms in an AP have middle term 8 and common difference 3. What are the outside terms?", level: "Challenge", options: ["5 and 11", "3 and 13", "6 and 10", "8 and 11"], answer: 0, steps: ["The term before the middle is 8 − 3 = 5.", "The term after it is 8 + 3 = 11.", "The three terms are 5, 8, 11."] }
    ]
  },
  {
    id: "ap-word-problems",
    title: "Word Problems with AP",
    level: ["Core Class 10"],
    summary: "Turn steady patterns in rows, savings and numbers into AP equations.",
    intro: "Whenever a quantity changes by the same amount each time, an AP may be hiding in the story. We’ll name the first value, the step, and the number of steps.",
    sections: [
      {
        title: "A reliable translation strategy",
        paragraphs: [
          "First decide what one term represents: a day’s saving, a row of seats, or one of a set of numbers. Then identify the first term a and the fixed change d.",
          "Use aₙ = a + (n − 1)d for a particular term. Use Sₙ = n/2[2a + (n − 1)d] when the question asks for a total. Finally, check that the answer fits the story and its units."
        ],
        examples: [
          { title: "The 12th row has 43 seats; each row adds 3 seats. How many seats are in the first row?", steps: ["Let a be the number of seats in row 1. The common difference is d = 3.", "The 12th row has a₁₂ = a + 11 × 3 = 43.", "So a + 33 = 43 and a = 10 seats."] },
          { title: "Mina saves £4 in week 1 and increases her saving by £2 each week. How much does she save in week 8?", steps: ["Weekly savings form an AP with a = £4 and d = £2.", "The 8th week’s saving is a₈ = 4 + 7 × 2 = £18.", "This asks for the saving in week 8, not the total saved over eight weeks."] },
          { title: "Find the sum of Mina’s savings over 8 weeks", steps: ["The weekly amounts are 4, 6, 8, …, 18 pounds.", "There are 8 terms; first is £4 and last is £18.", "Total = 8/2(4 + 18) = 4 × 22 = £88."] }
        ]
      },
      {
        title: "Consecutive numbers as an AP",
        paragraphs: [
          "Consecutive integers have common difference 1; consecutive even or odd integers have common difference 2.",
          "For example, three consecutive even integers can be written as x, x + 2, x + 4. This makes their equal spacing clear before we use any condition from the problem."
        ]
      }
    ],
    examples: [
      { title: "Three consecutive even numbers have sum 54", steps: ["Write them as x, x + 2, x + 4.", "Their sum is 3x + 6 = 54, so 3x = 48 and x = 16.", "The numbers are 16, 18 and 20. Check: they are even, consecutive in steps of 2, and sum to 54."] }
    ],
    olympiad: "Read carefully whether a problem asks for the nth value or the sum of n values. These are different quantities, even when both use the same AP.",
    mistake: "If a quantity increases by £2 each week, the first week is not £2. Write the given starting value separately from the weekly increase.",
    fact: {
      question: "In a theatre, each row has 2 more seats than the row before. If row 1 has 12 seats, can row 10 have 30 seats?",
      answer: "Yes. The seat count is an AP with a = 12 and d = 2. The 10th row has 12 + 9 × 2 = 30 seats. Notice there are nine increases between the first and tenth rows."
    },
    questions: [
      { prompt: "A hall has 12 seats in row 1 and 2 more seats in each later row. How many seats are in row 10?", level: "Core", options: ["28", "30", "32", "20"], answer: 1, steps: ["Here a = 12 and d = 2.", "a₁₀ = 12 + (10 − 1) × 2 = 12 + 18.", "Row 10 has 30 seats."] },
      { prompt: "A student saves £5 in week 1 and £3 more each following week. How much is saved in week 6?", level: "Core", options: ["£18", "£20", "£23", "£38"], answer: 1, steps: ["Weekly savings form an AP with a = £5 and d = £3.", "Week 6 saving = 5 + 5 × 3 = £20.", "This is the amount saved in week 6, not the six-week total."] },
      { prompt: "Three consecutive even integers have sum 54. What is the middle integer?", level: "Challenge", options: ["16", "18", "20", "22"], answer: 1, steps: ["The three numbers are equally spaced, so the middle equals their average.", "Middle = 54 ÷ 3 = 18.", "The numbers are 16, 18, 20 and their sum is 54."] },
      { prompt: "A runner covers 400 m on day 1 and adds 50 m each day. How far does the runner cover on day 7?", level: "Core", options: ["650 m", "700 m", "750 m", "800 m"], answer: 1, steps: ["The distances form an AP with a = 400 m and d = 50 m.", "a₇ = 400 + 6 × 50 = 400 + 300.", "The distance on day 7 is 700 m."] },
      { prompt: "A stair display has 6 blocks in its first row and 4 additional blocks in every next row. How many blocks are in the first 5 rows altogether?", level: "Challenge", options: ["50", "60", "70", "74"], answer: 2, steps: ["The row counts are 6, 10, 14, 18, 22.", "There are 5 terms, first 6 and last 22.", "Total = 5/2(6 + 22) = 5 × 14 = 70 blocks."] }
    ]
  },
  {
    id: "ap-graphs",
    title: "Graphical Representation of an AP",
    level: ["Olympiad Extension · Visual connection"],
    summary: "See equal differences as the slope of a straight-line pattern.",
    intro: "Plot each term against its position. Equal changes in term value for equal changes in position place the points on a straight line.",
    visual: "ap-graphs",
    sections: [
      {
        title: "Term number on one axis, value on the other",
        paragraphs: [
          "Put the term number n on the horizontal axis and the term value aₙ on the vertical axis. For the AP 2, 5, 8, 11, … the plotted points start (1, 2), (2, 5), (3, 8), (4, 11).",
          "The value rises by 3 whenever n rises by 1, so the slope is 3, the common difference. In general, aₙ = a + (n − 1)d = dn + (a − d), a straight-line rule.",
          "Only whole-number term positions are terms of the AP. The connecting line helps us see the pattern, but points between integer positions are not AP terms."
        ],
        examples: [
          { title: "Read a term from the graph rule", steps: ["The increasing AP 2, 5, 8, … has a = 2 and d = 3.", "Its rule is aₙ = 2 + 3(n − 1) = 3n − 1.", "At n = 4, a₄ = 3 × 4 − 1 = 11, matching point (4, 11)."] },
          { title: "What does a negative slope mean?", steps: ["For 14, 11, 8, 5, … the common difference is −3.", "Each step right on the n-axis moves 3 units down on the value axis.", "The plotted points still lie on a straight line; this AP is decreasing."] }
        ]
      }
    ],
    examples: [
      { title: "Find the point for the 6th term of 2, 5, 8, …", steps: ["There are six positions from n = 1 through n = 6.", "a₆ = 2 + 5 × 3 = 17.", "The graph point is (6, 17). The line rule aₙ = 3n − 1 gives the same value."] }
    ],
    olympiad: "The line’s y-intercept is a − d because the extended rule is aₙ = dn + (a − d). This intercept is a feature of the extended line, not a term at n = 0.",
    mistake: "The slope equals the change in value divided by the change in term number. It is d, not the first term.",
    fact: {
      question: "Does the graph of an AP consist of every point on a straight line?",
      answer: "No. The actual sequence is shown by points whose x-coordinates are positive whole numbers 1, 2, 3, … . The straight line through them is a useful visual extension; points such as n = 2.5 do not represent a term position."
    },
    questions: [
      { prompt: "What is the slope of the graph of 2, 5, 8, 11, … when term number is on the x-axis?", level: "Challenge", options: ["2", "3", "5", "−3"], answer: 1, steps: ["Each increase of 1 in the term number increases the value by 3.", "Slope = change in value ÷ change in term number = 3 ÷ 1.", "So the slope is 3, the common difference."] },
      { prompt: "Which point represents the 4th term of 2, 5, 8, …?", level: "Challenge", options: ["(4, 8)", "(3, 11)", "(4, 11)", "(11, 4)"], answer: 2, steps: ["The 4th term is 2 + 3 × 3 = 11.", "The horizontal coordinate is the term number 4, and the vertical coordinate is its value 11.", "So the point is (4, 11)."] },
      { prompt: "The AP 14, 11, 8, 5, … is plotted against term number. What is the slope?", level: "Challenge", options: ["3", "−3", "14", "−14"], answer: 1, steps: ["The value changes by 11 − 14 = −3 for each one-step increase in term number.", "The slope is change in value divided by change in term number: −3/1.", "Therefore the slope is −3."] },
      { prompt: "Which rule gives the term values for the AP 2, 5, 8, … at position n?", level: "Challenge", options: ["aₙ = 3n + 1", "aₙ = 2n + 3", "aₙ = 3n − 1", "aₙ = n + 2"], answer: 2, steps: ["The first term is 2 and the common difference is 3.", "aₙ = 2 + (n − 1)3 = 2 + 3n − 3.", "So aₙ = 3n − 1. At n = 1 it gives 2, and at n = 2 it gives 5."] },
      { prompt: "Which statement about points of an AP on a term-number graph is correct?", level: "Olympiad", options: ["Every real x-coordinate is a term position.", "Only integer term positions are actual terms.", "The slope is always the first term.", "A decreasing AP cannot be a straight line."], answer: 1, steps: ["A term number is 1, 2, 3, …, so actual sequence points use positive whole-number x-coordinates.", "The extended straight line may pass between those points, but those are not terms.", "The slope is d and can be negative for a decreasing AP."] }
    ]
  },
  {
    id: "ap-olympiad",
    title: "Advanced Olympiad Problems",
    level: ["Olympiad Extension"],
    summary: "Combine term and sum rules, use symmetry, and explain why a pattern works.",
    intro: "Now we’ll use AP ideas as tools rather than just substitute into formulas. Look for equal steps, symmetric terms, and the exact quantity the question asks for.",
    sections: [
      {
        title: "Choose the useful relationship",
        paragraphs: [
          "If two terms are known, subtract their formulas to remove the first term. If a block of terms is symmetric, pair its outside terms. If a sum is given, use the number of terms and endpoints before expanding.",
          "For example, a₁₁ − a₄ = [a + 10d] − [a + 3d] = 7d. The unknown first term cancels, leaving only the difference and the seven steps between positions 4 and 11."
        ],
        examples: [
          { title: "Given a₄ = 14 and a₁₁ = 42, find a and d", steps: ["a₁₁ − a₄ = 7d, so 42 − 14 = 7d.", "Thus 28 = 7d and d = 4.", "Use a₄ = a + 3d: 14 = a + 12, so a = 2.", "Check: a₁₁ = 2 + 10 × 4 = 42."] },
          { title: "Add terms 4 through 12 of 4, 7, 10, …", steps: ["Term 4 is 4 + 3 × 3 = 13. Term 12 is 4 + 11 × 3 = 37.", "From term 4 through term 12 there are 12 − 4 + 1 = 9 terms.", "Their sum is 9/2(13 + 37) = 9 × 25 = 225."] }
        ]
      }
    ],
    examples: [
      { title: "Prove the sum of the first n odd numbers is n²", steps: ["The terms are 1, 3, 5, …, 2n − 1, an AP with n terms.", "Use the sum formula: Sₙ = n/2[1 + (2n − 1)].", "Inside the brackets, 1 + 2n − 1 = 2n.", "Therefore Sₙ = n/2 × 2n = n²."] }
    ],
    olympiad: "A useful habit: before using the sum formula on a middle block, count terms inclusively. From term r through term s there are s − r + 1 terms.",
    mistake: "The gap between positions r and s is s − r, but the number of terms from r to s inclusive is s − r + 1.",
    fact: {
      question: "If a₁₁ − a₄ = 28, can we find the common difference without knowing a₁?",
      answer: "Yes. The term formulas are a₁₁ = a + 10d and a₄ = a + 3d. Subtract: a₁₁ − a₄ = 7d. So 28 = 7d, giving d = 4; the first term cancels."
    },
    questions: [
      { prompt: "In an AP, a₄ = 14 and a₁₁ = 42. What is the common difference?", level: "Olympiad", options: ["3", "4", "5", "7"], answer: 1, steps: ["There are 11 − 4 = 7 steps between the terms.", "Their difference is 42 − 14 = 28, so 7d = 28.", "Thus d = 4."] },
      { prompt: "For 4, 7, 10, …, what is the sum of terms 4 through 12 inclusive?", level: "Olympiad", options: ["200", "215", "225", "250"], answer: 2, steps: ["Term 4 is 13 and term 12 is 37.", "The number of terms is 12 − 4 + 1 = 9.", "Sum = 9/2(13 + 37) = 9 × 25 = 225."] },
      { prompt: "The sum of the first 15 terms of an AP is 225 and its first term is 1. What is d?", level: "Challenge", options: ["1", "2", "3", "4"], answer: 1, steps: ["225 = 15/2[2(1) + 14d].", "Multiply by 2/15: 30 = 2 + 14d, so 28 = 14d.", "Therefore d = 2."] },
      { prompt: "Three AP terms have common difference 2 and sum 24. What is the sum of their squares?", level: "Olympiad", options: ["184", "192", "200", "208"], answer: 2, steps: ["Write the terms as x − 2, x, x + 2.", "Their sum is 3x = 24, so x = 8 and the terms are 6, 8, 10.", "Their squares sum to 36 + 64 + 100 = 200."] },
      { prompt: "What is the 18th term of the AP whose 4th term is 14 and 11th term is 42?", level: "Olympiad", options: ["66", "70", "74", "78"], answer: 1, steps: ["From terms 4 to 11 there are 7 steps and the value increases by 28, so d = 4.", "Term 18 is 7 steps after term 11.", "a₁₈ = 42 + 7 × 4 = 70, option B."] }
    ]
  },
  {
    id: "ap-revision",
    title: "Revision and Formula Sheet",
    level: ["Core Class 10", "Quick reference"],
    summary: "Review the formulas, what their symbols mean, and the usual pitfalls.",
    intro: "Use this page as a quick check after learning the ideas. A formula is most useful when we know what each symbol represents.",
    sections: [
      {
        title: "Core Class 10 formulas",
        paragraphs: [
          "An AP has a constant common difference d = a₂ − a₁. Its first term is a₁ = a.",
          "Nth term: aₙ = a + (n − 1)d. There are n − 1 jumps from term 1 to term n.",
          "Sum of the first n terms: Sₙ = n/2[2a + (n − 1)d] = n/2(a + aₙ).",
          "For three consecutive AP terms x, y, z, the middle is their arithmetic mean: 2y = x + z."
        ]
      },
      {
        title: "Quick checks before you finish",
        bullets: [
          "The first term can be zero, and the common difference can be negative or zero.",
          "n is the number of terms or the term position; it must be a positive whole number.",
          "For a block from term r through term s, count s − r + 1 terms.",
          "Use the nth-term formula for one term; use the sum formula for a total.",
          "A graph of an AP shows points at whole-number term positions; the line between them is an extension."
        ],
        examples: [
          { title: "Reminder: 3, 7, 11, …", steps: ["a = 3 and d = 4.", "a₈ = 3 + 7 × 4 = 31.", "The first 8 terms sum to 8/2(3 + 31) = 136."] }
        ]
      }
    ],
    examples: [
      { title: "Pick the right formula", steps: ["Asked for a particular term? Use aₙ = a + (n − 1)d.", "Asked for the total of n terms? Use Sₙ = n/2[2a + (n − 1)d].", "Given the first and last terms? Use Sₙ = n/2(a + aₙ)."] }
    ],
    olympiad: "Extension ideas in this chapter include graphing term number against value, proving the odd-number square identity, and solving multi-step problems that combine two AP formulas.",
    mistake: "Keep the role of each symbol clear: a is the first term, d is the common difference, n is the position/count, aₙ is a term value, and Sₙ is a sum.",
    fact: {
      question: "Can the same AP have a positive, zero, or negative term?",
      answer: "Yes. For example, 5, 2, −1, −4, … has d = −3. The terms change from positive to negative as the index increases. The sign of an individual term does not decide whether a sequence is an AP; the constant difference does."
    },
    questions: [
      { prompt: "Which formula gives the nth term of an AP?", level: "Core", options: ["aₙ = a + nd", "aₙ = a + (n − 1)d", "aₙ = n/2(a + d)", "aₙ = a − (n + 1)d"], answer: 1, steps: ["There are n − 1 equal jumps of size d after the first term.", "So add (n − 1)d to a: aₙ = a + (n − 1)d.", "This also gives a₁ = a when n = 1."] },
      { prompt: "Which formula gives the sum of the first n terms when the last term aₙ is known?", level: "Core", options: ["Sₙ = n(a + aₙ)", "Sₙ = n/2(a + aₙ)", "Sₙ = (a + aₙ)/n", "Sₙ = 2n(a + aₙ)"], answer: 1, steps: ["Pair the first term with the last: every pair sums to a + aₙ.", "Adding the sequence forwards and backwards counts every term twice.", "Thus 2Sₙ = n(a + aₙ), so Sₙ = n/2(a + aₙ)."] },
      { prompt: "In 9, 5, 1, …, what is d?", level: "Core", options: ["4", "−4", "−5", "9"], answer: 1, steps: ["Subtract the first term from the second: 5 − 9 = −4.", "Check: 1 − 5 = −4.", "The common difference is −4."] },
      { prompt: "How many terms are there from term 5 through term 12, inclusive?", level: "Challenge", options: ["7", "8", "9", "12"], answer: 1, steps: ["Count inclusively: 12 − 5 + 1.", "This equals 8.", "There are 8 terms in that block."] },
      { prompt: "For an AP with a = 3 and d = 4, what is the sum of the first 8 terms?", level: "Challenge", options: ["128", "132", "136", "140"], answer: 2, steps: ["Find the 8th term: a₈ = 3 + 7 × 4 = 31.", "Use S₈ = 8/2(3 + 31) = 4 × 34.", "The sum is 136."] }
    ]
  }
];
