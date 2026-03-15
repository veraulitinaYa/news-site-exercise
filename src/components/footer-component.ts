import { BaseComponent } from "./base-component.js";
import type { FooterData } from "../types/components.js";

export class Footer extends BaseComponent<FooterData> {
    private footerElement: HTMLElement;
    private copyrightElement: HTMLElement;

     constructor(container: HTMLElement, template: HTMLTemplateElement) {
    super(container);

    const element = template.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;

    this.footerElement = element;
    this.copyrightElement = element.querySelector(".copyright_info")!;

    this.container.append(element);
     }
      override render(data?: Partial<FooterData>): HTMLElement {
    super.render(data);

    if (data?.copyrightText) {
      this.copyrightElement.textContent = data.copyrightText;
    }

    return this.container;
  }
}
  