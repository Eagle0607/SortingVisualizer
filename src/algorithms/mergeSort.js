import { delay } from "../utils/delay";

const mergeSort = async (array, setArray, stopSortingRef) => {
  let arr = [...array];

  const merge = async (left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (stopSortingRef.current) return;

      arr[k].swapping = true;
      setArray([...arr]);
      await delay(200);

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = leftArr[i++];
      } else {
        arr[k] = rightArr[j++];
      }

      arr[k].swapping = false;
      setArray([...arr]);
      k++;
    }

    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
  };

  const mergeSortHelper = async (l, r) => {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    await mergeSortHelper(l, m);
    await mergeSortHelper(m + 1, r);
    await merge(l, m, r);
  };

  await mergeSortHelper(0, arr.length - 1);
  arr.forEach((bar) => (bar.sorted = true));
  setArray([...arr]);
};

export default mergeSort;
