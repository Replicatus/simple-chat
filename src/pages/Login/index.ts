import Block from "../../utils/Block";
import {Button} from "../../components/button";
import {Input} from "../../components/input";
import template from "./Login.hbs"
import {RouterLink} from "../../components/link";
import {formField, Nullable} from "../../types";
import {fieldsLoginPage} from "../../consts";
import {SigninData} from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";
import {withStore} from "../../utils/Store";

class BaseLogin extends Block {

    constructor(props: {}) {
        super('section', {...props, fieldsLoginPage: fieldsLoginPage});
    }

    protected async savePassword() {
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
                }
            }
            if (!valid || beErrorValid)
                return;
            this.children.inputs.forEach((el: any) => {
                const value = el.getValue();
                result.push(value)
                el.setProps({
                    value: value.value,
                    disabled: false
                });
            });
        }

        const data = result.reduce((acc, el) => {
            if (el.name)
                acc[el.name] = el.value;
            return acc
        }, {} as any);
        await AuthController.signin(data as SigninData);
    }

    protected editAvatar() {
        this.props.changeAvatar = !this.props.changeAvatar;
    }

    init() {
        if (this.props.fieldsLoginPage && Array.isArray(this.props.fieldsLoginPage)) {
            this.children.inputs = this.props.fieldsLoginPage.map((el:formField) => {
                return new Input({
                    ...el,
                    classes: ['enter'],
                })
            });
        }

        this.children.link = new RouterLink({
            label: "Нет аккаунта?",
            to: "/sign-up"
        });

        this.children.buttonAuth = new Button({
            classes: ['button'],
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
        this.element!.classList.add('enter-page');
        console.log(111,this.props,this.props.errorLogin)
        // debugger
        return this.compile(template, this.props)
    }
}
export const withUser = withStore((state) => ({ ...state.user }));
export const Login = withUser(BaseLogin)