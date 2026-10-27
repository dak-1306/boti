import { ApiResponse } from "@/types/api.types";

export function createSuccessResponse<T>(
  data: T,
  message = "Thành công",
  statusCode = 200,
): ApiResponse<T> {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
}

export function createErrorResponse<T>(
  message = "Đã có lỗi xảy ra",
  statusCode = 400,
): ApiResponse<T> {
  return {
    success: false,
    statusCode,
    message,
    data: null as unknown as T,
  };
}
