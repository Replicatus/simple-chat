import Block from "./Block";

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

export interface BlockConstructable<P = any> {
    new(tag: string, props: P): Block<P>;
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
    private readonly _blockClass: BlockConstructable;
    private _block: Block | null;
    private readonly _props: Record<string, any>;

    constructor(pathname: string, view: BlockConstructable, props: { rootQuery: any; }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    // navigate(pathname: string) {
    //     if (this.match(pathname)) {
    //         this._pathname = pathname;
    //         this.render();
    //     }
    // }

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
            this._block = new this._blockClass('div', {withoutWrapper: true});
            render(this._props.rootQuery, this._block);
            return;
        }
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

    public use(pathname: string, block: BlockConstructable) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    public start() {
        window.onpopstate = (event) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route)
            return;
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    public go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    private getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router('#app')