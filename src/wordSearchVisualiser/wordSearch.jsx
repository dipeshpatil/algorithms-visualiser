import React from "react";

import CHARS from "./wordSearch-utils/chars";
import Cell from "./Cell/Cell";
import { randomIntFromInterval } from "./../utils/randomIntFromInterval";

import { wordDFS } from "./algorithms/wordDFS";
import BackBar from "./../utils/backbar";
import ProblemStatement from "./wordSearch-utils/problemStatement";

const BOARD_SIZE = 10;

export default class WordSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            disabled: false,
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    clearBoard() {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                let cell = document.getElementById(`cell-${i}-${j}`);
                cell.className = "ws-cell default-cell";
                console.log(cell);
            }
        }
    }

    newBoard() {
        this.clearBoard();
        this.resetArray();
    }

    resetArray() {
        const gridBox = document.getElementById("ws-grid");
        gridBox.style.setProperty("--ws-grid-rows", BOARD_SIZE);
        gridBox.style.setProperty("--ws-grid-cols", BOARD_SIZE);

        const array = new Array(BOARD_SIZE);
        for (let i = 0; i < BOARD_SIZE; i++) {
            array[i] = new Array(BOARD_SIZE);
            for (let j = 0; j < BOARD_SIZE; j++) {
                array[i][j] = {
                    row: i,
                    col: j,
                    val: CHARS[randomIntFromInterval(0, CHARS.length - 1)],
                    found: false,
                    visited: false,
                };
            }
        }

        this.setState({ grid: array });
    }

    visualiseWordSearch() {
        const word = document.getElementById("word").value.toUpperCase();

        if (!word) {
            alert("Word must be provided");
            return;
        }

        this.setState({ disabled: true });

        const animations = [];
        const { grid } = this.state;
        wordDFS(grid, word, animations);

        const founds = animations.slice();
        const highlightSection = [];
        for (let k = 0; k < founds.length; k++) {
            let i = founds[k][0],
                j = founds[k][1],
                found = founds[k][3];
            if (found === "found") highlightSection.push([i, j]);
        }

        for (let i = 0; i < animations.length; i++) {
            const [row, col, testing, found] = animations[i];
            const cell = document.getElementById(`cell-${row}-${col}`);
            setTimeout(() => {
                if (testing === "testing") {
                    cell.classList = "ws-cell testing";
                } else if (found === "found") {
                    cell.classList = "ws-cell found-cell";
                } else {
                    cell.classList = "ws-cell not-found-cell";
                }
                cell.style.transition = "500ms all";

                if (i === animations.length - 1) {
                    this.setState({ disabled: false });
                    for (let k = 0; k < highlightSection.length; k++) {
                        const [i, j] = highlightSection[k];
                        setTimeout(() => {
                            document
                                .getElementById(`cell-${i}-${j}`)
                                .classList.add("ws-popupBlocks");
                        }, k * 50);
                    }
                }
            }, i * 500);
        }
    }

    render() {
        const { grid, disabled } = this.state;
        return (
            <div>
                <BackBar />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7 mt-1">
                            <div className="ws-box rounded shadowB">
                                <div className="ws-grid" id="ws-grid">
                                    {grid.map((ele) => {
                                        return ele.map((cell, idx) => {
                                            const {
                                                row,
                                                col,
                                                val,
                                                found,
                                                visited,
                                            } = cell;
                                            return (
                                                <Cell
                                                    key={`${row}-${col}`}
                                                    row={row}
                                                    col={col}
                                                    val={val}
                                                    visited={visited}
                                                    found={found}
                                                />
                                            );
                                        });
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-5 mt-2">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span
                                        className="input-group-text"
                                        id="basic-addon2"
                                    >
                                        Word
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    id="word"
                                    className="form-control"
                                    placeholder="Ex. BINOD"
                                />
                            </div>
                            <div
                                className="btn-group btn-block mt-2"
                                role="group"
                                aria-label="Basic example"
                            >
                                <button
                                    onClick={() => this.clearBoard()}
                                    type="button"
                                    disabled={disabled}
                                    className="btn btn-danger"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={() => this.newBoard()}
                                    type="button"
                                    disabled={disabled}
                                    className="btn btn-success"
                                >
                                    New
                                </button>
                                <button
                                    onClick={() => this.visualiseWordSearch()}
                                    type="button"
                                    disabled={disabled}
                                    className="btn btn-dark"
                                >
                                    Search
                                </button>
                            </div>
                            <ProblemStatement />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
