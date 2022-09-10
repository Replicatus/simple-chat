import template from './button.hbs';
import Block from "../../utils/Block";

interface ButtonProps {
    style?: string;
    className?: string[] | string;
    label: string;
    type?: string;
    onclick?: () => void,
    events?: {},
    replaceNode?: boolean
}
export class Button extends Block<ButtonProps>{
    constructor(props: ButtonProps) {
        super('button', props);
        if (this.element){
            try {
                if (Array.isArray(props.className))
                    this.element.classList.add('button', [...props.className].join(', '));
                else if (props.className)
                    this.element.classList.add('button', ...props.className.split(' ').map(el => `${el}`));
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
