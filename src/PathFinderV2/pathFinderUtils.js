export function getNodeNeighbors(row, col, ROWS, COLS) {
  const nodeArray = [];
  for (let i = 0; i < ROWS; i++) {
    nodeArray.push([row, i]);
  }
  for (let j = 0; j < COLS; j++) {
    nodeArray.push([j, col]);
  }
  return nodeArray;
}

export function highlightGrid(row, col, ROWS, COLS) {
  const nodeArray = getNodeNeighbors(row, col, ROWS, COLS);
  for (const nodeVal of nodeArray) {
    const [nRow, nCol] = nodeVal;
    const node = document.getElementById(`gridNode-${nRow}-${nCol}`);

    if (nRow === parseInt(COLS / 2)) {
      node.classList.add("grid-plus-center");
    } else {
      node.classList.add("grid-plus");
    }

    if (nCol === parseInt(ROWS / 2)) {
      node.classList.add("grid-plus-center");
    } else {
      node.classList.add("grid-plus");
    }
  }
}

export function unHighlightGrid(row, col, ROWS, COLS) {
  const nodeArray = getNodeNeighbors(row, col, ROWS, COLS);
  for (const nodeVal of nodeArray) {
    const [nRow, nCol] = nodeVal;
    const node = document.getElementById(`gridNode-${nRow}-${nCol}`);

    if (nRow === parseInt(COLS / 2)) {
      node.classList.remove("grid-plus-center");
    } else {
      node.classList.remove("grid-plus");
    }

    if (nCol === parseInt(ROWS / 2)) {
      node.classList.remove("grid-plus-center");
    } else {
      node.classList.remove("grid-plus");
    }
  }
}

export function highlightGridDiagonals(nodes = [], ROWS, COLS) {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const { row, col } = nodes[i][j];
      if (row === col) {
        document
          .getElementById(`gridNode-${row}-${col}`)
          .classList.add("grid-plus-center");
      }
    }
  }
  for (let i = ROWS - 1; i >= 0; i--) {
    for (let j = 0; j < COLS; j++) {
      if (i + j === parseInt((ROWS - 1 + COLS) / 2)) {
        document.getElementById(`gridNode-${i}-${j}`).classList.add("grid-plus-center");
      }
    }
  }
}

export function unHighlightGridDiagonals(nodes = [], ROWS, COLS) {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const { row, col } = nodes[i][j];
      if (row === col) {
        document
          .getElementById(`gridNode-${row}-${col}`)
          .classList.remove("grid-plus-center");
      }
    }
  }
  for (let i = ROWS - 1; i >= 0; i--) {
    for (let j = 0; j < COLS; j++) {
      if (i + j === parseInt((ROWS - 1 + COLS) / 2)) {
        document
          .getElementById(`gridNode-${i}-${j}`)
          .classList.remove("grid-plus-center");
      }
    }
  }
}
