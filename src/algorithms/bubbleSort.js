import { delay } from "../utils/delay";

const bubbleSort = async (array, setArray, stopSortingRef) => {
  let arr = [...array];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (stopSortingRef.current) return;

      arr[j].swapping = true;
      arr[j + 1].swapping = true;
      setArray([...arr]);
      await delay(100);

      if (arr[j].value > arr[j + 1].value) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await delay(100);
      }

      arr[j].swapping = false;
      arr[j + 1].swapping = false;
      setArray([...arr]);
    }
    arr[arr.length - 1 - i].sorted = true;
    setArray([...arr]);
  }

  arr.forEach((bar) => (bar.sorted = true));
  setArray([...arr]);
};

export default bubbleSort;
