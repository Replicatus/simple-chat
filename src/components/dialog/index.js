import Handlebars from 'handlebars/dist/handlebars.runtime.js';
Handlebars.registerHelper('dialog', (options, props) => {
    return  new Handlebars.SafeString(`<div class="overlay">
    <div class="overlay__background"></div></div><div class="dialog"><div class="dialog__content">` + options.fn(this) + `</div></div>`);
});

