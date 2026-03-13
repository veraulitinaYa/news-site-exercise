import { BaseComponent } from "./base-component.js";
import type { News, TNewsCardBanner, TNewsCardDetails, TNewsCardItem } from "../types/news.js";

type CardType = "banner" | "item" | "details";
type NewsCardData = TNewsCardBanner | TNewsCardItem | TNewsCardDetails;


export class NewsCard extends BaseComponent<NewsCardData> {
  protected cardVariant: CardType;
  protected cardId!: number;


  //общие элементы
  protected cardTitle!: HTMLElement;
  protected cardAnnounce!: HTMLElement;

  // для баннеров и деталей
    protected cardImage?: HTMLImageElement;

  // для айтема и деталей
    protected cardDate?: HTMLElement;

  //только для деталей
    protected cardContent?: HTMLElement;

    //кнопки
    protected detailsButton?: HTMLButtonElement;
    protected backButton?: HTMLButtonElement;

constructor(container: HTMLElement, cardTemplate: HTMLTemplateElement, cardVariantType: CardType) {
    super(container);
    

    this.cardVariant = cardVariantType;

    const cardElement = cardTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.container.append(cardElement);


    if (cardVariantType === "banner") {
      this.cardImage = cardElement.querySelector(".news-card_image")!;
      this.cardTitle = cardElement.querySelector(".news-card-title")!;
    }

    if (cardVariantType === "item") {
      this.cardTitle = cardElement.querySelector(".news-card-title")!;
      this.cardAnnounce = cardElement.querySelector(".news-card-announce")!;
      this.cardDate = cardElement.querySelector(".news-card-date")!;
      this.detailsButton = cardElement.querySelector(".news-card-details-button")!;
    }

    if (cardVariantType === "details") {
      this.cardImage = cardElement.querySelector(".news-card_image")!;
      this.cardTitle = cardElement.querySelector(".news-card-title")!;
      this.cardAnnounce = cardElement.querySelector(".news-card-announce")!;
      this.cardDate = cardElement.querySelector(".news-card-date")!;
      this.cardContent = cardElement.querySelector(".news-card_content")!;

      this.backButton = cardElement.querySelector(".news-card_back_button")!;
    }
  }

setData (newsData: NewsCardData) {
  this.cardId = newsData.id;
this.cardTitle.textContent = newsData.title;
    if (this.cardAnnounce && "announce" in newsData) {
      this.cardAnnounce.innerHTML = newsData.announce;
    }

    if (this.cardDate && "date" in newsData) {
      this.cardDate.textContent = new Date(newsData.date).toLocaleDateString();
    }

    if (this.cardImage && "image" in newsData) {
      this.cardImage.src = newsData.image;
    }

    if (this.cardContent && "content" in newsData) {
      this.cardContent.innerHTML = newsData.content;
    }
  }

 set onDetailsClick(handler: (id: number) => void) {
    if (this.detailsButton) {
      this.detailsButton.addEventListener("click", () => handler(this.cardId));
    }
  }

  set onBackClick(handler: () => void) {
    if (this.backButton) {
      this.backButton.addEventListener("click", handler);
    }
  }

  get id() {
    return this.cardId;
  }
}

