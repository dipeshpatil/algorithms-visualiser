import { swap } from "./swap";

function quickSortHelper(array = [], left, right, animations = []) {
  let pivot = array[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (array[i] < pivot) i++;

    while (array[j] > pivot) j--;

    if (i <= j) {
      swap(i, j, array);
      animations.push([i, j, array[i++], array[j--]]);
    }
  }
  return i;
}

export function getQuickSortAnimations(
  items = [],
  left,
  right,
  animations = []
) {
  let index;
  if (items.length > 1) {
    index = quickSortHelper(items, left, right, animations);
    if (left < index - 1) {
      getQuickSortAnimations(items, left, index - 1, animations);
    }
    if (index < right) {
      getQuickSortAnimations(items, index, right, animations);
    }
  }
  return animations;
}
