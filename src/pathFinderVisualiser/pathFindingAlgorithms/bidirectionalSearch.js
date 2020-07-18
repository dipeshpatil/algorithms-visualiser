export function bidirectionalSearch(grid = [], startNode, finishNode) {
    const squeue = [];
    const dqueue = [];

    const svisited = [],
        dvisited = [];

    startNode.isVisited = true;
    startNode.previousNode = null;
    squeue.push(startNode);

    finishNode.isVisited = true;
    finishNode.previousNode = null;
    dqueue.push(finishNode);

    while (squeue.length && dqueue.length) {
        const currsn = squeue.shift();
        const currdn = dqueue.shift();

        const sneighbors = getAllNeighbors(grid, currsn);
        const dneighbors = getAllNeighbors(grid, currdn);

        if (currdn === currsn) break;

        for (const sneighbor of sneighbors) {
            if (!sneighbor.isVisited) {
                sneighbor.isVisited = true;
                sneighbor.previousNode = currsn;
                squeue.push(sneighbor);
                svisited.push(sneighbor);
            } else {
                break;
            }
        }

        for (const dneighbor of dneighbors) {
            if (!dneighbor.isVisited) {
                dneighbor.isVisited = true;
                dneighbor.previousNode = currdn;
                dqueue.push(dneighbor);
                dvisited.push(dneighbor);
            } else {
                break;
            }
        }
    }

    const sourcePaths = [],
        destPaths = [];

    for (let i = 0; i < svisited.length; i++)
        sourcePaths.push(calculatePath(svisited[i]));

    for (let i = 0; i < dvisited.length; i++)
        destPaths.push(calculatePath(dvisited[i]));

    for (let i = sourcePaths.length - 1; i >= 0; i--) {
        const sPathRow = sourcePaths[i];
        const splast = sPathRow[sPathRow.length - 1];
        const neighbors = getAdjacents(grid, splast);
        for (const neighbor of neighbors) {
            for (let j = 0; j < destPaths.length; j++) {
                const destPathRow = destPaths[j];
                if (destPathRow.includes(neighbor)) {
                    return [svisited, dvisited, sPathRow, destPathRow];
                }
            }
        }
    }
}

function getAdjacents(grid = [], node) {
    const ROWS = grid.length;
    const COLS = grid[0].length;

    const { row, col } = node;
    const neighbors = [];

    if (
        row + 1 >= 0 &&
        row + 1 < ROWS &&
        col >= 0 &&
        col < COLS &&
        !grid[row + 1][col].isWall
    ) {
        neighbors.push(grid[row + 1][col]);
    }
    if (
        row - 1 >= 0 &&
        row - 1 < ROWS &&
        col >= 0 &&
        col < COLS &&
        !grid[row - 1][col].isWall
    ) {
        neighbors.push(grid[row - 1][col]);
    }
    if (
        row >= 0 &&
        row < ROWS &&
        col - 1 >= 0 &&
        col - 1 < COLS &&
        !grid[row][col - 1].isWall
    ) {
        neighbors.push(grid[row][col - 1]);
    }
    if (
        row >= 0 &&
        row < ROWS &&
        col + 1 >= 0 &&
        col + 1 < COLS &&
        !grid[row][col + 1].isWall
    ) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors;
}

function getAllNeighbors(grid = [], node) {
    const ROWS = grid.length;
    const COLS = grid[0].length;

    const { row, col } = node;
    const neighbors = [];

    if (
        row + 1 >= 0 &&
        row + 1 < ROWS &&
        col >= 0 &&
        col < COLS &&
        !grid[row + 1][col].isVisited &&
        !grid[row + 1][col].isWall
    ) {
        neighbors.push(grid[row + 1][col]);
    }
    if (
        row - 1 >= 0 &&
        row - 1 < ROWS &&
        col >= 0 &&
        col < COLS &&
        !grid[row - 1][col].isWall &&
        !grid[row - 1][col].isVisited
    ) {
        neighbors.push(grid[row - 1][col]);
    }
    if (
        row >= 0 &&
        row < ROWS &&
        col - 1 >= 0 &&
        col - 1 < COLS &&
        !grid[row][col - 1].isWall &&
        !grid[row][col - 1].isVisited
    ) {
        neighbors.push(grid[row][col - 1]);
    }
    if (
        row >= 0 &&
        row < ROWS &&
        col + 1 >= 0 &&
        col + 1 < COLS &&
        !grid[row][col + 1].isWall &&
        !grid[row][col + 1].isVisited
    ) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors;
}

export function calculatePath(finishNode) {
    const shortestPathNodes = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        shortestPathNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathNodes;
}
