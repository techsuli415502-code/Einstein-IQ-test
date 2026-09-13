export type QuizCategory = "Math" | "Science" | "History";

export type QuizQuestion = {
  id: number;
  category: QuizCategory;
  question: string;
  options: string[];
  /** index in options array of the correct answer */
  correctIndex: number;
  explanation: string;
};

// 45 questions across three categories: 15 Math, 15 Science, 15 History.
// Each question has exactly 4 options and one objectively correct answer.
// All facts have been verified against standard reference material.
export const quizQuestions: QuizQuestion[] = [
  // ============================================================
  // MATH (15 questions)
  // ============================================================
  {
    id: 1,
    category: "Math",
    question: "What is 7 multiplied by 8?",
    options: ["54", "55", "56", "58"],
    correctIndex: 2,
    explanation: "7 times 8 equals 56. A useful way to remember this is that the digits 7 and 8 are consecutive, and 5 and 6 are also consecutive in 56.",
  },
  {
    id: 2,
    category: "Math",
    question: "What is the value of pi (π) rounded to two decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    correctIndex: 1,
    explanation: "Pi, the ratio of a circle's circumference to its diameter, is approximately 3.14159, which rounds to 3.14.",
  },
  {
    id: 3,
    category: "Math",
    question: "What is 144 divided by 12?",
    options: ["10", "11", "12", "14"],
    correctIndex: 2,
    explanation: "12 multiplied by 12 equals 144, so 144 divided by 12 equals 12.",
  },
  {
    id: 4,
    category: "Math",
    question: "What is 15% of 200?",
    options: ["20", "25", "30", "35"],
    correctIndex: 2,
    explanation: "15% as a decimal is 0.15. 0.15 multiplied by 200 equals 30.",
  },
  {
    id: 5,
    category: "Math",
    question: "What is the square root of 81?",
    options: ["7", "8", "9", "11"],
    correctIndex: 2,
    explanation: "9 multiplied by 9 equals 81, so the square root of 81 is 9.",
  },
  {
    id: 6,
    category: "Math",
    question:
      "A triangle has two angles measuring 30 degrees and 60 degrees. What is the measure of the third angle?",
    options: ["60 degrees", "70 degrees", "90 degrees", "100 degrees"],
    correctIndex: 2,
    explanation:
      "The interior angles of a triangle always add up to 180 degrees. 180 minus 30 minus 60 equals 90 degrees.",
  },
  {
    id: 7,
    category: "Math",
    question: "What is 2 raised to the power of 5 (2^5)?",
    options: ["16", "25", "32", "64"],
    correctIndex: 2,
    explanation:
      "2 raised to the 5th power means 2 multiplied by itself 5 times: 2 x 2 x 2 x 2 x 2 = 32.",
  },
  {
    id: 8,
    category: "Math",
    question: "What is 5 factorial (5!)?",
    options: ["20", "60", "100", "120"],
    correctIndex: 3,
    explanation:
      "5 factorial means the product of all positive integers from 1 to 5: 1 x 2 x 3 x 4 x 5 = 120.",
  },
  {
    id: 9,
    category: "Math",
    question: "What is the next prime number after 7?",
    options: ["9", "10", "11", "13"],
    correctIndex: 2,
    explanation:
      "A prime number has only two factors: 1 and itself. 9 is divisible by 3, 10 is divisible by 2 and 5, but 11 has only 1 and 11 as factors.",
  },
  {
    id: 10,
    category: "Math",
    question: "What is the least common multiple (LCM) of 4 and 6?",
    options: ["12", "16", "20", "24"],
    correctIndex: 0,
    explanation:
      "The LCM is the smallest number that both 4 and 6 divide into evenly. Multiples of 4: 4, 8, 12, 16. Multiples of 6: 6, 12, 18. The smallest common one is 12.",
  },
  {
    id: 11,
    category: "Math",
    question: "What is 0.25 written as a fraction in simplest form?",
    options: ["1/3", "1/4", "1/5", "2/5"],
    correctIndex: 1,
    explanation:
      "0.25 means 25 hundredths, which is 25/100. Dividing both the numerator and denominator by 25 gives 1/4.",
  },
  {
    id: 12,
    category: "Math",
    question:
      "What is the sum of the interior angles of any triangle (in degrees)?",
    options: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
    correctIndex: 1,
    explanation:
      "The interior angles of any triangle, regardless of its shape, always add up to 180 degrees.",
  },
  {
    id: 13,
    category: "Math",
    question: "If x + 5 = 12, what is the value of x?",
    options: ["5", "6", "7", "8"],
    correctIndex: 2,
    explanation:
      "To solve for x, subtract 5 from both sides of the equation. 12 minus 5 equals 7, so x = 7.",
  },
  {
    id: 14,
    category: "Math",
    question: "What is 9 squared (9²)?",
    options: ["72", "81", "90", "99"],
    correctIndex: 1,
    explanation: "9 squared means 9 multiplied by 9, which equals 81.",
  },
  {
    id: 15,
    category: "Math",
    question: "What is 1000 minus 567?",
    options: ["423", "433", "443", "453"],
    correctIndex: 1,
    explanation:
      "Subtracting step by step: 1000 minus 500 equals 500, minus 60 equals 440, minus 7 equals 433.",
  },

  // ============================================================
  // SCIENCE (15 questions)
  // ============================================================
  {
    id: 16,
    category: "Science",
    question: "Which planet in our solar system is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctIndex: 1,
    explanation:
      "Mars appears reddish because of iron oxide (rust) on its surface, which is why it is called the Red Planet.",
  },
  {
    id: 17,
    category: "Science",
    question: "What is the chemical formula for water?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctIndex: 1,
    explanation:
      "A water molecule is made of two hydrogen atoms and one oxygen atom, giving it the formula H2O.",
  },
  {
    id: 18,
    category: "Science",
    question: "Which organelle is known as the 'powerhouse of the cell'?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    correctIndex: 2,
    explanation:
      "Mitochondria generate most of the cell's supply of ATP, which is the chemical energy that powers cellular processes.",
  },
  {
    id: 19,
    category: "Science",
    question:
      "Which gas do plants primarily absorb from the atmosphere during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correctIndex: 2,
    explanation:
      "Plants take in carbon dioxide (CO2) from the air and use it, along with water and sunlight, to produce glucose and oxygen.",
  },
  {
    id: 20,
    category: "Science",
    question:
      "What is the approximate speed of light in a vacuum, in kilometers per second?",
    options: ["30,000 km/s", "150,000 km/s", "300,000 km/s", "1,000,000 km/s"],
    correctIndex: 2,
    explanation:
      "Light in a vacuum travels at about 299,792 kilometers per second, which is commonly rounded to 300,000 km/s.",
  },
  {
    id: 21,
    category: "Science",
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correctIndex: 1,
    explanation:
      "Jupiter is the largest planet in our solar system, with a mass more than twice that of all other planets combined.",
  },
  {
    id: 22,
    category: "Science",
    question: "What is the chemical symbol for gold?",
    options: ["Gd", "Go", "Au", "Ag"],
    correctIndex: 2,
    explanation:
      "The symbol for gold is Au, from the Latin word 'aurum'. Silver is Ag, from 'argentum'.",
  },
  {
    id: 23,
    category: "Science",
    question: "How many bones are in the adult human body?",
    options: ["186", "206", "226", "246"],
    correctIndex: 1,
    explanation:
      "The adult human skeleton has 206 bones. Babies are born with about 270 bones, but many fuse together as they grow.",
  },
  {
    id: 24,
    category: "Science",
    question:
      "What is the most abundant gas in Earth's atmosphere (by percentage)?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"],
    correctIndex: 1,
    explanation:
      "Nitrogen makes up about 78% of Earth's atmosphere. Oxygen is second at about 21%.",
  },
  {
    id: 25,
    category: "Science",
    question: "At what temperature does water freeze at sea level (in Celsius)?",
    options: ["-10 degrees C", "0 degrees C", "32 degrees C", "100 degrees C"],
    correctIndex: 1,
    explanation:
      "On the Celsius scale, water freezes at 0 degrees and boils at 100 degrees at sea level.",
  },
  {
    id: 26,
    category: "Science",
    question: "Which organ in the human body pumps blood throughout the body?",
    options: ["Lungs", "Liver", "Heart", "Kidneys"],
    correctIndex: 2,
    explanation:
      "The heart is a muscular organ that pumps blood through the circulatory system, delivering oxygen and nutrients to the body.",
  },
  {
    id: 27,
    category: "Science",
    question: "What is the smallest basic unit of life?",
    options: ["Atom", "Molecule", "Cell", "Tissue"],
    correctIndex: 2,
    explanation:
      "The cell is the smallest structural and functional unit of all living organisms. Atoms and molecules are smaller but are not alive.",
  },
  {
    id: 28,
    category: "Science",
    question:
      "What natural force keeps objects on the ground and gives them weight?",
    options: ["Magnetism", "Friction", "Gravity", "Tension"],
    correctIndex: 2,
    explanation:
      "Gravity is the force that attracts objects with mass toward each other. Earth's gravity keeps us on the ground.",
  },
  {
    id: 29,
    category: "Science",
    question: "What is the chemical symbol for the element oxygen?",
    options: ["Ox", "O", "Oc", "Og"],
    correctIndex: 1,
    explanation:
      "The chemical symbol for oxygen is O. Most single-element symbols use one or two letters from the element's name.",
  },
  {
    id: 30,
    category: "Science",
    question: "What is the closest star to Earth?",
    options: ["The Moon", "The Sun", "Proxima Centauri", "Sirius"],
    correctIndex: 1,
    explanation:
      "The Sun is the closest star to Earth, at about 150 million kilometers away. Proxima Centauri is the closest star outside our solar system.",
  },

  // ============================================================
  // HISTORY (15 questions)
  // ============================================================
  {
    id: 31,
    category: "History",
    question: "In what year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctIndex: 2,
    explanation:
      "World War II ended in 1945, with Germany surrendering in May and Japan surrendering in September after the atomic bombings.",
  },
  {
    id: 32,
    category: "History",
    question: "Who was the first President of the United States?",
    options: [
      "Thomas Jefferson",
      "John Adams",
      "George Washington",
      "Benjamin Franklin",
    ],
    correctIndex: 2,
    explanation:
      "George Washington served as the first President of the United States from 1789 to 1797.",
  },
  {
    id: 33,
    category: "History",
    question: "Who painted the Mona Lisa?",
    options: [
      "Michelangelo",
      "Raphael",
      "Leonardo da Vinci",
      "Pablo Picasso",
    ],
    correctIndex: 2,
    explanation:
      "Leonardo da Vinci painted the Mona Lisa in the early 16th century. It is now displayed at the Louvre Museum in Paris.",
  },
  {
    id: 34,
    category: "History",
    question: "In what year did Christopher Columbus first reach the Americas?",
    options: ["1488", "1492", "1500", "1510"],
    correctIndex: 1,
    explanation:
      "Christopher Columbus made his first voyage across the Atlantic in 1492, funded by the Spanish monarchy.",
  },
  {
    id: 35,
    category: "History",
    question: "In what year did the French Revolution begin?",
    options: ["1776", "1789", "1799", "1804"],
    correctIndex: 1,
    explanation:
      "The French Revolution began in 1789 with the storming of the Bastille on July 14, a date still celebrated as France's national day.",
  },
  {
    id: 36,
    category: "History",
    question: "Who was the first Emperor of ancient Rome?",
    options: ["Julius Caesar", "Nero", "Augustus", "Caligula"],
    correctIndex: 2,
    explanation:
      "Augustus (born Octavian) became the first Roman Emperor in 27 BC, marking the start of the Roman Empire.",
  },
  {
    id: 37,
    category: "History",
    question:
      "What was the name of the famous ship that sank in 1912 after hitting an iceberg?",
    options: ["Lusitania", "Britannic", "Titanic", "Olympic"],
    correctIndex: 2,
    explanation:
      "The RMS Titanic sank on its maiden voyage in April 1912 after striking an iceberg in the North Atlantic, killing more than 1,500 people.",
  },
  {
    id: 38,
    category: "History",
    question: "In what year did the Berlin Wall fall?",
    options: ["1987", "1989", "1991", "1993"],
    correctIndex: 1,
    explanation:
      "The Berlin Wall, which had divided East and West Berlin since 1961, fell on November 9, 1989, marking a key moment in the end of the Cold War.",
  },
  {
    id: 39,
    category: "History",
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Mark Twain",
      "Jane Austen",
    ],
    correctIndex: 1,
    explanation:
      "William Shakespeare wrote 'Romeo and Juliet' in the late 16th century. It is one of his most famous tragedies.",
  },
  {
    id: 40,
    category: "History",
    question:
      "What was the name of the first manned mission to land on the Moon?",
    options: ["Apollo 10", "Apollo 11", "Apollo 12", "Apollo 13"],
    correctIndex: 1,
    explanation:
      "Apollo 11 landed on the Moon on July 20, 1969. Astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the lunar surface.",
  },
  {
    id: 41,
    category: "History",
    question:
      "Who was the British Prime Minister during most of World War II?",
    options: [
      "Neville Chamberlain",
      "Winston Churchill",
      "Clement Attlee",
      "Anthony Eden",
    ],
    correctIndex: 1,
    explanation:
      "Winston Churchill served as Prime Minister of the United Kingdom from 1940 to 1945, leading the country through most of World War II.",
  },
  {
    id: 42,
    category: "History",
    question:
      "In what year did the United States declare its independence?",
    options: ["1774", "1776", "1783", "1789"],
    correctIndex: 1,
    explanation:
      "The United States Declaration of Independence was adopted on July 4, 1776, marking the colonies' separation from Great Britain.",
  },
  {
    id: 43,
    category: "History",
    question:
      "Who is known as the 'Father of Modern Physics' for developing the theory of relativity?",
    options: [
      "Isaac Newton",
      "Niels Bohr",
      "Albert Einstein",
      "Galileo Galilei",
    ],
    correctIndex: 2,
    explanation:
      "Albert Einstein developed the theory of relativity, which transformed our understanding of space, time, and gravity. He published the general theory in 1915.",
  },
  {
    id: 44,
    category: "History",
    question:
      "The Great Pyramid of Giza was built as a tomb for which Egyptian pharaoh?",
    options: ["Tutankhamun", "Khufu", "Ramses II", "Cleopatra"],
    correctIndex: 1,
    explanation:
      "The Great Pyramid of Giza was built around 2560 BC as the tomb of Pharaoh Khufu (also known by his Greek name, Cheops).",
  },
  {
    id: 45,
    category: "History",
    question:
      "Which ancient civilization is credited with inventing paper as we know it?",
    options: ["Egypt", "Greece", "China", "Rome"],
    correctIndex: 2,
    explanation:
      "Paper was invented in China around 105 AD by Cai Lun, an official in the Han imperial court. The technique spread to the rest of the world much later.",
  },
];

// Categories in the order they appear in the quiz.
export const quizCategories: QuizCategory[] = ["Math", "Science", "History"];

// Helper: how many questions are in each category.
export function getQuestionsByCategory(
  category: QuizCategory
): QuizQuestion[] {
  return quizQuestions.filter((q) => q.category === category);
}

// Helper: total count per category (used in the intro card and result screen).
export function getQuestionCount(category: QuizCategory): number {
  return getQuestionsByCategory(category).length;
}

// Score bands for the overall result interpretation.
export const scoreBands = [
  {
    min: 0,
    max: 14,
    label: "Keep practicing",
    description:
      "A great starting point. Review the explanations for each question, then try again to build your general knowledge.",
  },
  {
    min: 15,
    max: 24,
    label: "Developing",
    description:
      "You are building a solid foundation. Focus on the categories where you scored lowest and try again soon.",
  },
  {
    min: 25,
    max: 34,
    label: "Strong",
    description:
      "Good work. You answered most questions correctly across all three categories. Keep going to push your score higher.",
  },
  {
    min: 35,
    max: 41,
    label: "Very strong",
    description:
      "Excellent work. You consistently answered correctly across Math, Science, and History. A high level of general knowledge.",
  },
  {
    min: 42,
    max: 45,
    label: "Excellent",
    description:
      "Outstanding. You answered nearly every question correctly. A remarkable level of general knowledge across all categories.",
  },
];

// Helper used by the result card.
export function getScoreBand(score: number) {
  return (
    scoreBands.find((band) => score >= band.min && score <= band.max) ??
    scoreBands[scoreBands.length - 1]
  );
}
