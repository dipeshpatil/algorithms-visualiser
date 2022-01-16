import React from "react";

import { Container, Row, Col, Button, InputGroup, Form } from "react-bootstrap";
import GridNode from "./GridNode/GridNode";

import {highlightGrid, unHighlightGrid} from "./pathFinderUtils";

import config from "../utils/config";

import "./PathFinderV2.scss";

class PathFinderV2 extends React.Component {
  constructor() {
    super();

    this.state = {
      grid: [],
      gridRows:
        config.pathfinder.rows || Math.floor(window.screen.width / 10 / 2.5),
      gridCols:
        config.pathfinder.cols || Math.floor(window.screen.height / 10 / 3.2),
    };

    this.gridBoardRef = React.createRef();

    this.START_NODE_ROW = 1;
    this.START_NODE_COL = 1;
    this.FINISH_NODE_ROW = this.state.gridRows - 3;
    this.FINISH_NODE_COL = this.state.gridCols - 3;
  }

  componentDidMount() {
    const { gridRows, gridCols } = this.state;

    const gridBoard = this.gridBoardRef.current;
    gridBoard.style.setProperty("--p-grid-rows", gridRows);
    gridBoard.style.setProperty("--p-grid-cols", gridCols);

    console.log(gridRows, gridCols);

    const grid = new Array(gridRows);

    for (let i = 0; i < gridCols; i++) {
      grid[i] = new Array(gridRows);
      for (let j = 0; j < gridRows; j++) {
        grid[i][j] = this.createNode(i, j);
      }
    }

    this.setState({ grid });
  }

  highlightNodes(row, col) {
    highlightGrid(row, col, this.state.gridRows, this.state.gridCols);
  }

  unHighlightNodes(row, col) {
    unHighlightGrid(row, col, this.state.gridRows, this.state.gridCols);
  }

  createNode(row, col) {
    return {
      row,
      col,
      isStart: row === this.START_NODE_ROW && col === this.START_NODE_COL,
      isFinish: row === this.FINISH_NODE_ROW && col === this.FINISH_NODE_COL,
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

  render() {
    const { grid, gridRows, gridCols } = this.state;
    return (
      <Container>
        <Row>
          <Col sm={4}>
            <div className="btn-group btn-block mt-1">
              <Button
                size="sm"
                disabled={false}
                variant="danger"
                onClick={() => null}
              >
                Source
              </Button>
              <Button
                size="sm"
                disabled={false}
                variant="success"
                onClick={() => null}
              >
                Destination
              </Button>
              <Button
                size="sm"
                disabled={false}
                variant="dark"
                onClick={() => null}
              >
                Toggle Wall
              </Button>
            </div>
          </Col>
          <Col sm={4}>
            <div className="btn-group btn-block mt-1">
              <Button
                size="sm"
                disabled={false}
                variant="secondary"
                onClick={() => null}
              >
                Generate
              </Button>
              <Button
                size="sm"
                disabled={false}
                variant="danger"
                onClick={() => null}
              >
                Clear Maze
              </Button>
              <Button
                size="sm"
                disabled={false}
                variant="primary"
                onClick={() => null}
              >
                Clear Path
              </Button>
            </div>
          </Col>
          <Col sm={4}>
            <div className="btn-group btn-block mt-1">
              <InputGroup>
                <Form.Control
                  size="sm"
                  disabled={false}
                  id="pathFindingAlgoDropDown"
                  defaultValue="0"
                  as="select"
                >
                  <option disabled value="0">
                    Select Algorithm
                  </option>
                  <option value="1">Dijkstras</option>
                  <option value="2">Breadth First Search</option>
                  <option value="5">Depth First Search</option>
                  <option value="3">A* Search</option>
                  <option value="4">Bi-Directional Search</option>
                </Form.Control>
                <InputGroup.Append>
                  <Button
                    size="sm"
                    onClick={() => console.log(grid)}
                    disabled={false}
                    variant="success"
                  >
                    Perform Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Col>
        </Row>
        <div
          onMouseOut={() =>
            // this.unHighlightDiagonals()
            null
          }
          onMouseOver={() =>
            // this.highlightDiagonals()
            null
          }
          ref={this.gridBoardRef}
          className="gridBoard"
        >
          {grid.map((rows) => {
            return rows.map((node) => {
              const { row, col, isStart, isFinish, isWall } = node;
              return (
                <GridNode
                  key={`${row}-${col}`}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  row={row}
                  onNodeClick={(row, col) =>
                    // this.handleNodeOperations(
                    //   row,
                    //   col,
                    //   modifyingNodeState
                    // )
                    null
                  }
                  onNodeOver={(row, col) =>
                    this.highlightNodes(row, col)
                    // null
                  }
                  onNodeOut={(row, col) =>
                    this.unHighlightNodes(row, col)
                    // null
                  }
                />
              );
            });
          })}
        </div>
      </Container>
    );
  }
}

export default PathFinderV2;
