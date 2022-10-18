import Block from "../../utils/Block";
import { Nullable, StringOrNumber } from "../../types";
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
    events?: {};
    rules?: Array<(args: Nullable<StringOrNumber>) => boolean | string>;
}
declare type ReturnedValueFromInput = {
    name: string;
    value: string | number | null;
} | null;
export declare class Input extends Block<InputProps> {
    constructor(props: InputProps);
    private checkInputValues;
    changeDisableProperty(flag: boolean): void;
    setValue(value: string): void;
    checkValue(): Promise<unknown>;
    getValue(): ReturnedValueFromInput;
    render(): HTMLElement | DocumentFragment;
}
export {};
