import axios from "axios";
import { APP_CONFIG } from "@/constants/appConfig";
import { ApiResponse } from "@/types/api.types";
import { handleMockRequest } from "./mock-adapter";
import { createErrorResponse } from "./api-response";

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiClient = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    if (APP_CONFIG.USE_MOCK_API) {
      return handleMockRequest<T>("GET", endpoint);
    }
    try {
      const res = await axiosInstance.get<ApiResponse<T>>(endpoint);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as ApiResponse<T>;
      }
      return createErrorResponse<T>("Lỗi kết nối máy chủ", 500);
    }
  },

  post: async <T, P = Record<string, unknown>>(
    endpoint: string,
    payload?: P,
  ): Promise<ApiResponse<T>> => {
    if (APP_CONFIG.USE_MOCK_API) {
      return handleMockRequest<T, P>("POST", endpoint, payload);
    }
    try {
      const res = await axiosInstance.post<ApiResponse<T>>(endpoint, payload);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as ApiResponse<T>;
      }
      return createErrorResponse<T>("Lỗi kết nối máy chủ", 500);
    }
  },

  put: async <T, P = Record<string, unknown>>(
    endpoint: string,
    payload?: P,
  ): Promise<ApiResponse<T>> => {
    if (APP_CONFIG.USE_MOCK_API) {
      return handleMockRequest<T, P>("PUT", endpoint, payload);
    }
    try {
      const res = await axiosInstance.put<ApiResponse<T>>(endpoint, payload);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as ApiResponse<T>;
      }
      return createErrorResponse<T>("Lỗi kết nối máy chủ", 500);
    }
  },
};
