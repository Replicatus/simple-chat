import BaseAPI from "./BaseAPI";

export interface UserProfile {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    email: string;
    phone: string;
    avatar?: string;
}

export interface UserPassword {
    oldPassword: string;
    newPassword: string;
}

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    read(id: string) {
        return this.http.get(`/${id}`);
    }

    getSearchUser(data: { login: string }) {
        return this.http.post('/search', {data})
    }

    updateProfile(data: UserProfile) {
        return this.http.put('/profile', {data})
    }

    updatePassword(data: UserPassword) {
        return this.http.put('/password', {data})
    }

    updateAvatar(data: FormData) {
        return this.http.put('/profile/avatar', {data})
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}

export default new UserAPI();