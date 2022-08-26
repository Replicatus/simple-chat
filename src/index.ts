import headerTemplate from './index.hbs';
import components from "./components";
import Handlebars from 'handlebars/dist/handlebars.runtime.js';
import pages from "./pages/index.js";
import consts from './consts'
import type {ArrayLinks} from "./types";
import {Page500} from "./pages/500";

const links = () : ArrayLinks => {
    return document.querySelectorAll('a');
};

window.addEventListener('DOMContentLoaded', () => {
    try {
        const app: HTMLElement | null = document.querySelector('#app');
        const header: HTMLElement | null = document.querySelector('#header');
        if (!app || !header)
            return;
        header.innerHTML = headerTemplate();
        // app.innerHTML = pages['']({...consts});
        app.innerHTML = new Page500().render();
        const a = links();
        const refreshLink = (arr: ArrayLinks) => {
            arr.forEach((el : HTMLAnchorElement) => el.onclick = (e: MouseEvent) => {
                e.preventDefault();
                // const target : EventTarget = e.target;
                // @ts-ignore
                const href: any = e.target?.href;
                const path = href.split('/');
                const pageName = path[path.length - 1];
                app.innerHTML = pages[pageName]({...consts});
                refreshLink(links());
            });
        }
        refreshLink(a);
    }catch (e) {
        console.error('1', e)
    }

});

