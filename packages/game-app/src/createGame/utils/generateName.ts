import leftNames from './leftNames';
import rightNames from './rightNames';

/**
 * Generate random game name like docker does
 */
export default function generateName() {
  const li = Math.floor(Math.random() * leftNames.length);
  const ri = Math.floor(Math.random() * rightNames.length);

  const lv = leftNames[li];
  const rv = rightNames[ri];
  return `${lv}_${rv}`;
}
