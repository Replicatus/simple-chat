// import Handlebars from 'handlebars/dist/handlebars.runtime.js';
// Handlebars.registerHelper('dialog', (options, props) => {
//     return  new Handlebars.SafeString(`<div class="overlay">
//     <div class="overlay__background"></div></div><div class="dialog"><div class="dialog__content">` + options.fn(this) + `</div></div>`);
// });
import defaultTemplate from './dialog.hbs'
import Block from "../../utils/Block";

interface DialogProps {
    withoutWrapper?: boolean,
    template?: any,
    events?: {}
}

export class Dialog extends Block{
    constructor(props: DialogProps) {
        super('div', {...props, templateWrapper: defaultTemplate});
    }

    render() {
        // const currentTemplate = this.props.template ? this.props.template : defaultTemplate;
        return this.compile(this.props.templateWrapper, {...this.props})
    }
}