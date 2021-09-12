import { swap } from "./swap";

export function getBubbleSortAnimations(array = []) {
  const animations = [];
  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < array.length - 1 - counter; i++) {
      if (array[i] > array[i + 1]) {
        swap(i, i + 1, array);
        isSorted = false;
        animations.push([i, i + 1, array[i], array[i + 1]]);
      } else {
        animations.push([i, i + 1, array[i], array[i + 1]]);
      }
    }
    counter++;
  }
  return animations;
}
