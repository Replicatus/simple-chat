import Block from '../utils/Block';
import Router from '../utils/Router';

export interface ComponentConstructable<P extends Record<string, any>> {
    new(props: P): Block<P>
}

export function withRouter(Component: ComponentConstructable<any>): ComponentConstructable<any> {
    type Props = typeof Component extends ComponentConstructable<infer P> ? P : any;

    return class WithRouter extends Component {
        constructor(props: Props & PropsWithRouter) {
            super({...props, withoutWrapper: true, router: Router});
        }
    }
}

export interface PropsWithRouter {
    router: typeof Router;
}
