// import { loadScript } from './load.js';
import { loadScript } from "./load.js";

const tabs = document.getElementById('tabs');
const buttons = document.getElementById('buttons');
const choise = document.getElementById('choise');

const modules = [
    {id: timer, src: './js/timer.js', module: true},
    {id: datecalc, src: './js/main.js', module: true}
];

buttons.addEventListener('click', event => {
    if (!event.target.name) return;
    choise.classList.add('hide');

    for (const child of tabs.children) {
        if (child.id === event.target.name) {
            child.classList.remove('hide');
            // loadScript()
            loadScript(modules[child.id], child.id, true);
            const scriptsTest = [...document.scripts];
            scriptsTest.find(e => console.log(e.id))
            for (const script of document.scripts) {
                console.log(script);
            }
        } else {
            child.classList.add('hide');
        }
    }
});

