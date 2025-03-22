import { delay } from "../utils/delay";

const getMax = (arr) => Math.max(...arr.map((bar) => bar.value));

const radixSort = async (array, setArray, stopSortingRef) => {
  let arr = [...array];
  let max = getMax(arr);
  let exp = 1;

  while (Math.floor(max / exp) > 0) {
    if (stopSortingRef.current) return;

    let output = new Array(arr.length);
    let count = new Array(10).fill(0);

    // Count occurrences
    for (let bar of arr) {
      let digit = Math.floor(bar.value / exp) % 10;
      count[digit]++;
    }

    // Compute positions
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
      let digit = Math.floor(arr[i].value / exp) % 10;
      output[count[digit] - 1] = { ...arr[i] };
      count[digit]--;
    }

    // Copy back and visualize
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      arr[i].swapping = true;
      setArray([...arr]);
      await delay(200);
      arr[i].swapping = false;
      setArray([...arr]);
    }

    exp *= 10;
  }

  arr.forEach((bar) => (bar.sorted = true));
  setArray([...arr]);
};

export default radixSort;
