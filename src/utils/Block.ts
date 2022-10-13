import {EventBus} from "./EventBas";
import {nanoid} from "nanoid";


type Children = Record<string, Block | Block[]>;
// Нельзя создавать экземпляр данного класса
class Block<P extends Record<string, any> = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const;
    public id: string | null = nanoid(6);
    protected props: P;
    protected eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    public children: Children;
    private readonly _meta: { tagName: string, props: P, class?: string };

    /** JSDoc
     * @param {string} tagName
     * @param propsAndChildrens
     *
     * @returns {void}
     */
    constructor(tagName = "div", propsAndChildrens: P) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildrensAndProps(propsAndChildrens);
        this._meta = {
            tagName,
            props: props as P
        };
        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _getChildrensAndProps(chAndProps: P) : {props: P, children: Children} {
        const props: Record<string, unknown> = {};
        const children: Children = {};
        Object.entries(chAndProps).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length && value.every(v => v instanceof Block)) {
                children[key] = value;
            } else if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });
        return {children, props: props as P};
    }

    _createResources() {
        const {tagName} = this._meta;
        // if (!this.props.withoutWrapper)
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    // @ts-ignore
    public componentDidMount(oldProps ?: unknown) {

    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps))
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected componentDidUpdate(_oldProps: P, _newProps: P): boolean {
        return true//!isEqual(oldProps, newProps);
    }

    setProps = (nextProps: unknown) => {
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

        if (this._element) {
            this._removeEvents();

            if (this.props.withoutWrapper) {
                this._element = block.firstElementChild as HTMLElement;
            } else
            {
                this._element.innerText = '';
                this._element.append(block);
            }
            this._addEvents();
        } else
            throw new Error(`_element doesn\'t exist ${this._element}`)
    }

    _addEvents() {
        const {events = {}} = this.props as P & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            if (this._element instanceof HTMLElement)
                this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const {events = {}} = this.props as P &  { events: Record<string, () => void> };
        Object.keys(events).forEach(eventName => {
            if (this._element instanceof HTMLElement)
                this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    render(): DocumentFragment | HTMLElement {
        return new DocumentFragment()
    }

    protected compile(template: (context: any) => string, context: any): HTMLElement | DocumentFragment {
        const contextAndStubs: Record<string, any> = {...context};
        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(el => `<div data-id="${el.id}"></div>`);
            } else
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`
        });
        const html = template(contextAndStubs);
        const bufTemplate = document.createElement('template');
        bufTemplate.innerHTML = html;
        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach((el: Block) => {
                    const stub = bufTemplate.content.querySelector(`[data-id="${el.id}"]`);
                    if (!stub)
                        return;
                    stub.replaceWith(el.getContent()!);
                })
            } else {
                const stub = bufTemplate.content.querySelector(`[data-id="${component.id}"]`);
                if (!stub)
                    return;
                // stub.append(component.getContent());
                stub.replaceWith(component.getContent()!);
            }
        });
        return bufTemplate.content;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: P) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;
        return new Proxy(props, {
            get(target, property: string) {
                if (property.startsWith('_'))
                    throw new Error('Нет прав');
                else {
                    const value = target[property];
                    return (typeof value === 'function') ? value.bind(target) : value;
                }
            },
            set(target, property: string, value, receiver) {
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
            deleteProperty(_, __) {
                throw new Error("Нет прав");
            },
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        const item = this.getContent();
        if (item)
            item.style.display = "block";
    }

    hide() {
        const item = this.getContent();
        if (item)
            item.style.display = "none";
    }
}

export default Block;