export function astar(grid = [], startNode, finishNode) {
    const closedlist = [];
    const openlist = [];

    startNode.cost = {
        F: 0,
        G: 0,
        H: 0,
    };

    openlist.push(startNode);

    while (!!openlist.length) {
        openlist.sort((a, b) => a.cost.F - b.cost.F);
        const current = openlist.shift();

        closedlist.push(current);

        if (current.isWall) continue;

        if (current === finishNode)
            return [closedlist, calculatePath(finishNode)];

        const neighbors = getNeighbors(grid, current);

        for (let i = 0; i < neighbors.length; i++) {
            const nNode = neighbors[i];
            if (closedlist.includes(nNode)) continue;

            nNode.cost.G = calculateCost(nNode, startNode, "E");
            nNode.cost.H = calculateCost(nNode, finishNode, "E");
            nNode.cost.F = nNode.cost.G + nNode.cost.H;

            if (!openlist.includes(nNode)) {
                nNode.previousNode = current;
                openlist.push(nNode);
            }
        }
    }
    return [closedlist, calculatePath(finishNode)];
}

function calculateCost(currentNode, node, distanceType) {
    switch (distanceType) {
        // Euclidean Distance
        case "E":
            return Math.floor(
                Math.sqrt(
                    Math.pow(currentNode.row - node.row, 2) +
                        Math.pow(currentNode.col - node.col, 2)
                ) * 10
            );

        // Manhattan Distance
        case "M":
            return (
                Math.abs(currentNode.row - node.row) +
                Math.abs(currentNode.col - node.col)
            );

        // Diagonal Distance
        case "D":
            return Math.max(
                Math.abs(currentNode.row - node.row),
                Math.abs(currentNode.col - node.col)
            );
        default:
            return 0;
    }
}

function getNeighbors(grid = [], currentNode) {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const { row, col } = currentNode;
    const neighbors = [];

    // Top, Left, Right, Bottom Nodes
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

    // Diagonal Nodes
    // if (
    //     row - 1 >= 0 &&
    //     row - 1 < ROWS &&
    //     col - 1 >= 0 &&
    //     col - 1 < COLS &&
    //     !grid[row - 1][col - 1].isWall
    // ) {
    //     neighbors.push(grid[row - 1][col - 1]);
    // }
    // if (
    //     row - 1 >= 0 &&
    //     row - 1 < ROWS &&
    //     col + 1 >= 0 &&
    //     col + 1 < COLS &&
    //     !grid[row - 1][col + 1].isWall
    // ) {
    //     neighbors.push(grid[row - 1][col + 1]);
    // }
    // if (
    //     row + 1 >= 0 &&
    //     row + 1 < ROWS &&
    //     col - 1 >= 0 &&
    //     col - 1 < COLS &&
    //     !grid[row + 1][col - 1].isWall
    // ) {
    //     neighbors.push(grid[row + 1][col - 1]);
    // }
    // if (
    //     row + 1 >= 0 &&
    //     row + 1 < ROWS &&
    //     col + 1 >= 0 &&
    //     col + 1 < COLS &&
    //     !grid[row + 1][col + 1].isWall
    // ) {
    //     neighbors.push(grid[row + 1][col + 1]);
    // }

    return neighbors;
}

function calculatePath(finishNode) {
    const shortestPathNodes = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        shortestPathNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathNodes;
}
