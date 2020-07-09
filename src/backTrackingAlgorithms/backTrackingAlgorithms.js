/*
-----------------------
BACKTRACKING ALGORITHMS
-----------------------
*/

/* -----------------------
N Queen Problem Algorithms
-------------------------- */

function createBoard(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
        board.push(getRowsOfZeroes(size));
    }
    return board;
}

export function getNQueensAnimations(size, animations = []) {
    const board = createBoard(size);
    solveNQueenUtil(board, 0, animations);
    return board;
}

function solveNQueenUtil(board = [], col, animations = []) {
    let N = board.length;

    if (col >= N) return true;

    for (let i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = true;
            animations.push([i, col, true]);
            if (solveNQueenUtil(board, col + 1, animations)) return true;
            board[i][col] = false;
            animations.push([i, col, false]);
        }
    }
    return false;
}

function isSafe(board = [], row, col) {
    let N = board.length;

    for (let i = 0; i < col; i++) {
        if (board[row][i] === true) {
            return false;
        }
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === true) {
            return false;
        }
    }
    for (let i = row, j = col; j >= 0 && i < N; i++, j--) {
        if (board[i][j] === true) {
            return false;
        }
    }

    return true;
}

export function getRowsOfZeroes(size) {
    const row = [];
    for (let i = 0; i < size; i++) {
        row.push(false);
    }
    return row;
}

/* ----------------------
Rat In A Maze Solving Algorithms
------------------------- */

function isRatSafe(maze = [], x, y) {
    let mazeRows = maze.length;
    let mazeCols = maze[0].length;

    return x >= 0 && x < mazeRows && y >= 0 && y < mazeCols && maze[x][y] === 1;
}

function solveRatInAMaze(maze = [], x, y, sol = [], animations = []) {
    let endOfMazeX = maze.length - 1;
    let endOfMazeY = maze[0].length - 1;

    // Goal State || Base Case
    if (x === endOfMazeX && y === endOfMazeY && maze[x][y] === 1) {
        sol[x][y] = 1;
        animations.push([x, y, true]);
        return true;
    }

    // Check if maze is valid
    if (isRatSafe(maze, x, y)) {
        animations.push([x, y, true]);
        sol[x][y] = 1;

        // Move Down
        if (solveRatInAMaze(maze, x, y + 1, sol, animations)) return true;
        // Move Right
        if (solveRatInAMaze(maze, x + 1, y, sol, animations)) return true;
        // No Move is Possible -> Backtrack
        else {
            animations.push([x, y, false]);
            sol[x][y] = 0;
            return false;
        }
    }
    return false;
}

export function solveMaze(maze = [], sol = []) {
    const animations = [];
    if (!solveRatInAMaze(maze, 0, 0, sol, animations)) {
        console.log("Solution doesn't");
        return [sol, []];
    }
    return [sol, animations];
}

export function prepareSolutionBoardOfZeroes(size) {
    let sol = [];
    for (let i = 0; i < size; i++) {
        var temp = [];
        for (let j = 0; j < size; j++) {
            temp.push(0);
        }
        sol.push(temp);
    }
    return sol;
}
