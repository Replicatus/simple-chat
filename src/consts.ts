import type {formField} from './types'
import {regularExpressions} from './helpers/helpers'
import {Nullable, StringOrNumber} from "./types";

const fields: formField[] = [
    {
        key: 'input0', text: 'Почта', name: 'email', value: 'test@test.ru', disabled: true, rules: [
            (v) => !!v || 'Обязательное поле',
            (v) => (typeof v === 'string') && v.length >= 5 || 'Минимальное число символов 5',
            value => {
                const pattern = regularExpressions.email
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан адрес почты'
            },
        ]
    },
    {
        key: 'input1', text: 'Логин', name: 'login', value: 'Testvalue', disabled: true,
        rules: [
            (v) => !!v || 'Обязательное поле',
            (v) => (typeof v === 'string') && v.length > 3 || 'Минимальное число символов 3',
            (v) => (typeof v === 'string') && v.length <= 20 || 'Максимальное число символов 20',
            value => {
                const pattern = regularExpressions.login
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан логин'
            },
        ]
    },
    {
        key: 'input2', text: 'Имя', name: 'second_name', value: 'Testvalue', disabled: true,
        rules: [
            (v) => !!v || 'Обязательное поле',
            value => {
                const pattern = regularExpressions.fio
                return typeof value === 'string' && pattern.test(value) || 'Неверно указано имя'
            },
        ]
    },
    {
        key: 'input3', text: 'Фамилия', name: 'first_name', value: 'Testvalue', disabled: true,
        rules: [
            (v) => !!v || 'Обязательное поле',
            value => {
                const pattern = regularExpressions.fio
                return typeof value === 'string' && pattern.test(value) || 'Неверно указана фамилия'
            },
        ]
    },
    {
        key: 'input4', text: 'Имя в чате', name: 'display_name', value: 'Testvalue', disabled: true,
        rules: [
            (v) => !!v || 'Обязательное поле',
            value => {
                const pattern = regularExpressions.fio
                return typeof value === 'string' && pattern.test(value) || 'Неверно указано имя в чате'
            },
        ]
    },
    {
        key: 'input5', text: 'Телефон', name: 'phone', value: '+7916161', disabled: true,
        rules: [
            (v) => !!v || 'Обязательное поле',
            (v) => (typeof v === 'string') && v.length >= 10 || 'Минимальное число символов 10',
            (v) => (typeof v === 'string') && v.length <= 15 || 'Максимальное число символов 15',
            value => {
                const pattern = regularExpressions.phone
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан телефон'
            },
        ]
    },
];
const passwordRules = [
    (v: Nullable<StringOrNumber>) => !!v || 'Обязательное поле',
    (v: Nullable<StringOrNumber>) => typeof v === "string" && v.length >= 8  || 'Минимальное число символов 8',
    (v: Nullable<StringOrNumber>) =>  typeof v === "string" && v.length <= 40 || 'Максимальное число символов 40',
    (v: Nullable<StringOrNumber>) => {
        const pattern = regularExpressions.password
        return  typeof v === "string" && pattern.test(v) || 'Неверно указан пароль'
    },
]

const fieldsForPasswordPage: formField[] = [
    {
        key: 'input0',
        text: 'Старый пароль',
        type: 'password',
        name: 'oldPassword',
        value: 'afsdfasA54.',
        rules: passwordRules
    },
    {
        key: 'input1',
        text: 'Новый пароль',
        type: 'password',
        name: 'newPassword',
        value: 'afsdfasA54.',
        rules: passwordRules
    },
    {
        key: 'input2',
        text: 'Повторите новый пароль',
        type: 'password',
        name: 'newPasswordConfirmed',
        value: 'afsdfasA54.',
        rules: passwordRules
    },
];
const fieldsLoginPage: formField[] = [
    {
        key: 'input-login', label: 'Логин', type: 'text', name: 'login', value: 'test-login', rules: [
            (v) => !!v || 'Обязательное поле',
            (v) => (typeof v === 'string') && v.length > 3 || 'Минимальное число символов 3',
            (v) => (typeof v === 'string') && v.length <= 20 || 'Максимальное число символов 20',
            value => {
                const pattern = regularExpressions.login
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан логин'
            },
        ]
    },
    {
        key: 'input-password',
        label: 'Пароль',
        type: 'password',
        name: 'password',
        value: 'testPassword',
        rules: passwordRules
    },
];
const fieldsRegisterPage: formField[] = [
    {
        key: 'input0', text: 'Почта', name: 'email', value: 'test@test.ru',  rules: [
            (v) => !!v || 'Обязательное поле',
            (v) => (typeof v === 'string') && v.length >= 5 || 'Минимальное число символов 5',
            value => {
                const pattern = regularExpressions.email
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан адрес почты'
            },
        ]
    },
    {
        key: 'input1', text: 'Логин', name: 'login', value: 'Testvalue', 
        rules: [
            (v) => !!v || 'Обязательное поле',
            (v) => (typeof v === 'string') && v.length > 3 || 'Минимальное число символов 3',
            (v) => (typeof v === 'string') && v.length <= 20 || 'Максимальное число символов 20',
            value => {
                const pattern = regularExpressions.login
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан логин'
            },
        ]
    },
    {
        key: 'input2', text: 'Имя', name: 'second_name', value: 'Testvalue', 
        rules: [
            (v) => !!v || 'Обязательное поле',
            value => {
                const pattern = regularExpressions.fio
                return typeof value === 'string' && pattern.test(value) || 'Неверно указано имя'
            },
        ]
    },
    {
        key: 'input3', text: 'Фамилия', name: 'first_name', value: 'Testvalue', 
        rules: [
            (v) => !!v || 'Обязательное поле',
            value => {
                const pattern = regularExpressions.fio
                return typeof value === 'string' && pattern.test(value) || 'Неверно указана фамилия'
            },
        ]
    },
    {
        key: 'input4', text: 'Имя в чате', name: 'display_name', value: 'Testvalue', 
        rules: [
            (v) => !!v || 'Обязательное поле',
            value => {
                const pattern = regularExpressions.fio
                return typeof value === 'string' && pattern.test(value) || 'Неверно указано имя в чате'
            },
        ]
    },
    {
        key: 'input5', text: 'Телефон', name: 'phone', value: '+7916161', 
        rules: [
            (v) => !!v || 'Обязательное поле',
            (v) => (typeof v === 'string') && v.length >= 10 || 'Минимальное число символов 10',
            (v) => (typeof v === 'string') && v.length <= 15 || 'Максимальное число символов 15',
            value => {
                const pattern = regularExpressions.phone
                return typeof value === 'string' && pattern.test(value) || 'Неверно указан телефон'
            },
        ]
    },
    {
        key: 'input6',
        text: 'Пароль',
        type: 'password',
        name: 'newPassword',
        value: '',
        rules: passwordRules
    },
    {
        key: 'input7',
        text: 'Повторите пароль',
        type: 'password',
        name: 'passwordConfirmed',
        value: '',
        rules: passwordRules
    },
    // {label: 'Пароль', type: 'password', name: 'password', value: '', error: true, errorText: ''},
    // {
    //     label: 'Повторите пароль',
    //     type: 'password',
    //     name: 'passwordConfirmed',
    //     value: '',
    //     error: true,
    //     errorText: 'Пароли не совпадают'
    // },
];
export default {
    fields,
    fieldsForPasswordPage,
    fieldsLoginPage,
    fieldsRegisterPage,
    changeUserProfile: false,
    changeUserPassword: false,
}