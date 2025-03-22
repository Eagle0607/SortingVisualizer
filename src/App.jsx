import React from "react";
import "./App.css";
import SortingVisualizer from "./components/SortingVisualizer.jsx";
import "./styles/SortingVisualizer.css"; // Ensure the CSS file exists for global styling

const App = () => {
  return (
    <div className="app-container">
      <SortingVisualizer />
    </div>
  );
};

export default App;
