import defaultTemplate from './dialog.hbs'
import Block from "../../utils/Block";

interface DialogProps {
    withoutWrapper?: boolean,
    template?: any,
    templateWrapper?: any,
    events?: {}
}

export class Dialog extends Block<DialogProps>{
    constructor(props: DialogProps) {
        super('div', {templateWrapper: defaultTemplate , ...props});
    }

    render() {
        // const currentTemplate = this.props.template ? this.props.template : defaultTemplate;
        return this.compile(this.props.templateWrapper, {...this.props})
    }
}