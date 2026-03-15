import { Header } from "./components/header-component.js";
import { NewsCard } from "./components/news-card-component.js";
import GetNewsService from "./service/get-news-service.js";
import NewsModel from "./model/news-model.js";
import { NewsList } from "./components/news-list-component.js";
import { Paginator } from "./components/paginator-component.js";
import { Footer } from "./components/footer-component.js";
import { News } from "./types/news.js";

const headerContainer = document.querySelector(
  "#header-container",
) as HTMLElement;
const headerTemplate = document.querySelector(
  "#header-template",
) as HTMLTemplateElement;
const footerContainer = document.querySelector("#footer") as HTMLElement;
const footerTemplate = document.querySelector(
  "#footer-template",
) as HTMLTemplateElement;
const bannerContainer = document.querySelector(
  "#banner-section",
) as HTMLElement;
const newsListContainer = document.querySelector(
  "#news-list-page-section",
) as HTMLElement;
const paginatorContainer = document.querySelector(
  "#paginator-section",
) as HTMLElement;
const bannerTemplate = document.querySelector("#news-card-banner-template") as HTMLTemplateElement;
const itemTemplate = document.querySelector(
  "#news-card-item-template",
) as HTMLTemplateElement;


const logoImagePathString = "./src/data/images/logo/logo-with-text.svg";
const footerCopyrightTestString = "© 2023 — 2412 «Галактический вестник»";

const header = new Header(headerContainer, headerTemplate);
const footer = new Footer(footerContainer, footerTemplate);

// const container = document.querySelector("#news-item-test-container") as HTMLElement;
// const listcontainer = document.querySelector("#news-list-test-container") as HTMLElement;
// const listTemplate = document.querySelector(
//   "#news-list-template",
// ) as HTMLTemplateElement;

// const detailsContainer = document.querySelector("#news-card-detailed-test-container") as HTMLElement;

// const bannerContainer = document.querySelector("#news-card-banner-test-container") as HTMLElement;
// const paginatorContainer = document.querySelector(
//   "#paginator-test-container"
// ) as HTMLElement;

header.render({
  logoImagePath: logoImagePathString,
  isBorderShown: false,
});

footer.render({
  copyrightText: footerCopyrightTestString,
});

async function showPaginator() {
  const newsModel = new NewsModel(new GetNewsService());
  const pages = await newsModel.getPaginationData(1, 4);
  const paginator = new Paginator(paginatorContainer);
  paginator.setPagesCount(pages.length);
  paginator.onPageNumberClick = (page) => {
    const clickedNewsArray = pages[page - 1];
    showBanner(clickedNewsArray[0]);
    showNewsPage(pages[page - 1]);
  }
  paginator.render();
  paginator.goToPage(1);
}

function showNewsPage(selectedNewsArray: News[]) {
   newsListContainer.innerHTML = ""; 
  const newsList = new NewsList(newsListContainer, itemTemplate);
  newsList.render(selectedNewsArray);
}

function showBanner (newsItemBanner: News) {
  bannerContainer.innerHTML = "";
  const banner = new NewsCard(bannerContainer, bannerTemplate, "banner");
  banner.setData(newsItemBanner);
}

// const template = document.querySelector(
//   "#news-card-item-template",
// ) as HTMLTemplateElement;

// const templateBanner = document.querySelector(
//   "#news-card-banner",
// ) as HTMLTemplateElement;

// const templateDetailed = document.querySelector(
//   "#news-card-detailed",
// ) as HTMLTemplateElement;

// async function showTestCard() {
//   const card = new NewsCard(container, template, "item");

//   const newsModel = new NewsModel(new GetNewsService());

//   const news = await newsModel.getNewsById(1);

//   card.setData(news);
//  // card.render();
// }

// async function showTestCardList() {
// const newsModel = new NewsModel(new GetNewsService());

// const news = await newsModel.getAllNews();

// const newsList = new NewsList(listcontainer, template);
// newsList.render(news);

// }

// async function showTestDetailedCard(){
//    const card = new NewsCard(detailsContainer, templateDetailed, "details");

//   const newsModel = new NewsModel(new GetNewsService());

//   const news = await newsModel.getNewsById(1);

//   card.setData(news);
// }

// async function showTestBannerCard(){
//    const card = new NewsCard(bannerContainer, templateBanner, "banner");

//   const newsModel = new NewsModel(new GetNewsService());

//   const news = await newsModel.getNewsById(1);

//   card.setData(news);
// }

// showTestCard();
// showTestCardList();
// showTestDetailedCard();
// showTestBannerCard();
showPaginator();
