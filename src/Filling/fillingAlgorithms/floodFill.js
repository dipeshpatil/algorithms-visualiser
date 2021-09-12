export function floodFillQueue(grid = [], row, col) {
  const animations = [];
  const queue = [];

  const currentNode = grid[row][col];
  queue.push(currentNode);

  while (queue.length) {
    const node = queue.shift();
    if (node.isFilled || node.isBoundary) continue;
    else {
      node.isFilled = true;
      node.isEmpty = false;
      animations.push([node.row, node.col]);

      const neighbors = getNodeNeighbours(grid, node, false);
      for (let i = 0; i < neighbors.length; i++) queue.push(neighbors[i]);
    }
  }

  return animations;
}

export function floodFillStack(grid = [], row, col) {
  const animations = [];
  const stack = [];

  const currentNode = grid[row][col];
  stack.push(currentNode);

  while (stack.length) {
    const node = stack.pop();
    if (node.isFilled || node.isBoundary) continue;
    else {
      node.isFilled = true;
      node.isEmpty = false;
      animations.push([node.row, node.col]);

      const neighbors = getNodeNeighbours(grid, node, false);
      for (let i = 0; i < neighbors.length; i++) stack.push(neighbors[i]);
    }
  }

  return animations;
}

export function floodFillRecursive(grid = [], row, col) {
  const animations = [];
  if (grid[row][col].isFilled) return grid;
  fill(grid, row, col, animations);
  return animations;
}

function fill(grid = [], row, col, animations = []) {
  if (
    row < 0 ||
    row >= grid.length ||
    col < 0 ||
    col >= grid[0].length ||
    grid[row][col].isFilled ||
    grid[row][col].isBoundary
  )
    return;

  const currentNode = grid[row][col];
  currentNode.isFilled = true;
  currentNode.isEmpty = false;

  animations.push([row, col]);

  const neighbors = getNodeNeighbours(grid, currentNode, false);
  for (let i = 0; i < neighbors.length; i++)
    fill(grid, neighbors[i].row, neighbors[i].col, animations);
}

function getNodeNeighbours(grid = [], node, eightWay) {
  const ROWS = grid.length,
    COLS = grid[0].length;
  const neighbors = [];
  const { row, col } = node;

  if (row + 1 >= 0 && row + 1 < ROWS && col >= 0 && col < COLS)
    neighbors.push(grid[row + 1][col]);

  if (row - 1 >= 0 && row - 1 < ROWS && col >= 0 && col < COLS)
    neighbors.push(grid[row - 1][col]);

  if (row >= 0 && row < ROWS && col + 1 >= 0 && col + 1 < COLS)
    neighbors.push(grid[row][col + 1]);

  if (row >= 0 && row < ROWS && col - 1 >= 0 && col - 1 < COLS)
    neighbors.push(grid[row][col - 1]);

  if (eightWay) {
    if (row + 1 >= 0 && row + 1 < ROWS && col + 1 >= 0 && col + 1 < COLS)
      neighbors.push(grid[row + 1][col + 1]);

    if (row + 1 >= 0 && row + 1 < ROWS && col - 1 >= 0 && col - 1 < COLS)
      neighbors.push(grid[row + 1][col - 1]);

    if (row - 1 >= 0 && row - 1 < ROWS && col + 1 >= 0 && col + 1 < COLS)
      neighbors.push(grid[row - 1][col + 1]);

    if (row - 1 >= 0 && row - 1 < ROWS && col - 1 >= 0 && col - 1 < COLS)
      neighbors.push(grid[row - 1][col - 1]);
  }

  return neighbors;
}
