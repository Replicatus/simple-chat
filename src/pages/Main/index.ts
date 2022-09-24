import Block from "../../utils/Block";

import template from "./Main.hbs";
// @ts-ignore
import avatarDefault from "/src/assets/icons/avatar-user-svgrepo-com.svg";
import {RouterLink} from "../../components/link";
import {Input} from "../../components/input";
// @ts-ignore
import {ChatItem, ChatItemProps, LastMessage} from "../../components/chatItem";
import {nanoid} from "nanoid";
import {Message, OpenedChat} from "../../components/openedChat";
import ChatController from "../../controllers/ChatController";
import {withStore} from "../../utils/Store";
import {Button} from "../../components/button";
import {Nullable} from "../../types";

// const chatInfo = {
//     id: nanoid(6),
//     chatName: 'test',
//     messages: [
//         {
//             id: nanoid(6),
//             message: 'fasdfasdf',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'af dasdf asdf asdf asdf asdf',
//             date: '12:34',
//             senderId: 'b',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
//
// Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
//             date: '12:35',
//             senderId: 'b',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
//
// Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
//             date: '12:35',
//             senderId: 'b',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'fasdfasdf',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'fasdfasdf',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'fasdfasdf',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'fasdf sadf asdf asdf sadf sa',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'fasdf asdf asdf asdf asdf asdf asdf safasdf',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'af dasdf asdf asdf asdf asdf',
//             date: '12:34',
//             senderId: 'b',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'af dasdf asdf asdf asdf asdf',
//             date: '12:34',
//             senderId: 'b',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'af dasdf asdf asdf asdf asdf',
//             date: '12:34',
//             senderId: 'b',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'af dasdf asdf asdf asdf asdf',
//             date: '12:34',
//             senderId: 'b',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'fasdf sadf asdf asdf sadf sa',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'fasdf asdf asdf asdf asdf asdf asdf safasdf',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         }, {
//             id: nanoid(6),
//             message: 'fasdf sadf asdf asdf sadf sa',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'fasdf asdf asdf asdf asdf asdf asdf safasdf',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         }, {
//             id: nanoid(6),
//             message: 'fasdf sadf asdf asdf sadf sa',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//         {
//             id: nanoid(6),
//             message: 'fasdf asdf asdf asdf asdf asdf asdf safasdf',
//             date: '12:33',
//             senderId: 'd',
//             status: 'SENT'
//         },
//
//     ]
// }
const defaultValues = {
    dialogChatAdd: false,
    dialogChatDelete: false,
    changeChats: false,
}

interface ServerChat {
    "id": number,
    "title": string,
    "avatar": null | string,
    "created_by": number,
    "unread_count": number,
    "last_message": Nullable<LastMessage>
}
class BaseMain extends Block {
    constructor(props: {}) {
        super('section', {
            ...defaultValues,
            ...props,
            userId: 'd',
            // chatInfo: chatInfo,
            propsForOpenedChat: null,
            chosenChat: null,
            openedChat: null
        });
    }

    getChosenChatInfo() {
        //TODO: здесь будет логика на получение даных по чату
        if (this.props.chatInfo)
            return {
                ...this.props.chatInfo,
                messages: []
                // messages: this.props.chatInfo.messages.map((el: Message) => ({
                //     ...el,
                //     isYourMessage: this.props.userId === el.senderId
                // }))
            }
    }

    openChat(id: string | number) {
        if (Array.isArray(this.children.ch)) {
            const chatItem = this.children.ch.find((el: any) => el.getIdChat() === id) as ChatItem;
            const chatProps = chatItem.getChatProps();
            // chatItem.changeChosenStatus();
            const props = {
                ...this.getChosenChatInfo(),
                chatName: chatProps.name,
                userId: 'd',
                avatar: chatProps.avatar ?? ''
            };
            this.setProps(
                {
                    propsForOpenedChat: props,
                    openedChat: new OpenedChat(
                        props
                    ),
                    chosenChat: chatItem,
                }
            );
        }
    }

    sendMessage() {
        if (this.children.openedChat && this.children.openedChat instanceof OpenedChat) {
            const value = this.children.openedChat.sendMessage();
            const chatInfo = this.props.chatInfo;
            console.log(value);
            if (value) {
                chatInfo.messages.push({
                    id: nanoid(6),
                    message: value.value,
                    date: Date.now(),
                    senderId: this.props.userId,
                    status: 'SENDING'
                })
                this.props.chatInfo = {
                    ...chatInfo,
                    messages: chatInfo.messages.map((el: Message) => ({
                        ...el,
                        isYourMessage: this.props.userId === el.senderId
                    }))
                };
                this.children.openedChat.getNewMessages(this.props.chatInfo.messages);
            }
        }
    }

    closeDialog() {
        this.props.changeChats = false
    }

    async addNewChat() {
        if (!(this.children.inputDialogChat instanceof Input))
            return;
        const valid = !!(await this.children.inputDialogChat.checkValue());
        if (!valid)
            return;
        const value = this.children.inputDialogChat.getValue();
        await ChatController.createChat({
            title: value?.value ?? ''
        })
        this.closeDialog();
    }

    async deleteChat() {
        // if (!(this.children.inputDialogChat instanceof Input))
        //     return;
        // const valid = !!(await this.children.inputDialogChat.checkValue());
        // if (!valid)
        //     return;
        // const value = this.children.inputDialogChat.getValue();
        // await ChatController.createChat({
        //     title: value?.value ?? ''
        // })
        this.closeDialog();
    }

    openDialog(type: 'open' | 'delete') {
        this.setProps({
            changeChats: true,
            dialogChatAdd: type === 'open',
            dialogChatDelete: type === 'delete',
        })
    }

    init() {
        ChatController.getChats();
        console.log('2', this.props.chats)
        // if (this.props.chats)
        this.children.chatsItem = this.props.chats?.forEach((el: ServerChat) => {
            return new ChatItem({
                id: el.id,
                name: el.title,
                chosen: false,
                avatar: el.avatar ?? avatarDefault,
                unreadCount: el.unread_count,
                events: {
                    'click': () => {
                        this.openChat(el.id);
                    }
                },
                lastMessage: el.last_message as LastMessage /*{
                    id: nanoid(6),
                    message: 'FIO ' + [...Array(index)].map((_, i) => i * 10).join(''),
                    date: new Date(),
                    senderId: index,
                    status: 'SENT'
                }*/
            })
        }) ?? []
        this.children.inputDialogChat = new Input({
            label: 'Название чата', type: 'text', name: 'text', value: '', rules: [
                (v) => !!v || 'Обязательное поле',
                (v) => (typeof v === 'string') && v.length > 3 || 'Минимальное число символов 3',
                (v) => (typeof v === 'string') && v.length <= 20 || 'Максимальное число символов 20',
            ],
            classes: ['flex-1'],
        });
        this.children.closeDialog = new Button({
            classes: ['close-dialog-btn'],
            label: '',
            style: "",
            events: {
                click: () => this.closeDialog()
            },
        });
        this.children.openDialog = new Button({
            classes: ['open-dialog-btn'],
            label: '',
            style: "",
            events: {
                click: () => this.openDialog('open')
            },
        });
        this.children.openDeleteDialog = new Button({
            classes: ['open-dialog-btn', 'open-dialog-btn-delete', 'ml-1'],
            label: '',
            style: "",
            events: {
                click: () => this.deleteChat()//this.openDialog('delete')
            },
        });

        this.children.buttonAddChat = new Button({
            classes: ['button'],
            label: 'Добавить',
            type: 'button',
            events: {click: () => this.addNewChat()}
        });
        this.children.buttonDeleteChat = new Button({
            classes: ['button'],
            label: 'Добавить',
            type: 'button',
            events: {click: () => this.deleteChat()}
        });

        this.children.openedChat = new OpenedChat({
            ...this.getChosenChatInfo(),
            callParentMethodSend: this.sendMessage.bind(this),
            chatName: '',
            avatar: ''
        });

        this.children.profileLink = new RouterLink({
            to: '/settings',
            label: 'Профиль ⟩',
            class: 'profile-link'
        });

        this.children.filterInput = new Input({
            label: 'Поиск',
            name: 'search',
            classes: ['chats-list-section__top-input'],
            value: '',
        });

        super.init();
    }

    protected componentDidUpdate(_oldProps: any, newProps: any) {
        // super.componentDidUpdate(oldProps, newProps);
        // if (newProps.chats){
            // this.setProps({
            //     chats: newProps.chats
            // })
            // this.children.chatsItem = newProps.chats?.forEach((el: ServerChat) => {
            //     return new ChatItem({
            //         id: el.id,
            //         name: el.title,
            //         chosen: false,
            //         avatar: el.avatar ?? avatarDefault,
            //         unreadCount: el.unread_count,
            //         events: {
            //             'click': () => {
            //                 this.openChat(el.id);
            //             }
            //         },
            //         lastMessage: el.last_message as LastMessage /*{
            //         id: nanoid(6),
            //         message: 'FIO ' + [...Array(index)].map((_, i) => i * 10).join(''),
            //         date: new Date(),
            //         senderId: index,
            //         status: 'SENT'
            //     }*/
            //     })
            // })

        // }
        return true
    }

    render() {
        this.element!.classList.add('chats')
        console.log('1', this.props.chats)
        return this.compile(template, this.props)
    }
}

export const withChats = withStore((state) => ({...state}));
export const Main = withChats(BaseMain);