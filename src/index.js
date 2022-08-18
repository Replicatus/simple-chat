// const root = document.querySelector('#app');
// import Handlebars from 'handlebars';
// import "/src/assets/styles/index.sass";

// Handlebars.registerPartial();
import headerTemplate from './index.hbs';
import components from "./components/index";
 // import Pages from "./pages/index"
import pages from "./pages/index";
import consts from './consts'
const links = () => {
    return document.querySelectorAll('a');
};

window.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');
    const header = document.querySelector('#header');
    header.innerHTML = headerTemplate();
    const a = links();
    const refreshLink = (arr) => {
        arr.forEach(el => el.onclick = (e) => {
            e.preventDefault();
            const link = e.target.href;
            const path = link.split('/');
            const pageName = path[path.length - 1];
            app.innerHTML = pages[pageName]({...consts});
            refreshLink(links());
        });
    }
    refreshLink(a);
});

