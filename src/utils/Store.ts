import {isEqual, set} from '../helpers';
import {EventBus} from './EventBas';
import {ComponentConstructable} from "../hocs/withRouter";

export enum StoreEvents {
    Updated = 'updated'
}

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
        // debugger
        set(this.state, keypath, data);
        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
    public clearState(){
        this.state = {}
    }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {

    return function wrap(Component: ComponentConstructable<any>): ComponentConstructable<any> {



        return class WithStore extends Component {

            constructor(props: any) {
                let previousState: any;
                previousState = mapStateToProps(store.getState());

                super({...props, ...previousState});

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());

                    if (isEqual(previousState, stateProps))
                        return;
                    previousState = stateProps;
                    // console.log('!',stateProps?.errorLogin)
                    this.setProps({...stateProps});
                });
            }
        }

    }

}

export default store;
