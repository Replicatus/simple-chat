import Block from "../../utils/Block";
import template from "./template.hbs";

interface MessageProps {
    content: string;
    isYourMessage: boolean;
    withoutWrapper?: boolean;
}

export class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super('div', {...props, withoutWrapper: true});
    }

    render() {
        return this.compile(template, this.props);
    }
}
