export function swap(i, j, arr = []) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
