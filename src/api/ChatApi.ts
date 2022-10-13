import BaseAPI from "./BaseAPI";

export interface DataCreateChat {
    title: string | number
}

export interface ChatUser {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
    role: string
}

export class ChatApi extends BaseAPI {
    constructor() {
        super('/chats');
    }

    read() {
        return this.http.get('');
    }

    create(data: DataCreateChat) {
        return this.http.post('', {data: data})
    }

    delete(chatId: number) {
        return this.http.delete('', {
            data: {
                "chatId": chatId
            }
        });
    }

    getChatUsers(chatId: number) {
        return this.http.get(`${chatId}/users`);
    }

    getChatToken(chatId: number) {
        return this.http.post(`/token/${chatId}`);
    }

    getNewMessagesCountsInChat(chatId: number) {
        return this.http.get(`/new/${chatId}`);
    }

    addUsersToChat(chatId: number, users: number[]) {
        return this.http.put('/users', {
            data: {
                "users": users,
                "chatId": chatId
            }
        })
    }

    deleteUsersFromChat(chatId: number, users: number[]) {
        return this.http.delete('/users', {
            data: {
                "users": users,
                "chatId": chatId
            }
        })
    }

    update = undefined;
}

export default new ChatApi()