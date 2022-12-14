import API, {AuthAPI, SigninData, SignupData, User} from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import {Routes} from "../index";
import MessagesController from "./MessagesController";

class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    public async signin(data: SigninData) {
        try {
            const res = await this.api.signin(data);
            if (res.status >= 400) {
                throw new Error(JSON.parse(res.response)?.reason)
            }
            router.go('/settings');
        } catch (e: any) {
            console.error('signin ', e.message,)
            store.set('user.errorLogin', e.message);
        }
    }

    public async signup(data: SignupData) {
        try {
            const res = await this.api.signup(data);
            if (res.status >= 400)
                throw new Error(JSON.parse(res.response)?.reason)
            await this.fetchUser();

            router.go('/settings');
        } catch (e: any) {
            store.set('user.errorRegistration', e.message);
            console.error('signup ', e)
        }
    }

    public async fetchUser() {
        try {
            const res = await this.api.read();
            if (res.status >= 400)
                throw new Error(JSON.parse(res.response)?.reason)
            const user = JSON.parse(res.response) as User
            store.set('user', user);
        } catch (e) {
            console.error('fetchUser', e)
            switch (window.location.pathname) {
                case Routes.Index:
                case Routes.Register:
                    break;
                default: {
                    router.go('/');
                    break;
                }
            }
        }
    }

    public async logout() {
        try {
            MessagesController.closeAll();
            await this.api.logout();
            store.clearState()
            router.go('/');
        } catch (e: any) {
            console.error('logout ', e);
        }
    }

}

export default new AuthController();
