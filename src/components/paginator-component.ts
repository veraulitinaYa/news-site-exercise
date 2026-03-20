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

      const pageLink = document.createElement("button");
      pageLink.textContent = i.toString();
 pageLink.classList.add("page-number");


      if (i === this.currentPage) {
        pageLink.classList.add("currentPage");
      }

      pageLink.addEventListener("click", (event) => {

        this.currentPage = i;

        this.render();

        if (this.pageNumberClickHandler) {
          this.pageNumberClickHandler(i);
        }
      });

      this.container.append(pageLink);
    }

    

      const nextButton = document.createElement("button");
 nextButton.classList.add("next-button");
          nextButton.innerHTML = `
      <svg width="24" height="22" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10C2.44772 10 2 10.4477 2 11C2 11.5523 2.44772 12 3 12L3 11L3 10ZM18.466 11.7071C18.8565 11.3166 18.8565 10.6834 18.466 10.2929L12.102 3.92893C11.7115 3.53841 11.0783 3.53841 10.6878 3.92893C10.2973 4.31946 10.2973 4.95262 10.6878 5.34315L16.3447 11L10.6878 16.6569C10.2973 17.0474 10.2973 17.6805 10.6878 18.0711C11.0783 18.4616 11.7115 18.4616 12.102 18.0711L18.466 11.7071ZM3 11L3 12L17.7589 12L17.7589 11L17.7589 10L3 10L3 11Z"
        fill="currentColor"/>
      </svg>
    `;

if (this.currentPage === this.pagesCount) {
  nextButton.style.visibility = "hidden";
} else {
      nextButton.style.visibility = "visible";
    }


      nextButton.addEventListener("click", () => {

        this.currentPage++;

        this.render();

        if (this.pageNumberClickHandler) {
          this.pageNumberClickHandler(this.currentPage);
        }
      });

       this.container.append(nextButton);
    

    return this.container;
  }

  goToPage(page: number) {

    if (page < 1 || page > this.pagesCount) {
      return;
    }

    this.currentPage = page;

    this.render();

    if (this.pageNumberClickHandler) {
      this.pageNumberClickHandler(page);
    }
  }
}