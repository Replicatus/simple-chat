import pages from "./pages";
import Router from './utils/Router';
import AuthController from "./controllers/AuthController";
import './assets/styles/index.sass'

export enum Routes {
    Index = '/',
    Register = '/sign-up',
    Profile = '/settings',
    Main = '/messenger',
    Page404 = '/404',
    Page500 = '/500',
}

window.addEventListener('DOMContentLoaded', async () => {

    Router
        .use(Routes.Index, pages.Login)
        .use(Routes.Register, pages.Register)
        .use(Routes.Profile, pages.Profile)
        .use(Routes.Main, pages.Main)
        .use(Routes.Page404, pages.Page404)
        .use(Routes.Page500, pages.Page500)
    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.Index:
        case Routes.Register:
            isProtectedRoute = false;
            break;
    }
    try {
        await AuthController.fetchUser();
        Router.start();
        if (!isProtectedRoute) {
            Router.go(Routes.Profile)
        }
    } catch (e) {
        Router.start();
        if (isProtectedRoute) {
            Router.go(Routes.Index);
        }
    }
});

