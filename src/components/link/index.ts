// @ts-ignore
import template from './link.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime.js';
import Block from "../../utils/Block";

Handlebars.registerPartial('link', (props) => template({...props}));
interface LinkProps {
    href: string;
    class?: string;
    label: string;
    style?: string;
}
export class Link extends Block{
    constructor(props: LinkProps) {
        super('a', props);
    }
    render(): string {
        return template(this.props);
    }
}
