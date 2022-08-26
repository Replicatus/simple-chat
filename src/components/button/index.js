import template from './button.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime.js';

Handlebars.registerPartial('button', (props) => template({...props}));
