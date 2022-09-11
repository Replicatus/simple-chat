import template from "./template.hbs";
import Block from "../../utils/Block";
import {nanoid} from "nanoid";
import Avatar from "../avatar";
import {Input} from "../input";
import {Button} from "../button";


export type Message = {
    id: string | number;
    message: string;
    isYourMessage: boolean;
    date: number | string;
    senderId: number | string;
    status: 'SENDING' | 'SENT' | 'ERROR' | 'READ'
}

interface ChatOpenItemProps {
    id: string;
    chatName: string;
    callParentMethodFiles: Function;
    callParentMethodSend: Function;
    buttonSend?: null;
    events?: {},
    avatar?: string;
    userId: string;
    messages: Message[]
}
const defaultProps: ChatOpenItemProps = {
    id: nanoid(6),
    chatName: '',
    callParentMethodFiles: () => {},
    callParentMethodSend: () => {},
    userId: '',
    buttonSend: null,
    messages: []
}

export class OpenedChat extends Block<ChatOpenItemProps>{
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
            classes: ['message-input'],
            value: '',
        });
        this.children.buttonFiles = new Button({
            classes: ['files-btn'],
            label: '',
            style: "",
            events: {
                click: () => this.props.callParentMethodFiles()
            },
            replaceNode: true
        });
        this.children.buttonSend = new Button({
            classes: ['send-btn'],
            label: '',
            style: "",
            events: {
                click: () => this.props.callParentMethodSend()
            },
            replaceNode: true
        });
        this.children.buttonMenu = new Button({
            classes: ['menu-btn'],
            label: '',
            style: "",
            events: {},
            replaceNode: true
        });
        super.init();
    }
    protected getMessage(){
        let value;
        if (this.children.inputMessage instanceof Input)
            value = this.children.inputMessage.getValue();
        if (value?.value)
            return value;
        else
            return;
    }
    public getNewMessages(data: Message[] = []){
        this.props.messages = [...data];
    }
    public sendMessage(){
        return this.getMessage();
    }


    render(): DocumentFragment | HTMLElement {
        this.element?.classList.add('chats-section');
        return this.compile(template, this.props);
    }
}
