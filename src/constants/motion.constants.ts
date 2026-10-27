export const MOTION_TRANSITIONS = {
  easeSmooth: [0.25, 0.1, 0.25, 1.0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  springSoft: { type: "spring", stiffness: 260, damping: 25 },
  springSnappy: { type: "spring", stiffness: 380, damping: 30 },
} as const;

export const MOTION_DURATIONS = {
  fast: 0.18,
  base: 0.3,
  slow: 0.45,
} as const;
