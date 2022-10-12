import template from "./template.hbs";
import Block from "../../utils/Block";
import Avatar from "../avatar";
import {Input} from "../input";
import {Button} from "../button";
import {withStore} from "../../utils/Store";
import UserController from "../../controllers/UserController";
import ChatController from "../../controllers/ChatController";
import MessagesController, {Message as MessageInfo} from "../../controllers/MessagesController";
import {Message} from "../message";
// import {UserProfile} from "../../api/UserAPI";
// import ChatController from "../../controllers/ChatController";
// import {Nullable} from "../../types";


export interface ChatOpenItemProps {
    id: number;
    chatName: string;
    callParentMethodFiles: Function;
    callParentMethodSend: Function;
    buttonSend?: null;
    events?: {},
    avatar?: string;
    errorCreate?: string;
    errorDelete?: string;
    errorAddUsersToChat?: boolean;
    errorDeleteUsersFromChat?: boolean;
    errorSearchUser?: boolean;
    userId: number;
    miniMenuOpen: boolean;
    openDialog: boolean;
    addDialog: boolean;
    withoutWrapper: boolean;
    deleteDialog: boolean;
    messages: MessageInfo[]
}
const defaultProps: ChatOpenItemProps = {
    id: 0,
    chatName: '',
    errorAddUsersToChat: false,
    errorDeleteUsersFromChat: false,
    errorSearchUser: false,
    callParentMethodFiles: () => {},
    callParentMethodSend: () => {},
    userId: 0,
    buttonSend: null,
    miniMenuOpen: false,
    openDialog: false,
    withoutWrapper: true,
    addDialog: false,
    deleteDialog: false,
    messages: []
}

class OpenedChatBase extends Block<ChatOpenItemProps>{
    constructor(props: ChatOpenItemProps = defaultProps) {
         super('div', {...defaultProps,...props, withoutWrapper: false});
    }
    openMiniModal(){
        this.props.miniMenuOpen = !this.props.miniMenuOpen
    }
    openDialogUser(type: 'add' | 'delete' = 'add'){
        this.setProps({
            openDialog: true,
            addDialog: type === 'add',
            deleteDialog: type === 'delete'
        })
    }
    closeDialog() {
        this.setProps({
            openDialog: false,
            errorSearchUser: false,
        });
    }
    async setNewUserToChat(deleteUser: boolean = false){
        if (!(this.children.inputDialogUser instanceof Input))
            return;
        const valid = !!(await this.children.inputDialogUser.checkValue());
        if (!valid)
            return;
        const value = this.children.inputDialogUser.getValue();
        if (!value?.value)
            return
        const searchUser = await UserController.searchUser(`${value.value}`);
        if (searchUser && Array.isArray(searchUser) && searchUser.length > 0)
        {
            const idUserToAdd = searchUser.find((el) => !!el)?.id;
            if (!idUserToAdd || !this.props?.id)
                return;
            const res = deleteUser ? await ChatController.deleteUsersFromChat(this.props?.id, [idUserToAdd]) : await ChatController.addUsersToChat(this.props?.id, [idUserToAdd]);
            if (res)
            {
                this.closeDialog();
            }
        }else
            this.props.errorSearchUser = true;

    }

    init() {
        this.children.messages = this.createMessages(this.props);
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
                click: () => this.setNewUserToChat(true)
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
                click: () => {
                    const input =this.children.inputMessage as Input;
                    const message = input.getValue();
                    if (!message?.value)
                        return
                    input.setValue('');

                    MessagesController.sendMessage(this.props.id, String(message.value));
                }
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
    public sendMessage(){
        return this.getMessage();
    }

    componentDidUpdate(_oldProps: ChatOpenItemProps, newProps: ChatOpenItemProps): boolean {
        this.children.messages = this.createMessages(newProps);
        return  true;
    }
    private createMessages(props: ChatOpenItemProps) {
        return props.messages.map(data => {
            return new Message({...data, isYourMessage: props.userId === data.user_id });
        })
    }
    render(): DocumentFragment | HTMLElement {
        if (this.element && !this.element?.classList.contains('chats-section'))
            this.element?.classList.add('chats-section');

        return this.compile(template, {...this.props});
    }
}
export const withOpenChat = withStore((state) => {
    if (!state.openedChat) {
        return {
            messages: [],
            openedChat: undefined,
            userId: state.user.id
        };
    }
    return {
        messages: (state.messages || {})[state.openedChat.id] || [],
        openedChat: state.openedChat,
        userId: state.user.id
    };
});
export const OpenedChat = withOpenChat(OpenedChatBase);