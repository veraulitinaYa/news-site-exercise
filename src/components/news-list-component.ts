import { BaseComponent } from "./base-component.js";
import { NewsCard } from "./news-card-component.js";
import type { TNewsCardItem } from "../types/news.js";

export class NewsList extends BaseComponent<TNewsCardItem[]> {

private cardsToShow: NewsCard[] = [];
private cardTemplate: HTMLTemplateElement;

  constructor(container: HTMLElement, template: HTMLTemplateElement) {
    super(container);
    this.cardTemplate = template;
  }
  override render(data?: Partial<TNewsCardItem[]>): HTMLElement {

    const newsCardArray = data as TNewsCardItem[];

        

    
 this.container.innerHTML = "";
     this.cardsToShow = [];

newsCardArray.forEach((newsCardItem) => {
      const card = new NewsCard(this.container, this.cardTemplate, "item");
      card.setData(newsCardItem);

     card.onDetailsClick = (id: number) => {
        console.log("Переход на страницу новости с id:",id);
      }
      this.cardsToShow.push(card);
     

    

    });

    return this.container;
  }

   

  getCards() {
    return this.cardsToShow;
  }

}