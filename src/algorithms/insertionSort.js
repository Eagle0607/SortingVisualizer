import { delay } from "../utils/delay";

const insertionSort = async (array, setArray, stopSortingRef) => {
  let arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j].value > key.value) {
      if (stopSortingRef.current) return;

      arr[j + 1] = arr[j];
      arr[j].swapping = true;
      arr[j + 1].swapping = true;
      setArray([...arr]);
      await delay(200);
      arr[j].swapping = false;
      j--;
    }

    arr[j + 1] = key;
    setArray([...arr]);
  }

  arr.forEach((bar) => (bar.sorted = true));
  setArray([...arr]);
};

export default insertionSort;
