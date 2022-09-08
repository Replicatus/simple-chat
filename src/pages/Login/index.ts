import Block from "../../utils/Block";
import {Button} from "../../components/button";
import {Input} from "../../components/input";
import template from "./Login.hbs"
import {Link} from "../../components/link";

export class Login extends Block {

    // protected form : HTMLFormElement | null = null;
    constructor(props: {}) {
        super('section', props);
    }

    protected async savePassword() {
        const result: unknown[] = [];
        let valid = false;
        if (Array.isArray(this.children.inputs)) {
            for (const input of this.children.inputs) {
                if (input instanceof Input)
                    await input.checkValue()
                        .then((data) => {
                            valid = !!data;
                        })
                        .catch((e) => {
                            console.error('err', e)
                            valid = false
                        })
            }
            if (!valid)
                return;
            this.children.inputs.forEach((el: any) => {
                const value = el.getValue();
                result.push(value)
                el.setProps({
                    value: value.value,
                    disabled: true
                });
            });
        }
        this.props.changePassword = false;
        console.log('saved password', result);
    }

    protected editAvatar() {
        this.props.changeAvatar = !this.props.changeAvatar;
    }

    init() {

        if (this.props.fieldsLoginPage && Array.isArray(this.props.fieldsLoginPage)) {
            this.children.inputs = this.props.fieldsLoginPage.map((el) => {
                return new Input({
                    ...el,
                    className: 'enter',
                })
            });
        }

        this.children.link = new Link({
            label: "Нет аккаунта?",
            href: "Register"
        });

        this.children.buttonAuth = new Button({
            className: 'button',
            label: 'Авторизоваться',
            style: "max-width: 280px;",
            events: {
                click: () => this.savePassword()

            },
            replaceNode: true
        });
        super.init();
    }

    componentDidMount(oldProps?: unknown) {
        super.componentDidMount(oldProps);
    }

    render() {
        this.element!.classList.add('enter-page')
        return this.compile(template, this.props)
    }
}