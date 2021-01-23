import { GameUIState } from '../types/gameUIState';
import { DEFAULT_CARD_SIZE } from '../../dimensions';
import { Pan } from '../types/pan';

type Bounds = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

/**
 *  Returns the absolute bounds in the boards that defines the rectangle in which
 *  there are cards placed
 *
 * @param {GameUIState} cardsState
 * @returns {Bounds}
 */
function getBounds(cardsState: GameUIState): Bounds {
  const bounds = {
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY,
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
  };

  for (const cardId in cardsState) {
    const { position } = cardsState[cardId];
    if (!position) {
      continue;
    }
    if (position.x < bounds.minX) {
      bounds.minX = position.x;
    }
    if (position.y < bounds.minY) {
      bounds.minY = position.y;
    }
    if (position.x + DEFAULT_CARD_SIZE.width > bounds.maxX) {
      bounds.maxX = position.x + DEFAULT_CARD_SIZE.width;
    }
    if (position.y + DEFAULT_CARD_SIZE.height > bounds.maxY) {
      bounds.maxY = position.y + DEFAULT_CARD_SIZE.height;
    }
  }
  return bounds;
}

/**
 *
 * Calculate the max scale to apply to the board to fit the
 * window height and width
 *
 * @param {Bounds} bounds
 * @returns {number} calculated scale
 */
function calculateScale(bounds: Bounds): number {
  const necessaryHeight = bounds.maxY - bounds.minY;
  const targetHeight = window.innerHeight;
  const yScale = targetHeight / necessaryHeight;

  const necessaryWidth = bounds.maxX - bounds.minX;
  const targetWidth = window.innerWidth;
  const xScale = targetWidth / necessaryWidth;

  const actualScale = Math.min(xScale, yScale);

  return actualScale;
}

/**
 *
 * Calculate the pan to apply so that the actual cards rect
 * will be placed in the center of the window
 *
 * @param {Bounds} bounds of the cards rects
 * @param {number} scale that will be applied
 * @returns {Pan} pan to apply
 */
function calculatePan(bounds: Bounds, scale: number): Pan {
  // limit maxY inside
  let panY = -((bounds.maxY + bounds.minY) / 2 - window.innerHeight / 2 / scale);
  let panX = -((bounds.maxX + bounds.minX) / 2 - window.innerWidth / 2 / scale);

  return {
    x: panX * scale,
    y: panY * scale,
  };
}

/**
 *
 * Calculate pna and zoom to fit all the cards in the screen and center them
 *
 * @param {GameUIState} state
 */
export function calculatePanAndZoomToFitWindow(state: GameUIState) {
  const bounds = getBounds(state);
  const scale = calculateScale(getBounds(state));
  const actualScale = Math.min(scale * 0.85, 1.5);
  // center the rect in the board
  const pan = calculatePan(bounds, actualScale);

  return { actualScale, pan };
}
