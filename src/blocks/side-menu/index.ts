import Block from "../../utils/Block";
import template from "../side-menu/side-menu.hbs";
import {RouterLink} from "../../components/link";

export default class SideMenu extends Block{
    constructor() {
        super('div', {withoutWrapper: true});
    }
    init() {
        this.children.nav = new RouterLink({
            to: '/messenger',
        })
        super.init();
    }

    render() {
        return this.compile(template, this.props);
    }
}