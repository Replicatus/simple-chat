import { Message as MessageInfo } from "../../controllers/MessagesController";
export interface ChatOpenItemProps {
    id: number;
    chatName: string;
    callParentMethodFiles: Function;
    callParentMethodSend: Function;
    buttonSend?: null;
    events?: {};
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
    messages: MessageInfo[];
}
export declare const withOpenChat: (Component: import("../../hocs/withRouter").ComponentConstructable<any>) => import("../../hocs/withRouter").ComponentConstructable<any>;
export declare const OpenedChat: import("../../hocs/withRouter").ComponentConstructable<any>;
