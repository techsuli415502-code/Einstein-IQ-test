"use client";

import * as React from "react";
import {
  Brain,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  ListChecks,
  Lightbulb,
  Calculator,
  Atom,
  Scroll,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  quizQuestions,
  quizCategories,
  type QuizQuestion,
  type QuizCategory,
} from "@/lib/quiz-data";

type Stage = "select" | "quiz" | "result";

const letterLabels = ["A", "B", "C", "D", "E", "F"];

const categoryIcons: Record<QuizCategory, typeof Calculator> = {
  Math: Calculator,
  Science: Atom,
  History: Scroll,
};

const categoryTheme: Record<
  QuizCategory,
  {
    text: string;
    badge: string;
    buttonBorder: string;
    buttonHover: string;
    buttonAccent: string;
    iconBg: string;
    ring: string;
    progressBar: string;
  }
> = {
  Math: {
    text: "text-primary",
    badge: "bg-primary/10 text-primary",
    buttonBorder: "border-primary/30",
    buttonHover: "hover:border-primary hover:bg-primary/5",
    buttonAccent: "hover:text-primary",
    iconBg: "bg-primary/10 text-primary",
    ring: "ring-primary",
    progressBar: "[&_[data-slot=progress-indicator]]:bg-primary",
  },
  Science: {
    text: "text-amber-600",
    badge: "bg-amber-500/10 text-amber-600",
    buttonBorder: "border-amber-500/30",
    buttonHover: "hover:border-amber-500 hover:bg-amber-500/5",
    buttonAccent: "hover:text-amber-600",
    iconBg: "bg-amber-500/10 text-amber-600",
    ring: "ring-amber-500",
    progressBar: "[&_[data-slot=progress-indicator]]:bg-amber-500",
  },
  History: {
    text: "text-amber-700",
    badge: "bg-amber-700/10 text-amber-700",
    buttonBorder: "border-amber-700/30",
    buttonHover: "hover:border-amber-700 hover:bg-amber-700/5",
    buttonAccent: "hover:text-amber-700",
    iconBg: "bg-amber-700/10 text-amber-700",
    ring: "ring-amber-700",
    progressBar: "[&_[data-slot=progress-indicator]]:bg-amber-700",
  },
};

const categoryDescriptions: Record<QuizCategory, string> = {
  Math: "Arithmetic, percentages, geometry, factorials, primes, fractions, and basic equations.",
  Science: "Planets, biology, chemistry, physics, and Earth science fundamentals.",
  History: "World events, leaders, inventors, and ancient civilizations.",
};

export function IQQuiz() {
  const [stage, setStage] = React.useState<Stage>("select");
  const [selectedCategory, setSelectedCategory] =
    React.useState<QuizCategory | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  // Track answers for the currently active quiz only. Reset whenever a
  // new category is started.
  const [answers, setAnswers] = React.useState<(number | null)[]>([]);

  // Questions for the currently selected category (always 15 questions
  // since the data file has exactly 15 per category).
  const questions = React.useMemo<QuizQuestion[]>(() => {
    if (!selectedCategory) return [];
    return quizQuestions.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const totalQuestions = questions.length; // 15 for any category
  const currentQuestion = questions[currentIndex];
  const progressValue =
    stage === "quiz" && totalQuestions > 0
      ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
      : 0;

  const startCategory = (category: QuizCategory) => {
    setSelectedCategory(category);
    setAnswers(new Array(15).fill(null));
    setCurrentIndex(0);
    setStage("quiz");
    document
      .getElementById("iq-quiz")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectAnswer = (optionIndex: number) => {
    // Lock the question once answered so the user cannot change their
    // answer or accidentally click multiple options.
    if (answers[currentIndex] !== null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  };

  const goNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setStage("result");
    }
  };

  const backToSelect = () => {
    setStage("select");
    setSelectedCategory(null);
    setCurrentIndex(0);
    setAnswers([]);
    document
      .getElementById("iq-quiz")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Calculate the score for the currently selected category only.
  const score = React.useMemo(() => {
    let correct = 0;
    answers.forEach((ans, idx) => {
      const q = questions[idx];
      if (!q) return;
      if (ans !== null && ans === q.correctIndex) correct += 1;
    });
    return correct;
  }, [answers, questions]);

  return (
    <section
      id="iq-quiz"
      className="scroll-mt-24"
      aria-labelledby="iq-quiz-title"
    >
      <h2 id="iq-quiz-title" className="sr-only">
        IQ Quiz Section
      </h2>

      {stage === "select" && <CategorySelect onSelect={startCategory} />}

      {stage === "quiz" && currentQuestion && selectedCategory && (
        <QuizQuestionView
          question={currentQuestion}
          category={selectedCategory}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          progressValue={progressValue}
          selectedIndex={answers[currentIndex]}
          onSelect={selectAnswer}
          onNext={goNext}
          onExit={backToSelect}
          isLastQuestion={currentIndex === totalQuestions - 1}
        />
      )}

      {stage === "result" && selectedCategory && (
        <QuizResultView
          category={selectedCategory}
          score={score}
          total={totalQuestions}
          questions={questions}
          answers={answers}
          onPickCategory={(cat) => startCategory(cat)}
          onRetakeSame={() => startCategory(selectedCategory)}
        />
      )}
    </section>
  );
}

function CategorySelect({
  onSelect,
}: {
  onSelect: (category: QuizCategory) => void;
}) {
  return (
    <article
      className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      aria-labelledby="category-select-title"
    >
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Brain className="h-7 w-7" aria-hidden="true" />
        </div>
        <div className="space-y-1.5">
          <h3
            id="category-select-title"
            className="text-xl font-semibold sm:text-2xl"
          >
            Choose Your Quiz
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Pick a category below to start a 15 question quiz. Each category
            has its own score out of 15. After you finish one, you can try
            another category any time.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {quizCategories.map((cat) => {
          const Icon = categoryIcons[cat];
          const theme = categoryTheme[cat];
          const count = quizQuestions.filter(
            (q) => q.category === cat
          ).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelect(cat)}
              className={cn(
                "group flex flex-col items-start gap-3 rounded-2xl border-2 bg-card p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 card-hover",
                theme.buttonBorder,
                theme.buttonHover
              )}
              aria-label={`Start ${cat} quiz with ${count} questions`}
            >
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  theme.iconBg
                )}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="space-y-1">
                <p
                  className={cn(
                    "text-lg font-semibold transition-colors",
                    theme.text
                  )}
                >
                  {cat}
                </p>
                <p className="text-xs text-muted-foreground">
                  {count} questions
                </p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {categoryDescriptions[cat]}
              </p>
              <span
                className={cn(
                  "mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors",
                  theme.text
                )}
              >
                Start Quiz
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        For practice and entertainment. Not a clinical or professionally
        administered IQ assessment.
      </p>
    </article>
  );
}

function QuizQuestionView({
  question,
  category,
  questionNumber,
  totalQuestions,
  progressValue,
  selectedIndex,
  onSelect,
  onNext,
  onExit,
  isLastQuestion,
}: {
  question: QuizQuestion;
  category: QuizCategory;
  questionNumber: number;
  totalQuestions: number;
  progressValue: number;
  selectedIndex: number | null;
  onSelect: (optionIndex: number) => void;
  onNext: () => void;
  onExit: () => void;
  isLastQuestion: boolean;
}) {
  const Icon = categoryIcons[category];
  const theme = categoryTheme[category];
  const hasAnswered = selectedIndex !== null;
  const isCorrect = hasAnswered && selectedIndex === question.correctIndex;
  const correctIndex = question.correctIndex;

  return (
    <article
      className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      aria-live="polite"
    >
      <header className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium",
              theme.badge
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {category}
          </span>
          <span className="text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className={theme.progressBar}>
          <Progress
            value={progressValue}
            className="h-2"
            aria-label={`Progress: ${progressValue} percent`}
            aria-valuenow={progressValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </header>

      <div className="space-y-5">
        <h3 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          {question.question}
        </h3>

        <div
          role="radiogroup"
          aria-label="Answer options"
          className="grid gap-3"
        >
          {question.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrectOption = idx === correctIndex;
            let optionStyle = "";
            if (hasAnswered) {
              if (isCorrectOption) {
                optionStyle =
                  "border-primary bg-primary/5 ring-1 ring-primary";
              } else if (isSelected) {
                optionStyle =
                  "border-destructive bg-destructive/5 ring-1 ring-destructive";
              } else {
                optionStyle = "border-border bg-muted/40 opacity-60";
              }
            } else {
              optionStyle =
                "border-border bg-background hover:border-primary/40 hover:bg-accent/40";
            }

            return (
              <button
                key={`${question.id}-${idx}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={hasAnswered}
                onClick={() => onSelect(idx)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  optionStyle,
                  hasAnswered && "cursor-default"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
                    hasAnswered && isCorrectOption
                      ? "border-primary bg-primary text-primary-foreground"
                      : hasAnswered && isSelected
                        ? "border-destructive bg-destructive text-white"
                        : "border-border bg-muted text-muted-foreground"
                  )}
                  aria-hidden="true"
                >
                  {letterLabels[idx]}
                </span>
                <span className="flex-1 text-sm font-medium text-foreground sm:text-base">
                  {option}
                </span>
                {hasAnswered && isCorrectOption && (
                  <CheckCircle2
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                )}
                {hasAnswered && isSelected && !isCorrectOption && (
                  <XCircle
                    className="h-5 w-5 text-destructive"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div
            className={cn(
              "rounded-xl border px-4 py-4",
              isCorrect
                ? "border-primary/30 bg-primary/5"
                : "border-destructive/30 bg-destructive/5"
            )}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
              ) : (
                <XCircle
                  className="h-5 w-5 shrink-0 text-destructive"
                  aria-hidden="true"
                />
              )}
              <div className="space-y-1.5">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isCorrect ? "text-primary" : "text-destructive"
                  )}
                >
                  {isCorrect ? "Correct!" : "Incorrect."}
                  {!isCorrect && (
                    <>
                      {" "}
                      The correct answer is{" "}
                      <span className="font-semibold">
                        {letterLabels[correctIndex]}.{" "}
                        {question.options[correctIndex]}
                      </span>
                      .
                    </>
                  )}
                </p>
                <div className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                  <Lightbulb
                    className="h-4 w-4 shrink-0 text-amber-500 mt-0.5"
                    aria-hidden="true"
                  />
                  <p>{question.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-7 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onExit}
          aria-label="Exit quiz and pick another category"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Change category
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={!hasAnswered}
          className="min-w-[160px]"
        >
          {isLastQuestion ? "See Results" : "Next Question"}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </footer>
    </article>
  );
}

function QuizResultView({
  category,
  score,
  total,
  questions,
  answers,
  onPickCategory,
  onRetakeSame,
}: {
  category: QuizCategory;
  score: number;
  total: number;
  questions: QuizQuestion[];
  answers: (number | null)[];
  onPickCategory: (category: QuizCategory) => void;
  onRetakeSame: () => void;
}) {
  const percentage = Math.round((score / total) * 100);
  const incorrect = total - score;
  const Icon = categoryIcons[category];
  const theme = categoryTheme[category];

  const resultBands = [
    {
      min: 0,
      max: 4,
      label: "Keep practicing",
      description:
        "A great starting point. Review the explanations for each question, then try this category again to build your knowledge.",
    },
    {
      min: 5,
      max: 8,
      label: "Developing",
      description:
        "You are building a solid foundation in this category. Focus on the questions you missed and try again soon.",
    },
    {
      min: 9,
      max: 11,
      label: "Strong",
      description: "Good work. You answered most questions correctly in this category. Try another category to keep going.",
    },
    {
      min: 12,
      max: 13,
      label: "Very strong",
      description:
        "Excellent work. You consistently answered correctly. A high level of knowledge in this category.",
    },
    {
      min: 14,
      max: 15,
      label: "Excellent",
      description:
        "Outstanding. You answered nearly every question correctly in this category. A remarkable level of knowledge.",
    },
  ];

  const band =
    resultBands.find((b) => score >= b.min && score <= b.max) ??
    resultBands[resultBands.length - 1];

  return (
    <article
      className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      aria-labelledby="result-title"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl",
            theme.iconBg
          )}
        >
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
        <p
          className={cn(
            "mt-3 text-xs font-medium uppercase tracking-wider",
            theme.text
          )}
        >
          {category} Quiz Results
        </p>
        <h3 id="result-title" className="mt-1 text-2xl font-semibold sm:text-3xl">
          Your Score
        </h3>
        <p className="mt-3 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          {score}
          <span className="text-3xl text-muted-foreground"> / {total}</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          You answered {percentage} percent of {category} questions correctly.
        </p>

        <div className="mt-5 w-full rounded-xl border border-border bg-secondary/40 px-4 py-4 text-left">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Result band: {band.label}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">
            {band.description}
          </p>
        </div>

        {/* Quick stats */}
        <div className="mt-5 grid w-full grid-cols-3 gap-3 text-center">
          <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-3">
            <p className="text-2xl font-bold text-primary">{score}</p>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Correct
            </p>
          </div>
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-3">
            <p className="text-2xl font-bold text-destructive">{incorrect}</p>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Incorrect
            </p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/40 px-3 py-3">
            <p className="text-2xl font-bold text-foreground">{percentage}%</p>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Score
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          This quiz is for educational and entertainment use. It is not a
          clinical or professionally administered IQ assessment.
        </p>

        {/* Try Another Quiz */}
        <div className="mt-6 w-full">
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Try Another Quiz
          </h4>
          <div className="grid gap-3 sm:grid-cols-3">
            {quizCategories.map((cat) => {
              const CatIcon = categoryIcons[cat];
              const catTheme = categoryTheme[cat];
              const isCurrent = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onPickCategory(cat)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border-2 bg-card px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 card-hover",
                    catTheme.buttonBorder,
                    catTheme.buttonHover,
                    isCurrent && "ring-2 ring-offset-2 " + catTheme.ring
                  )}
                  aria-label={`Start ${cat} quiz`}
                >
                  <CatIcon className={cn("h-4 w-4", catTheme.text)} aria-hidden="true" />
                  <span className="flex-1 text-left">{cat}</span>
                  {isCurrent && (
                    <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  )}
                  {!isCurrent && (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Retake current category button */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onRetakeSame}
          className="mt-4 sm:min-w-[200px]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Retake {category} Quiz
        </Button>
      </div>

      {/* Answer review */}
      <details className="mt-8 rounded-xl border border-border bg-background/50 p-4">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Review all {total} {category} questions
        </summary>
        <ol className="mt-4 space-y-3 text-sm">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isQCorrect = userAnswer === q.correctIndex;
            return (
              <li
                key={q.id}
                className="rounded-lg border border-border bg-background p-3"
              >
                <p className="font-medium text-foreground">
                  {idx + 1}. {q.question}
                </p>
                <p className="mt-1.5 text-muted-foreground">
                  Your answer:{" "}
                  {userAnswer === null ? (
                    <span className="italic">Skipped</span>
                  ) : (
                    <span
                      className={
                        isQCorrect
                          ? "font-medium text-primary"
                          : "font-medium text-destructive"
                      }
                    >
                      {letterLabels[userAnswer]}. {q.options[userAnswer]}
                    </span>
                  )}
                </p>
                {!isQCorrect && (
                  <p className="mt-1 text-muted-foreground">
                    Correct answer:{" "}
                    <span className="font-medium text-primary">
                      {letterLabels[q.correctIndex]}. {q.options[q.correctIndex]}
                    </span>
                  </p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  {q.explanation}
                </p>
              </li>
            );
          })}
        </ol>
      </details>
    </article>
  );
}
