import Block from "../../utils/Block";

import template from "./Main.hbs"



export class Main extends Block{
    constructor(props: {}) {
        super('section', {...props});
    }

    render() {
        this.element!.classList.add('main')
        return this.compile(template, this.props)
    }
}