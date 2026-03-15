import { BaseComponent } from "./base-component.js";

export class Paginator extends BaseComponent<number> {

  private pagesCount = 0;
  private currentPage = 1;

  private pageNumberClickHandler?: (page: number) => void;

  constructor(container: HTMLElement) {
    super(container);
  }

  setPagesCount(count: number) {
    this.pagesCount = count;
  }

  set onPageNumberClick(handler: (page: number) => void) {
    this.pageNumberClickHandler = handler;
  }

  render(): HTMLElement {

    this.container.innerHTML = "";

    for (let i = 1; i <= this.pagesCount; i++) {

      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.textContent = i.toString();

      if (i === this.currentPage) {
        pageLink.classList.add("currentPage");
      }

      pageLink.addEventListener("click", (event) => {
        event.preventDefault();

        this.currentPage = i;

        this.updateCurrentPage();

        if (this.pageNumberClickHandler) {
          this.pageNumberClickHandler(i);
        }
      });

      this.container.append(pageLink);
    }

    return this.container;
  }

  private updateCurrentPage() {

    const links = this.container.querySelectorAll("a");

    links.forEach((link, index) => {
      link.classList.toggle("currentPage", index + 1 === this.currentPage);
    });

  }

  goToPage(page: number) {

    if (page < 1 || page > this.pagesCount) {
      return;
    }

    this.currentPage = page;

    this.updateCurrentPage();

    if (this.pageNumberClickHandler) {
      this.pageNumberClickHandler(page);
    }
  }
}