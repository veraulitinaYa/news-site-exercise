var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Header } from "./components/header-component.js";
import { NewsCard } from "./components/news-card-component.js";
import GetNewsService from "./service/get-news-service.js";
import NewsModel from "./model/news-model.js";
import { NewsList } from "./components/news-list-component.js";
import { Paginator } from "./components/paginator-component.js";
import { Footer } from "./components/footer-component.js";
const headerContainer = document.querySelector("#header-container");
const headerTemplate = document.querySelector("#header-template");
const footerContainer = document.querySelector("#footer");
const footerTemplate = document.querySelector("#footer-template");
const bannerContainer = document.querySelector("#banner-section");
const newsContainer = document.querySelector("#news-section");
const paginatorContainer = document.querySelector("#paginator-section");
const bannerTemplate = document.querySelector("#news-card-banner-template");
const itemTemplate = document.querySelector("#news-card-item-template");
const detailsTemplate = document.querySelector("#news-card-detailed-template");
const newsListTemplate = document.querySelector("#news-list-template");
const breadcrumbsTemplate = document.querySelector("#breadcrumbs-template");
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
function showPaginator() {
    return __awaiter(this, arguments, void 0, function* (pageToOpen = 1) {
        header.isBorderShown = false;
        const newsModel = new NewsModel(new GetNewsService());
        const pages = yield newsModel.getPaginationData(1, 4);
        const paginator = new Paginator(paginatorContainer);
        paginator.setPagesCount(pages.length);
        paginator.onPageNumberClick = (page) => {
            const clickedNewsArray = pages[page - 1];
            showBanner(pages[0][0]);
            showNewsPage(clickedNewsArray, page);
        };
        paginator.render();
        paginator.goToPage(pageToOpen);
        const clickedNewsArray = pages[pageToOpen - 1];
        showBanner(pages[0][0]);
        showNewsPage(clickedNewsArray, pageToOpen);
    });
}
function showNewsPage(selectedNewsArray, currentPage) {
    newsContainer.innerHTML = "";
    const newsList = new NewsList(newsContainer, itemTemplate, newsListTemplate);
    newsList.render(selectedNewsArray);
    newsList.getCards().forEach((card) => {
        card.onDetailsClick = (id) => {
            showNewsDetailsPage(id, currentPage);
        };
        card.onCardItemClick = (id) => {
            showNewsDetailsPage(id, currentPage);
        };
    });
}
function showBanner(newsItemBanner) {
    bannerContainer.innerHTML = "";
    const banner = new NewsCard(bannerContainer, bannerTemplate, "banner");
    banner.setData(newsItemBanner);
}
function showNewsDetailsPage(newsId, accessedFromPage) {
    return __awaiter(this, void 0, void 0, function* () {
        header.isBorderShown = true;
        const newsModel = new NewsModel(new GetNewsService());
        const news = yield newsModel.getNewsById(newsId);
        const breadcrumbs = breadcrumbsTemplate.content.firstElementChild.cloneNode(true);
        bannerContainer.innerHTML = "";
        newsContainer.innerHTML = "";
        paginatorContainer.innerHTML = "";
        const homeLink = breadcrumbs.querySelector(".breadcrumbs-previous-page");
        const current = breadcrumbs.querySelector(".breadcrumbs-current-news");
        current.textContent = news.title;
        homeLink.addEventListener("click", () => {
            showPaginator(accessedFromPage);
        });
        newsContainer.append(breadcrumbs);
        const detailsCard = new NewsCard(newsContainer, detailsTemplate, "details");
        detailsCard.setData(news);
        detailsCard.onBackClick = () => {
            showPaginator(accessedFromPage);
        };
    });
}
showPaginator();
