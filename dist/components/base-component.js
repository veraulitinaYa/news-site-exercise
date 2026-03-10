export class BaseComponent {
    constructor(container) {
        this.container = container;
    }
    get element() {
        return this.container;
    }
    render(data) {
        Object.assign(this, data !== null && data !== void 0 ? data : {});
        return this.container;
    }
}
