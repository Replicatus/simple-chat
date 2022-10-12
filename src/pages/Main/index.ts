import Block from "../../utils/Block";

import template from "./Main.hbs";
import {RouterLink} from "../../components/link";
import {Input} from "../../components/input";
import {ChatItem, ChatItemProps, LastMessage} from "../../components/chatItem";
import { OpenedChat} from "../../components/openedChat";
import ChatController from "../../controllers/ChatController";
import store, {withStore} from "../../utils/Store";
import {Button} from "../../components/button";
import {Nullable} from "../../types";

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
            withoutWrapper: false,
            ...props,
            userId: 'd',
            propsForOpenedChat: null,
            chosenChat: null,
            openedChat: null
        });
    }

    openChat(id: string | number) {
        if (Array.isArray(this.children.chatsItem) && this.props.propsForOpenedChat?.id !== id) {
            const chatItem = this.children.chatsItem.find((el: any) => el.getIdChat() === id) as ChatItem;
            const chatProps = chatItem.getChatProps();
            this.props.chats = this.props.chats.map((el: ChatItem) => ({...el, chosen : false}))
            const chat = this.props.chats.find((el: ChatItem) => el.id === id);
            chat.chosen = true;
            const props = {
                ...chatProps,
                chatName: chatProps.name,
                userId: this.props.user.id,
                avatar: chatProps.avatar ?? ''
            };
            this.setProps(
                {
                    propsForOpenedChat: props,
                    openedChat: props,
                    chosenChat: chatItem,
                }
            );
            store.set('openedChat', props)
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
        const chosenChat = this.props.chats.find((el: ChatItemProps ) => el.chosen)
        if (chosenChat){
            await ChatController.deleteChat(chosenChat.id);
        }else
            alert('Выберите чат для удаления')
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
        this.children.chatsItem = this.props.chats?.map((el: ServerChat) => {
            return new ChatItem({
                id: el.id,
                name: el.title,
                chosen: false,
                avatar: el.avatar,
                unreadCount: el.unread_count,
                lastMessage: el.last_message as LastMessage
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
                click: () => this.deleteChat()
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
            ...this.props.propsForOpenedChat,
            id: this.props.propsForOpenedChat?.id ?? 0,
            chatName: this.props.propsForOpenedChat?.name ?? '',
            userId: this.props.user.id,
        })

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
        if (newProps.chats && Array.isArray(newProps.chats)){
            this.children.chatsItem = newProps.chats.map((el: ServerChat & {chosen: boolean}) => {
                return new ChatItem({
                    id: el.id,
                    name: el.title,
                    chosen: el.chosen ?? false,
                    avatar: el.avatar,
                    unreadCount: el.unread_count,
                    events: {
                        'click': () => {
                            this.openChat(el.id);
                        }
                    },
                    lastMessage: el.last_message as LastMessage
                })
            })
        }
        if (newProps.propsForOpenedChat)
        {
            this.children.openedChat = new OpenedChat({
                ...newProps.propsForOpenedChat,
                id: newProps.propsForOpenedChat?.id ?? 0,
                chatName: newProps.propsForOpenedChat?.name ?? '',
                userId: newProps.user.id,
            })
        }
        return true
    }

    render() {
        if (this.element && !this.element?.classList.contains('chats'))
            this.element?.classList.add('chats');
        return this.compile(template, this.props)
    }
}

export const withChats = withStore((state) => ({...state}));
export const Main = withChats(BaseMain);