#!/usr/bin/env bash
# Use eval to click through the quiz via direct DOM manipulation.
# This bypasses agent-browser's ref system which may be unreliable
# for rapidly changing React UIs.

agent-browser open http://localhost:3000/ > /dev/null 2>&1
agent-browser wait 2000 > /dev/null 2>&1
agent-browser scroll down 600 > /dev/null 2>&1
agent-browser wait 500 > /dev/null 2>&1

# Click the in-quiz Start button via DOM.
agent-browser eval "Array.from(document.querySelectorAll('#iq-quiz button')).find(b => b.textContent.includes('Start IQ Test'))?.click()" > /dev/null 2>&1
agent-browser wait 1000 > /dev/null 2>&1

# Loop: click first radio, then Next button, 22 times.
for i in $(seq 1 22); do
  # Click first radio button.
  agent-browser eval "document.querySelector('#iq-quiz [role=radio]')?.click()" > /dev/null 2>&1
  sleep 0.2

  # Click Next or See Result button.
  CLICK_RESULT=$(agent-browser eval "Array.from(document.querySelectorAll('#iq-quiz button')).find(b => b.textContent.trim() === 'Next' || b.textContent.trim() === 'See Result')?.click() ?? 'not-found'" 2>&1 | tail -1)

  sleep 0.5

  # Check if we're on result screen.
  STATE=$(agent-browser eval "document.querySelector('#iq-quiz')?.innerText.substring(0, 50) || 'no quiz'" 2>&1 | tail -1)
  echo "Iter $i: state=$STATE click=$CLICK_RESULT"

  if echo "$STATE" | grep -q "Your Score"; then
    echo "=== RESULT SCREEN REACHED at iter $i ==="
    break
  fi
done

echo "=== Final quiz innerText ==="
agent-browser eval "document.querySelector('#iq-quiz')?.innerText.substring(0, 300) || 'no quiz'" 2>&1 | tail -3