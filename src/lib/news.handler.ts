import { APP_CONFIG } from "@/constants/appConfig";
import { ApiResponse, HttpMethod } from "@/types/api.types";
import { createErrorResponse } from "./api-response";

import { handleUserRequest } from "./mock-handlers/user.handler";
import { handleBookingsRequest } from "./mock-handlers/bookings.handler";
import { handleVenuesRequest } from "./mock-handlers/venues.handler";
import { handleNewsRequest } from "./mock-handlers/news.handler";

export async function handleMockRequest<T, P = Record<string, unknown>>(
  method: HttpMethod,
  endpoint: string,
  payload?: P,
): Promise<ApiResponse<T>> {
  await new Promise((res) => setTimeout(res, APP_CONFIG.MOCK_DELAY_MS));

  if (endpoint.startsWith("/user")) {
    return handleUserRequest<T, P>(method, endpoint, payload);
  }

  if (endpoint.startsWith("/bookings")) {
    return handleBookingsRequest<T, P>(method, endpoint, payload);
  }

  if (endpoint.startsWith("/venues")) {
    return handleVenuesRequest<T>();
  }

  if (endpoint.startsWith("/news")) {
    return handleNewsRequest<T>(endpoint);
  }

  return createErrorResponse<T>("Không tìm thấy tài nguyên yêu cầu", 404);
}
