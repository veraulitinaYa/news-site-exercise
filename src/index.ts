import { Header } from "./components/header-component.js";
import { NewsCard } from "./components/news-card-component.js";
import GetNewsService from "./service/get-news-service.js";
import NewsModel from "./model/news-model.js";

const headerContainer = document.querySelector(
  "#header-container",
) as HTMLElement;
const headerTemplate = document.querySelector(
  "#header-template",
) as HTMLTemplateElement;

const header = new Header(headerContainer, headerTemplate);
const container = document.querySelector("#news-card-test-container") as HTMLElement;

header.render({
  logoImagePath: "./src/data/images/logo/logo-with-text.svg",
  isBorderShown: false,
});

const template = document.querySelector(
  "#news-card-item-template",
) as HTMLTemplateElement;



async function showTestCard() {
  const card = new NewsCard(container, template, "item");

  const newsModel = new NewsModel(new GetNewsService());

  const news = await newsModel.getNewsById(1);

  card.setData(news);
 // card.render();
}

showTestCard();