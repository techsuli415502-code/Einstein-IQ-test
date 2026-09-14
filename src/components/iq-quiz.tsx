"use client";

import * as React from "react";
import {
  Brain,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  Lightbulb,
  Gauge,
  Target,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  quizQuestions,
  getIqBand,
  getEstimatedIq,
  type QuizQuestion,
} from "@/lib/quiz-data";

type Stage = "intro" | "quiz" | "result";

const letterLabels = ["A", "B", "C", "D", "E", "F"];

const DISCLAIMER =
  "This online quiz provides an informal estimate for entertainment and general self-assessment. It is not a clinically validated IQ test and should not be used as a professional psychological assessment.";

export function IQQuiz() {
  const [stage, setStage] = React.useState<Stage>("intro");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  // Track answers as an array indexed by question position. null means
  // the question has not been answered yet.
  const [answers, setAnswers] = React.useState<(number | null)[]>(
    () => quizQuestions.map(() => null)
  );

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

  // Calculate the score for the result screen.
  const score = React.useMemo(() => {
    let correct = 0;
    answers.forEach((ans, idx) => {
      const q = quizQuestions[idx];
      if (!q) return;
      if (ans !== null && ans === q.correctIndex) correct += 1;
    });
    return correct;
  }, [answers]);

  // Current live score during the quiz (used in the header).
  const liveScore = React.useMemo(() => {
    let correct = 0;
    for (let i = 0; i < currentIndex; i++) {
      const ans = answers[i];
      const q = quizQuestions[i];
      if (q && ans !== null && ans === q.correctIndex) correct += 1;
    }
    return correct;
  }, [answers, currentIndex]);

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
        Einstein IQ Test Quiz Section
      </h2>

      {stage === "intro" && (
        <QuizIntro onStart={handleStartClick} totalQuestions={totalQuestions} />
      )}

      {stage === "quiz" && currentQuestion && (
        <QuizQuestionView
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          progressValue={progressValue}
          selectedIndex={answers[currentIndex]}
          onSelect={selectAnswer}
          onNext={goNext}
          isLastQuestion={currentIndex === totalQuestions - 1}
          liveScore={liveScore}
        />
      )}

      {stage === "result" && (
        <QuizResultView
          score={score}
          total={totalQuestions}
          questions={quizQuestions}
          answers={answers}
          onRestart={restart}
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
            Ready to start the Einstein IQ Test?
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            You will see {totalQuestions} mixed reasoning questions covering
            logical reasoning, pattern recognition, numerical reasoning, verbal
            reasoning, spatial reasoning, problem solving, sequences, and more.
            After each answer you will see instant feedback, and at the end you
            will get your score and an estimated IQ range. Take your time and
            read each question carefully.
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 text-sm text-foreground sm:grid-cols-2">
        <li className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
          <Brain className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="font-semibold text-foreground">{totalQuestions} mixed questions</span>{" "}
            across reasoning types
          </span>
        </li>
        <li className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
          <Lightbulb className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="font-semibold text-foreground">Instant feedback</span>{" "}
            after every answer
          </span>
        </li>
        <li className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
          <Gauge className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="font-semibold text-foreground">Estimated IQ score</span>{" "}
            and skill band
          </span>
        </li>
        <li className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
          <Target className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="font-semibold text-foreground">Full answer review</span>{" "}
            at the end
          </span>
        </li>
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" onClick={onStart} className="sm:min-w-[180px]">
          Start IQ Test
        </Button>
        <p className="text-xs text-muted-foreground">{DISCLAIMER}</p>
      </div>
    </article>
  );
}

function QuizQuestionView({
  question,
  questionNumber,
  totalQuestions,
  progressValue,
  selectedIndex,
  onSelect,
  onNext,
  isLastQuestion,
  liveScore,
}: {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  progressValue: number;
  selectedIndex: number | null;
  onSelect: (optionIndex: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  liveScore: number;
}) {
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
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
            <Brain className="h-3.5 w-3.5" aria-hidden="true" />
            Einstein IQ Test
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
        {/* Live score chip - shows correct answers so far */}
        <div className="flex items-center justify-end">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Target className="h-3 w-3 text-primary" aria-hidden="true" />
            Score: {liveScore} / {questionNumber - (hasAnswered ? 0 : 1) || 0}
          </span>
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

function QuizResultView({
  score,
  total,
  questions,
  answers,
  onRestart,
}: {
  score: number;
  total: number;
  questions: QuizQuestion[];
  answers: (number | null)[];
  onRestart: () => void;
}) {
  const percentage = Math.round((score / total) * 100);
  const incorrect = total - score;
  const estimatedIq = getEstimatedIq(score);
  const band = getIqBand(score);

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
          Your Einstein IQ Test Results
        </h3>

        {/* Main score */}
        <p className="mt-3 text-5xl font-bold tracking-tight text-primary sm:text-6xl">
          {score}
          <span className="text-3xl text-muted-foreground"> / {total}</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          You answered {percentage} percent of questions correctly.
        </p>

        {/* Three stat tiles: Score, Accuracy, Estimated IQ */}
        <div className="mt-6 grid w-full grid-cols-3 gap-3 text-center">
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
              Accuracy
            </p>
          </div>
        </div>

        {/* Estimated IQ score */}
        <div className="mt-6 w-full rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-amber-500/10 px-5 py-5">
          <div className="flex items-center justify-center gap-2">
            <Gauge className="h-5 w-5 text-primary" aria-hidden="true" />
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Estimated IQ Score
            </p>
          </div>
          <p className="mt-2 text-6xl font-bold tracking-tight text-primary">
            {estimatedIq}
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">
            {band.label}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Typical IQ range for this score: {band.iqMin} - {band.iqMax}
          </p>
        </div>

        {/* Result band description */}
        <div className="mt-5 w-full rounded-xl border border-border bg-secondary/40 px-4 py-4 text-left">
          <p className="text-sm leading-relaxed text-foreground">
            {band.description}
          </p>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-muted-foreground">
          {DISCLAIMER}
        </p>

        <div className="mt-6 flex w-full flex-col gap-3 sm:justify-center">
          <Button size="lg" onClick={onRestart} className="sm:min-w-[180px]">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>
        </div>
      </div>

      {/* Answer review */}
      <details className="mt-8 rounded-xl border border-border bg-background/50 p-4">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Review all {total} questions
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
