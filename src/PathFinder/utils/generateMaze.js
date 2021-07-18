import generate from "@indutny/maze";

export function generateMaze(grid = []) {
    const ROW = grid.length,
        COL = grid[0].length;

    const maze = generate({ width: ROW, height: COL });

    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            const { row, col } = grid[i][j];
            if (grid[i][j].isStart || grid[i][j].isFinish) {
                if (row > 0) maze[row - 1][col] = 0;
                if (row < ROW - 1) maze[row + 1][col] = 0;
                if (col > 0) maze[row][col - 1] = 0;
                if (col < COL - 1) maze[row][col + 1] = 0;
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (
                !grid[i][j].isStart &&
                !grid[i][j].isFinish &&
                maze[i][j] === 1
            ) {
                grid[i][j].isWall = true;
            }
        }
    }

    return grid;
}
