import Block from "../../utils/Block";
import {Button} from "../../components/button";
import {Input} from "../../components/input";

import template from "./Profile.hbs"

export class Profile extends Block {
    protected changePassword: boolean = false;
    protected changeProfile: boolean = false;

    // protected form : HTMLFormElement | null = null;
    constructor(props: {}) {
        super('section', {...props, changePassword: false, changeProfile: false});
    }

    protected editProfile() {
        console.log('editProfile');
        if (Array.isArray(this.children.inputs))
            //@ts-ignore
            // TODO: fix ts typs
        this.children.inputs.forEach((el: Input ) => {
            el.changeDisableProperty(false);
        });
        this.changeProfile = true;
        this.props.changeProfile = true;
    }

    protected saveData() {
        this.changeProfile = false;
        this.props.changeProfile = false;
        const result: unknown[] = [];
        let valid = false;
        if (Array.isArray(this.children.inputs)){

            this.children.inputs.forEach((el: any) => {
                const value = el.getValue();
                result.push(value)
                el.setProps({
                    value: value.value,
                    disabled: true
                });
            });
        }

        console.log('saved', result);
    }

    protected savePassword() {
        const result: unknown[] = [];
        if (Array.isArray(this.children.inputs))
            this.children.inputs.forEach((el: any) => {
                const value = el.getValue();
                result.push(value)
                el.props.value = value.value;
                el.props.disabled = true;
            });
        if (this.props.fields && Array.isArray(this.props.fields)) {
            console.log(1,this.children)
            this.children.inputs = this.props.fields.map((el) => {
                return new Input({
                    ...el,
                    className: 'profile',
                })
            });
        }
        this.changePassword = false;
        this.props.changePassword = false;
        console.log('saved password', result);
    }

    protected editPassword() {
        console.log('editPassword')
        if (this.props.fieldsForPasswordPage && Array.isArray(this.props.fieldsForPasswordPage)) {
            this.children.inputs = this.props.fieldsForPasswordPage.map((el) => {
                return new Input({
                    ...el,
                    className: 'profile',
                })
            });
        }
        this.changePassword = true;
        this.props.changePassword = true;
    }

    init() {
        if (this.props.fields && Array.isArray(this.props.fields)) {
            this.children.inputs = this.props.fields.map((el) => {
                return new Input({
                    ...el,
                    className: 'profile',
                })
            });
        }
        [
            {
                name: 'buttonChange',
                className: 'text',
                label: 'Изменить данные',
                events: {click: () => this.editProfile()}
            },
            {
                name: 'buttonSave',
                type: 'button',
                label: 'Сохранить',
                style: "max-width: 280px;",
                events: {click: () => this.saveData()}
            },
            {
                name: 'buttonSavePassword',
                type: 'button',
                label: 'Сохранить',
                style: "max-width: 280px;",
                events: {click: () => this.savePassword()}
            },
            {
                name: 'buttonChangePassword',
                className: 'text',
                label: 'Изменить пароль',
                events: {click: () => this.editPassword()}
            },
            {
                name: 'buttonExit',
                className: 'text error',
                label: 'Выйти',
                events: {click: () => console.log('clicked on buttonExit'),}
            },
        ].forEach(el => {
            this.children[el.name] = new Button({
                ...el,
                replaceNode: true
            });
        });

        super.init();
    }

    componentDidMount(oldProps?: unknown) {
        super.componentDidMount(oldProps);
    }

    render() {
        this.element!.classList.add('profile-page')
        return this.compile(template, this.props)
    }
}