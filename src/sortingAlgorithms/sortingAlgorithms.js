export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(
        auxiliaryArray,
        middleIdx + 1,
        endIdx,
        mainArray,
        animations
    );
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

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

function swap(i, j, arr = []) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
