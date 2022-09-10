import {Page404} from "./400"
import {Page500} from "./500"
import {Main} from "./Main"
import {Profile} from "./Profile"
import {Register} from "./Register"
import {Login} from "./Login"


const pages: Record<string, any> = {
    Page404,
    Page500,
    "": Main,
    Profile,
    Register,
    Login
};
export default pages;