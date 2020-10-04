export function wordDFS(grid = [], word, animations = []) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const { row, col, val, visited } = grid[i][j];
            animations.push([i, j, "testing", "not-found"]);
            if (
                val === word.charAt(0) &&
                dfs(grid, row, col, 0, word, animations) &&
                !visited
            ) {
                grid[i][j].visited = true;
                return true;
            }
        }
    }
    return false;
}

function dfs(grid = [], i, j, count, word, animations = []) {
    if (count === word.length) return true;

    if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
        animations.push([i, j, "not-found", "not-found"]);
    }

    if (
        i < 0 ||
        i >= grid.length ||
        j < 0 ||
        j >= grid[i].length ||
        grid[i][j].val !== word.charAt(count)
    )
        return false;
    let temp = grid[i][j].val;
    grid[i][j].val = " ";

    var found =
        dfs(grid, i + 1, j, count + 1, word, animations) ||
        dfs(grid, i - 1, j, count + 1, word, animations) ||
        dfs(grid, i, j + 1, count + 1, word, animations) ||
        dfs(grid, i, j - 1, count + 1, word, animations);

    if (found === true) {
        animations.push([i, j, "not-found", "found"]);
    } else {
        animations.push([i, j, "not-found", "not-found"]);
    }
    grid[i][j].val = temp;
    return found;
}
