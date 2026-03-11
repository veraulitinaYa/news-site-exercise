import { BaseComponent } from "./base-component.js";
import { HeaderData } from "../types/components";

export class Header extends BaseComponent<HeaderData> {
  private headerElement: HTMLElement;
  private logoElement: HTMLImageElement;

  constructor(container: HTMLElement, template: HTMLTemplateElement) {
    super(container);

    const element = template.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;

    this.headerElement = element;
    this.logoElement = element.querySelector(".header_logo")!;

    this.container.append(element);
  }

  set logoImagePath(src: string) {
    this.logoElement.src = src;
  }

  set isBorderShown(value: boolean) {
    this.container;
    this.headerElement.classList.toggle("header_body--border", value);
  }
}
