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
const newsContainer = document.querySelector(
  "#news-section",
) as HTMLElement;
const paginatorContainer = document.querySelector(
  "#paginator-section",
) as HTMLElement;
const bannerTemplate = document.querySelector("#news-card-banner-template") as HTMLTemplateElement;
const itemTemplate = document.querySelector(
  "#news-card-item-template",
) as HTMLTemplateElement;
const detailsTemplate = document.querySelector(
  "#news-card-detailed-template",
) as HTMLTemplateElement;
const newsListTemplate = document.querySelector(
  "#news-list-template",
) as HTMLTemplateElement;
const breadcrumbsTemplate = document.querySelector(
  "#breadcrumbs-template",
) as HTMLTemplateElement;
  


const logoImagePathString = "./src/data/images/logo/logo-with-text.svg";
const footerCopyrightTestString = "© 2023 — 2412 «Галактический вестник»";

const header = new Header(headerContainer, headerTemplate);
const footer = new Footer(footerContainer, footerTemplate);

header.render({
  logoImagePath: logoImagePathString,
  isBorderShown: false,
});

footer.render({
  copyrightText: footerCopyrightTestString,
});

async function showPaginator(pageToOpen: number = 1) {
  header.isBorderShown = false;
  const newsModel = new NewsModel(new GetNewsService());
  const pages = await newsModel.getPaginationData(1, 4);
  const paginator = new Paginator(paginatorContainer);
  paginator.setPagesCount(pages.length);
  paginator.onPageNumberClick = (page) => {
    const clickedNewsArray = pages[page - 1];
    showBanner(pages[0][0]);
    showNewsPage(clickedNewsArray, page);
  }
  paginator.render();
  

  paginator.goToPage(pageToOpen);
    const clickedNewsArray = pages[pageToOpen - 1];
  showBanner(pages[0][0]);
  showNewsPage(clickedNewsArray, pageToOpen);

}

function showNewsPage(selectedNewsArray: News[], currentPage: number) {
   newsContainer.innerHTML = ""; 
  const newsList = new NewsList(newsContainer, itemTemplate, newsListTemplate);
  newsList.render(selectedNewsArray);

  newsList.getCards().forEach((card) => {
    card.onDetailsClick = (id: number) => {
      showNewsDetailsPage(id, currentPage);
    };
    card.onCardItemClick = (id: number) => {
      showNewsDetailsPage(id, currentPage);
    }
  })
}

function showBanner (newsItemBanner: News) {
  bannerContainer.innerHTML = "";
  const banner = new NewsCard(bannerContainer, bannerTemplate, "banner");
  banner.setData(newsItemBanner);
}

async function showNewsDetailsPage (newsId: number, accessedFromPage: number) {
  header.isBorderShown = true;
  const newsModel = new NewsModel(new GetNewsService());
  const news = await newsModel.getNewsById(newsId);

const breadcrumbs = breadcrumbsTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;

  bannerContainer.innerHTML = "";
  newsContainer.innerHTML = "";
  paginatorContainer.innerHTML = "";

 const homeLink = breadcrumbs.querySelector(".breadcrumbs-previous-page")!;
  const current = breadcrumbs.querySelector(".breadcrumbs-current-news")!;

  current.textContent = news.title;

  homeLink.addEventListener("click", () => {
    showPaginator(accessedFromPage);
  });

  newsContainer.append(breadcrumbs);

  const detailsCard = new NewsCard(
    newsContainer,
    detailsTemplate,
    "details"
  );

  detailsCard.setData(news);

  detailsCard.onBackClick = () => {
    showPaginator(accessedFromPage);
  };
}


showPaginator();
