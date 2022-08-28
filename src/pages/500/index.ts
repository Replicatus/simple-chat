import Block from "../../utils/Block";
import {Link} from "../../components/link";

import  template from "./500.hbs"

interface Page500Props{
    link: Link
}

export class Page500 extends Block{
    constructor(props: Page500Props) {
        super('section', {...props});
        this.element.classList.add('error-page')
    }
    render() {
        // const link = new Link({
        //     label: "Назад к чатам",
        //     href: "/"
        // });
        return this.compile(template, {link: this.props.link})

    }
}