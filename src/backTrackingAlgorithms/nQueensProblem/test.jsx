import React from "react";
// import Header from "./../../utils/header";

import {
    getNQueensAnimations,
    getRowsOfZeroes,
} from "./../backTrackingAlgorithms";

// Stylesheets
import "./../../utils/bootstrap.min.css";
import "./nQueensProblem.css";

const SIZE_OF_BOARD = 4;
const ANIMATION_SPEED_SECONDS = 0.5;

const CELL_COLOR = "#BFC9CA";
const SAFE_COLOR = "#DC143C";
const CROWN_COLOR = "#FFFFFF";
const SAFE = "#2ECC71";

export default class NQueensProblem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board: [],
        };
    }

    componentDidMount() {
        this.resetArray(SIZE_OF_BOARD);
        this.drawBoard(SIZE_OF_BOARD);
    }

    resetArray(SIZE) {
        const array = [];
        for (let i = 0; i < SIZE; i++) {
            array.push(getRowsOfZeroes(SIZE));
            // console.log(getRowsOfZeroes(SIZE_OF_BOARD));
        }
        this.setState({ board: array });
        console.log(array);
    }

    drawBoard(SIZE) {
        let padding = 0;
        let fontSize = 0;

        document.getElementById("board").innerHTML = "";

        switch (SIZE) {
            case 1:
            case 2:
            case 3:
            case 4:
                padding = 20;
                fontSize = 30;
                break;
            case 5:
            case 6:
                padding = 10;
                fontSize = 25;
                break;
            case 7:
                padding = 7;
                fontSize = 20;
                break;
            case 8:
                padding = 7;
                fontSize = 18;
                break;
            case SIZE >= 9:
                padding = 7;
                fontSize = 15;
                break;
            default:
                fontSize = 10;
                padding = 0;
        }

        const container = document.getElementById("board");
        container.style.setProperty("--grid-rows", SIZE);
        container.style.setProperty("--grid-cols", SIZE);
        for (let j = 0; j < SIZE * SIZE; j++) {
            let cell = document.createElement("div");
            let item = document.createElement("i");

            cell.appendChild(item).className = "fas fa-crown";
            container.appendChild(cell).className = "grid-item q-array-tile";
        }
        const arrayTiles = document.getElementsByClassName("q-array-tile");
        const crownsI = document.getElementsByClassName("fas");
        for (let l = 0; l < arrayTiles.length; l++) {
            arrayTiles[l].style.padding = `${padding}px`;
            arrayTiles[l].style.backgroundColor = CELL_COLOR;
            crownsI[l].style.fontSize = `${fontSize}px`;
            crownsI[l].style.color = CROWN_COLOR;
        }
    }

    NQueensProblem() {
        let BOARD_S = parseInt(document.getElementById("boardInput").value);
        this.resetArray(BOARD_S);
        this.drawBoard(BOARD_S);
        const { board } = this.state;
        const size = board.length;
        const NQueensAnimations = [];
        let count = 0;

        getNQueensAnimations(board, NQueensAnimations);
        console.log(NQueensAnimations);

        let msg = "";

        const arrayTiles = document.getElementsByClassName("q-array-tile");
        console.log(arrayTiles);
        const crown = document.getElementsByClassName("fa-crown");

        const resultsDiv = document.getElementById("results");

        for (let i = 0; i < NQueensAnimations.length; i++) {
            count++;

            const [row, col, isQueenSafe] = NQueensAnimations[i];
            const idx = size * row + col;
            let alert = document.createElement("div");
            alert.classList.add("alert");
            setTimeout(() => {
                if (isQueenSafe) {
                    arrayTiles[idx].style.backgroundColor = SAFE_COLOR;
                    crown[idx].classList.add("popupQueen");
                    arrayTiles[idx].style.transition = "200ms all";
                    msg = `Trying Queen at row ${row} and col ${col}`;
                    alert.classList.add("alert-success");
                    arrayTiles[idx].classList.add("safe-queen");
                } else {
                    arrayTiles[idx].style.backgroundColor = CELL_COLOR;
                    crown[idx].classList.remove("popupQueen");
                    arrayTiles[idx].style.transition = "200ms all";
                    msg = `row ${row} and col ${col} didn't work out. Backtracking`;
                    alert.classList.add("alert-danger");
                    arrayTiles[idx].classList.remove("safe-queen");
                }
                alert.innerHTML = msg;
                resultsDiv.appendChild(alert);
                // console.log([row, col, isQueenSafe]);
            }, ANIMATION_SPEED_SECONDS * 1000 * i);
        }

        const trueValues = document.getElementsByClassName("safe-queen");
        // console.log(trueValues);

        setTimeout(() => {
            for (let i = 0; i < trueValues.length; i++) {
                trueValues[i].style.backgroundColor = SAFE;
                trueValues[i].style.transition = "300ms all";
            }
        }, (count + 1) * ANIMATION_SPEED_SECONDS * 1000);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="box board" id="board"></div>
                            <input
                                type="text"
                                id="boardInput"
                                placeholder="Board Size"
                                defaultValue="4"
                            />
                            <button
                                className="btn btn-primary"
                                onClick={() => this.NQueensProblem()}
                            >
                                Visualise NQueens
                            </button>
                        </div>
                        <div id="results" className="col-sm-4">
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
