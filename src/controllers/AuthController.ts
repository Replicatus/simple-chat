import API, {AuthAPI, SigninData, SignupData, User} from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import {Routes} from "../index";

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
            // console.log('res', res.response)
            const user = JSON.parse(res.response) as User
            console.log('user', user)
            store.set('user', user);
        } catch (e) {
            switch (window.location.pathname) {
                case Routes.Index:
                case Routes.Register:
                {
                    console.error('!!!', e)
                    break;
                }
                default: {
                    console.error(222, e)
                    router.go('/');
                    break;
                }
            }
        }
    }

    public async logout() {
        try {
            await this.api.logout();
            router.go('/');
        } catch (e: any) {
            console.error('logout ', e);
        }
    }

}

export default new AuthController();
