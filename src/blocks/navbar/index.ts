import template from "./index.hbs";
import Block from "../../utils/Block";



export default class Navbar extends Block{
    constructor() {
        super('nav', {});
    }
    render(): DocumentFragment {
        return this.compile(template, {});
    }
}

