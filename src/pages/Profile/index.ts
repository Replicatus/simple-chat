import Block from "../../utils/Block";
import {Button} from "../../components/button";
import {Input} from "../../components/input";

import template from "./Profile.hbs"
import Avatar from "../../components/avatar";
import {Dialog} from "../../components/dialog";

import dialogTemplate from "../../blocks/dialogs/avatarChange.hbs"

export class Profile extends Block {

    // protected form : HTMLFormElement | null = null;
    constructor(props: {}) {
        super('section', {...props, changePassword: false, changeProfile: false, changeAvatar: false});
    }

    protected editProfile() {
        console.log('editProfile');
        if (Array.isArray(this.children.inputs))
            //@ts-ignore
            // TODO: fix ts typs
            this.children.inputs.forEach((el: Input) => {
                el.changeDisableProperty(false);
            });
        this.props.changeProfile = true;
    }

    protected async saveData() {
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
        this.props.changeProfile = false;
        console.log('saved', result);
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
        if (this.props.fields && Array.isArray(this.props.fields)) {
            this.children.inputs = this.props.fields.map((el) => {
                return new Input({
                    ...el,
                    className: 'profile',
                })
            });
        }

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
        this.props.changePassword = true;
    }

    protected editAvatar(){
        this.props.changeAvatar = !this.props.changeAvatar;
    }
    init() {
         const imageUrl = new URL(
            '/src/assets/icons/Union.svg',
            // @ts-ignore
            import.meta.url
        );
        // console.log(import.meta.url, imageUrl)
        this.children.avatar = new Avatar({
            url: `${imageUrl}`,
            withoutWrapper: false,
            // path: `/src/assets/icons/Union.svg`,
            events: {
              click: () => this.editAvatar(),
            }
        })
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
                name: 'buttonChangeAvatar',
                className: 'button',
                label: 'Поменять',
                events: {click: () => console.log('changeAvatar')}
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
        this.children.dialog = new Dialog({
            withoutWrapper: false,
            template: dialogTemplate,
            events: {
                click: (e:Event) => {
                    console.log(e)
                    // if (!this.children.dialog.element.contains(e.target) && !this.children.dialog.element.contains(e.target))
                    //   this.editAvatar()
                }
            }
        });
        this.children.dialog.children.buttonChangeAvatar = new Button({
            className: 'button',
            label: 'Поменять',
            events: {click: () => console.log('changeAvatar')},
            replaceNode: true
        })
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