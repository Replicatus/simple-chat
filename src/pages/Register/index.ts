import Block from "../../utils/Block";
import {Button} from "../../components/button";
import {Input} from "../../components/input";
import template from "./Register.hbs"
import {Link} from "../../components/link";
import {formField} from "../../types";

export class Register extends Block {

    // protected form : HTMLFormElement | null = null;
    constructor(props: {}) {
        super('section', props);
    }

    protected async register() {
        const result: unknown[] = [];
        let valid = false;
        let beErrorValid = false;
        if (Array.isArray(this.children.inputs)) {
            for (const input of this.children.inputs) {
                if (input instanceof Input)
                {
                    valid = !!(await input.checkValue());
                    if (!valid && !beErrorValid)
                        beErrorValid = true
                }            }
            if (!valid || beErrorValid)
                return;
            this.children.inputs.forEach((el: any) => {
                const value = el.getValue();
                result.push(value)
                el.setProps({
                    value: value.value,
                });
            });
        }
        console.log('saved password', result);
        setTimeout(() => {
            if (this.children.link instanceof Link)
                this.children.link.click();
        }, 4000)
    }

    protected editAvatar() {
        this.props.changeAvatar = !this.props.changeAvatar;
    }

    init() {

        if (this.props.fieldsRegisterPage && Array.isArray(this.props.fieldsRegisterPage)) {
            this.children.inputs = this.props.fieldsRegisterPage.map((el:formField) => {
                return new Input({
                    ...el,
                    classes: ['enter', 'dense'],
                })
            });
        }

        this.children.link = new Link({
            label: "Войти",
            href: "Login"
        });

        this.children.buttonRegister = new Button({
            classes: ['button'],
            label: 'Зарегистрироваться',
            style: "max-width: 280px;",
            events: {
                click: () => this.register()

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