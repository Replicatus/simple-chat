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
    events?: {},
    rules?: Function[];
}
export class Input extends Block{
    constructor(props: InputProps) {
        super('div', {...props,
            events: props?.events ? {
            ...props.events,
                'input': (v: InputEvent) => console.log('on input ', v)
        } : {}
        });
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

    public getValue() : string | {name: unknown, value: string| number| null} | null {
        const el = this.getContent();
        if (el)
        {
            const input = el.querySelector("input");
            return {name: this.props.name, value: input?.value ?? null}
        }
        return null
    }

    render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}