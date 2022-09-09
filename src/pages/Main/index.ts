import Block from "../../utils/Block";

import template from "./Main.hbs"
import {Link} from "../../components/link";
import {Input} from "../../components/input";
import {ChatItem} from "../../components/chatItem";
import {nanoid} from "nanoid";
import {OpenedChat} from "../../components/openedChat";
const chatInfo = {
    id: nanoid(6),
    chatName: '',
    messages: [
        {
            id: nanoid(6),
            message: 'fasdfasdf',
            date: '12:33',
            senderId: 'd',
            status: 'SENT'
        }
    ]
}
export class Main extends Block{
    constructor(props: {}) {
        super('section', {...props, chatInfo: chatInfo, chosenChat: null, openedChat: null});
    }
    getChosenChatInfo(){
        //TODO: здесь будет логика на получение даных по чату
        return this.props.chatInfo;
    }
    openChat(id : string | number){
        if (Array.isArray(this.children.ch))
        {
            const chatItem = this.children.ch.find((el: any) => el.getIdChat() === id) as ChatItem;
            const chatProps = chatItem.getChatProps();
            // chatItem.changeChosenStatus();
            const props = {
                ...this.getChosenChatInfo(),
                chatName: chatProps.name,
                avatar: chatProps.avatar ?? ''
            };
            console.log([props])
            this.setProps(
                {
                    chosenChat: chatItem,
                    openedChat: new OpenedChat(
                        props
                    )
                }
            );
        }

    }
    init() {
        this.children.ch = [...Array(22)].map((_, index) =>  {
            const id = nanoid(6);
            return new ChatItem({
            id: id,
            name: `Chat number ${index}`,
            chosen: false,
            unreadCount: index % 2 ? index : null,
            events: {
              'click': () => {
                  console.log(id);
                  this.openChat(id);
              }
            },
            lastMessage: {
                id: nanoid(6),
                message: 'FIO ' + [...Array(index)].map((_, i) => i*10).join(''),
                date: '12:06',
                senderId: index,
                status: 'SENT'
            }
        })})
        this.children.openedChat =  new OpenedChat({
            ...this.getChosenChatInfo(),
            name: '',
            avatar: ''
        })

        this.children.profileLink = new Link({
            href: '/Profile',
            label: 'Профиль ⟩',
            class: 'profile-link'
        });

        this.children.filterInput = new Input({
            label: 'Поиск',
            name: 'search',
            className: 'chats-list-section__top-input',
            value: '',
        });
        super.init();
    }

    render() {
        this.element!.classList.add('chats')
        return this.compile(template, this.props)
    }
}