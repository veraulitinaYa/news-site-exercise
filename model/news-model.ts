import GetNewsService from "../service/get-news-service.js";
import type { News } from "../types/news";

export default class NewsModel {
  service: GetNewsService;

  constructor(currentService: GetNewsService) {
    if (!currentService) {
      throw new Error("Ошибка NewsModel: сервис не получен");
    }
    this.service = currentService;
  }

  getAllNews(): Promise<News[]>{
    return this.service.getNews().then(function (newsArray: News[]) {
      return newsArray;
    });
  }

  getAllNewsSorted(): Promise<News[]> {
    return this.service.getNews().then(function (newsArray) {
      const newsArrayProcessed = newsArray.slice();
      newsArrayProcessed.sort(function (firstItem, secondItem) {
        return new Date(secondItem.date).getTime() - new Date(firstItem.date).getTime();
      });
      return newsArrayProcessed;
    });
  }

  getNewsById(newsId: number | string): Promise<News> {
    return this.service.getNews().then(function (newsArray: News[]) {
      const selectedNews = newsArray.find(
        (newsItem: News) => newsItem.id === Number(newsId),
      );

      if (!selectedNews) {
        throw new Error("Ошибка getNewsById: новость не найдена");
      }

      return selectedNews;
    });
  }

  getLastNews(): Promise<News> {
    return this.getAllNewsSorted().then(function (sortedNewsArray: News[]) {
      if (!sortedNewsArray[0]) {
        throw new Error("Ошибка getLastNews: новость не найдена");
      }
      return sortedNewsArray[0];
    });
  }

  getAllNewsCounted(): Promise<number> {
    return this.service.getNews().then(function (newsArray: News[]) {
      return newsArray.length;
    });
  }

  getPaginationData(requiredPage: number, newsPerPage: number): Promise<News[]> {
    return this.getAllNewsSorted()

      .then(function (sortedNewsArray: News[]) {
        const newsCount = sortedNewsArray.length;
        const pagesCount = Math.ceil(newsCount / newsPerPage);

        let currentPage = requiredPage;

        if (requiredPage < 1) {
          currentPage = 1;
        }
        if (requiredPage > pagesCount) {
          currentPage = pagesCount;
        }

        let paginatedNewsArray: News [][] = [];
        let itemsPerPageArray: News [] = [];

        for (let i = 0; i < newsCount; i++) {
          itemsPerPageArray.push(sortedNewsArray[i]);
          if (itemsPerPageArray.length === newsPerPage) {
            paginatedNewsArray.push(itemsPerPageArray);
            itemsPerPageArray = [];
          }
        }

        if (itemsPerPageArray.length > 0) {
          paginatedNewsArray.push(itemsPerPageArray);
        }

        const newsArrayForCurrentPage = paginatedNewsArray[currentPage - 1];

        return newsArrayForCurrentPage;
      });
  }
}
