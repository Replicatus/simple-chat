type formField = {
    text?: string;
    name: string;
    type?: string;
    label?: string;
    value?: string | number | null | undefined;
    disabled?: string | boolean;
    error?: boolean;
    errorRules?: [];
    errorText?: string;
}
type ArrayLinks = NodeListOf<HTMLElementTagNameMap['a']>;

export {formField, ArrayLinks}