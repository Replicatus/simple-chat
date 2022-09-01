import Block from "../../utils/Block";
import {Link} from "../../components/link";

import  template from "./404.hbs"



export class Page404 extends Block{
    constructor(props: {}) {
        super('section', {...props});

    }
    init() {
        this.children.link = new Link({
            label: "Назад к чатам",
            href: "/"
        });
        super.init();
    }
    render() {
        this.element!.classList.add('error-page')
        return this.compile(template, this.props)

    }
}