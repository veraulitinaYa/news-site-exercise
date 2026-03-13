import { Header } from "./components/header-component.js";
import { NewsCard } from "./components/news-card-component.js";
import GetNewsService from "./service/get-news-service.js";
import NewsModel from "./model/news-model.js";
import { NewsList } from "./components/news-list-component.js";

const headerContainer = document.querySelector(
  "#header-container",
) as HTMLElement;
const headerTemplate = document.querySelector(
  "#header-template",
) as HTMLTemplateElement;


//TODO нужно отрефакторить переменные-------------------------------------------------------
const header = new Header(headerContainer, headerTemplate);
const container = document.querySelector("#news-item-test-container") as HTMLElement;
const listcontainer = document.querySelector("#news-list-test-container") as HTMLElement; 
const listTemplate = document.querySelector(
  "#news-list-template",
) as HTMLTemplateElement;

const detailsContainer = document.querySelector("#news-card-detailed-test-container") as HTMLElement;

const bannerContainer = document.querySelector("#news-card-detailed-test-container") as HTMLElement;

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

async function showTestCardList() {
const newsModel = new NewsModel(new GetNewsService());

const news = await newsModel.getAllNews();

const newsList = new NewsList(listcontainer, template);
newsList.render(news);

}

async function showTestDetailedCard(){
   const card = new NewsCard(detailsContainer, template, "details");

  const newsModel = new NewsModel(new GetNewsService());

  const news = await newsModel.getNewsById(1);

  card.setData(news);
}

async function showTestBannerCard(){
   const card = new NewsCard(bannerContainer, template, "banner");

  const newsModel = new NewsModel(new GetNewsService());

  const news = await newsModel.getNewsById(1);

  card.setData(news);
}


showTestCard();
showTestCardList();
showTestDetailedCard();
showTestBannerCard();