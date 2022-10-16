import Block from "../../utils/Block";
import {RouterLink} from "../../components/link";

import template from "./404.hbs"


export class Page404 extends Block {
    constructor(props: {}) {
        super('section', {...props});

    }

    init() {
        this.children.link = new RouterLink({
            label: "Назад к чатам",
            to: "/"
        });
        super.init();
    }

    render() {
        this.element!.classList.add('error-page')
        return this.compile(template, this.props)

    }
}