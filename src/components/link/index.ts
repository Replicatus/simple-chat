// @ts-ignore
import template from './link.hbs';
import Block from "../../utils/Block";

interface LinkProps {
    href: string;
    class?: string;
    label: string;
    style?: string;
}
export class Link extends Block{
    constructor(props: LinkProps) {
        super('a', {...props, withoutWrapper: true});
    }
    public click (){
        this.element?.click();
    }
    render() {
        return this.compile(template, {...this.props});
    }
}
