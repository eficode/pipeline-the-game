export const DEFAULT_CARD_SIZE = { width: 280, height: 200 };

export const PANEL_CARD_SCALE = Math.max(1.5 / window.devicePixelRatio, 1.2);
export const PANEL_CARD_SIZE = {
  width: DEFAULT_CARD_SIZE.width * PANEL_CARD_SCALE + 4,
  height: DEFAULT_CARD_SIZE.height * PANEL_CARD_SCALE,
};

export const PANEL_TWO_COLUMNS_WIDTH = PANEL_CARD_SIZE.width * 2 + 16 + 40 * 2;
export const PANEL_ONE_COLUMNS_WIDTH = PANEL_CARD_SIZE.width + 40 * 2;
