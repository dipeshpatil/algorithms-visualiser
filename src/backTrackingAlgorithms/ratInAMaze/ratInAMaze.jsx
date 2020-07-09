import React from "react";

import BackBar from "./../../utils/backbar";

import {
    solveMaze,
    prepareSolutionBoardOfZeroes,
} from "./../backTrackingAlgorithms";
import { randomIntFromInterval } from "./../../utils/randomIntFromInterval";
// Stylesheets
import "./ratInAMaze.css";

import MAZES from "./arrayofMazes";

const MAZE = MAZES[randomIntFromInterval(0, MAZES.length - 1)];
// const MAZE = MAZES[2];
const SOL = prepareSolutionBoardOfZeroes(MAZE.length);

const NO_PATH_COLOR = "#ededed";
const PATH_COLOR = "#ADD2FE";
const SAFE_COLOR = "#B0FCEF";

const ANIMATION_SPEED_MS = 1000;

export default class RatInAMazeProblem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.drawBoard(MAZE);
    }

    testAlgo() {
        const sol = solveMaze(MAZE, SOL, []);

        const animations = sol[1];
        const solution = sol[0];

        const blocks = document.getElementsByClassName("r-array-tile");
        const rat = document.getElementsByClassName("rat");
        let count = 0;

        const finalPath = [];
        for (let i = 0; i < solution.length; i++) {
            for (let j = 0; j < solution.length; j++) {
                let idx = MAZE.length * i + j;
                if (solution[i][j] === 1) {
                    finalPath.push(idx);
                }
            }
        }

        for (let i = 0; i < animations.length; i++) {
            const [x, y, isRatSafe] = animations[i]; // current
            const idx = x * MAZE.length + y;
            const blockStyle = blocks[idx].style;

            setTimeout(() => {
                if (isRatSafe) {
                    blockStyle.backgroundColor = SAFE_COLOR;
                    rat[idx].innerHTML = "🐀";
                    rat[idx].classList.add("flipH");
                } else {
                    blockStyle.backgroundColor = PATH_COLOR;
                    rat[idx].innerHTML = "";
                    rat[idx].classList.remove("flipH");
                }
            }, i * ANIMATION_SPEED_MS);
            count = i;
        }

        setTimeout(() => {
            for (let i = 0; i < finalPath.length; i++) {
                setTimeout(() => {
                    blocks[finalPath[i]].classList.add("highlightPath");
                }, i * 40);
            }
        }, (count + 1) * ANIMATION_SPEED_MS);
    }

    drawBoard(MAZE = []) {
        const ROWS = MAZE.length;
        const COLS = MAZE[0].length;

        const maze = document.getElementById("ratMazeBoard");
        maze.innerHTML = "";

        maze.style.setProperty("--Rgrid-rows", ROWS);
        maze.style.setProperty("--Rgrid-cols", COLS);

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                let cell = document.createElement("div");
                let item = document.createElement("i");
                let cellStyle = cell.style;
                cell.appendChild(item).className = "fas rat";

                if (i === 0 && j === 0) {
                    cell.appendChild(item).classList.add("flipH");
                    item.innerHTML = "🐀";
                }

                if (i === ROWS - 1 && j === COLS - 1) {
                    cell.appendChild(item).classList.add("flipH");
                    item.innerHTML = "🚪";
                }

                if (MAZE[i][j] === 1) {
                    cellStyle.backgroundColor = PATH_COLOR;
                } else {
                    cellStyle.backgroundColor = NO_PATH_COLOR;
                }

                maze.appendChild(cell).className = "Rgrid-item r-array-tile";
            }
        }
    }

    render() {
        return (
            <div>
                <BackBar />
                <h2 className="text-center mt-2">Rat In A Maze</h2>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-7">
                            <div
                                className="Rbox Rboard mt-2"
                                id="ratMazeBoard"
                            ></div>
                        </div>
                        <div className="col-sm-5 mt-2">
                            <button
                                onClick={() => this.testAlgo()}
                                className="btn btn-sm btn-primary"
                            >
                                Visualize Algorithm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
