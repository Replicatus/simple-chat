import template from './dialog.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';

// Handlebars.registerPartial('dialog', (props) => template({...props}));
Handlebars.registerHelper('dialog', (options, props) => {
    return  new Handlebars.SafeString(`<div class="overlay">
    <div class="overlay__background"></div></div><div class="dialog"><div class="dialog__content">` + options.fn(this) + `</div></div>`);
});

