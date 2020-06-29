import React from "react";
import "./App.css";

import NQueensProblem from "./backTrackingAlgorithms/nQueensProblem/nQueensProblem";
import BinarySearch from "./searchingAlgorithms/binarySearch/binarySearch";
import LinearSearch from "./searchingAlgorithms/linearSearch/linearSearch";
import SortingVisualiser from "./sortingAlgorithms/sortingVisualiser";

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
                <span className="ml-2 text-dark">Algorithms Visualiser</span>
                <span className="float-right">
                    <a
                        target="_blank"
                        className="btn-sm text-decoration-none bg-light rounded-0 text-dark"
                        href="https:github.com/dipeshpatil/algorithms-visualiser"
                    >
                        <i className="fab text-dark fa-github"></i>
                        &nbsp; Repo URL
                    </a>
                    <a
                        target="_blank"
                        className="btn-sm text-decoration-none bg-light rounded-0 text-dark"
                        href="https:linkedin.com/in/dipesh-patil"
                    >
                        <i className="fab text-dark fa-linkedin"></i>
                        &nbsp; Dipesh Patil
                    </a>
                </span>
                <ul className="nav sticky-top bg-dark">
                    <li className="nav-item">
                        <a
                            onClick={() => this.openTab("sortingTab")}
                            className="nav-link text-light"
                            href="#"
                        >
                            Sorting
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            onClick={() => this.openTab("backtrackingTab")}
                            className="nav-link text-light"
                            href="#"
                        >
                            Backtracking
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            onClick={() => this.openTab("searchingTab")}
                            className="nav-link text-light"
                            href="#"
                        >
                            Searching
                        </a>
                    </li>
                </ul>
                <div className="mt-3">
                    <div id="sortingTab" className="tabs">
                        <SortingVisualiser />
                    </div>
                    <div
                        id="searchingTab"
                        className="tabs"
                        style={{ display: "none" }}
                    >
                        <LinearSearch />
                        <BinarySearch />
                    </div>
                    <div
                        id="backtrackingTab"
                        className="tabs"
                        style={{ display: "none" }}
                    >
                        <NQueensProblem />
                    </div>
                </div>
            </div>
        );
    }
}
