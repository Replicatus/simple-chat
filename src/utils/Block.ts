import {EventBus} from "./EventBas";
import {nanoid} from "nanoid";

// Нельзя создавать экземпляр данного класса
class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };
    public id : string | null = nanoid(5);
    protected props : Record<string, unknown>;
    private eventBus: () => EventBus;
    private _element : HTMLElement | null = null;
    private children : Record<string, Block>;
    private readonly _meta :{ tagName: string, props: unknown, class?: string};

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", propsAndChildrens : unknown = {}) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildrensAndProps(propsAndChildrens);
        this._meta = {
            tagName,
            props
        };
        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _getChildrensAndProps(chAndProps){
        const props = {};
        const children = {};
        Object.entries(chAndProps).forEach(([key, value]) => {
            if (value instanceof Block){
                children[key] = value;
            }else {
                props[key] = value;
            }
        });
        return {children, props};
    }

    _createResources() {
        const { tagName, class : elementClass } = this._meta;
        this._element = this._createDocumentElement(tagName);
        this._element.classList.add(elementClass);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount(oldProps ?: unknown) {

    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response)
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
        this._removeEvents();
        this._element!.innerHTML = block;

        this._addEvents();
    }

    _addEvents() {
        const { events = {} } = this.props as {events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }
    // Переопределяется пользователем. Необходимо вернуть разметку
    render() : string {
        return  ''
    }

    protected compile(template: (context: unknown) => string, context: {}){
        const contextAndStubs = {...context};
        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`
        });
        return template(contextAndStubs);
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: Record<string, unknown>) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;
        const proxy = new Proxy(props, {
            get(target, property:string) {
                if (property.startsWith('_'))
                    throw new Error('Нет прав');
                else {
                    const value = target[property];
                    return (typeof value === 'function') ? value.bind(target) : value;
                }
            },
            set(target, property:string, value, receiver) {
                if (property.startsWith('_')) {
                    throw new Error("Нет прав");
                } else {
                    const oldTarget = {...target};
                    Reflect.set(target, property, value, receiver);
                    self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                    // target[property] = value;
                    return true;
                }
            },
            deleteProperty(target, property) {
                //if (property.startsWith('_')) {
                throw new Error("Нет прав");
                // } else {
                //     delete target[property];
                //     return true;
                // }
            },
        });
        // Здесь вам предстоит реализовать метод
        return proxy;
    }

    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}

export default Block;