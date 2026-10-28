import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";
import { NewsItem } from "@/features/news/types/news.types";

export const newsService = {
  getNews: (): Promise<ApiResponse<NewsItem[]>> => {
    return apiClient.get<NewsItem[]>("/news");
  },

  getNewsById: (id: string): Promise<ApiResponse<NewsItem>> => {
    return apiClient.get<NewsItem>(`/news/${id}`);
  },
};
