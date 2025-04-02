import { delay } from "../utils/delay";

const countingSort = async (array, setArray, stopSortingRef) => {
  let arr = [...array];
  const max = Math.max(...arr.map((bar) => bar.value));

  let count = new Array(max + 1).fill(0);

  // Count occurrences
  for (let bar of arr) count[bar.value]++;

  let index = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      if (stopSortingRef.current) return;

      arr[index].swapping = true;
      setArray([...arr]);
      await delay(200);

      arr[index].value = i;
      arr[index].height = i * 17;
      arr[index].swapping = false;
      arr[index].sorted = true;
      setArray([...arr]);

      index++;
      count[i]--;
    }
  }
};

export default countingSort;
