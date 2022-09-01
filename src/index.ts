import NavBar from "./blocks/navbar/index"
import pages from "./pages";
import consts from './consts'
import type {ArrayLinks} from "./types";

const links = () : ArrayLinks => {
    return document.querySelectorAll('a');
};

window.addEventListener('DOMContentLoaded', () => {
    try {
        const app: HTMLElement | null = document.querySelector('#app');
        const header: HTMLElement | null = document.querySelector('#header');
        if (!app || !header)
            return;
        const navBar = new NavBar();
        header.append(navBar.getContent()!);
        // app.innerHTML = pages['']({...consts});

        const PageError500 = new pages['']({});
        app.append(PageError500.getContent()!);
        const a = links();
        const refreshLink = (arr: ArrayLinks) => {
            arr.forEach((el : HTMLAnchorElement) => el.onclick = (e: MouseEvent) => {
                e.preventDefault();
                // const target : EventTarget = e.target;
                // @ts-ignore
                const href: any = e.target?.href;
                const path = href.split('/');
                const pageName = path[path.length - 1];
                const page = new pages[pageName]({...consts});
                app.innerText = '';
                console.log('page', page)
                app.append(page.getContent());
                page.dispatchComponentDidMount();
                refreshLink(links());
            });
        }
        refreshLink(a);
    }catch (e) {
        console.error('1', e)
    }

});

