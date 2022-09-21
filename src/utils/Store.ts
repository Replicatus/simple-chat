import {isEqual, set} from '../helpers';
import {EventBus} from './EventBas';
import {ComponentConstructable} from "../hocs/withRouter";

export enum StoreEvents {
    Updated = 'updated'
}

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);
        // debugger
        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {

    return function wrap(Component: ComponentConstructable<any>): ComponentConstructable<any> {
        let previousState: any;


        return class WithStore extends Component {

            constructor(props: any) {

                previousState = mapStateToProps(store.getState());

                super({...props, ...previousState});

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());

                    if (isEqual(previousState, stateProps))
                        return;
                    previousState = stateProps;
                    console.log('!',stateProps?.errorLogin)
                    this.setProps({...stateProps});
                });
            }
        }

    }

}

export default store;
