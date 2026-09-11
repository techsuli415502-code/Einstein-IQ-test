#!/usr/bin/env bash
# Walk through the full quiz: start, click an answer for every question,
# then verify the result screen appears. Uses agent-browser.

set -e

agent-browser open http://localhost:3000/ > /dev/null 2>&1
agent-browser wait --load networkidle > /dev/null 2>&1

# Snapshot to find Start IQ Test button (the article intro one).
START_REF=$(agent-browser snapshot -i 2>&1 | grep -E 'button "Start IQ Test"' | head -1 | grep -oE 'ref=e[0-9]+' | head -1)
echo "Start button ref: $START_REF"
agent-browser click @$START_REF > /dev/null 2>&1
agent-browser wait 500 > /dev/null 2>&1

# Loop 22 times - each iteration finds the first radio option and clicks Next.
for i in $(seq 1 22); do
  # Find first radio option.
  RADIO_REF=$(agent-browser snapshot -i 2>&1 | grep -E 'radio "' | head -1 | grep -oE 'ref=e[0-9]+' | head -1)
  if [ -z "$RADIO_REF" ]; then
    echo "No radio found at iteration $i - maybe already on result."
    break
  fi
  echo "Q$i: clicking radio @$RADIO_REF"
  agent-browser click @$RADIO_REF > /dev/null 2>&1
  agent-browser wait 100 > /dev/null 2>&1

  # Find the Next / See Result button.
  NEXT_REF=$(agent-browser snapshot -i 2>&1 | grep -E 'button "(Next|See Result)"' | head -1 | grep -oE 'ref=e[0-9]+' | head -1)
  echo "  Next button ref: $NEXT_REF"
  agent-browser click @$NEXT_REF > /dev/null 2>&1
  agent-browser wait 300 > /dev/null 2>&1
done

# Verify result screen.
RESULT_HEADING=$(agent-browser snapshot 2>&1 | grep -E 'Your Score')
echo "Result check: $RESULT_HEADING"

# Try Again button.
TRY_REF=$(agent-browser snapshot -i 2>&1 | grep -E 'button "Try Again"' | head -1 | grep -oE 'ref=e[0-9]+' | head -1)
echo "Try Again button ref: $TRY_REF"
if [ -n "$TRY_REF" ]; then
  agent-browser click @$TRY_REF > /dev/null 2>&1
  agent-browser wait 500 > /dev/null 2>&1
  INTRO=$(agent-browser snapshot 2>&1 | grep -E 'Ready to start the IQ quiz')
  echo "After Try Again: $INTRO"
fi
