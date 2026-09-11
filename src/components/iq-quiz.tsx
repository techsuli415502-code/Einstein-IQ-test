"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Eraser,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  quizQuestions,
  getScoreBand,
  type QuizQuestion,
} from "@/lib/quiz-data";

type Stage = "intro" | "quiz" | "result";

const letterLabels = ["A", "B", "C", "D", "E", "F"];

export function IQQuiz() {
  const router = useRouter();
  const [stage, setStage] = React.useState<Stage>("intro");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>(
    () => quizQuestions.map(() => null)
  );
  const [showRequiredNotice, setShowRequiredNotice] = React.useState(false);

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentIndex];
  const progressValue =
    stage === "quiz"
      ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
      : 0;

  const startQuiz = () => {
    setStage("quiz");
    setCurrentIndex(0);
    setAnswers(quizQuestions.map(() => null));
    setShowRequiredNotice(false);
  };

  const selectAnswer = (optionIndex: number) => {
    setShowRequiredNotice(false);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  };

  const clearAnswer = () => {
    setShowRequiredNotice(false);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = null;
      return next;
    });
  };

  const goNext = () => {
    if (answers[currentIndex] === null) {
      setShowRequiredNotice(true);
      return;
    }
    setShowRequiredNotice(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setStage("result");
    }
  };

  const goPrev = () => {
    setShowRequiredNotice(false);
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const restart = () => {
    setStage("intro");
    setCurrentIndex(0);
    setAnswers(quizQuestions.map(() => null));
    setShowRequiredNotice(false);
    // Smooth scroll back up to the quiz top for nicer UX.
    requestAnimationFrame(() => {
      document
        .getElementById("iq-quiz")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // Calculate score for the result screen.
  const score = React.useMemo(() => {
    if (stage !== "result") return 0;
    let correct = 0;
    answers.forEach((ans, idx) => {
      if (ans !== null && ans === quizQuestions[idx].correctIndex) {
        correct += 1;
      }
    });
    return correct;
  }, [stage, answers]);

  const band = getScoreBand(score);

  const handleStartClick = () => {
    startQuiz();
    document
      .getElementById("iq-quiz")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handles links from other pages that include #iq-quiz hash. We just
  // let the browser scroll to the section naturally; nothing else needed.
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#iq-quiz") {
      const el = document.getElementById("iq-quiz");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  // Handle #start-iq-test hash by auto-starting the quiz.
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#start-iq-test") {
      startQuiz();
      setTimeout(() => {
        document
          .getElementById("iq-quiz")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [startQuiz]);

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

      {stage === "quiz" && (
        <article
          className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
          aria-live="polite"
        >
          <header className="mb-6 space-y-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 font-medium text-accent-foreground">
                <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-muted-foreground">
                {currentQuestion.category}
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
              {currentQuestion.question}
            </h3>

            <div
              role="radiogroup"
              aria-label="Answer options"
              className="grid gap-3"
            >
              {currentQuestion.options.map((option, idx) => {
                const selected = answers[currentIndex] === idx;
                return (
                  <button
                    key={`${currentQuestion.id}-${idx}`}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => selectAnswer(idx)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      selected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-background hover:border-primary/40 hover:bg-accent/40"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-muted text-muted-foreground group-hover:border-primary/40"
                      )}
                      aria-hidden="true"
                    >
                      {letterLabels[idx]}
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground sm:text-base">
                      {option}
                    </span>
                    {selected && (
                      <CheckCircle2
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {showRequiredNotice && (
              <p
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
              >
                <AlertTriangle
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                Please choose an answer before moving to the next question.
              </p>
            )}
          </div>

          <footer className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={goPrev}
                disabled={currentIndex === 0}
                aria-label="Previous question"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAnswer}
                disabled={answers[currentIndex] === null}
                aria-label="Clear selected answer"
              >
                <Eraser className="h-4 w-4" aria-hidden="true" />
                Clear
              </Button>
            </div>
            <Button
              type="button"
              onClick={goNext}
              className="sm:min-w-[140px]"
            >
              {currentIndex === totalQuestions - 1 ? "See Result" : "Next"}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </footer>
        </article>
      )}

      {stage === "result" && (
        <QuizResult
          score={score}
          total={totalQuestions}
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
            Ready to start the IQ quiz?
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            You will see {totalQuestions} questions covering logical reasoning,
            number sequences, pattern recognition, problem solving and more.
            Take your time, read each option, and choose the best answer.
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 text-sm text-foreground sm:grid-cols-2">
        <li className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
          <span className="font-semibold text-primary">22</span>
          questions across reasoning types
        </li>
        <li className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
          <span className="font-semibold text-primary">~10 min</span>
          to complete, runs fully in your browser
        </li>
        <li className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
          <span className="font-semibold text-primary">Instant</span>
          score with a skill band interpretation
        </li>
        <li className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
          <span className="font-semibold text-primary">Free</span>
          no sign up, no data stored on a server
        </li>
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" onClick={onStart} className="sm:min-w-[180px]">
          Start IQ Test
        </Button>
        <p className="text-xs text-muted-foreground">
          This online quiz is for practice and entertainment. It is not a
          clinical or professionally administered IQ assessment.
        </p>
      </div>
    </article>
  );
}

function QuizResult({
  score,
  total,
  bandLabel,
  bandDescription,
  onRestart,
  questions,
  answers,
}: {
  score: number;
  total: number;
  bandLabel: string;
  bandDescription: string;
  onRestart: () => void;
  questions: QuizQuestion[];
  answers: (number | null)[];
}) {
  const percentage = Math.round((score / total) * 100);

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
          Your Score
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

        <p className="mt-4 text-xs text-muted-foreground">
          This quiz is designed for educational and entertainment use. It is
          not a clinical or professionally administered IQ assessment.
        </p>

        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={onRestart} className="sm:min-w-[180px]">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>
        </div>
      </div>

      <details className="mt-8 rounded-xl border border-border bg-background/50 p-4">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Review your answers
        </summary>
        <ol className="mt-4 space-y-4 text-sm">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correctIndex;
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
                        isCorrect
                          ? "font-medium text-primary"
                          : "font-medium text-destructive"
                      }
                    >
                      {letterLabels[userAnswer]}. {q.options[userAnswer]}
                    </span>
                  )}
                </p>
                {!isCorrect && (
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
      </details>
    </article>
  );
}
