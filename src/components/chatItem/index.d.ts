import Block from "../../utils/Block";
import { UserProfile } from "../../api/UserAPI";
import { Nullable } from "../../types";
export declare type LastMessage = {
    id: number;
    content: string;
    time: Date;
    user: UserProfile;
    status?: 'SENDING' | 'SENT' | 'ERROR' | 'READ';
};
export interface ChatItemProps {
    id: number;
    name: string;
    unreadCount: number | null;
    chosen: boolean;
    withoutWrapper?: boolean;
    events?: Record<string, any>;
    messageDate?: string;
    avatar?: Nullable<string>;
    lastMessage?: Nullable<LastMessage>;
}
export declare class ChatItem extends Block<ChatItemProps> {
    constructor(props: ChatItemProps);
    calcData(): void;
    init(): void;
    getIdChat(): number;
    changeChosenStatus(): void;
    getChatProps(): ChatItemProps;
    render(): DocumentFragment | HTMLElement;
}
