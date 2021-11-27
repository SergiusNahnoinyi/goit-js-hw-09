'use strict';

// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');

startButton.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    if (currentTime >= selectedDates[0]) {
      alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
      console.log(selectedDates[0]);
    }
  },
};

flatpickr('#datetime-picker', options);
