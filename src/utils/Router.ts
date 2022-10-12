import Block from "./Block";

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}
function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if (root === null) {
        throw new Error(`root not found by selector "${query}"`);
    }

    root.innerHTML = '';

    root.append(block.getContent()!);

    return root;
}

class Route {
    private _pathname: string = '';
    private readonly _blockClass: typeof Block;
    private _block: Block | null;
    private readonly _props: Record<string, any>;

    constructor(pathname: string, view: typeof Block<any>, props: { rootQuery: any; }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block = null;
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass('div',{withoutWrapper: true});
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private _currentRoute: Route | null = null;
    private history = window.history;
    private readonly _rootQuery: string = '';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route)
            return;
        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
export default new Router('#app')