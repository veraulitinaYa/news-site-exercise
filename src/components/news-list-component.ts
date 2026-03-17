import { BaseComponent } from "./base-component.js";
import { NewsCard } from "./news-card-component.js";
import type { TNewsCardItem } from "../types/news.js";

export class NewsList extends BaseComponent<TNewsCardItem[]> {

private cardsToShow: NewsCard[] = [];
private cardTemplate: HTMLTemplateElement;
private listTemplate: HTMLTemplateElement;

  constructor(container: HTMLElement, template: HTMLTemplateElement, ltemplate: HTMLTemplateElement) {
    super(container);
    this.cardTemplate = template;
    this.listTemplate = ltemplate;
  }
  override render(data?: Partial<TNewsCardItem[]>): HTMLElement {

    const newsCardArray = data as TNewsCardItem[];

        

    
 this.container.innerHTML = "";
const titleElement = this.listTemplate.content.firstElementChild!.cloneNode(true);
this.container.append(titleElement);
     this.cardsToShow = [];

newsCardArray.forEach((newsCardItem) => {
      const card = new NewsCard(this.container, this.cardTemplate, "item");
      card.setData(newsCardItem);

     card.onDetailsClick = (id: number) => {
        console.log("Клик по кнопке:",id);
      }

      card.onCardItemClick = (id: number) => {
        console.log("Клик по карточке:",id);
      }
      this.cardsToShow.push(card);
     

    

    });

    return this.container;
  }

   

  getCards() {
    return this.cardsToShow;
  }

}