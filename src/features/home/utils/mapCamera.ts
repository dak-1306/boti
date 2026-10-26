import type L from "leaflet";
import { Venue, LocationState } from "../types/home.types";

/**
 * Tự động tính toán khung nhìn chứa vừa vặn toàn bộ các sân sau khi filter
 */
export function autoFitMapBounds(map: L.Map, venues: Venue[]) {
  if (!map || venues.length === 0) return;

  // Trường hợp chỉ có 1 sân: Zoom thẳng vào tọa độ sân đó
  if (venues.length === 1) {
    map.flyTo([venues[0].location.lat, venues[0].location.lng], 15, {
      animate: true,
      duration: 0.8,
    });
    return;
  }

  // Trường hợp từ 2 sân trở lên: Truyền trực tiếp mảng mảng tọa độ [[lat, lng], ...] vào fitBounds
  const boundsCoordinates = venues.map(
    (v) => [v.location.lat, v.location.lng] as [number, number],
  );

  map.fitBounds(boundsCoordinates, {
    paddingTopLeft: [40, 40],
    paddingBottomRight: [40, 140], // Dành khoảng trống 140px phía dưới cho Floating Card & Bottom Nav
    maxZoom: 15,
    animate: true,
    duration: 0.8,
  });
}

/**
 * Lia bản đồ mượt mà về tọa độ chỉ định (ví dụ: Vị trí người dùng)
 */
export function flyToCoordinates(
  map: L.Map,
  location: LocationState,
  zoomLevel = 15,
) {
  if (!map) return;
  map.flyTo([location.lat, location.lng], zoomLevel, {
    animate: true,
    duration: 1,
  });
}
