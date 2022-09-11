import Block from "../../utils/Block";

import template from "./Main.hbs";
import avatarDefault from "/src/assets/icons/avatar-user-svgrepo-com.svg";
import {Link} from "../../components/link";
import {Input} from "../../components/input";
import {ChatItem} from "../../components/chatItem";
import {nanoid} from "nanoid";
import {Message, OpenedChat} from "../../components/openedChat";

const chatInfo = {
    id: nanoid(6),
    chatName: 'test',
    messages: [
        {
            id: nanoid(6),
            message: 'fasdfasdf',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'af dasdf asdf asdf asdf asdf',
            date: '12:34',
            senderId: 'b',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
   
Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
            date: '12:35',
            senderId: 'b',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
   
Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
            date: '12:35',
            senderId: 'b',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'fasdfasdf',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'fasdfasdf',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'fasdfasdf',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'fasdf sadf asdf asdf sadf sa',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'fasdf asdf asdf asdf asdf asdf asdf safasdf',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'af dasdf asdf asdf asdf asdf',
            date: '12:34',
            senderId: 'b',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'af dasdf asdf asdf asdf asdf',
            date: '12:34',
            senderId: 'b',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'af dasdf asdf asdf asdf asdf',
            date: '12:34',
            senderId: 'b',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'af dasdf asdf asdf asdf asdf',
            date: '12:34',
            senderId: 'b',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'fasdf sadf asdf asdf sadf sa',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'fasdf asdf asdf asdf asdf asdf asdf safasdf',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        }, {
            id: nanoid(6),
            message: 'fasdf sadf asdf asdf sadf sa',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'fasdf asdf asdf asdf asdf asdf asdf safasdf',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        }, {
            id: nanoid(6),
            message: 'fasdf sadf asdf asdf sadf sa',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },
        {
            id: nanoid(6),
            message: 'fasdf asdf asdf asdf asdf asdf asdf safasdf',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        },

    ]
}

export class Main extends Block {
    constructor(props: {}) {
        super('section', {...props, userId: 'd', chatInfo: chatInfo, propsForOpenedChat: null, chosenChat: null, openedChat: null});
    }

    getChosenChatInfo() {
        //TODO: здесь будет логика на получение даных по чату
        return {
            ...this.props.chatInfo,
            messages: this.props.chatInfo.messages.map((el: Message) => ({
                ...el,
                isYourMessage: this.props.userId === el.senderId
            }))
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
    sendMessage(){
        if (this.children.openedChat && this.children.openedChat instanceof OpenedChat)
        {
            const value = this.children.openedChat.sendMessage();
            const chatInfo = this.props.chatInfo;
            console.log(value);
            if (value){
                chatInfo.messages.push({
                    id: nanoid(6),
                    message: value.value,
                    date: Date.now(),
                    senderId: this.props.userId,
                    status: 'SENDING'
                })
                this.props.chatInfo = {
                    ...chatInfo,
                    messages: chatInfo.messages.map((el: Message) => ({...el, isYourMessage: this.props.userId === el.senderId}))
                };
                this.children.openedChat.getNewMessages(this.props.chatInfo.messages);
            }
        }
    }
    init() {
        this.children.ch = [...Array(22)].map((_, index) => {
            const id = nanoid(6);
            return new ChatItem({
                id: id,
                name: `Chat number ${index}`,
                chosen: false,
                avatar: avatarDefault,
                unreadCount: index % 2 ? index : null,
                events: {
                    'click': () => {
                        this.openChat(id);
                    }
                },
                lastMessage: {
                    id: nanoid(6),
                    message: 'FIO ' + [...Array(index)].map((_, i) => i * 10).join(''),
                    date: new Date(),
                    senderId: index,
                    status: 'SENT'
                }
            })
        })
        this.children.openedChat = new OpenedChat({
            ...this.getChosenChatInfo(),
            callParentMethodSend: this.sendMessage.bind(this),
            chatName: '',
            avatar: ''
        });

        this.children.profileLink = new Link({
            href: '/Profile',
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

    render() {
        this.element!.classList.add('chats')
        return this.compile(template, this.props)
    }
}