import { delay } from "../utils/delay";

const selectionSort = async (array, setArray, stopSortingRef) => {
  let arr = [...array];

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (stopSortingRef.current) return;

      arr[j].swapping = true;
      arr[minIndex].swapping = true;
      setArray([...arr]);
      await delay(100);

      if (arr[j].value < arr[minIndex].value) {
        arr[minIndex].swapping = false;
        minIndex = j;
        arr[minIndex].swapping = true;
      }

      setArray([...arr]);
      await delay(200);
      arr[j].swapping = false;
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    arr[i].sorted = true;
    arr[minIndex].swapping = false;
    setArray([...arr]);
  }

  arr.forEach((bar) => (bar.sorted = true));
  setArray([...arr]);
};

export default selectionSort;
