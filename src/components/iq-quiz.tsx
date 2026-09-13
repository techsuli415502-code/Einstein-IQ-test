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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  quizQuestions,
  quizCategories,
  getScoreBand,
  type QuizQuestion,
  type QuizCategory,
} from "@/lib/quiz-data";

type Stage = "intro" | "quiz" | "result";

const letterLabels = ["A", "B", "C", "D", "E", "F"];

const categoryIcons: Record<QuizCategory, typeof Calculator> = {
  Math: Calculator,
  Science: Atom,
  History: Scroll,
};

const categoryColors: Record<
  QuizCategory,
  { text: string; bg: string; ring: string; badge: string }
> = {
  Math: {
    text: "text-primary",
    bg: "bg-primary/10",
    ring: "ring-primary",
    badge: "bg-primary/10 text-primary",
  },
  Science: {
    text: "text-amber-600",
    bg: "bg-amber-500/10",
    ring: "ring-amber-500",
    badge: "bg-amber-500/10 text-amber-600",
  },
  History: {
    text: "text-amber-700",
    bg: "bg-amber-700/10",
    ring: "ring-amber-700",
    badge: "bg-amber-700/10 text-amber-700",
  },
};

export function IQQuiz() {
  const [stage, setStage] = React.useState<Stage>("intro");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  // Track user answers as an array indexed by question position. null means
  // the question has not been answered yet.
  const [answers, setAnswers] = React.useState<(number | null)[]>(
    () => quizQuestions.map(() => null)
  );

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentIndex];
  const currentCategory = currentQuestion?.category;
  const progressValue =
    stage === "quiz"
      ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
      : 0;

  const startQuiz = () => {
    setStage("quiz");
    setCurrentIndex(0);
    setAnswers(quizQuestions.map(() => null));
  };

  const selectAnswer = (optionIndex: number) => {
    // Lock the question once answered. The user cannot change their answer
    // for the current question after selecting, which prevents accidental
    // multiple selections and makes the feedback unambiguous.
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

  const restart = () => {
    setStage("intro");
    setCurrentIndex(0);
    setAnswers(quizQuestions.map(() => null));
    requestAnimationFrame(() => {
      document
        .getElementById("iq-quiz")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // Calculate scores per category for the result screen.
  const { score, perCategory } = React.useMemo(() => {
    let correct = 0;
    const byCategory: Record<QuizCategory, { correct: number; total: number }> =
      {
        Math: { correct: 0, total: 0 },
        Science: { correct: 0, total: 0 },
        History: { correct: 0, total: 0 },
      };
    answers.forEach((ans, idx) => {
      const q = quizQuestions[idx];
      if (!q) return;
      byCategory[q.category].total += 1;
      if (ans !== null && ans === q.correctIndex) {
        correct += 1;
        byCategory[q.category].correct += 1;
      }
    });
    return { score: correct, perCategory: byCategory };
  }, [answers]);

  const band = getScoreBand(score);

  const handleStartClick = () => {
    startQuiz();
    document
      .getElementById("iq-quiz")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="iq-quiz"
      className="scroll-mt-24"
      aria-labelledby="iq-quiz-title"
    >
      <h2 id="iq-quiz-title" className="sr-only">
        IQ Quiz Section
      </h2>

      {stage === "intro" && (
        <QuizIntro onStart={handleStartClick} totalQuestions={totalQuestions} />
      )}

      {stage === "quiz" && currentQuestion && currentCategory && (
        <QuizQuestion
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          progressValue={progressValue}
          selectedIndex={answers[currentIndex]}
          onSelect={selectAnswer}
          onNext={goNext}
          isLastQuestion={currentIndex === totalQuestions - 1}
        />
      )}

      {stage === "result" && (
        <QuizResult
          score={score}
          total={totalQuestions}
          perCategory={perCategory}
          bandLabel={band.label}
          bandDescription={band.description}
          onRestart={restart}
          questions={quizQuestions}
          answers={answers}
        />
      )}
    </section>
  );
}

function QuizIntro({
  onStart,
  totalQuestions,
}: {
  onStart: () => void;
  totalQuestions: number;
}) {
  return (
    <article
      className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      aria-labelledby="quiz-intro-title"
    >
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Brain className="h-7 w-7" aria-hidden="true" />
        </div>
        <div className="space-y-1.5">
          <h3 id="quiz-intro-title" className="text-xl font-semibold sm:text-2xl">
            Ready to start the quiz?
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            You will see {totalQuestions} questions across three categories:
            Math, Science, and History. After each question, you will see
            instantly whether your answer was correct, along with a short
            explanation. Take your time and read each option carefully.
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 text-sm text-foreground sm:grid-cols-2">
        {quizCategories.map((cat) => {
          const Icon = categoryIcons[cat];
          const count = quizQuestions.filter((q) => q.category === cat).length;
          return (
            <li
              key={cat}
              className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5"
            >
              <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="font-semibold text-foreground">{cat}</span>:{" "}
                {count} questions
              </span>
            </li>
          );
        })}
        <li className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
          <ListChecks className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="font-semibold text-foreground">Total</span>: {totalQuestions} questions, instant feedback
          </span>
        </li>
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" onClick={onStart} className="sm:min-w-[180px]">
          Start Quiz
        </Button>
        <p className="text-xs text-muted-foreground">
          This quiz is for practice and entertainment. It is not a clinical
          or professionally administered IQ assessment.
        </p>
      </div>
    </article>
  );
}

function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  progressValue,
  selectedIndex,
  onSelect,
  onNext,
  isLastQuestion,
}: {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  progressValue: number;
  selectedIndex: number | null;
  onSelect: (optionIndex: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}) {
  const category = question.category;
  const Icon = categoryIcons[category];
  const colors = categoryColors[category];
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
              colors.badge
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {category}
          </span>
          <span className="text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <Progress
          value={progressValue}
          className="h-2"
          aria-label={`Progress: ${progressValue} percent`}
          aria-valuenow={progressValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
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
            // After answering, color the selected option green (correct) or
            // red (incorrect), and color the correct option green if the user
            // got it wrong.
            let optionStyle = "";
            if (hasAnswered) {
              if (isCorrectOption) {
                optionStyle = "border-primary bg-primary/5 ring-1 ring-primary";
              } else if (isSelected) {
                optionStyle = "border-destructive bg-destructive/5 ring-1 ring-destructive";
              } else {
                optionStyle = "border-border bg-muted/40 opacity-60";
              }
            } else {
              optionStyle = "border-border bg-background hover:border-primary/40 hover:bg-accent/40";
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

        {/* Immediate feedback panel */}
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
                        {letterLabels[correctIndex]}. {question.options[correctIndex]}
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

      <footer className="mt-7 flex items-center justify-end">
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

function QuizResult({
  score,
  total,
  perCategory,
  bandLabel,
  bandDescription,
  onRestart,
  questions,
  answers,
}: {
  score: number;
  total: number;
  perCategory: Record<QuizCategory, { correct: number; total: number }>;
  bandLabel: string;
  bandDescription: string;
  onRestart: () => void;
  questions: QuizQuestion[];
  answers: (number | null)[];
}) {
  const percentage = Math.round((score / total) * 100);
  const incorrect = total - score;

  return (
    <article
      className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      aria-labelledby="result-title"
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Trophy className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 id="result-title" className="mt-4 text-2xl font-semibold sm:text-3xl">
          Your Results
        </h3>
        <p className="mt-3 text-5xl font-bold tracking-tight text-primary sm:text-6xl">
          {score}
          <span className="text-3xl text-muted-foreground"> / {total}</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          You answered {percentage} percent of questions correctly.
        </p>

        <div className="mt-5 w-full rounded-xl border border-primary/20 bg-accent/40 px-4 py-4 text-left">
          <p className="text-sm font-medium uppercase tracking-wide text-accent-foreground">
            Result band: {bandLabel}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">
            {bandDescription}
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
              Overall
            </p>
          </div>
        </div>

        {/* Per-category scores */}
        <div className="mt-5 w-full space-y-3 text-left">
          <h4 className="text-sm font-semibold text-foreground">
            Scores by category
          </h4>
          {quizCategories.map((cat) => {
            const stat = perCategory[cat];
            const catPercent = stat.total
              ? Math.round((stat.correct / stat.total) * 100)
              : 0;
            const Icon = categoryIcons[cat];
            const colors = categoryColors[cat];
            return (
              <div
                key={cat}
                className="rounded-lg border border-border bg-secondary/30 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", colors.text)} aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">{cat}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {stat.correct} / {stat.total}
                  </span>
                </div>
                <Progress
                  value={catPercent}
                  className={cn("mt-2 h-1.5")}
                  aria-label={`${cat} score: ${stat.correct} out of ${stat.total}`}
                />
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          This quiz is designed for educational and entertainment use. It is
          not a clinical or professionally administered IQ assessment.
        </p>

        <div className="mt-6 flex w-full flex-col gap-3 sm:justify-center">
          <Button size="lg" onClick={onRestart} className="sm:min-w-[180px]">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>
        </div>
      </div>

      <details className="mt-8 rounded-xl border border-border bg-background/50 p-4">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Review all {total} questions
        </summary>
        <div className="mt-4 space-y-6">
          {quizCategories.map((cat) => {
            const catQuestions = questions
              .map((q, idx) => ({ q, idx }))
              .filter(({ q }) => q.category === cat);
            const Icon = categoryIcons[cat];
            const colors = categoryColors[cat];
            return (
              <div key={cat} className="space-y-3">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <Icon className={cn("h-4 w-4", colors.text)} aria-hidden="true" />
                  <h5 className="text-sm font-semibold text-foreground">
                    {cat} section
                  </h5>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {perCategory[cat].correct} / {perCategory[cat].total} correct
                  </span>
                </div>
                <ol className="space-y-3 text-sm">
                  {catQuestions.map(({ q, idx }) => {
                    const userAnswer = answers[idx];
                    const isQCorrect = userAnswer === q.correctIndex;
                    return (
                      <li
                        key={q.id}
                        className="rounded-lg border border-border bg-background p-3"
                      >
                        <p className="font-medium text-foreground">
                          {q.question}
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
                              {letterLabels[userAnswer]}.{" "}
                              {q.options[userAnswer]}
                            </span>
                          )}
                        </p>
                        {!isQCorrect && (
                          <p className="mt-1 text-muted-foreground">
                            Correct answer:{" "}
                            <span className="font-medium text-primary">
                              {letterLabels[q.correctIndex]}.{" "}
                              {q.options[q.correctIndex]}
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
              </div>
            );
          })}
        </div>
      </details>
    </article>
  );
}
