export default class GetNewsService {
  getNews() {
    return fetch("/data/news.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки News.json");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Ошибка в GetNewsService:", error);
        throw error;
      });
  }
}
