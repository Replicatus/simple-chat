import store from '../utils/Store';
import API, {UserAPI, UserProfile, UserPassword} from "../api/UserAPI";
import {responseParser} from "./ChatController";

class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }
    public async getUser(id: number){
        try {
            const res = await this.api.read(String(id));
            const response = JSON.parse(res.response);
            if (res.status >= 400) {
                throw new Error(response?.reason)
            }
            return response;
        }catch (e) {
            console.error('getUser ', e)
        }
    }
    public async searchUser(search: string = ''){
        try {
            if (!search)
                throw new Error('Строка не может быть пустой')
            const res = await this.api.getSearchUser({
                login: `${search}`
            });
            return responseParser(res);
        }catch (e: any) {
            console.error('searchUser ', e)
            store.set('user.errorSearchUser', e.message);
            store.set('openedChat.errorSearchUser', e.message);
        }
    }

    public async updateProfile(data: UserProfile){
        try {
            const res = await this.api.updateProfile(data);
            const response = JSON.parse(res.response);
            if (res.status >= 400) {
                throw new Error(response?.reason)
            }
            store.set('user', response);
            return true
        }catch (e: any) {
            console.error('updateProfile ', e);
            store.set('user.errorUpdateProfile', e.message);
        }
    }
    public async updatePassword(data: UserPassword){
        try {
            const res = await this.api.updatePassword(data);
            const response = res.status >= 400 ? JSON.parse(res.response) : res.response;
            if (res.status >= 400) {
                throw new Error(response?.reason)
            }
            return true;
        }catch (e: any) {
            console.error('updatePassword ', e);
            store.set('user.errorUpdatePassword', e.message);
        }
    }
    public async updateAvatar(data: FormData){
        try {
            const res = await this.api.updateAvatar(data);
            const response = JSON.parse(res.response);
            if (res.status >= 400) {
                throw new Error(response?.reason)
            }
            // console.log(response.avatar)
            // debugger
            store.set('user', response);
            return response
        }catch (e: any) {
            console.error('updateAvatar ', e);
            store.set('user.errorUpdateAvatar', e.message);
        }
    }



}

export default new UserController();
