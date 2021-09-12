export function highlightGrid(row, col, ROWS, COLS) {
  const nodeArray = getNodeNeighbors(row, col, ROWS, COLS);
  for (const nodeVal of nodeArray) {
    const [nRow, nCol] = nodeVal;
    const node = document.getElementById(`f-node-${nRow}-${nCol}`);
    console.log(node);

    if (nRow === parseInt(ROWS / 2)) {
      node.classList.add("plus-center");
    } else {
      node.classList.add("plus");
    }

    if (nCol === parseInt(COLS / 2)) {
      node.classList.add("plus-center");
    } else {
      node.classList.add("plus");
    }
  }
}

export function unHighlightGrid(row, col, ROWS, COLS) {
  const nodeArray = getNodeNeighbors(row, col, ROWS, COLS);
  for (const nodeVal of nodeArray) {
    const [nRow, nCol] = nodeVal;
    const node = document.getElementById(`f-node-${nRow}-${nCol}`);

    if (nRow === parseInt(ROWS / 2)) {
      node.classList.remove("plus-center");
    } else {
      node.classList.remove("plus");
    }

    if (nCol === parseInt(COLS / 2)) {
      node.classList.remove("plus-center");
    } else {
      node.classList.remove("plus");
    }
  }
}

function getNodeNeighbors(row, col, ROWS, COLS) {
  const nodeArray = [];
  for (let i = 0, j = 0; i < ROWS || j < COLS; i++, j++) {
    nodeArray.push([row, i]);
    nodeArray.push([j, col]);
  }
  return nodeArray;
}
