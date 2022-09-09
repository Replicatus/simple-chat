import template from "./template.hbs";
import Block from "../../utils/Block";
import {nanoid} from "nanoid";
import Avatar from "../avatar";
import {Input} from "../input";
import {Button} from "../button";


type Message = {
    id: string | number;
    message: string;
    date: number | string;
    senderId: number | string;
    status: 'SENDING' | 'SENT' | 'ERROR' | 'READ'
}

interface ChatOpenItemProps {
    id: string | number;
    chatName: string;
    events?: {},
    avatar?: string;
    messages: Message[]
}
const defaultProps: ChatOpenItemProps = {
    id: nanoid(6),
    chatName: '',
    messages: []
}

export class OpenedChat extends Block{
    constructor(props: ChatOpenItemProps = defaultProps) {
        super('div', {...defaultProps,...props});
    }
    init() {
        this.children.avatar = new Avatar({
            withoutWrapper: true,
            path: this.props.avatar ? this.props.avatar : '',
            label: '',
            width: 47,
            height: 47,
        });
        this.children.inputMessage = new Input({
            label: '',
            placeholder: 'Сообщение',
            name: 'message',
            className: 'message-input',
            value: '',
        });
        this.children.buttonFiles = new Button({
            className: 'files-btn',
            label: '',
            style: "",
            events: {
                click: () => console.log('click on file input')
            },
            replaceNode: true
        });
        this.children.buttonSend = new Button({
            className: 'send-btn',
            label: '',
            style: "",
            events: {
                click: () => console.log('send msg')
            },
            replaceNode: true
        });
        this.children.buttonMenu = new Button({
            className: 'button',
            label: 'Открыть меню',
            style: "",
            events: {},
            replaceNode: true
        });
        super.init();
    }


    render(): DocumentFragment | HTMLElement {
        this.element?.classList.add('chats-section');
        console.log("!", this.props.chatName)
        return this.compile(template, this.props);
    }
}
