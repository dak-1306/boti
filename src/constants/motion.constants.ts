export const MOTION_TRANSITIONS = {
  // Easing dạng sóng nước (Fluid Wave Easing)
  easeWave: [0.22, 1, 0.36, 1],
  easeOutExpo: [0.16, 1, 0.3, 1],
} as const;

export const MOTION_DURATIONS = {
  waveItem: 0.38, // Thời gian trượt của từng item
  staggerInterval: 0.055, // Độ trễ giữa các nhịp sóng (55ms)
} as const;
