import React from "react";
import { Route, Switch } from "react-router-dom";

import NQueensProblem from "./backTrackingAlgorithms/nQueensProblem/nQueensProblem";
import BinarySearch from "./searchingAlgorithms/binarySearch/binarySearch";
import LinearSearch from "./searchingAlgorithms/linearSearch/linearSearch";

const MainRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={NQueensProblem} />
                <Route exact path="/linear-search" component={LinearSearch} />
                <Route exact path="/binary-search" component={BinarySearch} />
            </Switch>
        </div>
    );
};

export default MainRouter;
