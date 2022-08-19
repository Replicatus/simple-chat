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
export default {
    fields,
    fieldsForPasswordPage,
    changeUserProfile: false,
    changeUserPassword: false,
}