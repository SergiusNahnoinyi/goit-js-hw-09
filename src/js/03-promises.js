'use strict';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delayValue);
    delayValue += stepValue;
    console.log(position, delayValue);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
