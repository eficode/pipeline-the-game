/**
 *
 *
 * |                    containerWidth                   |
 * _______________________________________________________
 * | itemWidth | margin | itemWidth | margin | itemWidth |
 *
 * Calculates the max number of columns
 *
 * @param itemWidth the width of the child
 * @param margin the margin between the columns
 * @param containerWidth the width of the container
 */
export function calculateItemsPerRow(itemWidth: number, margin: number, containerWidth: number) {
  return Math.floor((containerWidth - margin) / itemWidth);
}

export function calculateItemPosition(elementIndex: number, itemsPerRow: number) {
  const row = Math.floor(elementIndex / itemsPerRow);
  return { row, col: elementIndex - row * itemsPerRow };
}

export function calculateCoordinates(
  rowIndex: number,
  colIndex: number,
  itemWidth: number,
  itemHeight: number,
  margin: number,
  verticalMargin?: number,
) {
  const vMargin = verticalMargin === undefined ? margin : verticalMargin;
  return {
    left: (itemWidth + margin) * colIndex,
    top: (itemHeight + vMargin) * rowIndex,
  };
}
