import React from "react";
import "./App.css";
import BinarySearch from "./searchingAlgorithms/binarySearch/binarySearch";
import LinearSearch from "./searchingAlgorithms/linearSearch/linearSearch";

function App() {
    return (
        <div className="App">
            {/* <LinearSearch /> */}
            <BinarySearch />
        </div>
    );
}

export default App;
