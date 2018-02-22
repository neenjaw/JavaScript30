const displayTimer = document.querySelector('.display');
const displayTimerRemaining = displayTimer.querySelector('h1');
const displayTimerEnd = displayTimer.querySelector('p');

const buttons = document.querySelectorAll('button[data-time]');
const input = document.customForm.minutes;

let countdown;

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;

  // console.log({now, then});

  displayTimeLeft(seconds);
  displayEndTime(then);

  if (countdown !== undefined) {
    clearInterval(countdown);
  }

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // console.log(secondsLeft);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  },1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  function addLeadingZero(strTime) {
    if (strTime.length < 1) {
      return '00';
    } else if (strTime.length < 2) {
      return `0${strTime}`;
    } else {
      return strTime;
    }
  }

  const strMin = addLeadingZero('' + minutes);
  const strSec = addLeadingZero('' + remainderSeconds);
  const display = `${strMin}:${strSec}`;

  document.title = display;
  displayTimerRemaining.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  let adjustedHour, meridies;

  if (hour > 12) {
    adjustedHour = hour - 12;
  } else {
    adjustedHour = hour;
  }

  if (hour >= 12) {
    meridies = 'PM';
  } else {
    meridies = 'AM';
  }

  const min = end.getMinutes();

  displayTimerEnd.textContent = `Be Back At ${(adjustedHour < 10) ? '0' + adjustedHour : adjustedHour}:${(min < 10) ? '0' + min : min}${meridies}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = parseInt(this.minutes.value);
  timer(mins * 60);
  this.reset();
});