import React from "react";

import { randomIntFromInterval } from "./../../utils/randomIntFromInterval.js";
import { binarySearchAnimations } from "./../searchingAlgorithms";

import Header from "./../../utils/header";
import ArrayTile from "./../arrayTile";

import BackBar from "./../../utils/backbar";

//Stylesheets
import "./binarySearch.css";

const NUMBER_OF_ARRAY_BARS = 15;
const DEFAULT_COLOR = "#6376f1";
const FOUND_COLOR = "#28B463";
const NOT_FOUND_COLOR = "#F16388";
const ANIMATION_SPEED_SECONDS = 3;

export default class BinarySearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            found: false,
            disabled: false,
            elementFoundAt: 0,
            target: null,
            msgAfterExecution: null,
            previousLength: 0,
            animations: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        let array = [];
        const prevArray = document.getElementsByClassName("b-array-bar");
        document.getElementById("binarySearchTargetVal").value = "";
        for (let idx = 0; idx < prevArray.length; idx++) {
            prevArray[idx].style.backgroundColor = DEFAULT_COLOR;
            prevArray[idx].classList.remove("growFind");
            prevArray[idx].classList.remove("highlight");
        }
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 850));
        }
        let sortedArray = array.slice().sort((a, b) => a - b);
        this.setState({
            array: sortedArray,
            found: false,
            disabled: false,
            msgAfterExecution: null,
            previousLength: this.state.animations.length,
        });
    }

    hightlightWithinBounds(start, end, arrayTiles) {
        for (let i = start; i <= end; i++) {
            arrayTiles[i].style.backgroundColor = NOT_FOUND_COLOR;
            arrayTiles[i].style.transition = "100ms all";
        }
    }

    resetAllTiles(arrayTiles) {
        for (let i = 0; i < arrayTiles.length; i++) {
            arrayTiles[i].style.backgroundColor = DEFAULT_COLOR;
            arrayTiles[i].style.transition = "100ms all";
        }
    }

    binarySearch() {
        const { array } = this.state;
        const animations = [];
        let count = 0;
        const arrayTiles = document.getElementsByClassName("b-array-bar");
        const target = document.getElementById("binarySearchTargetVal").value;
        if (target === "") return;

        binarySearchAnimations(
            array,
            0,
            array.length - 1,
            parseInt(target),
            animations
        );

        for (let k = 0; k < animations.length; k++) {
            const [left, right, mid, found] = animations[k];
            count++;

            if (k === animations.length - 1 && found) {
                setTimeout(() => {
                    this.setState({ disabled: true, found: true });
                    this.resetAllTiles(arrayTiles);
                    arrayTiles[mid].classList.add("highlight");
                    arrayTiles[mid].style.backgroundColor = FOUND_COLOR;
                }, (k + 1) * ANIMATION_SPEED_SECONDS * 1000);
            }

            if (left === 0 && right === 0 && mid === 0 && !found) {
                setTimeout(() => {
                    console.log("ELement not found");
                    this.setState({
                        msgAfterExecution: `Element not found`,
                        found: false,
                    });
                    this.resetAllTiles(arrayTiles);
                }, (k + 1) * ANIMATION_SPEED_SECONDS * 1000);
            }

            setTimeout(() => {
                this.setState({ disabled: true });
                this.resetAllTiles(arrayTiles);
                this.hightlightWithinBounds(left, right, arrayTiles);
            }, k * 1000 * ANIMATION_SPEED_SECONDS);
        }

        setTimeout(() => {
            this.setState({ disabled: false });
        }, count * 1000 * ANIMATION_SPEED_SECONDS);
    }

    render() {
        const { array, found, disabled, msgAfterExecution } = this.state;

        return (
            <div>
                <BackBar />
                <div className="jumbotron jumbotron-fluid bg-light">
                    <center>
                        <Header title="Binary Search" />
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="input-group col-sm-10">
                                    <input
                                        type="number"
                                        id="binarySearchTargetVal"
                                        className="form-control"
                                        placeholder="Find Element"
                                    />
                                    <div className="input-group-append">
                                        <button
                                            onClick={() => this.binarySearch()}
                                            className="btn btn-success"
                                            type="button"
                                            id="binarySearchBtn"
                                            disabled={disabled}
                                        >
                                            Search
                                        </button>
                                        <button
                                            onClick={() => this.resetArray()}
                                            className="btn btn-danger"
                                            id="binarySearchResetArray"
                                            type="button"
                                            disabled={disabled}
                                        >
                                            Reset Array
                                        </button>
                                    </div>
                                </div>
                                <div className="col-sm-1 "></div>
                            </div>
                        </div>
                        {!found ? (
                            <p className="not-found">{msgAfterExecution}</p>
                        ) : null}
                        <br />
                        <div className="container">
                            {array.map((value, idx) => (
                                <ArrayTile
                                    type={"binarySearch"}
                                    key={idx}
                                    idx={idx}
                                    val={value}
                                />
                            ))}
                        </div>
                    </center>
                </div>
            </div>
        );
    }
}
