// @ts-ignore
import template from './link.hbs';
import Block from "../../utils/Block";

interface LinkProps {
    href: string;
    withoutWrapper?: boolean;
    class?: string;
    label: string;
    style?: string;
}
export class Link extends Block<LinkProps>{
    constructor(props: LinkProps) {
        super('a', {withoutWrapper: true, ...props });
    }
    public click (){
        this.element?.click();
    }
    render() {
        return this.compile(template, {...this.props});
    }
}
