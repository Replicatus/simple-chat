import Block from "../../utils/Block";
import {Button} from "../../components/button";
import {Input} from "../../components/input";
import template from "./Register.hbs"
import {RouterLink} from "../../components/link";
import {formField, Nullable} from "../../types";
import {fieldsRegisterPage} from "../../consts";
import AuthController from "../../controllers/AuthController";
import {SignupData} from "../../api/AuthAPI";

export class Register extends Block {

    // protected form : HTMLFormElement | null = null;
    constructor(props: {}) {
        super('section', {...props, fieldsRegisterPage: fieldsRegisterPage});
    }

    protected async register() {
        const result: {value: Nullable<string | number>, name: string}[] = [];
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
        const data = result.reduce((acc, el) => {
            if (el.name)
                acc[el.name] = el.value;
            return acc
        }, {} as any);
        console.log('saved register Data', data);
        await AuthController.signup(data as SignupData)
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

        this.children.link = new RouterLink({
            label: "Войти",
            to: "/"
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