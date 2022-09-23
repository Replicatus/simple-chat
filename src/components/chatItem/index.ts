import template from "./chatItem.hbs";
import Block from "../../utils/Block";
import Avatar from "../avatar";

type Message = {
    id: number;
    message: string;
    date: Date;
    senderId: number;
    status: 'SENDING' | 'SENT' | 'ERROR' | 'READ'
}

export interface ChatItemProps {
    id: number;
    name: string;
    unreadCount: number | null;
    chosen: boolean;
    withoutWrapper?: boolean;
    events?: {},
    messageDate?: string,
    avatar?: string;
    lastMessage?: Message | null;
}
/*const defaultProps: ChatItemProps = {
    id: nanoid(6),
    name: '',
    chosen: false,
    withoutWrapper: true,
    unreadCount: null,
    lastMessage: {
        id: nanoid(6),
        message: '',
        date: new Date(),
        senderId: nanoid(6),
        status: 'SENT'
    }
}*/
export class ChatItem extends Block<ChatItemProps>{
    constructor(props: ChatItemProps ) {
        super('div', {...props});
        this.calcData()
    }
    calcData(){
        this.props.messageDate = this.props.lastMessage?.date.toLocaleString(['ru-RU'])
    }
    init() {
        this.children.avatar = new Avatar({
            url: this.props.avatar ? this.props.avatar : '',
            path: this.props.avatar,
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


