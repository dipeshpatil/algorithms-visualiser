/**
 * @author Dipesh Vinod Patil <thedipeshpatil@gmail.com>
 */

import React from "react";

//  Importing Node Component to display Node on Grid
import Node from "./Node/Node";

//  Pathfinding Algorithms
import { dijkstra } from "./pathFindingAlgorithms/dijkstra";
import { bfs } from "./pathFindingAlgorithms/breadthFirstSearch";
import { dfs } from "./pathFindingAlgorithms/depthFirstSearch";
import { astar } from "./pathFindingAlgorithms/astar";
import { bidirectionalSearch } from "./pathFindingAlgorithms/bidirectionalSearch";

//  Maze Generation Algorithm
import { generateMaze } from "./generateMaze";

import BackBar from "./../utils/backbar";

//  Highlight Board Functions
import {
    highlightGrid,
    unHighlightGrid,
    highlightGridDiagonals,
    unHighlightGridDiagonals,
} from "./pathfinder-utils/highlightMazeNodes";

//  Legend Component
import Legend from "./pathfinder-utils/legend";

//  Complexity table
import ComplexityTable from "./pathfinder-utils/complexityTable";

//  Stylesheets
import "./pathfinderVisualiser.css";

//  Constants to toggle Start/Finish/Wall on Grid
const START_NODE_STATE = 1;
const END_NODE_STATE = 2;
const WALL_NODE_STATE = 3;

// Speed Factor
var SPEED;

// Screen Resolution
var SCREEN_WIDTH = window.screen.width;
var ROWS, COLS;

// Adjusting the Grid according to Screen Width
// For better responsiveness and interactivity.
if (SCREEN_WIDTH > 1440 && SCREEN_WIDTH <= 2560) {
    // TVs and Large Screen Laptops
    ROWS = 61;
    COLS = 61;
    SPEED = 10;
} else if (SCREEN_WIDTH >= 768 && SCREEN_WIDTH <= 1440) {
    // Laptops & Tablets
    ROWS = 53;
    COLS = 53;
    SPEED = 15;
} else if (SCREEN_WIDTH > 425 && SCREEN_WIDTH <= 767) {
    // IPads and Smaller Laptops
    ROWS = 47;
    COLS = 47;
    SPEED = 20;
} else if (SCREEN_WIDTH >= 320 && SCREEN_WIDTH <= 425) {
    // Mobile Devices
    ROWS = 37;
    COLS = 37;
    SPEED = 25;
} else if (SCREEN_WIDTH >= 120 && SCREEN_WIDTH <= 319) {
    // Mobile Devices with Smaller Screens
    ROWS = 21;
    COLS = 21;
    SPEED = 25;
} else {
    // Default Case
    ROWS = 41;
    COLS = 41;
    SPEED = 18;
}

console.log(`Rows: ${ROWS}, Cols: ${COLS}`);

export default class PathFinderVisualiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            modifyingNodeState: 0,
            START_NODE_ROW: 2,
            START_NODE_COL: 2,
            FINISH_NODE_ROW: ROWS - 3,
            FINISH_NODE_COL: COLS - 3,

            disableMazesButton: false,
            disableNodesButton: false,
            disableClearMazeButton: false,
            disableClearPathButton: false,
            disableAlgoDropdown: false,
            disablePerformButton: false,

            highlightMazeNodes: true,
            isGridDiagonalsHighlighted: false,
            speed: SPEED,
        };
    }

    componentDidMount() {
        this.setUpGrid();
        this.setState({
            disableClearMazeButton: true,
            disableClearPathButton: true,
        });
    }

    setUpGrid() {
        const gridBox = document.getElementById("grid");
        gridBox.style.setProperty("--p-grid-rows", ROWS);
        gridBox.style.setProperty("--p-grid-cols", COLS);

        const grid = new Array(COLS);

        for (let i = 0; i < ROWS; i++) {
            grid[i] = new Array(ROWS);
            for (let j = 0; j < COLS; j++) {
                grid[i][j] = this.createNode(i, j);
            }
        }

        this.setState({ grid });
    }

    createNode(row, col) {
        const {
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
        } = this.state;
        return {
            row,
            col,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
            cost: {
                F: Infinity,
                G: Infinity,
                H: Infinity,
            },
        };
    }

    clearBoard() {
        this.setUpGrid();
        const grid = this.state.grid;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                const node = grid[i][j];
                document
                    .getElementById(`node-${node.row}-${node.col}`)
                    .classList.remove("node-visited");
                document
                    .getElementById(`node-${node.row}-${node.col}`)
                    .classList.remove("node-shortest-path");
            }
        }
        this.setState({
            disableMazesButton: false,
            disableNodesButton: false,
            disableClearPathButton: true,
            disableClearMazeButton: true,
            disableAlgoDropdown: false,
            disablePerformButton: false,
            highlightMazeNodes: true,
        });
    }

    clearPath() {
        const { grid } = this.state;
        const temp = grid.slice();
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                let node = temp[i][j];
                if (node.isVisited) {
                    node.isVisited = false;
                    document
                        .getElementById(`node-${node.row}-${node.col}`)
                        .classList.remove("node-visited");
                    document
                        .getElementById(`node-${node.row}-${node.col}`)
                        .classList.remove("node-shortest-path");
                }
            }
        }
        this.setState({
            disableMazesButton: true,
            disableNodesButton: true,
            disableAlgoDropdown: false,
            disablePerformButton: false,
            highlightMazeNodes: true,
        });
    }

    highlightNodes(row, col) {
        if (this.state.highlightMazeNodes) {
            highlightGrid(row, col, ROWS, COLS);
        }
    }

    unHighlightNodes(row, col) {
        if (this.state.highlightMazeNodes) {
            unHighlightGrid(row, col, ROWS, COLS);
        }
    }

    // change `isGridDiagonalsHighlighted` to true in state
    // to highlight diagonals on board

    highlightDiagonals() {
        if (this.state.isGridDiagonalsHighlighted) {
            highlightGridDiagonals(this.state.grid, ROWS, COLS);
        }
    }

    unHighlightDiagonals() {
        if (this.state.isGridDiagonalsHighlighted) {
            unHighlightGridDiagonals(this.state.grid, ROWS, COLS);
        }
    }

    handleNodeOperations(row, col, NODE_STATE) {
        const {
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
            grid,
        } = this.state;
        switch (NODE_STATE) {
            case 1:
                if (
                    this.toggleStartOrFinish(
                        grid,
                        row,
                        col,
                        START_NODE_ROW,
                        START_NODE_COL,
                        "START"
                    )
                ) {
                    this.setState({
                        START_NODE_ROW: row,
                        START_NODE_COL: col,
                    });
                }
                break;
            case 2:
                if (
                    this.toggleStartOrFinish(
                        grid,
                        row,
                        col,
                        FINISH_NODE_ROW,
                        FINISH_NODE_COL,
                        "FINISH"
                    )
                ) {
                    this.setState({
                        FINISH_NODE_ROW: row,
                        FINISH_NODE_COL: col,
                    });
                }
                break;
            case 3:
                this.toggleWall(grid, row, col);
                break;
            default:
                break;
        }
    }

    toggleStartOrFinish(grid = [], row, col, NODE_ROW, NODE_COL, nodeType) {
        const newGrid = grid.slice();

        const currentNode = newGrid[NODE_ROW][NODE_COL];
        const newNode = newGrid[row][col];

        if (nodeType === "START") {
            if (newNode.isWall || newNode.isFinish) {
                return false;
            } else {
                currentNode.isStart = false;
                newNode.isStart = true;
                this.setState({
                    grid: newGrid,
                });
                return true;
            }
        } else if (nodeType === "FINISH") {
            if (newNode.isWall || newNode.isStart) {
                return false;
            } else {
                currentNode.isFinish = false;
                newNode.isFinish = true;
                this.setState({
                    grid: newGrid,
                });
                return true;
            }
        } else {
            return false;
        }
    }

    toggleWall(grid, row, col) {
        const newGrid = grid.slice();
        const currentNode = newGrid[row][col];
        if (!currentNode.isFinish && !currentNode.isStart) {
            currentNode.isWall = !currentNode.isWall;
            this.setState({ grid: newGrid });
        }
    }

    generateMaze(grid = []) {
        this.setState({
            disableMazesButton: true,
            disableClearPathButton: true,
            disableClearMazeButton: false,
        });
        const mazeGrid = generateMaze(grid);
        this.setState({ grid: mazeGrid });
    }

    modifyNodeState(STATE) {
        this.setState({ modifyingNodeState: STATE });
    }

    selectAlgorithm() {
        const algorithm = parseInt(
            document.getElementById("pathFindingAlgoDropDown").value
        );
        if (algorithm !== 0) this.visualiseAlgorithms(algorithm);
        else {
            alert("Select an Algorithm first!");
            return;
        }
    }

    visualiseAlgorithms(algorithm) {
        this.setState({
            disableNodesButton: true,
            disableMazesButton: true,
            disableClearMazeButton: true,
            disableClearPathButton: true,
            disableAlgoDropdown: true,
            disablePerformButton: true,
            modifyingNodeState: 0,
        });
        const {
            grid,
            START_NODE_COL,
            START_NODE_ROW,
            FINISH_NODE_COL,
            FINISH_NODE_ROW,
        } = this.state;

        const STARTNODE = grid[START_NODE_ROW][START_NODE_COL];
        const FINISHNODE = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

        var visitedNodesInOrder, nodesInShortestPathOrder;

        switch (algorithm) {
            case 0:
                alert("Select an algorithm first!");
                this.setState({
                    disableMazesButton: false,
                    disableNodesButton: false,
                });
                return;
            case 1:
                [visitedNodesInOrder, nodesInShortestPathOrder] = dijkstra(
                    grid,
                    STARTNODE,
                    FINISHNODE
                );
                break;
            case 2:
                [visitedNodesInOrder, nodesInShortestPathOrder] = bfs(
                    grid,
                    STARTNODE,
                    FINISHNODE
                );
                break;
            case 3:
                [visitedNodesInOrder, nodesInShortestPathOrder] = astar(
                    grid,
                    STARTNODE,
                    FINISHNODE
                );
                break;
            case 4:
                const [
                    source_visited,
                    dest_visited,
                    sPathNodes,
                    dPathNodes,
                ] = bidirectionalSearch(grid, STARTNODE, FINISHNODE);
                this.animatePath(source_visited, sPathNodes);
                this.animatePath(dest_visited, dPathNodes);
                return;
            case 5:
                [visitedNodesInOrder, nodesInShortestPathOrder] = dfs(
                    grid,
                    STARTNODE,
                    FINISHNODE
                );
                break;
            default:
                return;
        }
        this.animatePath(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    animatePath(visitedNodesInOrder = [], nodesInShortestPathOrder = []) {
        this.setState({ disableNodesButton: true, highlightMazeNodes: false });
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, SPEED * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if (!node.isStart && !node.isFinish && !node.isWall) {
                    document.getElementById(
                        `node-${node.row}-${node.col}`
                    ).className = "node node-visited";
                }
            }, SPEED * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder = []) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (!node.isStart && !node.isFinish && !node.isWall) {
                    document.getElementById(
                        `node-${node.row}-${node.col}`
                    ).classList = "node node-shortest-path";
                }
                if (node.isFinish) {
                    setTimeout(() => {
                        this.setState({
                            disableClearMazeButton: false,
                            disableClearPathButton: false,
                        });
                    }, 1000);
                }
            }, SPEED * 1.4 * i);
        }
    }

    render() {
        const {
            grid,
            modifyingNodeState,
            disableMazesButton,
            disableNodesButton,
            disableClearMazeButton,
            disableClearPathButton,
            disableAlgoDropdown,
            disablePerformButton,
        } = this.state;
        return (
            <div>
                <BackBar />
                <div
                    className="container-fluid"
                    style={{ marginTop: "-10px", backgroundColor: "#262626" }}
                >
                    <div className="row">
                        <div className="col-sm-8 mt-2">
                            <div className="box_p rounded shadowT">
                                <div
                                    onMouseOut={() =>
                                        this.unHighlightDiagonals()
                                    }
                                    onMouseOver={() =>
                                        this.highlightDiagonals()
                                    }
                                    id="grid"
                                    className="grid"
                                >
                                    {grid.map((node, idx) => {
                                        return node.map((cell, idx) => {
                                            const {
                                                row,
                                                col,
                                                isStart,
                                                isFinish,
                                                isWall,
                                            } = cell;
                                            return (
                                                <Node
                                                    key={`${row}-${col}`}
                                                    col={col}
                                                    isFinish={isFinish}
                                                    isStart={isStart}
                                                    isWall={isWall}
                                                    row={row}
                                                    onNodeClick={(row, col) =>
                                                        this.handleNodeOperations(
                                                            row,
                                                            col,
                                                            modifyingNodeState
                                                        )
                                                    }
                                                    onNodeOver={(row, col) =>
                                                        this.highlightNodes(
                                                            row,
                                                            col
                                                        )
                                                    }
                                                    onNodeOut={(row, col) =>
                                                        this.unHighlightNodes(
                                                            row,
                                                            col
                                                        )
                                                    }
                                                />
                                            );
                                        });
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 mt-2">
                            <div className="btn-group btn-block">
                                <button
                                    type="button"
                                    disabled={disableNodesButton}
                                    className="btn bg-start"
                                    onClick={() =>
                                        this.modifyNodeState(START_NODE_STATE)
                                    }
                                >
                                    Place Source
                                </button>
                                <button
                                    type="button"
                                    disabled={disableNodesButton}
                                    className="btn bg-end"
                                    onClick={() =>
                                        this.modifyNodeState(END_NODE_STATE)
                                    }
                                >
                                    Place Destination
                                </button>
                                <button
                                    type="button"
                                    disabled={disableNodesButton}
                                    className="btn bg-wall"
                                    onClick={() =>
                                        this.modifyNodeState(WALL_NODE_STATE)
                                    }
                                >
                                    Toggle Wall
                                </button>
                            </div>
                            <div className="btn-group btn-block mt-2">
                                <button
                                    type="button"
                                    disabled={disableMazesButton}
                                    className="btn btn-secondary"
                                    onClick={() => this.generateMaze(grid)}
                                >
                                    Generate Maze
                                </button>
                                <button
                                    type="button"
                                    disabled={disableClearMazeButton}
                                    className="btn btn-danger"
                                    onClick={() => this.clearBoard()}
                                >
                                    Clear Maze
                                </button>
                                <button
                                    type="button"
                                    disabled={disableClearPathButton}
                                    className="btn btn-primary"
                                    onClick={() => this.clearPath()}
                                >
                                    Clear Path
                                </button>
                            </div>
                            <div className="btn-group btn-block mt-2">
                                <div className="input-group">
                                    <select
                                        disabled={disableAlgoDropdown}
                                        id="pathFindingAlgoDropDown"
                                        className="custom-select"
                                        defaultValue="0"
                                    >
                                        <option disabled value="0">
                                            Select Algorithm
                                        </option>
                                        <option value="1">Dijkstras</option>
                                        <option value="2">
                                            Breadth First Search
                                        </option>
                                        <option value="5">
                                            Depth First Search
                                        </option>
                                        <option value="3">A* Search</option>
                                        <option value="4">
                                            Bi-Directional Search
                                        </option>
                                    </select>
                                    <div className="input-group-append">
                                        <button
                                            disabled={disablePerformButton}
                                            onClick={() =>
                                                this.selectAlgorithm()
                                            }
                                            className="btn bg-perform"
                                        >
                                            Perform Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Legend />
                            <ComplexityTable />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
