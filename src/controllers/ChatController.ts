import store from '../utils/Store';
import API, {ChatApi, DataCreateChat} from "../api/ChatApi";
import {ChatItemProps} from "../components/chatItem";


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
    async getChats(){
        try {
            const res = await this.api.read();
            const response = responseParser(res);
            store.set('chats', response)
            return response
        }catch (e: any) {
            console.error('getChats ',e)
            store.set('chats.errorLoading', e.message)
        }
    }
    async createChat(data: DataCreateChat){
        try {
            const res = await this.api.create(data);
            const response = responseParser(res);
            store.set('chats', response);
        }catch (e: any) {
            console.error('createChat ',e)
            store.set('chats.errorCreate', e.message)
        }
    }
    async deleteChat(chatId: number){
        try {
            const res = await this.api.delete(chatId);
            const response = responseParser(res);
            const newChats = store.getState().chats.filter((el: ChatItemProps) => el.id !== chatId);
            store.set('chats', newChats);
            return response
        }catch (e: any) {
            console.error('deleteChat ',e)
            store.set('chats.errorDelete', e.message)
        }
    }
    async getChatUsers(chatId: number){
        try {
            const res = await this.api.getChatUsers(chatId);
            return responseParser(res)
        }catch (e: any) {
            console.error('getChatUsers ',e)
            store.set('chats.errorGetChatUsers', e.message)
        }
    }

    async getNewMessagesCountsInChat(chatId: number){
        try {
            const res = await this.api.getNewMessagesCountsInChat(chatId);
            return responseParser(res)
        }catch (e: any) {
            console.error('getNewMessagesCountsInChat ',e)
            store.set('chats.errorGetNewMessagesCountsInChat', e.message)
        }
    }
    async getTokenChat(chatId: number){
        try {
            const res = await this.api.getChatToken(chatId);
            return responseParser(res)
        }catch (e: any) {
            console.error('getTokenChat ',e)
            store.set('chats.errorGetTokenChat', e.message)
        }
    }
    async addUsersToChat(chatId: number, users: number[]){
        try {
            const res = await this.api.addUsersToChat(chatId, users);
            return responseParser(res)
        }catch (e: any) {
            console.error('addUsersToChat ',e)
            store.set('chats.errorAddUsersToChat', e.message)
        }
    }
    async deleteUsersFromChat(chatId: number, users: number[]){
        try {
            const res = await this.api.deleteUsersFromChat(chatId, users);
            return responseParser(res)
        }catch (e: any) {
            console.error('deleteUsersFromChat ',e)
            store.set('chats.errorDeleteUsersFromChat', e.message)
        }
    }

}

export default new ChatController()