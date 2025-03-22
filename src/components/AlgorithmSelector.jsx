import React from "react";
import "../styles/SortingVisualizer.css";
import "../styles/AlgorithmSelector.css";

// Ensure CSS is imported

const AlgorithmSelector = ({ setSelectedAlgorithm }) => {
  return (
    <div className="algorithm-selector">
      <label htmlFor="sorting-algorithm">Choose a Sorting Algorithm: </label>
      <select
        id="sorting-algorithm"
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
      >
        <option value="">Select Algorithm</option>
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="heap">Heap Sort</option>
        <option value="counting">Counting Sort</option>
        <option value="radix">Radix Sort</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;
