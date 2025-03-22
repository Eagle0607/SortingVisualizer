import React, { useState, useEffect, useRef } from "react";
import "../styles/SortingVisualizer.css"; // Ensure the CSS file exists

import AlgorithmSelector from "./AlgorithmSelector";

import bubbleSort from "../algorithms/bubbleSort";
import selectionSort from "../algorithms/selectionSort";
import insertionSort from "../algorithms/insertionSort";
import mergeSort from "../algorithms/mergeSort";
import quickSort from "../algorithms/quickSort";
import heapSort from "../algorithms/heapSort";
import countingSort from "../algorithms/countingSort";
import radixSort from "../algorithms/radixSort";

import { delay } from "../utils/delay"; // Ensure this utility function exists

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [sortingAlgorithm, setSortingAlgorithm] = useState("");
  const stopSortingRef = useRef(false);

  // Generate a new random array
  const generateNewArray = () => {
    stopSortingRef.current = false;
    setIsSorting(false);

    let uniqueNumbers = Array.from({ length: 25 }, (_, i) => i + 1); // Numbers from 1 to 20
    uniqueNumbers = uniqueNumbers.sort(() => Math.random() - 0.5); // Shuffle numbers

    const newArray = uniqueNumbers.map((value) => ({
      value,
      height: value * 16.9, // Set height proportional to value
      swapping: false,
      sorted: false,
    }));

    setArray(newArray);
  };

  // Call the appropriate sorting algorithm
  const sortArray = async () => {
    if (!sortingAlgorithm) {
      alert("Please select a sorting algorithm!");
      return;
    }

    setIsSorting(true);
    stopSortingRef.current = false; // Reset stop condition

    const sortingFunctions = {
      bubble: bubbleSort,
      selection: selectionSort,
      insertion: insertionSort,
      merge: mergeSort,
      quick: quickSort,
      heap: heapSort,
      counting: countingSort,
      radix: radixSort,
    };

    if (sortingFunctions[sortingAlgorithm]) {
      await sortingFunctions[sortingAlgorithm]([...array], setArray, stopSortingRef);
    } else {
      alert("Invalid sorting algorithm selected.");
    }

    setIsSorting(false);
  };

  // Stop sorting when user clicks "Stop"
  const stopSorting = () => {
    stopSortingRef.current = true;
    setIsSorting(false);
  };

  // Generate the array when component mounts
  useEffect(() => {
    generateNewArray();
  }, []);

  return (
    <div className="sorting-visualizer">
      {/* Heading */}
      <h1 className="title">Sorting Visualizer</h1>

      {/* Algorithm Selector Component */}
      <AlgorithmSelector setSelectedAlgorithm={setSortingAlgorithm} />

      {/* Buttons Section */}
      <div className="controls">
        <button className="blue" onClick={generateNewArray} disabled={isSorting}>
          Generate New Array
        </button>

        <button className="green" onClick={sortArray} disabled={isSorting || !sortingAlgorithm}>
          Sort
        </button>

        <button className="red" onClick={stopSorting} disabled={!isSorting}>
          Stop
        </button>
      </div>

      {/* Container for the bars */}
      <div className="bars-container">
        {array.map((bar, index) => (
          <div
            key={index}
            className={`array-bar ${bar.swapping ? "swapping" : ""} ${bar.sorted ? "sorted" : ""}`}
            style={{ height: `${bar.height}px` }}
          >
            {bar.value} {/* Show number inside the bar */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
