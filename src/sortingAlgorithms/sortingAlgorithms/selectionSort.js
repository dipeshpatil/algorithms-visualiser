import { swap } from "./swap";

export function getSelectionSortAnimations(array = []) {
  const animations = [];
  let currentIdx = 0;
  while (currentIdx < array.length - 1) {
    let smallestIdx = currentIdx;
    for (let i = currentIdx + 1; i < array.length; i++) {
      if (array[smallestIdx] > array[i]) smallestIdx = i;
    }
    if (currentIdx < smallestIdx) {
      swap(currentIdx, smallestIdx, array);
      animations.push([
        currentIdx,
        smallestIdx,
        array[currentIdx],
        array[smallestIdx],
      ]);
    }
    currentIdx++;
  }
  return animations;
}
