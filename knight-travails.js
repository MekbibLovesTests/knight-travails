const boardList = createBoardList();
const boardGraph = createBoardGraph(boardList);

console.log(getShortestPath([0, 3], [2, 1], boardGraph));

function createSquare(position) {
  return {
    possibleMoves: [],
    position,
  };
}

function createBoardList() {
  const boardList = new Array(7);
  for (let i = 0; i < 8; i++) {
    boardList[i] = new Array(8).fill(null);
  }
  return boardList;
}

function createBoardGraph(boardList) {
  const referenceList = [createSquare([0, 0])];
  const possibleMoves = [
    [2, 1],
    [-2, -1],
    [-2, 1],
    [2, -1],
    [1, 2],
    [-1, -2],
    [-1, 2],
    [1, -2],
  ];
  while (referenceList.length !== 0) {
    const square = referenceList.shift();
    if (boardList[square.position[0]][square.position[1]] !== null) continue;
    for (move of possibleMoves) {
      const position = [
        square.position[0] + move[0],
        square.position[1] + move[1],
      ];
      if (
        position[0] >= 0 &&
        position[0] <= 7 &&
        position[1] >= 0 &&
        position[1] <= 7
      ) {
        if (boardList[position[0]][position[1]] !== null) {
          square.possibleMoves.push(boardList[position[0]][position[1]]);
        } else {
          const newSquare = createSquare(position);
          square.possibleMoves.push(newSquare);
          referenceList.push(newSquare);
        }
      }
    }
    boardList[square.position[0]][square.position[1]] = square;
  }
  return boardList;
}

function getShortestPath(start, goal, boardGraph) {
  if (
    start[0] > 7 ||
    start[0] < 0 ||
    start[1] > 7 ||
    start[1] < 0 ||
    goal[0] > 7 ||
    goal[0] < 0 ||
    goal[1] > 7 ||
    goal[1] < 0
  )
    throw new Error("Index out of range");
  if (start[0] === goal[0] && start[1] === goal[1]) return [start];
  const startingSquare = boardGraph[start[0]][start[1]];
  const visited = createBoardList();
  visited[start[0]][start[1]] = startingSquare.position;
  const possibleMoves = [...createPath(startingSquare)];
  let goalSquare = null;
  while (possibleMoves.length !== 0) {
    const square = possibleMoves.shift();
    if (visited[square.position[0]][square.position[1]] !== null) continue;
    if (square.position[0] === goal[0] && square.position[1] === goal[1]) {
      goalSquare = square;
      break;
    } else {
      visited[square.position[0]][square.position[1]] = square.position;
      possibleMoves.push(...createPath(square));
    }
  }

  const shortestPath = [goalSquare.position];
  while (goalSquare.parent) {
    goalSquare = goalSquare.parent;
    shortestPath.unshift(goalSquare.position);
  }
  return shortestPath;
}

function createPath(square) {
  return square.possibleMoves.map((move) => {
    return {
      parent: square,
      position: move.position,
      possibleMoves: move.possibleMoves,
    };
  });
}
