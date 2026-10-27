import { ApiResponse } from "@/types/api.types";
import { createSuccessResponse } from "../api-response";
import { mockDb } from "../mock-db";
import { Venue } from "@/features/home/types/home.types";

export async function handleVenuesRequest<T>(): Promise<ApiResponse<T>> {
  const venues = mockDb.get<Venue[]>("VENUES");
  return createSuccessResponse(venues as unknown as T);
}
