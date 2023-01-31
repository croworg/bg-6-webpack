'use strict';
import { loadScript } from "./load.js";

const welcomeElem = document.getElementById('welcome');
const buttonsForm = document.getElementById('buttons');
const tabsElem = document.getElementById('tabs');

const modules = [
    { id: 'timer', src: './js/timer.js', module: true },
    { id: 'dateCalc', src: './js/main.js', module: true }
];

buttonsForm.addEventListener('click', event => {
    if (!event.target.name) return;
    welcomeElem.classList.add('hide');

    for (const child of tabsElem.children) {
        if (child.id === event.target.name) {
            child.classList.remove('hide');

            if ([...document.scripts].find(({ id }) => id === child.id)) continue; // skip if already loaded

            const module = modules.find(e => e.id === child.id);
            loadScript(module);

        } else {
            child.classList.add('hide');
        }
    }
});

