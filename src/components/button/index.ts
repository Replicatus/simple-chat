import template from './button.hbs';
import Block from "../../utils/Block";

export interface ButtonProps {
    style?: string;
    classes?: string[];
    label: string;
    type?: 'button' | 'submit';
    onclick?: () => void,
    events?: {},
    replaceNode?: boolean
}
export class Button extends Block<ButtonProps>{
    constructor(props: ButtonProps) {
        super('button', props);
        if (this.element){
            try {
                if (Array.isArray(props.classes))
                    this.element.classList.add('button', ...props.classes);
                else
                    this.element.classList.add('button');
                if (props.type)
                    this.element.setAttribute('type' , props.type);
                if (props.onclick)
                    this.element.onclick = props.onclick;
                if (props.style)
                    this.element.setAttribute('style' , props.style);
            }catch (e) {
                console.error(props, e)
            }

        }
    }
    render() {
        return this.compile(template, {...this.props});
    }
}
