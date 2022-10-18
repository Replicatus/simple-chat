import template from './linkTemplate.hbs';
import Block from "../../utils/Block";
import {PropsWithRouter, withRouter} from "../../hocs/withRouter";

interface LinkProps {
    href: string;
    withoutWrapper?: boolean;
    class?: string;
    label: string;
    style?: string;
}

interface LinkPropsWithRouter extends PropsWithRouter {
    to: string;
    withoutWrapper?: boolean;
    class?: string;
    label: string;
    style?: string;
    events?: {
        click: (e: Event) => void;
    };
}

class BaseLink extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super('a', {withoutWrapper: true, ...props});
    }

    public click() {
        this.element?.click();
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

class LinkWithRouter extends Block<LinkPropsWithRouter> {
    constructor(props: LinkPropsWithRouter) {
        super('a', {
            withoutWrapper: true,
            ...props,
            events: {
                click: (e) => this.navigate(e)
            },
        });
    }

    navigate(e: Event) {
        e.preventDefault();
        this.props.router.go(this.props.to);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const RouterLink = withRouter(LinkWithRouter);
export const Link = BaseLink;
