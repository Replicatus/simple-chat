import template from './input.hbs';
import Block from "../../utils/Block";
import {Nullable, StringOrNumber} from "../../types";

interface InputProps {
    classes?: string[];
    labelClass?: string;
    id?: string;
    label?: string;
    type?: string;
    name?: string;
    value?: unknown;
    placeholder?: string;
    disabled?: boolean;
    errorText?: string;
    error?: boolean;
    events?: {},
    rules?: Array<(args: Nullable<StringOrNumber>) => boolean | string>;
}
type ReturnedValueFromInput = { name: string, value: string | number | null } | null;

export class Input extends Block<InputProps> {
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
            if (Array.isArray(props.classes))
                this.element.classList.add('input', ...props.classes);
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
            for (const rule of this.props.rules) {
                res = rule(input.value);
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
        return new Promise((resolve,_) => {
            if (Array.isArray(this.props.rules)) {
                let res: string | boolean = true;
                for (const rule of this.props.rules) {
                    const value = this.getValue()?.value ?? null;
                    res = rule(value);
                    if (res === false || typeof res === 'string')
                    {
                        this.setProps({
                            error: true,
                            errorText: res,
                        });
                        this.element!.classList.add('error');
                        resolve(false);
                    }
                }
                if (res === true){
                    this.setProps({
                        error: false,
                        errorText: '',
                    });
                    this.element!.classList.remove('error');
                    resolve(true)
                }
            }else
                resolve(true)
        })

    }

    public getValue(): ReturnedValueFromInput {
        const el = this.getContent();
        if (el) {
            const input = el.querySelector("input");
            return {name: this.props.name ?? '', value: input?.value ?? null}
        }
        return null
    }

    render() {
        return this.compile(template, {...this.props});
    }
}