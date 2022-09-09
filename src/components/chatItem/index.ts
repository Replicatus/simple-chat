import template from "./chatItem.hbs";
import Block from "../../utils/Block";
import {nanoid} from "nanoid";
import Avatar from "../avatar";

type Message = {
    id: string | number;
    message: string;
    date: number | string;
    senderId: number | string;
    status: 'SENDING' | 'SENT' | 'ERROR' | 'READ'
}

interface ChatItemProps {
    id: string | number;
    name: string;
    unreadCount: number | null;
    chosen: boolean;
    events?: {},
    avatar?: string;
    lastMessage?: Message | null;
}
const defaultProps: ChatItemProps = {
    id: nanoid(6),
    name: '',
    chosen: false,
    unreadCount: null,
    lastMessage: {
        id: nanoid(6),
        message: '',
        date: Date.now(),
        senderId: nanoid(6),
        status: 'SENT'
    }
}
export class ChatItem extends Block{
    constructor(props: ChatItemProps = defaultProps) {
        super('div', {...defaultProps,...props, withoutWrapper: true});
    }
    init() {
        this.children.avatar = new Avatar({
            withoutWrapper: true,
            path: this.props.avatar ? this.props.avatar : '',
            label: '',
            width: 47,
            height: 47,
        })
        super.init();
    }
    public getIdChat(){
        return this.props.id
    }
    public changeChosenStatus(){
        this.setProps(
            {
                chosen: !this.props.chosen
            }
        )
    }
    public getChatProps(){
        return this.props
    }

    render(): DocumentFragment | HTMLElement {
        return this.compile(template, this.props);
    }
}


