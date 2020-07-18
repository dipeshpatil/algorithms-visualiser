function getNodeNeighbors(row, col, ROWS, COLS) {
    const nodeArray = [];
    for (let i = 0, j = 0; i < ROWS || j < COLS; i++, j++) {
        nodeArray.push([row, i]);
        nodeArray.push([j, col]);
    }
    return nodeArray;
}

export function highlightGrid(row, col, ROWS, COLS) {
    const nodeArray = getNodeNeighbors(row, col, ROWS, COLS);
    for (const nodeVal of nodeArray) {
        const [nRow, nCol] = nodeVal;
        const node = document.getElementById(`node-${nRow}-${nCol}`);

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
        const node = document.getElementById(`node-${nRow}-${nCol}`);

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

export function highlightGridDiagonals(nodes = [], ROWS, COLS) {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const { row, col } = nodes[i][j];
            if (row === col) {
                document
                    .getElementById(`node-${row}-${col}`)
                    .classList.add("plus-center");
            }
        }
    }
    for (let i = ROWS - 1; i >= 0; i--) {
        for (let j = 0; j < COLS; j++) {
            if (i + j === parseInt((ROWS - 1 + COLS) / 2)) {
                document
                    .getElementById(`node-${i}-${j}`)
                    .classList.add("plus-center");
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
                    .getElementById(`node-${row}-${col}`)
                    .classList.remove("plus-center");
            }
        }
    }
    for (let i = ROWS - 1; i >= 0; i--) {
        for (let j = 0; j < COLS; j++) {
            if (i + j === parseInt((ROWS - 1 + COLS) / 2)) {
                document
                    .getElementById(`node-${i}-${j}`)
                    .classList.remove("plus-center");
            }
        }
    }
}
