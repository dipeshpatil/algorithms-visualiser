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
                <div className="bg-dark py-2 px-2">
                    <span className="text-light">
                        Algorithms Visualiser
                    </span>
                    <span className="float-right">
                        <a
                            className="btn-sm text-decoration-none bg-dark rounded-0 text-light"
                            href="https:github.com/dipeshpatil/algorithms-visualiser"
                        >
                            <i className="fab text-light fa-github"></i>
                            &nbsp; Repo URL
                        </a>
                        <a
                            className="btn-sm text-decoration-none bg-dark rounded-0 text-light"
                            href="https:linkedin.com/in/dipesh-patil"
                        >
                            <i className="fab text-light fa-linkedin"></i>
                            &nbsp; Dipesh Patil
                        </a>
                    </span>
                </div>
                <ul className="nav sticky-top bg-secondary">
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
                <div className="mt-90">
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
