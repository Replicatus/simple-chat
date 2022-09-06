import type {formField} from './types'
import {regularExpressions} from './helpers/helpers'
const fields :formField[] = [
    { key: 'input0', text: 'Почта', name: 'email', value: 'test@test.ru', disabled: true, rules: [
            (v ) => !!v || 'Обязательное поле',
            (v ) => ( typeof v === 'string') && v.length  > 5 || 'Минимальное число символов 5',
            value => {
                const pattern = regularExpressions.email
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан адрес почты'
            },
        ]
    },
    { key: 'input1', text: 'Логин', name: 'login', value: 'test value', disabled: true,
        rules: [
            (v ) => !!v || 'Обязательное поле',
            (v ) => ( typeof v === 'string') && v.length  > 3 || 'Минимальное число символов 3',
            (v ) => ( typeof v === 'string') && v.length  <= 20 || 'Максимальное число символов 20',
            value => {
                const pattern = regularExpressions.login
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан логин'
            },
        ]
    },
    { key: 'input2', text: 'Имя', name: 'second_name', value: 'test value', disabled: true,
        rules: [
            (v ) => !!v || 'Обязательное поле',
            value => {
                const pattern = regularExpressions.fio
                return typeof value === 'string' && pattern.test(value) || 'Неверно указано имя'
            },
        ]},
    { key: 'input3', text: 'Фамилия', name: 'first_name', value: 'test value', disabled: true,
        rules: [
            (v ) => !!v || 'Обязательное поле',
            value => {
                const pattern = regularExpressions.fio
                return typeof value === 'string' && pattern.test(value) || 'Неверно указана фамилия'
            },
        ]},
    { key: 'input4', text: 'Имя в чате', name: 'display_name', value: 'test value', disabled: true,
        rules: [
            (v ) => !!v || 'Обязательное поле',
            value => {
                const pattern = regularExpressions.fio
                return typeof value === 'string' && pattern.test(value) || 'Неверно указано имя в чате'
            },
        ]},
    { key: 'input5', text: 'Телефон', name: 'phone', value: '+ 7916161', disabled: true,
        rules: [
            (v ) => !!v || 'Обязательное поле',
            (v ) => ( typeof v === 'string') && v.length  >= 10 || 'Минимальное число символов 10',
            (v ) => ( typeof v === 'string') && v.length  <= 15 || 'Максимальное число символов 15',
            value => {
                const pattern = regularExpressions.phone
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан телефон'
            },
        ]
    },
];
const passwordRules =  [
    (v :any) => !!v || 'Обязательное поле',
    (v:any) => ( typeof v === 'string') && v.length  >= 8 || 'Минимальное число символов 8',
    (v:any) => ( typeof v === 'string') && v.length  <= 40 || 'Максимальное число символов 40',
    (v:any) => {
        const pattern = regularExpressions.password
        return typeof v === 'string' && pattern.test(v) || 'Неверно указан пароль'
    },
]

const fieldsForPasswordPage:formField[] = [
    {key: 'input0',text: 'Старый пароль',type: 'password', name: 'oldPassword', value: 'test@test.ru', rules: passwordRules
    },
    {key: 'input1',text: 'Новый пароль',type: 'password', name: 'newPassword', value: 'test value', rules: passwordRules, },
    {key: 'input2',text: 'Повторите новый пароль',type: 'password', name: 'newPasswordConfirmed', value: 'test value', rules: passwordRules},
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