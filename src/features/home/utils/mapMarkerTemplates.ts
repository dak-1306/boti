import { Venue } from "../types/home.types";

/**
 * HTML Template cho Chấm xanh vị trí người dùng (User GPS Pin)
 */
export function createUserPinHtml(): string {
  return `
    <div style="position: relative; width: 22px; height: 22px;">
      <div style="
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #2563eb;
        border-radius: 50%;
        opacity: 0.4;
        animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
      "></div>
      <div style="
        position: relative;
        width: 16px;
        height: 16px;
        margin: 3px;
        background-color: #2563eb;
        border: 2.5px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    </div>
  `;
}

/**
 * HTML Template cho Pin địa điểm sân trên bản đồ
 */
export function createVenuePinHtml(
  venue: Venue,
  isSelected: boolean,
  iconSrc?: string,
): string {
  const borderStyle = isSelected ? "3px solid #2563eb" : "2px solid #ffffff";
  const transformStyle = isSelected ? "scale(1.15)" : "scale(1)";

  const iconContent = iconSrc
    ? `<img src="${iconSrc}" style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="${venue.category}" />`
    : `<span style="color: #1e293b; font-weight: bold; font-size: 11px;">${venue.category.slice(0, 1)}</span>`;

  return `
    <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
      <div style="
        display: flex;
        width: 32px;
        height: 32px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: ${borderStyle};
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
        transform: ${transformStyle};
        transition: transform 0.2s ease, border-color 0.2s ease;
        overflow: hidden;
        background-color: #ffffff;
      ">
        ${iconContent}
      </div>
      <span style="
        margin-top: 4px;
        white-space: nowrap;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.95);
        padding: 2px 8px;
        font-size: 10px;
        font-weight: 600;
        color: #1e293b;
        box-shadow: 0 2px 4px rgba(0,0,0,0.12);
      ">
        ${venue.name}
      </span>
    </div>
  `;
}
