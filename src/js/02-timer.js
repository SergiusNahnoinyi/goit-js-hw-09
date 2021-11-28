'use strict';

// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// all modules
import Notiflix from 'notiflix';

const startButton = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

startButton.setAttribute('disabled', true);

let futureTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureTime = selectedDates[0];
    const currentTime = Date.now();
    if (currentTime >= futureTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
      console.log(futureTime);
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
  }

  start = () => {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.convertMs(futureTime - currentTime);

      this.onTick(deltaTime);
    }, 1000);
  };

  addLeadingZero = value => {
    return String(value).padStart(2, '0');
  };

  convertMs = ms => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  };
}

const timer = new Timer({ onTick: updateClockface });

startButton.addEventListener('click', timer.start);

function updateClockface({ days, hours, minutes, seconds }) {
  spanDays.textContent = `${days}`;
  spanHours.textContent = `${hours}`;
  spanMinutes.textContent = `${minutes}`;
  spanSeconds.textContent = `${seconds}`;
}
