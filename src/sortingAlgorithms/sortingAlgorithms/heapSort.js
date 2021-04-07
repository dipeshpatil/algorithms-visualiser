import { swap } from "./swap";

function buildMaxHeap(array = [], animations = []) {
  let i;
  i = array.length / 2 - 1;
  i = Math.floor(i);
  while (i >= 0) {
    heapify(array, i, array.length, animations);
    i -= 1;
  }
}

function heapify(heap = [], i, max, animations = []) {
  let index, leftChild, righChild;

  while (i < max) {
    index = i;
    leftChild = 2 * i + 1;
    righChild = leftChild + 1;

    if (leftChild < max && heap[leftChild] > heap[index]) index = leftChild;

    if (righChild < max && heap[righChild] > heap[index]) index = righChild;

    if (index === i) return;

    swap(i, index, heap);
    animations.push([i, index, heap[i], heap[index]]);
    i = index;
  }
}

export function getHeapSortAnimations(array = [], animations = []) {
  buildMaxHeap(array, animations);
  let lastElement = array.length - 1;
  while (lastElement > 0) {
    swap(0, lastElement, array);
    animations.push([0, lastElement, array[0], array[lastElement]]);
    heapify(array, 0, lastElement, animations);
    lastElement -= 1;
  }
}
