const input = [
  ["6", "8", ".", ".", ".", "2", ".", "7", "."],
  [".", ".", "9", ".", ".", "5", ".", ".", "."],
  [".", ".", "4", "7", ".", ".", ".", "5", "1"],
  ["7", "4", ".", "3", ".", ".", "5", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "5", ".", ".", "6", ".", ".", "8", "7"],
  ["5", ".", ".", ".", ".", ".", "1", ".", "."],
  [".", "6", ".", "2", ".", ".", ".", ".", "."],
  [".", "2", ".", ".", "9", "3", ".", ".", "6"],
];

const solveSudoku = (board) => {
  const size = 9;
  const box_size = 3;

  const findEmpty = (board) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if(board[r][c] === '.') {
          return [r,c];
        }
      }
    }
    return null;
  }

  const validate = (num, pos, board) => {
    const [r,c] = pos;

    // check rows
    for(let i = 0; i < size; i++) {
      if(board[i][c] === num && i !== r) {
        return false;
      }
    }

    // check cols
    for(let i = 0; i < size; i++) {
      if(board[r][i] === num && i !== c) {
        return false;
      }
    }

    // check box
    const boxRow = Math.floor(r/box_size)* box_size;
    const boxCol = Math.floor(c/box_size)* box_size;

    for(let i = boxRow; i < boxRow + box_size; i++) {
      for(let j = boxCol; j < boxCol + box_size; j++) {
        if (board[i][j] === num && i !== r && j !== c) {
          return false;
        }
      }
    }
    return true;
  }

  const solve = () => {
    const currPos = findEmpty(board);

    if (currPos === null) {
      return true;
    }

    console.log('--------------------------------------');

    for(let i = 1; i < size + 1; i++) {
      const currNum = i.toString();
      const isValid = validate(currNum, currPos, board);

      console.log(`pos: ${currPos}, num: ${currNum}, valid: ${isValid}`);

      if(isValid) {
        const [x,y] = currPos;
        board[x][y] = currNum;

        if(solve()) {
          return true;
        }

        board[x][y] = '.';
      }
    }

    return false;
  }

  solve();
  return board;
}

console.table(input);
console.table(solveSudoku(input));
