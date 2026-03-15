import { BaseComponent } from "./base-component.js";
export class Header extends BaseComponent {
    constructor(container, template) {
        super(container);
        const element = template.content.firstElementChild.cloneNode(true);
        this.headerElement = element;
        this.logoElement = element.querySelector(".header-logo");
        this.container.append(element);
    }
    set logoImagePath(src) {
        this.logoElement.src = src;
    }
    set isBorderShown(value) {
        this.container;
        this.headerElement.classList.toggle("header-body--border", value);
    }
}
