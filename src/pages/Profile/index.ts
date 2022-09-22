import Block from "../../utils/Block";
import {Button} from "../../components/button";
import {Input} from "../../components/input";
import { withStore } from '../../utils/Store';
import template from "./Profile.hbs"
import Avatar from "../../components/avatar";
import {Dialog} from "../../components/dialog";
import img from '../../assets/icons/Union.svg'
import dialogTemplate from "../../blocks/dialogs/avatarChange.hbs"
import {formField} from "../../types";
import SideMenu from "../../blocks/side-menu";
import {fields, fieldsForPasswordPage} from "../../consts";
import AuthController from "../../controllers/AuthController";
class ProfileBase extends Block {

    // protected form : HTMLFormElement | null = null;
    constructor(props: {}) {
        super('section', {
            ...props,
            fieldsForPasswordPage: fieldsForPasswordPage,
            fields: fields,
            changePassword: false,
            changeProfile: false,
            changeAvatar: false
        });
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
                    disabled: true
                });
            });
        }
        if (fields && Array.isArray(fields)) {
            this.children.inputs = fields.map((el: formField) => {
                return new Input({
                    ...el,
                    classes: ['profile'],
                })
            });
        }

        this.props.changePassword = false;
        console.log('saved password', result);
    }

    protected editPassword() {
        console.log('editPassword')
        if (fieldsForPasswordPage && Array.isArray(fieldsForPasswordPage)) {
            this.children.inputs = fieldsForPasswordPage.map((el: formField) => {
                return new Input({
                    ...el,
                    classes: ['profile'],
                })
            });
        }
        this.props.changePassword = true;
    }

    protected editAvatar(){
        this.props.changeAvatar = !this.props.changeAvatar;
    }
    async init() {
        await AuthController.fetchUser();
        this.children.avatar = new Avatar({
            url: img,
            withoutWrapper: false,
            label: 'Поменять аватар',
            // path: `/src/assets/icons/Union.svg`,
            events: {
              click: () => this.editAvatar(),
            }
        });
        this.children.sideMenu = new SideMenu()
        if (fields && Array.isArray(fields)) {
            this.children.inputs = fields.map((el:formField) => {
                return new Input({
                    ...el,
                    value: this.props[el.name],
                    classes: ['profile'],
                })
            });
        }
        [
            {
                name: 'buttonChange',
                classes: ['text'],
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
                classes: ['text'],
                label: 'Изменить пароль',
                events: {click: () => this.editPassword()}
            },
            {
                name: 'buttonChangeAvatar',
                classes: ['button'],
                label: 'Поменять',
                events: {click: () => console.log('changeAvatar')}
            },
            {
                name: 'buttonExit',
                classes: ['text', 'error'],
                label: 'Выйти',
                events: {click: () => AuthController.logout()}
            },
        ].forEach((el: any) => {
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
            classes: ['button'],
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
const withUser = withStore((state) => ({ ...state.user }));
export const Profile = withUser(ProfileBase)