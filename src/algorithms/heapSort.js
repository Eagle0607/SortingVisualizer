import { delay } from "../utils/delay";

const heapSort = async (array, setArray, stopSortingRef) => {
  let arr = [...array];

  const heapify = async (n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left].value > arr[largest].value) largest = left;
    if (right < n && arr[right].value > arr[largest].value) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await delay(100);
      await heapify(n, largest);
    }
  };

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) await heapify(arr.length, i);
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    setArray([...arr]);
    await delay(200);
    await heapify(i, 0);
  }

  arr.forEach((bar) => (bar.sorted = true));
  setArray([...arr]);
};

export default heapSort;
