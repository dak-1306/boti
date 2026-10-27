export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";