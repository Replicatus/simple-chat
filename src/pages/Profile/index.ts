import Block from "../../utils/Block";
import {Button} from "../../components/button";
import {Input} from "../../components/input";
import template from "./Profile.hbs"
import Avatar from "../../components/avatar";
// import {Dialog} from "../../components/dialog";
import img from '../../assets/icons/Union.svg'
// import dialogTemplate from "../../blocks/dialogs/avatarChange.hbs"
import {formField, FormRow} from "../../types";
import SideMenu from "../../blocks/side-menu";
import {fields, fieldsForPasswordPage} from "../../consts";
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";
import {UserPassword, UserProfile} from "../../api/UserAPI";
import {withUser} from "../Login";

class ProfileBase extends Block {

    // protected form : HTMLFormElement | null = null;
    constructor(props: {}) {
        super('section', {
            ...props,
            fieldsForPasswordPage: fieldsForPasswordPage,
            fields: fields,
            changePassword: false,
            changeProfile: false,
            changeAvatar: false,
            events: {
                // click: (e: MouseEvent) => {
                //     this.closeDialog(e);
                // }
            }
        });
    }

    protected editProfile() {
        if (Array.isArray(this.children.inputs))
            //@ts-ignore
            // TODO: fix ts typs
            this.children.inputs.forEach((el: Input) => {
                el.changeDisableProperty(false);
            });
        this.props.changeProfile = true;
    }

    protected async saveData() {
        const result: FormRow[] = [];
        let valid = false;
        let beErrorValid = false;
        if (Array.isArray(this.children.inputs)) {
            for (const input of this.children.inputs) {
                if (input instanceof Input) {
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
            });
        }
        const data = result.reduce((acc, el) => {
            if (el.name)
                acc[el.name] = el.value;
            return acc
        }, {} as any);
        const ok = await UserController.updateProfile(data as UserProfile)
        if (ok){
            console.log('saved', result);
            if (Array.isArray(this.children.inputs))
            this.children.inputs.forEach((el: any) => {
                const value = el.getValue();
                el.setProps({
                    value: value.value,
                    disabled: true
                });
            });
            this.props.changeProfile = false;
        }
    }

    protected async savePassword() {
        const result: FormRow[] = [];
        let valid = false;
        let beErrorValid = false;
        if (Array.isArray(this.children.inputs)) {
            for (const input of this.children.inputs) {
                if (input instanceof Input) {
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
                });
            });
        }
        if (result[2] && result[1] && result[2].value !== result[1].value) {
            if (Array.isArray(this.children.inputs) && this.children.inputs.length > 0 && this.children.inputs[2] instanceof Input)
                this.children.inputs[2].setProps({error: true, errorText: 'Пароли должны совпадать'})
            return;
        }else{
            if (Array.isArray(this.children.inputs) && this.children.inputs.length > 0 && this.children.inputs[2] instanceof Input)
                this.children.inputs[2].setProps({error: false, errorText: ''})
        }
        const data = result.reduce((acc, el) => {
            if (el.name && ['oldPassword', 'newPassword'].includes(el.name))
                acc[el.name] = el.value;
            return acc
        }, {} as any);

        const ok: boolean | undefined = await UserController.updatePassword(data as UserPassword);
        if (ok)
            this.returnDefaultFormFields();
        console.log('saved password', result);
    }
    protected returnDefaultFormFields(){
        if (fields && Array.isArray(fields)) {
            this.children.inputs = fields.map((el: formField) => {
                return new Input({
                    ...el,
                    value: this.props[el.name] ?? '',
                    classes: ['profile'],
                })
            });
        }
        this.props.changePassword = false;
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

    protected editAvatar() {
        this.props.changeAvatar = !this.props.changeAvatar;
    }

    protected async changeAvatarSubmit(e: Event){
        e.preventDefault();
        const inputFile = this.element?.querySelector('#avatar') as HTMLInputElement;
        if (inputFile){
            const data = new FormData();
            if (!inputFile.files)
                return
            data.set('avatar', inputFile.files[0]);
            const ok = await UserController.updateAvatar(data);
            if (ok)
            {
                // this.props.avatar = ok.avatar;
                this.closeDialog();
                if (this.children.avatar instanceof Avatar)
                    this.children.avatar.changeAvatar(ok.avatar)
            }
        }
    }

    closeDialog(/*e: MouseEvent*/){
        // console.log(e)
        // const target = e.target;
        // const notDialog = this.element
        // if(e && e.path && this.props.changeAvatar)
            this.props.changeAvatar = false
    }
    init() {

        AuthController.fetchUser();
        this.children.avatar = new Avatar({
            url: img,
            label: 'Поменять аватар',
            path: this.props.avatar,
            events: {
                click: () => this.editAvatar(),
            }
        });
        this.children.sideMenu = new SideMenu()
        if (fields && Array.isArray(fields)) {
            this.children.inputs = fields.map((el: formField) => {
                return new Input({
                    ...el,
                    value: this.props[el.name] ?? '',
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
            }, {
                name: 'buttonCancelSavePassword',
                type: 'button',
                label: 'Отменить',
                classes: ['ml-3'],
                style: "max-width: 280px;",
                events: {click: () => this.returnDefaultFormFields()}
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
                type: 'submit',
                events: {click: (e: Event) => this.changeAvatarSubmit(e)}
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
        this.children.closeDialog = new Button({
            classes: ['close-dialog-btn'],
            label: '',
            style: "",
            events: {
                click: () => this.closeDialog()
            },
        });
        // this.children.dialog = new Dialog({
        //     withoutWrapper: false,
        //     template: dialogTemplate,
        //     events: {
        //         click: (e: Event) => {
        //             console.log(e)
        //             // if (!this.children.dialog.element.contains(e.target) && !this.children.dialog.element.contains(e.target))
        //             //   this.editAvatar()
        //         }
        //     }
        // });
        super.init();
    }

    render() {
        this.element!.classList.add('profile-page');
        // console.log(this.props.avatar)
        return this.compile(template, this.props)
    }
}

export const Profile = withUser(ProfileBase)