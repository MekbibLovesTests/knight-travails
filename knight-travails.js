const boardList = createBoardList();
const boardGraph = createBoardGraph(boardList);
boardGraph.forEach((squareRow) => {
  squareRow.forEach((square) => {
    console.log(`Position: ${square.position}`);
    const possibleMoves = square.possibleMoves.map((move) => move.position);
    console.log(possibleMoves);
  });
});
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
