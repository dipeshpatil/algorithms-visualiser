import React from "react";
import { NavLink } from "react-router-dom";

import BinaryThumb from "./thumbs/binary.jpg";
import NQueensThumb from "./thumbs/nqueens.jpg";
import PathThumb from "./thumbs/path.jpg";
import SortingThumb from "./thumbs/sorting.jpg";
import WordSearch from "./thumbs/word_search.jpg";

import MaskedStyleSVG from "./svg/maskShapesNew.svg";

import "./bootstrap.min.css";

const maskStyles = {
    margin: "0 auto",
    textAlign: "center",
    backgroundImage: `url(${MaskedStyleSVG})`,
    backgroundSize: "cover",
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    width: "auto",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
};
export default class IndexTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container mt-2">
                <div className="text-center text-muted">
                    <h1 style={maskStyles} className="maskText mt-1">
                        Algorithms
                        <br />
                        Visualiser
                    </h1>
                </div>
                <center>
                    <div className="row mt-2">
                        <div className="col-sm-4 col-6">
                            <NavLink to="/word-search">
                                <img
                                    className="img-fluid w-20 shadowB"
                                    src={WordSearch}
                                    alt="Word Searching"
                                />
                                <p className="text-muted thumb-title">
                                    Word Searching
                                </p>
                            </NavLink>
                        </div>
                        <div className="col-sm-4 col-6">
                            <NavLink to="/pathfinder">
                                <img
                                    className="img-fluid w-20 shadowB"
                                    src={PathThumb}
                                    alt="Path Finding"
                                />
                                <p className="text-muted thumb-title">
                                    Path Finding
                                </p>
                            </NavLink>
                        </div>
                        <div className="col-sm-4 col-6">
                            <NavLink to="/sorting">
                                <img
                                    className="img-fluid w-20 shadowB"
                                    src={SortingThumb}
                                    alt="Sorting"
                                />
                                <p className="text-muted thumb-title">
                                    Sorting Visualiser
                                </p>
                            </NavLink>
                        </div>
                        <div className="col-sm-4 col-6">
                            <NavLink to="/n-queens-problem">
                                <img
                                    className="img-fluid w-20 shadowB"
                                    src={NQueensThumb}
                                    alt="NQueens"
                                />
                                <p className="text-muted thumb-title">
                                    N-Queens Problem
                                </p>
                            </NavLink>
                        </div>
                        <div className="col-sm-4 col-6">
                            <NavLink to="/searching">
                                <img
                                    className="img-fluid w-20 shadowB"
                                    src={BinaryThumb}
                                    alt="Searching"
                                />
                                <p className="text-muted thumb-title">
                                    Searching Visualiser
                                </p>
                            </NavLink>
                        </div>
                    </div>
                    <div className="text-center text-muted">
                        Happy Visualisation Day!
                    </div>
                </center>
            </div>
        );
    }
}
