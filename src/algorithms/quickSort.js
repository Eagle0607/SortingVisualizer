import { delay } from "../utils/delay";

const quickSort = async (array, setArray, stopSortingRef) => {
  let arr = [...array];

  const partition = async (low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (stopSortingRef.current) return;

      arr[j].swapping = true;
      arr[high].swapping = true;
      setArray([...arr]);
      await delay(100);

      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await delay(100);
      }

      arr[j].swapping = false;
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await delay(200);
    arr[high].swapping = false;

    return i + 1;
  };

  const quickSortHelper = async (low, high) => {
    if (low < high) {
      let pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  };

  await quickSortHelper(0, arr.length - 1);
  arr.forEach((bar) => (bar.sorted = true));
  setArray([...arr]);
};

export default quickSort;
