import {Page404} from "./400"
import {Page500} from "./500"
import {Main} from "./Main"
import {Profile} from "./Profile"
import ProfileChange from "./ProfileChange.hbs"
import ProfileChangePassword from "./ProfileChangePassword.hbs"
import ChangeAvatar from "./ChangeAvatar.hbs"
import Register from "./Register.hbs"
import Login from "./Login.hbs"


const pages: Record<string, any> = {
    Page404,
    Page500,
    "": Main,
    Profile,
    ProfileChange,
    ProfileChangePassword,
    ChangeAvatar,
    Register,
    Login
};
export default pages;