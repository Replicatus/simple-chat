class EventBus {
    private readonly listeners : {};
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: Function) {
        if (Array.isArray(this.listeners[event])){
            this.listeners[event].push(callback);
        }
        else
        {
            this.listeners[event] = [];
            this.listeners[event].push(callback);
        }
    }

    off(event: string, callback: Function) {
        if (!this.listeners[event])
            throw new Error(`Нет события: ${event}`);
        this.listeners[event] = this.listeners[event].filter(fn => fn !== callback);
    }

    emit(event: string, ...args) {
        if (!this.listeners[event])
            throw new Error(`Нет события: ${event}`);
        this.listeners[event].forEach(callback => callback(...args));
    }
}

export {EventBus};