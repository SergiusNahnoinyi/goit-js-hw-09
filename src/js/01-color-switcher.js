'use strict';

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
});

stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);
});
