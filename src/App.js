import React from "react";
import "./App.css";
import BinarySearch from "./searchingAlgorithms/binarySearch/binarySearch";
import LinearSearch from "./searchingAlgorithms/linearSearch/linearSearch";

import "./utils/bootstrap.min.css";

function App() {
    return (
        <div className="App">
            {/* <div className="container-fluid"> */}
            <BinarySearch />
            <LinearSearch />
            {/* </div> */}
        </div>
    );
}

export default App;
