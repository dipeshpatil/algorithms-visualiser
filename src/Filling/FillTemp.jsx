import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import './Filling.css';

import Node from './Node/Node';
import BackBar from '../utils/backbar';

import PATTERNS from './fill-utils/patterns';

import {
  highlightGrid,
  unHighlightGrid,
} from './fill-utils/highlightGridNodes';

import {
  floodFillRecursive,
  floodFillQueue,
  floodFillStack,
} from './fillingAlgorithms/floodFill';

const SEED_STATE = 1;
const BOUNDARY_STATE = 2;

var ROWS = 50,
  COLS = 50;

var SPEED = 20;

export default class Filling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      highlightMazeNodes: false,
      modifyingNodeState: BOUNDARY_STATE,
      FILL_COLOR: 1,
      SEED_ROW: 1,
      SEED_COL: 1,
    };
  }

  componentDidMount() {
    this.setupGrid();
  }

  setupGrid() {
    const gridBox = document.getElementById('grid-f');
    gridBox.style.setProperty('--f-grid-rows', ROWS);
    gridBox.style.setProperty('--f-grid-cols', COLS);

    const grid = new Array(ROWS);

    for (let i = 0; i < ROWS; i++) {
      grid[i] = new Array(ROWS);
      for (let j = 0; j < COLS; j++) grid[i][j] = this.createNode(i, j);
    }

    this.setState({ grid });
  }

  createNode(row, col) {
    return {
      row,
      col,
      isFilled: false,
      isBoundary: false,
      isEmpty: true,
      backgroundColor: 'node-empty',
    };
  }

  highlightNodes(row, col) {
    if (this.state.highlightMazeNodes) highlightGrid(row, col, ROWS, COLS);
  }

  unHighlightNodes(row, col) {
    if (this.state.highlightMazeNodes) unHighlightGrid(row, col, ROWS, COLS);
  }

  handleNodeClick(row, col, NODE_STATE) {
    const { grid } = this.state;
    const currentNode = grid[row][col];
    if (NODE_STATE === BOUNDARY_STATE) {
      if (currentNode.isEmpty) {
        currentNode.isEmpty = false;
        currentNode.isFilled = false;
        currentNode.isBoundary = true;
      } else {
        currentNode.isEmpty = true;
        currentNode.isFilled = false;
        currentNode.isBoundary = false;
      }
      grid[row][col] = currentNode;
      this.setState({ grid });
    } else if (NODE_STATE === SEED_STATE) {
      this.setState({
        SEED_ROW: currentNode.row,
        SEED_COL: currentNode.col,
      });
      alert(`SEED SET AS ROW:${currentNode.row}, COL:${currentNode.col}`);
    }
  }

  visualise(animations = []) {
    const { FILL_COLOR, grid } = this.state;
    if (animations.length === 0) return;

    for (let i = 0; i < animations.length; i++) {
      const [x, y] = animations[i];
      setTimeout(() => {
        const nodeDiv = document.getElementById(`f-node-${x}-${y}`);
        nodeDiv.style.transition = '200ms all';
        nodeDiv.className = `f-node node-color-${FILL_COLOR}`;
        grid[x][y].backgroundColor = `node-color-${FILL_COLOR}`;

        if (i === animations.length - 1) this.setState({ grid });
      }, (i + 1) * SPEED);
    }
  }

  selectAlgorithm() {
    var animations = [];
    const { grid, SEED_ROW, SEED_COL } = this.state;
    const choice = parseInt(
      document.getElementById('floodFillAlgoDropDown').value
    );
    switch (choice) {
      case 0:
        alert('Select An Algorithm!');
        return;
      case 1:
        animations = floodFillRecursive(grid, SEED_ROW, SEED_COL);
        break;
      case 2:
        animations = floodFillStack(grid, SEED_ROW, SEED_COL);
        break;
      case 3:
        animations = floodFillQueue(grid, SEED_ROW, SEED_COL);
        break;
      default:
        return;
    }
    this.visualise(animations);
  }

  selectPattern() {
    const choice = parseInt(document.getElementById('patternDropDown').value);
    switch (choice) {
      case 0:
        alert('Select Pattern!');
        return;
      case 1:
        this.setState({ grid: PATTERNS[0] });
        break;
      default:
        return;
    }
  }

  modifyNodeState(NODE_STATE) {
    this.setState({ modifyingNodeState: NODE_STATE });
  }

  selectColor() {
    const choice = parseInt(
      document.getElementById('floodFillColorDropDown').value
    );
    if (choice === 0) alert('Select Color!');
    this.setState({ FILL_COLOR: choice });
  }

  logGrid() {
    const { grid } = this.state;
    console.log(grid);
  }

  render() {
    const { grid, modifyingNodeState } = this.state;
    return (
      <div>
        <BackBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div id="grid-f" className="grid-f shadowF">
                {grid.map((node, idx) => {
                  return node.map((cell, idx) => {
                    const {
                      row,
                      col,
                      isFilled,
                      isEmpty,
                      isBoundary,
                      backgroundColor,
                    } = cell;
                    return (
                      <Node
                        key={`${row}-${col}`}
                        col={col}
                        row={row}
                        isEmpty={isEmpty}
                        isFilled={isFilled}
                        isBoundary={isBoundary}
                        backgroundColor={backgroundColor}
                        onNodeOver={(row, col) => this.highlightNodes(row, col)}
                        onNodeOut={(row, col) =>
                          this.unHighlightNodes(row, col)
                        }
                        onNodeClick={(row, col) =>
                          this.handleNodeClick(row, col, modifyingNodeState)
                        }
                      />
                    );
                  });
                })}
              </div>
            </div>
            <div className="col-sm-4 mt-1">
              <div className="btn-group btn-block">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.modifyNodeState(SEED_STATE)}
                >
                  Set Seed
                </button>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => this.modifyNodeState(BOUNDARY_STATE)}
                >
                  Set Boundary
                </button>
              </div>
              <div className="input-group mt-2">
                <select
                  id="patternDropDown"
                  className="custom-select"
                  defaultValue="0"
                >
                  <option disabled value="0">
                    Select Pattern
                  </option>
                  <option value="1">Abstract Shape</option>
                </select>
                <div className="input-group-append">
                  <button
                    onClick={() => this.selectPattern()}
                    className="btn btn-primary"
                  >
                    Set Pattern
                  </button>
                </div>
              </div>
              <div className="input-group mt-2">
                <select
                  id="floodFillColorDropDown"
                  className="custom-select"
                  defaultValue="0"
                >
                  <option disabled value="0">
                    Select Color
                  </option>
                  <option value="1">Red</option>
                  <option value="2">Green</option>
                  <option value="3">Blue</option>
                  <option value="4">Yellow</option>
                  <option value="5">Purple</option>
                  <option value="6">Pink</option>
                </select>
                <div className="input-group-append">
                  <button
                    onClick={() => this.selectColor()}
                    className="btn btn-primary"
                  >
                    Set
                  </button>
                </div>
              </div>
              <div className="input-group mt-2">
                <select
                  id="floodFillAlgoDropDown"
                  className="custom-select"
                  defaultValue="0"
                >
                  <option disabled value="0">
                    Select Algorithm
                  </option>
                  <option value="1">Flood Fill Recursive</option>
                  <option value="2">Flood Fill Stack</option>
                  <option value="3">Flood Fill Queue</option>
                </select>
                <div className="input-group-append">
                  <button
                    onClick={() => this.selectAlgorithm()}
                    className="btn btn-primary"
                  >
                    Perform Fill
                  </button>
                </div>
              </div>
              <div className="btn-group mt-2 btn-block">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => this.logGrid()}
                >
                  Log Grid
                </button>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => null}
                >
                  Set Boundary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
