import React from "react";

import NavBar from "./utils/navbar";
import { Route } from "react-router-dom";

//  IndexTable
import IndexTable from "./utils/indexTable";

//  Word Search
import WordSearch from "./wordSearchVisualiser/wordSearch";

//  Pathfinding Visualiser
import PathFinderVisualiser from "./pathFinderVisualiser/pathfinderVisualiser";

//  Sorting Visualiser
import SortingVisualiser from "./sortingAlgorithms/sortingVisualiser";

//  Searching Visualiser
import BinarySearch from "./searchingAlgorithms/binarySearch/binarySearch";
import LinearSearch from "./searchingAlgorithms/linearSearch/linearSearch";

//  Backtracking Visualiser
import NQueensProblem from "./backTrackingAlgorithms/nQueensProblem/nQueensProblem";
import RatInAMazeProblem from "./backTrackingAlgorithms/ratInAMaze/ratInAMaze";

//  Stylesheets
import "./App.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <NavBar />
                <Route exact path="/" component={IndexTable} />
                <Route path="/sorting" component={SortingVisualiser} />
                <Route path="/linear-search" component={LinearSearch} />
                <Route path="/binary-search" component={BinarySearch} />
                <Route path="/n-queens-problem" component={NQueensProblem} />
                <Route path="/rat-in-a-maze" component={RatInAMazeProblem} />
                <Route path="/pathfinder" component={PathFinderVisualiser} />
                <Route path="/word-search" component={WordSearch} />
            </div>
        );
    }
}
