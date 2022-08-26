import type {formField} from './types'
const fields :formField[] = [
    {text: 'Почта', name: 'email', value: 'test@test.ru', disabled: 'disabled'},
    {text: 'Логин', name: 'login', value: 'test value', disabled: 'disabled'},
    {text: 'Имя', name: 'second_name', value: 'test value', disabled: 'disabled'},
    {text: 'Фамилия', name: 'first_name', value: 'test value', disabled: 'disabled'},
    {text: 'Имя в чате', name: 'display_name', value: 'test value', disabled: 'disabled'},
    {text: 'Телефон', name: 'phone', value: '+ 7916161', disabled: 'disabled'},
];
const fieldsForPasswordPage:formField[] = [
    {text: 'Старый пароль',type: 'password', name: 'oldPassword', value: 'test@test.ru',},
    {text: 'Новый пароль',type: 'password', name: 'newPassword', value: 'test value', },
    {text: 'Повторите новый пароль',type: 'password', name: 'newPasswordConfirmed', value: 'test value'},
];
const fieldsLoginPage:formField[] = [
    {label: 'Логин',type: 'text', name: 'login', value: 'test-login',},
    {label: 'Пароль',type: 'password', name: 'password', value: 'test value', },
];
const fieldsRegisterPage:formField[] = [
    {label: 'Почта', name: 'email', value: 'test@test.ru', },
    {label: 'Логин', name: 'login', value: 'test value', },
    {label: 'Имя', name: 'second_name', value: 'test value', },
    {label: 'Фамилия', name: 'first_name', value: 'test value', },
    {label: 'Имя в чате', name: 'display_name', value: 'test value', },
    {label: 'Телефон', name: 'phone', value: '+ 7916161', },
    {label: 'Пароль',type: 'password', name: 'password', value: 'test value', error: true, errorText: ''},
    {label: 'Повторите пароль',type: 'password', name: 'passwordConfirmed', value: 'test value', error: true, errorText: 'Пароли не совпадают'},
];
export default {
    fields,
    fieldsForPasswordPage,
    fieldsLoginPage,
    fieldsRegisterPage,
    changeUserProfile: false,
    changeUserPassword: false,
}