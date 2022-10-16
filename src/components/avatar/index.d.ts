import Block from "../../utils/Block";
interface AvatarProps {
    classes?: string[];
    style?: Record<string, string>;
    withoutWrapper?: boolean;
    path?: string;
    url?: string;
    label?: string;
    backgroundImage?: string;
    width?: string | number;
    height?: string | number;
    events?: {};
}
export default class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps);
    changeAvatar(path: string): void;
    render(): HTMLElement | DocumentFragment;
}
export {};
