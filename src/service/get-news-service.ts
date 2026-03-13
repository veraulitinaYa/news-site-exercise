import type { News } from "../types/news";

export default class GetNewsService {
  async getNews(): Promise<News[]> {
    return fetch("/src/data/news/news.json")
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки News.json");
        }
        return response.json() as Promise<News[]>;
      })
      .catch((error: Error) => {
        console.error("Ошибка в GetNewsService:", error);
        throw error;
      });
  }
}
