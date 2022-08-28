import {TemplateDelegate} from "handlebars";

declare module "*.hbs" {
    const  template: TemplateDelegate;
    export default template;
}