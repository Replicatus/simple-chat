import template from './link.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime.js';

Handlebars.registerPartial('link', (props) => template({...props}));
