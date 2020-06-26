import React from "react";
import "./App.css";

import "./utils/bootstrap.min.css";

import NQueensProblem from "./backTrackingAlgorithms/nQueensProblem/nQueensProblem";
import BinarySearch from "./searchingAlgorithms/binarySearch/binarySearch";
import LinearSearch from "./searchingAlgorithms/linearSearch/linearSearch";

function App() {
    return (
        <div className="App">
            <NQueensProblem />
            {/* <LinearSearch />
            <BinarySearch /> */}
        </div>
    );
}

export default App;
