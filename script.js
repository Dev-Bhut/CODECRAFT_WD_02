let startTime = 0;
let elapsed = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const msPart = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${min}:${sec}.${msPart}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  display.textContent = formatTime(diff);
}

startPauseBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = 'Pause';
    running = true;
  } else {
    clearInterval(timerInterval);
    elapsed += Date.now() - startTime;
    startPauseBtn.textContent = 'Start';
    running = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsed = 0;
  running = false;
  display.textContent = '00:00:00.000';
  startPauseBtn.textContent = 'Start';
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (!running) return;
  const now = Date.now();
  const diff = now - startTime + elapsed;
  const li = document.createElement('li');
  li.textContent = formatTime(diff);
  lapsList.appendChild(li);
});
