import {isEqual, set} from '../helpers';
import {EventBus} from './EventBas';
import {ComponentConstructable} from "../hocs/withRouter";
import {ChatOpenItemProps} from "../components/openedChat";
import {UserProfile} from "../api/UserAPI";
import {ChatItemProps} from "../components/chatItem";
import {Message} from "../controllers/MessagesController";

export enum StoreEvents {
    Updated = 'updated'
}
interface State {
    user: UserProfile;
    chats: ChatItemProps[];
    openedChat?: ChatOpenItemProps | null;
    messages: Record<number, Message[]>;
}

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
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

export function withStore(mapStateToProps: (state: State) => any) {

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
                    this.setProps({...stateProps});
                });
            }
        }

    }

}

export default store;
