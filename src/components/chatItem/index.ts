import template from "./chatItem.hbs";
import Block from "../../utils/Block";
import Avatar from "../avatar";
import {UserProfile} from "../../api/UserAPI";
import {Nullable} from "../../types";
import avatarDefault from "/src/assets/icons/avatar-user-svgrepo-com.svg";

export type LastMessage = {
    id: number;
    content: string;
    time: Date;
    user: UserProfile;
    status?: 'SENDING' | 'SENT' | 'ERROR' | 'READ'
}

export interface ChatItemProps {
    id: number;
    name: string;
    unreadCount: number | null;
    chosen: boolean;
    withoutWrapper?: boolean;
    events?: Record<string, any>,
    messageDate?: string,
    avatar?: Nullable<string>;
    lastMessage?: Nullable<LastMessage>;
}

export class ChatItem extends Block<ChatItemProps> {
    constructor(props: ChatItemProps) {
        super('div', {...props, withoutWrapper: props.withoutWrapper || true});
        this.calcData()
    }

    calcData() {
        this.props.messageDate = this.props.lastMessage?.time.toLocaleString(['ru-RU'])
    }

    init() {
        this.children.avatar = new Avatar({
            url: !this.props.avatar ? avatarDefault : null,
            path: this.props.avatar ?? undefined,
            label: '',
            width: 47,
            height: 47,
        })
        super.init();
    }

    public getIdChat() {
        return this.props.id
    }

    public changeChosenStatus() {
        this.setProps(
            {
                chosen: !this.props.chosen
            }
        )
    }

    public getChatProps() {
        return this.props
    }

    render(): DocumentFragment | HTMLElement {
        return this.compile(template, this.props);
    }
}


