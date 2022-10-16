import defaultTemplate from './dialog.hbs'
import Block from "../../utils/Block";
import {withUser} from "../../pages/Login";
import {Button} from "../button";

interface DialogProps {
    withoutWrapper?: boolean,
    template?: any,
    templateWrapper?: any,
    events?: {}
}

class DialogBase extends Block<DialogProps> {
    constructor(props: DialogProps) {
        super('div', {templateWrapper: defaultTemplate, withoutWrapper: true, ...props});
    }

    init() {
        this.children.buttonChangeAvatar = new Button({
            classes: ['button'],
            label: 'Поменять',
            events: {click: () => console.log('changeAvatar')},
        })
        super.init();
    }

    render() {
        return this.compile(this.props.templateWrapper, this.props)
    }
}

export const Dialog = withUser(DialogBase);