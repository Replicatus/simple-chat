const fields = [
    {text: 'Почта', name: 'email', value: 'test@test.ru', disabled: 'disabled'},
    {text: 'Логин', name: 'login', value: 'test value', disabled: 'disabled'},
    {text: 'Имя', name: 'second_name', value: 'test value', disabled: 'disabled'},
    {text: 'Фамилия', name: 'first_name', value: 'test value', disabled: 'disabled'},
    {text: 'Имя в чате', name: 'display_name', value: 'test value', disabled: 'disabled'},
    {text: 'Телефон', name: 'phone', value: '+ 7916161', disabled: 'disabled'},
];
const fieldsForPasswordPage = [
    {text: 'Старый пароль',type: 'password', name: 'oldPassword', value: 'test@test.ru',},
    {text: 'Новый пароль',type: 'password', name: 'newPassword', value: 'test value', },
    {text: 'Повторите новый пароль',type: 'password', name: 'newPasswordConfirmed', value: 'test value'},
];
const fieldsLoginPage = [
    {text: 'Логин',type: 'text', name: 'login', value: 'test-login',},
    {text: 'Пароль',type: 'password', name: 'password', value: 'test value', },
];
const fieldsRegisterPage = [
    {text: 'Почта', name: 'email', value: 'test@test.ru', },
    {text: 'Логин', name: 'login', value: 'test value', },
    {text: 'Имя', name: 'second_name', value: 'test value', },
    {text: 'Фамилия', name: 'first_name', value: 'test value', },
    {text: 'Имя в чате', name: 'display_name', value: 'test value', },
    {text: 'Телефон', name: 'phone', value: '+ 7916161', },
    {text: 'Пароль',type: 'password', name: 'password', value: 'test value', error: true, errorText: ''},
    {text: 'Повторите пароль',type: 'password', name: 'passwordConfirmed', value: 'test value', error: '', errorText: 'Пароли не совпадают'},
];
export default {
    fields,
    fieldsForPasswordPage,
    fieldsLoginPage,
    fieldsRegisterPage,
    changeUserProfile: false,
    changeUserPassword: false,
}