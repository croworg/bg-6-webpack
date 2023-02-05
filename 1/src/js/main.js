import { formatError } from './utils.js';
import { diffDates, diffToHtml } from './datecalc.js';

const dateCalcForm = document.getElementById('datecalc_form');
const dateCalcResult = document.getElementById('datecalc__result');

dateCalcForm.addEventListener('submit', handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = '';
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate);
        dateCalcResult.innerHTML = diffToHtml(diff);
    }
    else dateCalcResult.innerHTML = formatError('Ошибка: Для расчета необходимо заполнить оба поля');
}

