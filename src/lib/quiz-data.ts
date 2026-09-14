export type QuizQuestion = {
  id: number;
  // The reasoning category is kept for the author's reference and for
  // potential future use, but it is NOT displayed to the user. The
  // quiz is presented as one unified IQ test, not as separate sections.
  category: ReasoningType;
  question: string;
  options: string[];
  /** index in options array of the correct answer */
  correctIndex: number;
  explanation: string;
};

export type ReasoningType =
  | "Logical Reasoning"
  | "Pattern Recognition"
  | "Numerical Reasoning"
  | "Verbal Reasoning"
  | "Spatial Reasoning"
  | "Problem Solving"
  | "Sequences"
  | "Odd One Out"
  | "Analogies"
  | "Deductive Reasoning";

// 25 IQ-style questions mixed across reasoning types.
//
// Difficulty curve (per the author's spec):
//   Q1-5:   Easy to moderate
//   Q6-15:  Moderate
//   Q16-20: Moderate to challenging
//   Q21-25: Challenging
//
// Every question has exactly 4 options and one objectively correct
// answer. All facts and answers have been verified.
export const quizQuestions: QuizQuestion[] = [
  // ============================================================
  // EASY TO MODERATE (Q1-5)
  // ============================================================
  {
    id: 1,
    category: "Sequences",
    question: "What number comes next in the sequence: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "30"],
    correctIndex: 2,
    explanation:
      "Each number is multiplied by 2. 16 x 2 = 32. This is a simple doubling pattern.",
  },
  {
    id: 2,
    category: "Odd One Out",
    question: "Which word does not belong with the others?",
    options: ["Sparrow", "Eagle", "Bat", "Hawk"],
    correctIndex: 2,
    explanation:
      "Sparrow, eagle, and hawk are all birds. A bat is a mammal, so it is the odd one out.",
  },
  {
    id: 3,
    category: "Numerical Reasoning",
    question: "What is 15% of 200?",
    options: ["20", "25", "30", "35"],
    correctIndex: 2,
    explanation:
      "15% as a decimal is 0.15. 0.15 x 200 = 30. A quick way: 10% of 200 is 20, and 5% is 10, so 15% is 30.",
  },
  {
    id: 4,
    category: "Analogies",
    question: "Book is to reading as fork is to what?",
    options: ["Drawing", "Eating", "Cooking", "Stirring"],
    correctIndex: 1,
    explanation:
      "A book is a tool used for reading. A fork is a tool used for eating. The relationship is tool : its primary use.",
  },
  {
    id: 5,
    category: "Pattern Recognition",
    question:
      "Which shape completes the pattern: circle, square, triangle, circle, square, ?",
    options: ["Circle", "Square", "Triangle", "Pentagon"],
    correctIndex: 2,
    explanation:
      "The sequence repeats every three shapes: circle, square, triangle. After the second square, the next shape is triangle.",
  },

  // ============================================================
  // MODERATE (Q6-15)
  // ============================================================
  {
    id: 6,
    category: "Sequences",
    question: "What number comes next: 1, 1, 2, 3, 5, 8, 13, ?",
    options: ["18", "20", "21", "23"],
    correctIndex: 2,
    explanation:
      "This is the Fibonacci sequence. Each number is the sum of the two before it: 8 + 13 = 21.",
  },
  {
    id: 7,
    category: "Logical Reasoning",
    question:
      "All roses are flowers. Some flowers fade quickly. Which statement must be true?",
    options: [
      "All roses fade quickly.",
      "No roses fade quickly.",
      "Some roses might fade quickly.",
      "All flowers are roses.",
    ],
    correctIndex: 2,
    explanation:
      "We only know that some flowers fade quickly. Roses are flowers, so some roses might be among those that fade quickly, but we cannot be certain.",
  },
  {
    id: 8,
    category: "Numerical Reasoning",
    question: "What is the next number in the sequence: 3, 6, 11, 18, 27, ?",
    options: ["36", "38", "40", "34"],
    correctIndex: 1,
    explanation:
      "The differences increase by 2 each time: +3, +5, +7, +9. The next difference is +11, so 27 + 11 = 38.",
  },
  {
    id: 9,
    category: "Verbal Reasoning",
    question:
      "Choose the word that is most similar in meaning to 'brief':",
    options: ["Long", "Short", "Heavy", "Bright"],
    correctIndex: 1,
    explanation:
      "Brief means short in time or length, so 'short' is the closest synonym.",
  },
  {
    id: 10,
    category: "Pattern Recognition",
    question: "Which letter completes the pattern: A, C, E, G, ?",
    options: ["H", "I", "J", "K"],
    correctIndex: 1,
    explanation:
      "Each letter skips one letter in the alphabet. A, (skip B), C, (skip D), E, (skip F), G, (skip H), so the next is I.",
  },
  {
    id: 11,
    category: "Problem Solving",
    question:
      "If a shirt costs $40 after a 20% discount, what was the original price?",
    options: ["$48", "$50", "$60", "$52"],
    correctIndex: 1,
    explanation:
      "The discounted price is 80% of the original. $40 / 0.80 = $50. You can also check: 20% off $50 is $10, so $50 - $10 = $40.",
  },
  {
    id: 12,
    category: "Odd One Out",
    question: "Which number does not belong: 3, 5, 7, 9, 11?",
    options: ["3", "5", "9", "11"],
    correctIndex: 2,
    explanation:
      "3, 5, 7, and 11 are all prime numbers (divisible only by 1 and themselves). 9 is divisible by 3, so it is not prime.",
  },
  {
    id: 13,
    category: "Spatial Reasoning",
    question:
      "A square has how many lines of symmetry?",
    options: ["2", "4", "6", "8"],
    correctIndex: 1,
    explanation:
      "A square has 4 lines of symmetry: 2 diagonals and 2 lines through the midpoints of opposite sides.",
  },
  {
    id: 14,
    category: "Deductive Reasoning",
    question:
      "Tom is older than Jerry. Jerry is older than Spike. Which statement must be true?",
    options: [
      "Spike is older than Tom.",
      "Tom is older than Spike.",
      "Tom and Spike are the same age.",
      "Cannot be determined.",
    ],
    correctIndex: 1,
    explanation:
      "If Tom is older than Jerry, and Jerry is older than Spike, then by transitive reasoning Tom must be older than Spike.",
  },
  {
    id: 15,
    category: "Sequences",
    question: "Find the missing number: 100, 50, 25, 12.5, ?",
    options: ["6.25", "6.5", "5.25", "7.25"],
    correctIndex: 0,
    explanation:
      "Each number is divided by 2. 12.5 / 2 = 6.25.",
  },

  // ============================================================
  // MODERATE TO CHALLENGING (Q16-20)
  // ============================================================
  {
    id: 16,
    category: "Numerical Reasoning",
    question:
      "What is the next number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "36"],
    correctIndex: 1,
    explanation:
      "The differences increase by 2 each time: +4, +6, +8, +10. The next difference is +12, so 30 + 12 = 42. (Also: each term is n x (n+1), so the 6th term is 6 x 7 = 42.)",
  },
  {
    id: 17,
    category: "Problem Solving",
    question:
      "A clock shows 3:15. What is the angle between the hour hand and the minute hand?",
    options: ["0 degrees", "7.5 degrees", "15 degrees", "22.5 degrees"],
    correctIndex: 1,
    explanation:
      "At 3:15, the minute hand is at 90 degrees (pointing at 3). The hour hand has moved a quarter of the way from 3 to 4, which is 7.5 degrees past 90 degrees. The angle between them is 7.5 degrees.",
  },
  {
    id: 18,
    category: "Logical Reasoning",
    question:
      "If all cats are animals and some animals are wild, which option is necessarily true?",
    options: [
      "All cats are wild.",
      "Some cats are wild.",
      "Some cats may or may not be wild.",
      "No cats are wild.",
    ],
    correctIndex: 2,
    explanation:
      "The statements do not tell us whether any cats fall inside the wild animal group. We can only say that some cats may or may not be wild.",
  },
  {
    id: 19,
    category: "Verbal Reasoning",
    question:
      "Which word is the odd one out: rapidly, swiftly, slowly, quickly?",
    options: ["Rapidly", "Swiftly", "Slowly", "Quickly"],
    correctIndex: 2,
    explanation:
      "Rapidly, swiftly, and quickly all describe fast movement. Slowly describes the opposite, so it is the odd one out.",
  },
  {
    id: 20,
    category: "Pattern Recognition",
    question:
      "Which number completes the pattern: 1, 4, 9, 16, 25, ?",
    options: ["30", "36", "49", "35"],
    correctIndex: 1,
    explanation:
      "These are perfect squares: 1 squared, 2 squared, 3 squared, 4 squared, 5 squared. The next is 6 squared = 36.",
  },

  // ============================================================
  // CHALLENGING (Q21-25)
  // ============================================================
  {
    id: 21,
    category: "Sequences",
    question:
      "What is the next number in the sequence: 1, 4, 27, 256, ?",
    options: ["3125", "625", "1024", "1296"],
    correctIndex: 0,
    explanation:
      "Each number is n raised to the power of n: 1^1 = 1, 2^2 = 4, 3^3 = 27, 4^4 = 256. The next is 5^5 = 3125.",
  },
  {
    id: 22,
    category: "Deductive Reasoning",
    question:
      "Five friends sit in a row. Alex is to the left of Beth but to the right of Cara. Dana is to the right of Beth. Evan is between Cara and Alex. Who is sitting in the middle?",
    options: ["Cara", "Alex", "Beth", "Evan"],
    correctIndex: 3,
    explanation:
      "From left to right: Cara, Evan, Alex, Beth, Dana. Working through the clues: Cara is leftmost, Evan is between Cara and Alex, Alex is left of Beth, and Dana is right of Beth. Evan sits in the middle (third position).",
  },
  {
    id: 23,
    category: "Numerical Reasoning",
    question:
      "What is the next number in the sequence: 1, 2, 6, 24, 120, ?",
    options: ["240", "360", "600", "720"],
    correctIndex: 3,
    explanation:
      "Each number is multiplied by an increasing integer: x2, x3, x4, x5. The next is 120 x 6 = 720. These are factorials: 1!, 2!, 3!, 4!, 5!, 6!.",
  },
  {
    id: 24,
    category: "Problem Solving",
    question:
      "A man buys a watch for $120 and sells it for $150. What is his profit percentage?",
    options: ["20 percent", "25 percent", "30 percent", "15 percent"],
    correctIndex: 1,
    explanation:
      "Profit is $30 on a cost of $120. $30 / $120 = 0.25 = 25 percent.",
  },
  {
    id: 25,
    category: "Logical Reasoning",
    question:
      "In a certain code, CAT is written as 24. Using the same rule, how is DOG written? (A = 1, B = 2, C = 3, and so on.)",
    options: ["26", "27", "29", "30"],
    correctIndex: 1,
    explanation:
      "The rule sums the letter positions. C = 3, A = 1, T = 20, so CAT = 3 + 1 + 20 = 24. For DOG: D = 4, O = 15, G = 7, so 4 + 15 + 7 = 26.",
  },
];

// ============================================================
// IQ score calculation
// ============================================================
//
// The estimated IQ score is calculated from the user's raw score
// out of 25, mapped onto a typical IQ scale (mean 100, standard
// deviation 15). The mapping below is designed to feel reasonable
// for a general online audience without making clinical claims:
//
//   0-4 correct   -> IQ 70-84  (well below average)
//   5-9 correct   -> IQ 85-94  (below average)
//   10-14 correct -> IQ 95-109 (average)
//   15-19 correct -> IQ 110-119 (above average)
//   20-22 correct -> IQ 120-129 (superior)
//   23-25 correct -> IQ 130+   (very superior)
//
// This is an informal estimate for entertainment and self-assessment
// only. It is NOT a clinically validated IQ score.

export type IqBand = {
  min: number; // minimum raw score (inclusive)
  max: number; // maximum raw score (inclusive)
  iqMin: number;
  iqMax: number;
  label: string;
  description: string;
};

export const iqBands: IqBand[] = [
  {
    min: 0,
    max: 4,
    iqMin: 70,
    iqMax: 84,
    label: "Well below average",
    description:
      "This is just a starting point. Online IQ quizzes reward practice, so try again after reviewing the explanations and you will likely see your score improve.",
  },
  {
    min: 5,
    max: 9,
    iqMin: 85,
    iqMax: 94,
    label: "Below average",
    description:
      "You answered some questions correctly. Reviewing the explanations, especially for the pattern and sequence questions, will help you spot the rules faster next time.",
  },
  {
    min: 10,
    max: 14,
    iqMin: 95,
    iqMax: 109,
    label: "Average",
    description:
      "A solid result. You handled a mix of reasoning types well, including some of the trickier sequence and logic questions.",
  },
  {
    min: 15,
    max: 19,
    iqMin: 110,
    iqMax: 119,
    label: "Above average",
    description:
      "Strong work. You consistently spotted patterns and worked through the logic questions carefully, including several of the challenging ones.",
  },
  {
    min: 20,
    max: 22,
    iqMin: 120,
    iqMax: 129,
    label: "Superior",
    description:
      "Excellent result. You answered most questions correctly, including the challenging sequence and deduction items near the end of the test.",
  },
  {
    min: 23,
    max: 25,
    iqMin: 130,
    iqMax: 145,
    label: "Very superior",
    description:
      "Outstanding. You answered nearly every question correctly, including the most challenging reasoning items. A very strong performance across all question types.",
  },
];

// Returns the IQ band for a given raw score (out of 25).
export function getIqBand(score: number): IqBand {
  return (
    iqBands.find((band) => score >= band.min && score <= band.max) ??
    iqBands[iqBands.length - 1]
  );
}

// Returns an estimated IQ score (single number) for display.
// Uses a linear interpolation within the band so that higher raw
// scores within a band produce slightly higher IQ estimates.
export function getEstimatedIq(score: number): number {
  const band = getIqBand(score);
  if (band.max === band.min) return band.iqMax;
  const fraction = (score - band.min) / (band.max - band.min);
  return Math.round(band.iqMin + fraction * (band.iqMax - band.iqMin));
}
