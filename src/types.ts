type Nullable<T> = T | null | undefined;
type StringOrNumber = string | number;
type formField = {
    text?: string;
    key?: string;
    name: string;
    type?: string;
    label?: string;
    value?: Nullable<StringOrNumber>;
    disabled?: boolean;
    error?: boolean;
    rules?: Array<(args: Nullable<StringOrNumber>) => boolean | string>;
    errorText?: string;
}

type ArrayLinks = NodeListOf<HTMLElementTagNameMap['a']>;

export {formField, ArrayLinks, Nullable, StringOrNumber}