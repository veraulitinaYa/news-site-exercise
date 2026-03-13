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
const headerContainer = document.querySelector("#header-container");
const headerTemplate = document.querySelector("#header-template");
//TODO нужно отрефакторить переменные-------------------------------------------------------
const header = new Header(headerContainer, headerTemplate);
const container = document.querySelector("#news-item-test-container");
const listcontainer = document.querySelector("#news-list-test-container");
const listTemplate = document.querySelector("#news-list-template");
const detailsContainer = document.querySelector("#news-card-detailed-test-container");
const bannerContainer = document.querySelector("#news-card-detailed-test-container");
header.render({
    logoImagePath: "./src/data/images/logo/logo-with-text.svg",
    isBorderShown: false,
});
const template = document.querySelector("#news-card-item-template");
function showTestCard() {
    return __awaiter(this, void 0, void 0, function* () {
        const card = new NewsCard(container, template, "item");
        const newsModel = new NewsModel(new GetNewsService());
        const news = yield newsModel.getNewsById(1);
        card.setData(news);
        // card.render();
    });
}
function showTestCardList() {
    return __awaiter(this, void 0, void 0, function* () {
        const newsModel = new NewsModel(new GetNewsService());
        const news = yield newsModel.getAllNews();
        const newsList = new NewsList(listcontainer, template);
        newsList.render(news);
    });
}
function showTestDetailedCard() {
    return __awaiter(this, void 0, void 0, function* () {
        const card = new NewsCard(detailsContainer, template, "details");
        const newsModel = new NewsModel(new GetNewsService());
        const news = yield newsModel.getNewsById(1);
        card.setData(news);
    });
}
function showTestBannerCard() {
    return __awaiter(this, void 0, void 0, function* () {
        const card = new NewsCard(bannerContainer, template, "banner");
        const newsModel = new NewsModel(new GetNewsService());
        const news = yield newsModel.getNewsById(1);
        card.setData(news);
    });
}
showTestCard();
showTestCardList();
showTestDetailedCard();
showTestBannerCard();
