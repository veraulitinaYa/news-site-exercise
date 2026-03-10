export default class NewsModel {
    constructor(currentService) {
        if (!currentService) {
            throw new Error("Ошибка NewsModel: сервис не получен");
        }
        this.service = currentService;
    }
    getAllNews() {
        return this.service.getNews().then(function (newsArray) {
            return newsArray;
        });
    }
    getAllNewsSorted() {
        return this.service.getNews().then(function (newsArray) {
            const newsArrayProcessed = newsArray.slice();
            newsArrayProcessed.sort(function (firstItem, secondItem) {
                return new Date(secondItem.date).getTime() - new Date(firstItem.date).getTime();
            });
            return newsArrayProcessed;
        });
    }
    getNewsById(newsId) {
        return this.service.getNews().then(function (newsArray) {
            const selectedNews = newsArray.find((newsItem) => newsItem.id === Number(newsId));
            if (!selectedNews) {
                throw new Error("Ошибка getNewsById: новость не найдена");
            }
            return selectedNews;
        });
    }
    getLastNews() {
        return this.getAllNewsSorted().then(function (sortedNewsArray) {
            if (!sortedNewsArray[0]) {
                throw new Error("Ошибка getLastNews: новость не найдена");
            }
            return sortedNewsArray[0];
        });
    }
    getAllNewsCounted() {
        return this.service.getNews().then(function (newsArray) {
            return newsArray.length;
        });
    }
    getPaginationData(requiredPage, newsPerPage) {
        return this.getAllNewsSorted()
            .then(function (sortedNewsArray) {
            const newsCount = sortedNewsArray.length;
            const pagesCount = Math.ceil(newsCount / newsPerPage);
            let currentPage = requiredPage;
            if (requiredPage < 1) {
                currentPage = 1;
            }
            if (requiredPage > pagesCount) {
                currentPage = pagesCount;
            }
            let paginatedNewsArray = [];
            let itemsPerPageArray = [];
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
