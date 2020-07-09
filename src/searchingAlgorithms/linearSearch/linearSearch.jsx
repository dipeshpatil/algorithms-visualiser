import React from "react";
import { randomIntFromInterval } from "./../../utils/randomIntFromInterval.js";
import { linearSearchAnimations } from "./../searchingAlgorithms";

import Header from "./../../utils/header";
import ArrayTile from "./../arrayTile";

import BackBar from "./../../utils/backbar";

// Stylesheets
import "./linearSearch.css";

const NUMBER_OF_ARRAY_BARS = 15;
const DEFAULT_COLOR = "#6376f1";
const FOUND_COLOR = "#28B463";
const NOT_FOUND_COLOR = "#F16388";
const ANIMATION_SPEED_SECONDS = 1;

export default class LinearSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            found: false,
            disabled: false,
            elementFoundAt: 0,
            target: null,
            msgAfterExecution: "",
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        const prevArray = document.getElementsByClassName("l-array-bar");
        const found = false;
        const disabled = false;
        document.getElementById("targetVal").value = "";
        for (let idx = 0; idx < prevArray.length; idx++) {
            prevArray[idx].style.backgroundColor = DEFAULT_COLOR;
            prevArray[idx].classList.remove("growFind");
            prevArray[idx].classList.remove("highlight");
        }
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array, found, disabled, msgAfterExecution: "" });
    }

    linearSearch() {
        var msg = "";
        const target = document.getElementById("targetVal").value;
        if (target === "") return;
        const animations = linearSearchAnimations(this.state.array, target);
        console.log(animations);
        let count = 0;

        for (let i = 0; i < animations.length; i++) {
            const [idx, currentEle, found] = animations[i];
            const arrayBars = document.getElementsByClassName("l-array-bar");
            const arrayBar = arrayBars[idx];
            const arrayBarStyle = arrayBar.style;

            count++;

            if (found) {
                msg = `${currentEle} found at index ${idx}`;
                setTimeout(() => {
                    this.setState({
                        found: true,
                        disabled: true,
                        elementFoundAt: idx,
                        target: currentEle,
                    });
                    arrayBarStyle.backgroundColor = FOUND_COLOR;
                    arrayBar.classList.add("growFind");
                    arrayBar.classList.add("highlight");
                }, i * ANIMATION_SPEED_SECONDS * 1000);
                break;
            } else {
                msg = `${target} not found`;
                setTimeout(() => {
                    this.setState({
                        found: false,
                        disabled: true,
                    });
                    arrayBarStyle.backgroundColor = NOT_FOUND_COLOR;
                    arrayBar.classList.add("growFind");
                }, i * ANIMATION_SPEED_SECONDS * 1000);
            }
        }
        setTimeout(() => {
            this.setState({
                disabled: false,
                msgAfterExecution: msg,
            });
        }, (count + 1) * ANIMATION_SPEED_SECONDS * 1000);
    }

    render() {
        const { array, found, disabled, msgAfterExecution } = this.state;

        return (
            <div>
                <BackBar />
                <div className="jumbotron jumbotron-fluid bg-light">
                    <center>
                        <Header title="Linear Search" />
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="input-group col-sm-10">
                                    <input
                                        type="number"
                                        id="targetVal"
                                        className="form-control"
                                        placeholder="Find Element"
                                    />
                                    <div className="input-group-append">
                                        <button
                                            onClick={() => this.linearSearch()}
                                            className="btn btn-success"
                                            type="button"
                                            id="button-addon2"
                                            disabled={disabled}
                                        >
                                            Search
                                        </button>
                                        <button
                                            onClick={() => this.resetArray()}
                                            className="btn btn-danger"
                                            id="resetArray"
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
                        <br />
                        {!found ? (
                            <p className="found growFind">
                                {msgAfterExecution}
                            </p>
                        ) : null}
                        <div className="container">
                            {array.map((value, idx) => (
                                <ArrayTile
                                    type={`linearSearch`}
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
