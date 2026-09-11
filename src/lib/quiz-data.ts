export type QuizQuestion = {
  id: number;
  category: string;
  question: string;
  options: string[];
  /** index in options array of the correct answer */
  correctIndex: number;
  explanation: string;
};

// 22 questions covering the reasoning types the user asked for.
// No em dash anywhere in this file. Plain ASCII punctuation only.
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "Number Sequences",
    question: "What number comes next in the sequence: 2, 4, 8, 16, ?",
    options: ["20", "24", "32", "30"],
    correctIndex: 2,
    explanation:
      "Each number is multiplied by 2. 16 multiplied by 2 equals 32.",
  },
  {
    id: 2,
    category: "Pattern Recognition",
    question:
      "Which shape completes the pattern: circle, square, triangle, circle, square, ?",
    options: ["Circle", "Square", "Triangle", "Pentagon"],
    correctIndex: 2,
    explanation:
      "The sequence repeats every three shapes. After circle and square the next shape is triangle.",
  },
  {
    id: 3,
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
    id: 4,
    category: "Odd One Out",
    question: "Which word does not belong with the others?",
    options: ["Sparrow", "Eagle", "Hawk", "Bat"],
    correctIndex: 3,
    explanation:
      "Sparrow, eagle, and hawk are birds. A bat is a mammal, so it does not belong with the others.",
  },
  {
    id: 5,
    category: "Verbal Reasoning",
    question:
      "Book is to reading as fork is to what? Choose the best matching word.",
    options: ["Drawing", "Eating", "Cooking", "Stirring"],
    correctIndex: 1,
    explanation:
      "A book is a tool used for reading. A fork is a tool used for eating.",
  },
  {
    id: 6,
    category: "Mathematical Reasoning",
    question:
      "If a shirt costs $40 after a 20 percent discount, what was the original price?",
    options: ["$48", "$50", "$60", "$52"],
    correctIndex: 1,
    explanation:
      "The discounted price is 80 percent of the original. 40 divided by 0.8 equals 50.",
  },
  {
    id: 7,
    category: "Shape and Pattern Logic",
    question:
      "A square has how many lines of symmetry? Pick the correct number.",
    options: ["2", "4", "6", "8"],
    correctIndex: 1,
    explanation:
      "A square has four lines of symmetry: two diagonals and two through the midpoints of opposite sides.",
  },
  {
    id: 8,
    category: "Analytical Thinking",
    question:
      "If today is Wednesday, what day of the week will it be 16 days from now?",
    options: ["Thursday", "Friday", "Saturday", "Sunday"],
    correctIndex: 1,
    explanation:
      "16 divided by 7 leaves a remainder of 2. Two days after Wednesday is Friday.",
  },
  {
    id: 9,
    category: "Problem Solving",
    question:
      "A man buys a watch for $120 and sells it for $150. What is his profit percentage?",
    options: ["20 percent", "25 percent", "30 percent", "15 percent"],
    correctIndex: 1,
    explanation:
      "Profit is 30 dollars on a cost of 120 dollars. 30 divided by 120 equals 0.25, which is 25 percent.",
  },
  {
    id: 10,
    category: "Number Sequences",
    question:
      "What number comes next: 1, 1, 2, 3, 5, 8, 13, ?",
    options: ["18", "20", "21", "23"],
    correctIndex: 2,
    explanation:
      "This is the Fibonacci pattern. Each number is the sum of the two before it. 8 plus 13 equals 21.",
  },
  {
    id: 11,
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
      "The statements do not tell us whether any cats fall inside the wild animal group. So we can only say some cats may or may not be wild.",
  },
  {
    id: 12,
    category: "Odd One Out",
    question: "Which number does not belong: 3, 5, 7, 9, 11?",
    options: ["3", "5", "9", "11"],
    correctIndex: 2,
    explanation:
      "All the other numbers are prime. 9 is divisible by 3, so it is not prime.",
  },
  {
    id: 13,
    category: "Verbal Reasoning",
    question:
      "Choose the word that is most similar in meaning to \"brief\":",
    options: ["Long", "Short", "Heavy", "Bright"],
    correctIndex: 1,
    explanation:
      "Brief means short in time or length, so the closest word is short.",
  },
  {
    id: 14,
    category: "Mathematical Reasoning",
    question:
      "What is the next number in the sequence: 3, 6, 11, 18, 27, ?",
    options: ["36", "38", "40", "34"],
    correctIndex: 1,
    explanation:
      "The differences are 3, 5, 7, 9. The next difference is 11. 27 plus 11 equals 38.",
  },
  {
    id: 15,
    category: "Pattern Recognition",
    question:
      "Which letter completes the pattern: A, C, E, G, ?",
    options: ["H", "I", "J", "K"],
    correctIndex: 1,
    explanation:
      "Each letter skips one letter in the alphabet. After G, skipping H gives I.",
  },
  {
    id: 16,
    category: "Problem Solving",
    question:
      "A train travels 60 miles per hour for 2.5 hours. How far does it travel?",
    options: ["120 miles", "150 miles", "180 miles", "90 miles"],
    correctIndex: 1,
    explanation:
      "Distance equals speed multiplied by time. 60 multiplied by 2.5 equals 150.",
  },
  {
    id: 17,
    category: "Analytical Thinking",
    question:
      "In a certain code, CAT is written as 24. How is DOG written using the same rule? (A equals 1, B equals 2, and so on)",
    options: ["26", "27", "29", "30"],
    correctIndex: 0,
    explanation:
      "The rule sums the letter positions. C is 3, A is 1, T is 20, so CAT is 24. For DOG, D is 4, O is 15, G is 7, and 4 plus 15 plus 7 equals 26.",
  },
  {
    id: 18,
    category: "Number Sequences",
    question:
      "Find the missing number: 100, 50, 25, 12.5, ?",
    options: ["6.25", "6.5", "5.25", "7.25"],
    correctIndex: 0,
    explanation:
      "Each number is divided by 2. 12.5 divided by 2 equals 6.25.",
  },
  {
    id: 19,
    category: "Logical Reasoning",
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
      "If Tom is older than Jerry and Jerry is older than Spike, then by transitive reasoning Tom is older than Spike.",
  },
  {
    id: 20,
    category: "Verbal Reasoning",
    question:
      "Which word is the odd one out: rapidly, swiftly, slowly, quickly?",
    options: ["Rapidly", "Swiftly", "Slowly", "Quickly"],
    correctIndex: 2,
    explanation:
      "Rapidly, swiftly, and quickly all describe fast movement. Slowly describes the opposite, so it is the odd one out.",
  },
  {
    id: 21,
    category: "Shape and Pattern Logic",
    question:
      "How many small squares of equal size can fit inside a larger square if the larger square has a side length of 4 small squares?",
    options: ["8", "12", "16", "20"],
    correctIndex: 2,
    explanation:
      "If each side of the larger square fits 4 small squares, the total is 4 multiplied by 4, which equals 16.",
  },
  {
    id: 22,
    category: "Problem Solving",
    question:
      "A clock shows 3:15. What is the angle between the hour hand and the minute hand?",
    options: ["0 degrees", "7.5 degrees", "15 degrees", "22.5 degrees"],
    correctIndex: 1,
    explanation:
      "At 3:15 the minute hand is at 90 degrees. The hour hand has moved a quarter of the way from 3 to 4, which is 7.5 degrees past 90 degrees. The angle between them is 7.5 degrees.",
  },
];

// Score bands for result interpretation.
export const scoreBands = [
  {
    min: 0,
    max: 7,
    label: "Keep practicing",
    description:
      "A great place to start. Keep working on logic puzzles and number patterns and your reasoning will sharpen over time.",
  },
  {
    min: 8,
    max: 13,
    label: "Developing",
    description:
      "You are building solid reasoning skills. Focus on speed and pattern recognition, and try again soon.",
  },
  {
    min: 14,
    max: 18,
    label: "Strong",
    description:
      "You handle most reasoning types well. Your pattern recognition and analytical thinking are above average.",
  },
  {
    min: 19,
    max: 22,
    label: "Very strong",
    description:
      "Excellent work. You consistently spot patterns and solve problems quickly across categories.",
  },
];

// Helper used by the result card.
export function getScoreBand(score: number) {
  return (
    scoreBands.find((band) => score >= band.min && score <= band.max) ??
    scoreBands[scoreBands.length - 1]
  );
}
