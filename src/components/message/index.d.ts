import Block from "../../utils/Block";
interface MessageProps {
    content: string;
    isYourMessage: boolean;
    withoutWrapper?: boolean;
}
export declare class Message extends Block<MessageProps> {
    constructor(props: MessageProps);
    render(): HTMLElement | DocumentFragment;
}
export {};
