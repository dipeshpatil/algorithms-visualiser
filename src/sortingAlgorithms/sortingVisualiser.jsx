import React from "react";

import { randomIntFromInterval } from "../utils/randomIntFromInterval";
import ComplexityTable from "./complexityTable";
import {
    getMergeSortAnimations,
    getBubbleSortAnimations,
    getInsertionSortAnimations,
    getSelectionSortAnimations,
    getQuickSortAnimations,
    getHeapSortAnimations,
} from "./sortingAlgorithms";

import cellColors from "./cellColors";

// Stylesheets
import "./sortingVisualiser.css";

import BackBar from "./../utils/backbar";

var SELECTED = randomIntFromInterval(0, cellColors.length - 1);
const color = cellColors[SELECTED].reverse();

const SIZE_OF_BOARD = 20; // Size of Board -> N x N Size of 1D Array
var ANIMATION_SPEED = 1; // Greater Value -> Slower Animation
const CELL_CORNER_BORDER_RADIUS = 3;

export default class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < SIZE_OF_BOARD * SIZE_OF_BOARD; i++) {
            let val = randomIntFromInterval(0, color.length - 1);
            array.push(val);
        }
        this.setState({ array });
        this.drawBoard(array);
    }

    drawBoard(arrayBoard = []) {
        document.getElementById("sortingBoard").innerHTML = "";
        // creating the board
        const container = document.getElementById("sortingBoard");
        // Adding Rows and Columns to the board
        container.style.setProperty("--grid-rows", SIZE_OF_BOARD);
        container.style.setProperty("--grid-cols", SIZE_OF_BOARD);
        // Adding cells to the board
        for (let j = 0; j < arrayBoard.length; j++) {
            let cell = document.createElement("div");
            container.appendChild(cell).className = "grid-item";
            let cellStyle = cell.style;
            cellStyle.backgroundColor = color[arrayBoard[j]];

            // styling the corners
            if (j === 0) {
                cellStyle.borderTopLeftRadius = `${CELL_CORNER_BORDER_RADIUS}px`;
            } else if (j === SIZE_OF_BOARD - 1) {
                cellStyle.borderTopRightRadius = `${CELL_CORNER_BORDER_RADIUS}px`;
            } else if (j === SIZE_OF_BOARD * SIZE_OF_BOARD - 1) {
                cellStyle.borderBottomRightRadius = `${CELL_CORNER_BORDER_RADIUS}px`;
            } else if (j === SIZE_OF_BOARD * (SIZE_OF_BOARD - 1)) {
                cellStyle.borderBottomLeftRadius = `${CELL_CORNER_BORDER_RADIUS}px`;
            }
        }
    }

    selectAlgorithm() {
        let selectedValue = parseInt(
            document.getElementById("sortingAlgoDropDown").value
        );
        switch (selectedValue) {
            case 0:
                alert("Select An Algorithm First!");
                break;
            case 1:
                this.bubbleSort();
                break;
            case 2:
                this.selectionSort();
                break;
            case 3:
                this.insertionSort();
                break;
            case 4:
                this.quickSort();
                break;
            case 5:
                this.heapSort();
                break;
            case 6:
                this.mergeSort();
                break;
            default:
                break;
        }
    }

    visualiseAnimations(animations = [], speedFactor) {
        this.setState({ disabled: true });
        setTimeout(() => {
            const arrayBlocks = document.getElementsByClassName("grid-item");
            let count = 0;
            for (let i = 0; i < animations.length; i++) {
                const [idxOne, idxTwo, elemOne, elemTwo] = animations[i];
                const blockOne = arrayBlocks[idxOne];
                const blockTwo = arrayBlocks[idxTwo];
                const blockOneStyle = blockOne.style;
                const blockTwoStyle = blockTwo.style;

                setTimeout(() => {
                    blockOneStyle.backgroundColor = color[elemOne];
                    blockTwoStyle.backgroundColor = color[elemTwo];

                    blockOneStyle.transition = "150ms all";
                    blockTwoStyle.transition = "150ms all";
                }, ANIMATION_SPEED * speedFactor * (i + 1));
                count++;
            }

            setTimeout(() => {
                for (let i = 0; i < arrayBlocks.length; i++) {
                    setTimeout(() => {
                        arrayBlocks[i].classList.add("popupBlocks");
                    }, ANIMATION_SPEED * i);
                }
                this.setState({ disabled: false });
            }, ANIMATION_SPEED * speedFactor * (count + 1));
        }, 1000);
    }

    mergeSort() {
        this.setState({ disabled: true });
        setTimeout(() => {
            const animations = getMergeSortAnimations(this.state.array);
            let count = 0;
            const arrayBlocks = document.getElementsByClassName("grid-item");
            for (let i = 0; i < animations.length; i++) {
                setTimeout(() => {
                    const [blockOneIdx, newColor] = animations[i];
                    const blockOneStyle = arrayBlocks[blockOneIdx].style;
                    blockOneStyle.backgroundColor = color[newColor];
                    blockOneStyle.transition = "150ms all";
                }, i * ANIMATION_SPEED);
                count++;
            }
            setTimeout(() => {
                for (let i = 0; i < arrayBlocks.length; i++) {
                    setTimeout(() => {
                        arrayBlocks[i].classList.add("popupBlocks");
                    }, ANIMATION_SPEED * i);
                }
                this.setState({ disabled: false });
            }, ANIMATION_SPEED * (count + 1));
        }, 1000);
    }

    quickSort() {
        const animations = [];
        getQuickSortAnimations(
            this.state.array,
            0,
            this.state.array.length - 1,
            animations
        );
        this.visualiseAnimations(animations, 3.5);
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        this.visualiseAnimations(animations, 0.4);
    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        this.visualiseAnimations(animations, 0.8);
    }

    selectionSort() {
        const animations = getSelectionSortAnimations(this.state.array);
        this.visualiseAnimations(animations, 50);
    }

    heapSort() {
        const animations = [];
        getHeapSortAnimations(this.state.array, animations);
        this.visualiseAnimations(animations, 2);
    }

    render() {
        const { disabled } = this.state;
        return (
            <div>
                <BackBar />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7">
                            <div
                                className="box shadowT board"
                                id="sortingBoard"
                            ></div>
                        </div>
                        <div className="col-sm-5 mt-1">
                            <div className="input-group mt-1">
                                <div className="input-group-prepend">
                                    <button
                                        onClick={() => this.resetArray()}
                                        className="btn btn-danger"
                                        disabled={disabled}
                                    >
                                        New Array
                                    </button>
                                </div>
                                <select
                                    className="custom-select"
                                    id="sortingAlgoDropDown"
                                    disabled={disabled}
                                    defaultValue="0"
                                >
                                    <option disabled value="0">
                                        Algorithm
                                    </option>
                                    <option value="1">Bubble Sort</option>
                                    <option value="2">Selection Sort</option>
                                    <option value="3">Insertion Sort</option>
                                    <option value="4">Quick Sort</option>
                                    <option value="5">Heap Sort</option>
                                    <option value="6">Merge Sort</option>
                                </select>
                                <div className="input-group-append">
                                    <button
                                        onClick={() => this.selectAlgorithm()}
                                        className="btn btn-success"
                                        disabled={disabled}
                                    >
                                        Visualize
                                    </button>
                                </div>
                            </div>
                            <ComplexityTable />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
