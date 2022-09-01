import template from './input.hbs';
import Block from "../../utils/Block";

interface InputProps {
    className?: string[] | string;
    labelClass?: string;
    id?: string;
    label?: string;
    type?: string;
    name?: string;
    value?: unknown;
    placeholder?: string;
    disabled?: string | boolean;
    errorText?: string;
    error?: boolean;
    errorRules?: Function[];
}
export class Input extends Block{
    constructor(props: InputProps) {
        super('div', props);
        if (this.element){
            if (Array.isArray(props.className))
                this.element.classList.add('input', [...props.className].join(', '));
            else if (props.className)
                this.element.classList.add('input', ...props.className.split(' ').map(el => `${el}`));
            else
                this.element.classList.add('input');
            if (props.error)
                this.element.classList.add('error');
        }
    }

    render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}