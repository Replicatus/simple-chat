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

export class Input extends Block {
    constructor(props: InputProps) {
        super('div', {
            ...props,
            events: props?.events ? {
                focusout: (e: FocusEvent) => {
                    this.checkInputValues(e);
                },
                ...props.events,
            } : {
                focusout: (e: FocusEvent) => {
                    this.checkInputValues(e);
                },
            }
        });
        if (this.element) {
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
    private checkInputValues = (e: FocusEvent) => {
        if (!e) return
        if (Array.isArray(this.props.rules)) {
            const input: any = e.target;
            let res;
            for (const func of this.props.rules) {
                res = func(input.value);
                if (res === false || typeof res === 'string')
                {
                    this.setProps({
                        error: true,
                        errorText: res,
                        value: input.value
                    });
                    this.element!.classList.add('error');
                    break;
                }
            }
            if (res === true){
                this.setProps({
                    error: false,
                    errorText: '',
                    value: input.value
                });
                this.element!.classList.remove('error');
            }
        }
    }
    public changeDisableProperty(flag: boolean){
        this.setProps({
            disabled: flag
        })
    }
    public checkValue(){
        return new Promise((res,rej) =>{
            if (Array.isArray(this.props.rules)) {
                let res;
                for (const func of this.props.rules) {
                    res = func(this.getValue());
                    if (res === false || typeof res === 'string')
                    {
                        this.setProps({
                            error: true,
                            errorText: res,
                        });
                        this.element!.classList.add('error');
                        rej(false);
                    }
                }
                if (res === true){
                    this.setProps({
                        error: false,
                        errorText: '',
                    });
                    this.element!.classList.remove('error');
                    res(true)
                }
            }else
                res(true)
        })

    }

    public getValue(): string | { name: unknown, value: string | number | null } | null {
        const el = this.getContent();
        if (el) {
            const input = el.querySelector("input");
            return {name: this.props.name, value: input?.value ?? null}
        }
        return null
    }

    render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}