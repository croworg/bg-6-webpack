import { formatError } from './utils.js';
// import { Howl } from './howler.js'; // выдает ошибку при импорте модулем
import './howler.js';

const timerForm = document.getElementById('timer_form');
const timerError = document.getElementById('timer__error');
const timerInputs = timerForm.querySelectorAll('input');
const timerButton = document.getElementById('timerButton');
const hintEl = document.getElementById('timer_hint');

const duration = { // default values for timer
    hours: 0,
    minutes: 5,
    seconds: 0
};
let timerID = null;
let isTimerRunning = false;
let secondsLeft = 0;
const sound = new Howl({
    src: ['../audio/tone.wav']
});

document.addEventListener('change', e => {
    duration[e.target.id] = Number(e.target.value)
});

const countdown = () => {
    Boolean(!--secondsLeft) && stopTimer();

    duration.hours = parseInt(secondsLeft / 3600);
    duration.minutes = parseInt(secondsLeft / 60) % 60;
    duration.seconds = secondsLeft % 60;
    for (const input of timerInputs) {
        input.value = duration[input.id];
    };
};

const resetTimer = () => {
    clearInterval(timerID);
    isTimerRunning = false;
    duration.hours = 0;
    duration.minutes = 0;
    duration.seconds = 0;
    timerButton.textContent = 'Старт';
    for (const input of timerInputs) {
        input.removeAttribute('disabled', '');
        input.value = duration[input.id];
    };
    timerForm.style.backgroundColor = 'unset';
}

const stopTimer = () => {
    resetTimer();
    sound.play();
};

const handleTimer = (e) => {
    e.preventDefault();
    secondsLeft = (duration.hours * 3600) + (duration.minutes * 60) + duration.seconds;
    if (!isTimerRunning && secondsLeft > 0) {
        timerButton.textContent = 'Стоп';
        timerID = setInterval(countdown, 1000, secondsLeft);
        isTimerRunning = true;
        timerForm.style.backgroundColor = '#99FF66';
        for (const input of timerInputs) {
            input.setAttribute('disabled', '');
        }
        timerError.textContent = '';
    } else if (isTimerRunning && secondsLeft > 0) {
        timerButton.textContent = 'Продолжить';
        clearInterval(timerID);
        isTimerRunning = false;
        timerForm.style.backgroundColor = '#FFFF66';
    } else {
        timerError.innerHTML = formatError('Ошибка: Не задано время');
    };
};

timerForm.onsubmit = handleTimer;

timerForm.onwheel = e => {
    e.preventDefault();

    const minValue = e.target.getAttribute('min');
    const maxValue = e.target.getAttribute('max');
    const unit = e.target.name;
    let value = 0;

    if (e.target.getAttribute('disabled') !== null || unit === undefined) return;

    if (e.wheelDeltaY) {
        if (Math.abs(e.wheelDeltaY) === 120) {
            value = e.deltaY * -0.01;
        } else {
            e.wheelDeltaY < 0 ? value = 1 : value = -1;
        }
    }
    if (maxValue < duration[unit] + value || minValue > duration[unit] + value) return;

    duration[unit] += parseInt(value);

    for (const input of timerInputs) {
        input.value = duration[input.id];
    };
};

document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        resetTimer();
    }
});

function runTimer() {
    console.log('loaded');
    for (const input of timerInputs) {
        input.value = duration[input.id];
        input.removeAttribute('disabled');
    };
    timerButton.removeAttribute('disabled');
};

const timerHint = () => {
    const hint = document.createElement('div');
    hint.classList.add('timer_hint');
    hint.classList.add('hide');
    hint.textContent = 'Для сброса таймера нажмите Esc';
    hintEl.after(hint);
    hintEl.addEventListener('mouseover', () => { hint.classList.remove('hide') });
    hintEl.addEventListener('mouseout', () => { hint.classList.add('hide') });
};

runTimer();
timerHint();
