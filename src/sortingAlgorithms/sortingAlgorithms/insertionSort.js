import { swap } from "./swap";

export function getInsertionSortAnimations(array = []) {
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      swap(j, j - 1, array);
      animations.push([j, j - 1, array[j], array[j - 1]]);
      j -= 1;
    }
  }
  return animations;
}
