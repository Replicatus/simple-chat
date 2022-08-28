declare module "*.hbs" {
    import {TemplateDelegate} from 'handlebars';
    const  template: TemplateDelegate;
    export default template;
}
// declare module 'handlebars/dist/handlebars.js';