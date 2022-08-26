import template from './input.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime.js';

Handlebars.registerPartial('input', (props) => template({...props}));
