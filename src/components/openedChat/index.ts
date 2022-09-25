import template from "./template.hbs";
import Block from "../../utils/Block";
import Avatar from "../avatar";
import {Input} from "../input";
import {Button} from "../button";
import store, {withStore} from "../../utils/Store";
import UserController from "../../controllers/UserController";
import ChatController from "../../controllers/ChatController";
import {Nullable} from "../../types";



export type Message = {
    id: string | number;
    message: string;
    isYourMessage: boolean;
    date: number | string;
    senderId: number | string;
    status: 'SENDING' | 'SENT' | 'ERROR' | 'READ'
}

interface ChatOpenItemProps {
    id: number;
    chatName: string;
    callParentMethodFiles: Function;
    callParentMethodSend: Function;
    buttonSend?: null;
    events?: {},
    avatar?: string;
    userId: number;
    miniMenuOpen: boolean;
    openDialog: boolean;
    addDialog: boolean;
    deleteDialog: boolean;
    messages: Message[]
}
const defaultProps: ChatOpenItemProps = {
    id: 0,
    chatName: '',
    callParentMethodFiles: () => {},
    callParentMethodSend: () => {},
    userId: 0,
    buttonSend: null,
    miniMenuOpen: false,
    openDialog: false,
    addDialog: false,
    deleteDialog: false,
    messages: []
}

class OpenedChatBase extends Block<ChatOpenItemProps>{
    constructor(props: ChatOpenItemProps = defaultProps) {
         super('div', {...defaultProps,...props});
        // console.log('constructor', {...defaultProps,...props}.chatName)
    }
    openMiniModal(){
        this.props.miniMenuOpen = !this.props.miniMenuOpen
        // store.set('openedChat.miniMenuOpen', this.props.miniMenuOpen)
    }
    openDialogUser(type: 'add' | 'delete' = 'add'){
        // store.set('openedChat', {
        //     openDialog: true,
        //     addDialog: type === 'add',
        //     deleteDialog: type === 'delete'
        // })
        this.setProps({
            openDialog: true,
            addDialog: type === 'add',
            deleteDialog: type === 'delete'
        })
    }
    closeDialog() {
        this.props.openDialog = false
        // store.set('openedChat.openDialog', false)
    }
    async setNewUserToChat(){
        if (!(this.children.inputDialogUser instanceof Input))
            return;
        const valid = !!(await this.children.inputDialogUser.checkValue());
        if (!valid)
            return;
        const value = this.children.inputDialogUser.getValue();
        if (!value?.value)
            return
        const searchUser = await UserController.searchUser(`${value.value}`);
        if (searchUser && searchUser.length)
        {
            console.log(this.props)
            console.log('searchUser', searchUser)
            const idUserToAdd = searchUser.find((el: any) => !!el).id
            console.log('idUserToAdd', idUserToAdd, this.props?.id)
            return
            if (!idUserToAdd || this.props?.id)
                return;
            // const res = await ChatController.addUsersToChat(this.props?.id, [idUserToAdd]);
            // if (res)
            //     this.closeDialog()
        }
    }

    init() {
        this.children.avatar = new Avatar({
            withoutWrapper: true,
            url: this.props.avatar ? this.props.avatar : '',
            label: '',
            width: 47,
            height: 47,
        });
        this.children.inputDialogUser = new Input({
            id:'searchValue',label: 'Логин пользователя', type: 'text', name: 'searchValue', value: '', rules: [
                (v) => !!v || 'Обязательное поле',
                (v) => (typeof v === 'string') && v.length > 3 || 'Минимальное число символов 3',
                (v) => (typeof v === 'string') && v.length <= 10 || 'Максимальное число символов 10',
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
        })
        this.children.buttonDialogAddUser = new Button({
            classes: ['button'],
            label: 'Добавить пользователя',
            style: "",
            events: {
                click: () => this.setNewUserToChat()
            },
        })
        this.children.buttonDialogDeleteUser = new Button({
            classes: ['button'],
            label: 'Удалить пользователя',
            style: "",
            events: {
                click: () => {

                }
            },
        })
        this.children.inputMessage = new Input({
            label: '',
            type: 'text',
            id: 'message',
            placeholder: 'Сообщение',
            name: 'message',
            classes: ['message-input'],
            value: '',
        });
        this.children.buttonFiles = new Button({
            classes: ['files-btn'],
            label: '',
            style: "",
            events: {
                click: () => this.props.callParentMethodFiles()
            },
            replaceNode: true
        });
        this.children.addUserToChat = new Button({
            classes: ['text', 'mb-2'],
            label: 'Добавить пользователя',
            events: {
                click: () => this.openDialogUser()
            }
        })
        this.children.deleteUserFromChat = new Button({
            classes: ['text'],
            label: 'Удалить пользователя',
            events: {
                click: () => this.openDialogUser('delete')
            }
        })
        this.children.buttonSend = new Button({
            classes: ['send-btn'],
            label: '',
            style: "",
            events: {
                click: () => this.props.callParentMethodSend()
            },
            replaceNode: true
        });
        this.children.buttonMenu = new Button({
            classes: ['menu-btn'],
            label: '',
            style: "",
            events: {
                click: () => this.openMiniModal()
            },
        });
        super.init();
    }
    protected getMessage(){
        let value;
        if (this.children.inputMessage instanceof Input)
            value = this.children.inputMessage.getValue();
        if (value?.value)
            return value;
        else
            return;
    }
    public getNewMessages(data: Message[] = []){
        this.props.messages = [...data];
    }
    public sendMessage(){
        return this.getMessage();
    }

    componentDidUpdate(_oldProps: ChatOpenItemProps, _newProps: ChatOpenItemProps): boolean {
        console.log('chatName ',_newProps, _newProps.chatName)
        return  true
    }

    render(): DocumentFragment | HTMLElement {
        this.element?.classList.add('chats-section');
        console.log('opend chat', this.props.chatName)
        // debugger
        return this.compile(template, this.props);
    }
}
export const withOpenChat = withStore((state) => ({...state.openedChat}));
export const OpenedChat = withOpenChat(OpenedChatBase);