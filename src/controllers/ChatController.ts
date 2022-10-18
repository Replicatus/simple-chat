import store from '../utils/Store';
import API, {ChatApi, DataCreateChat} from "../api/ChatApi";
import {ChatItemProps, LastMessage} from "../components/chatItem";
import MessagesController from "./MessagesController";
import {UserProfile} from "../api/UserAPI";
import controller from "./MessagesController";
import {ServerChat} from "../pages/Main";

export function responseParser(res: XMLHttpRequest) {
    const response = JSON.parse(res.response);
    if (res.status >= 400) {
        throw new Error(response?.reason)
    }
    return response
}

class ChatController {
    private readonly api: ChatApi;

    constructor() {
        this.api = API;
    }

    async getChats(): Promise<ChatItemProps[] | undefined> {
        try {
            const res = await this.api.read();
            const chats: ChatItemProps[] = responseParser(res)?.map((el: ServerChat) => ({
                id: el.id,
                name: el.title,
                chosen: false,
                avatar: el.avatar,
                unreadCount: el.unread_count,
                lastMessage: el.last_message as LastMessage
            }));
            for (const chat of chats) {
                const tokenResponse = await this.getTokenChat(chat.id);
                if (!tokenResponse)
                    continue;
                await MessagesController.connect(chat.id, tokenResponse.token);
            }
            store.set('chats', chats)
            return chats
        } catch (e: any) {
            console.error('getChats ', e)
            store.set('chats.errorLoading', e.message)
        }
    }

    async createChat(data: DataCreateChat) {
        try {
            const res = await this.api.create(data);
            responseParser(res);
            await this.getChats()
        } catch (e: any) {
            console.error('createChat ', e)
            store.set('chats.errorCreate', e.message)
        }
    }

    async deleteChat(chatId: number) {
        try {
            const res = await this.api.delete(chatId);
            responseParser(res);
            controller.close(chatId);
            const newChats = store.getState().chats.filter((el: ChatItemProps) => el.id !== chatId);
            store.set('chats', newChats);
            store.set('openedChat', null);
        } catch (e: any) {
            console.error('deleteChat ', e)
            store.set('chats.errorDelete', e.message)
        }
    }

    async getChatUsers(chatId: number): Promise<UserProfile[] | undefined> {
        try {
            const res = await this.api.getChatUsers(chatId);
            return responseParser(res)
        } catch (e: any) {
            console.error('getChatUsers ', e)
            store.set('chats.errorGetChatUsers', e.message)
        }
    }

    async getNewMessagesCountsInChat(chatId: number): Promise<{
        unread_count: number
    } | undefined> {
        try {
            const res = await this.api.getNewMessagesCountsInChat(chatId);
            return responseParser(res)
        } catch (e: any) {
            console.error('getNewMessagesCountsInChat ', e)
            store.set('chats.errorGetNewMessagesCountsInChat', e.message)
        }
    }

    async getTokenChat(chatId: number): Promise<{
        token: string
    } | undefined> {
        try {
            const res = await this.api.getChatToken(chatId);
            return responseParser(res)
        } catch (e: any) {
            console.error('getTokenChat ', e)
            store.set('openedChat.errorGetTokenChat', e.message)
        }
    }

    async addUsersToChat(chatId: number, users: number[]): Promise<boolean | undefined> {
        try {
            const res = await this.api.addUsersToChat(chatId, users);
            return !!res
        } catch (e: any) {
            console.error('addUsersToChat ', e)
            store.set('openedChat.errorAddUsersToChat', e.message)
        }
    }

    async deleteUsersFromChat(chatId: number, users: number[]): Promise<boolean | undefined> {
        try {
            const res = await this.api.deleteUsersFromChat(chatId, users);
            return !!res
        } catch (e: any) {
            console.error('deleteUsersFromChat ', e)
            store.set('openedChat.errorDeleteUsersFromChat', e.message)
        }
    }

}

export default new ChatController()