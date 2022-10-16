import Block from "../../utils/Block";
export interface ButtonProps {
    style?: string;
    classes?: string[];
    label: string;
    type?: 'button' | 'submit';
    onclick?: () => void;
    events?: {};
    replaceNode?: boolean;
}
export declare class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps);
    render(): HTMLElement | DocumentFragment;
}
