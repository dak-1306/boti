import { ApiResponse } from "@/types/api.types";
import { createSuccessResponse, createErrorResponse } from "../api-response";
import { mockDb } from "../mock-db";
import { NewsItem } from "@/features/news/types/news.types";

export async function handleNewsRequest<T>(
  endpoint: string,
): Promise<ApiResponse<T>> {
  const newsList = mockDb.get<NewsItem[]>("NEWS");

  if (endpoint === "/news" || endpoint === "/news/") {
    return createSuccessResponse(newsList as unknown as T);
  }

  const newsId = endpoint.split("/").pop();
  const newsDetail = newsList.find((item) => item.id === newsId);

  return newsDetail
    ? createSuccessResponse(newsDetail as unknown as T)
    : createErrorResponse<T>("Không tìm thấy bài viết", 404);
}
