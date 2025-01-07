
const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function walk(
  maze: string[],
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[],
) {
  // base cases:

  // out of map
  if (
      curr.y < 0 ||
      curr.y > maze.length ||
      curr.x < 0 ||
      curr.x > maze[0].length
  ) {
      return false;
  }
  // it's a wall
  if (maze[curr.y][curr.x] === wall) {
      return false;
  }

  // already seen it
  if (seen[curr.y][curr.x]) {
      return false;
  }

  // it's the end
  if (curr.x === end.x && curr.y === end.y) {
      path.push(curr);
      return true;
  }

  // pre
  seen[curr.y][curr.x] = true;
  path.push(curr);

  // recurse
  for (const [y, x] of dirs) {
      if (
          walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)
      ) {
          return true;
      }
  }

  //post
  path.pop();
  return false;
}

export function mazeSolver(
  maze: string[],
  wall: string,
  start: Point,
  end: Point,
): Point[] {
  const seen = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; i++) {
      seen[i] = new Array(maze[0].length).fill(false);
  }

  walk(maze, wall, start, end, seen, path);

  return path;
}

// [
//   '#### #',
//   '#    #',
//   '# ####'
// ]
