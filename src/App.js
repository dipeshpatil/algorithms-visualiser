import React from "react";
import "./App.css";

import NQueensProblem from "./backTrackingAlgorithms/nQueensProblem/nQueensProblem";
import BinarySearch from "./searchingAlgorithms/binarySearch/binarySearch";
import LinearSearch from "./searchingAlgorithms/linearSearch/linearSearch";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openTab(tabId) {
        let x = document.getElementsByClassName("tabs");
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        document.getElementById(tabId).style.display = "block";
    }

    render() {
        return (
            <div className="App">
                <div className="w3-bar w3-black">
                    <button
                        onClick={() => this.openTab("backTrackingTab")}
                        className="w3-bar-item w3-button"
                    >
                        Backtracking
                    </button>
                    <button
                        onClick={() => this.openTab("searchingTab")}
                        className="w3-bar-item w3-button"
                    >
                        Searching
                    </button>
                </div>
                <div className="mt-3">
                    <div id="backTrackingTab" className="tabs">
                        <NQueensProblem />
                    </div>

                    <div
                        id="searchingTab"
                        className="tabs"
                        style={{ display: "none" }}
                    >
                        <LinearSearch />
                        <BinarySearch />
                    </div>
                </div>
            </div>
        );
    }
}
