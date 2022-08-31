import Block from "../../utils/Block";
import {Link} from "../../components/link";

import  template from "./404.hbs"



export class Page404 extends Block{
    constructor(props: {}) {
        super('section', {...props});
        this.element!.classList.add('error-page')
    }
    render() {
        // const link = new Link({
        //     label: "Назад к чатам",
        //     href: "/"
        // });
        const link = new Link({
            label: "Назад к чатам",
            href: "/"
        });
        return this.compile(template, {link: link})

    }
}