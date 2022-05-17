const assert = require('assert');
const fs = require('fs');

const getInfo = function (game, nextMove) {
  const [row, column] = emptyTile(game);
  const emptyBlock = game.puzzle[row][column];
  const [nextRow, nextColumn] = nextMove;
  const value = game.puzzle[nextRow][nextColumn];
  return [emptyBlock, row, column, value, nextRow, nextColumn];
};

const swapTo = function (game, nextMove) {
  const inGame = deepCopy(game);
  const [emptyBlock, row, column,
    value, nextRow, nextColumn] = getInfo(inGame, nextMove);

  inGame.puzzle[row][column] = value;
  inGame.puzzle[nextRow][nextColumn] = emptyBlock;
  return inGame;
};

const swap = function (game, nextMove) {
  if (isValidMove(game, nextMove)) {
    return swapTo(game, nextMove);
  }
  return game;
};

const deepCopy = function (object) {
  return JSON.parse(JSON.stringify(object));
};

const isValidMove = function (game, [...indices]) {
  const gameStrength = game.puzzle.length - 1;
  return indices.every((index) => index >= 0 && index <= gameStrength);
};

const emptyTile = function (game) {
  return game.puzzle.reduce((context, row, index) => {
    const nullIndex = row.indexOf(null);
    return row.indexOf(null) > -1 ? [index, nullIndex] : context;
  }, [-1, -1]);
};

const jumpRight = function (blankIndices) {
  return swap(this, [blankIndices[0], blankIndices[1] + 1]);
};

const jumpLeft = function (blankIndices) {
  return swap(this, [blankIndices[0], blankIndices[1] - 1]);
};

const jumpUp = function (blankIndices) {
  return swap(this, [blankIndices[0] - 1, blankIndices[1]]);
};

const jumpDown = function (blankIndices) {
  return swap(this, [blankIndices[0] + 1, blankIndices[1]]);
};

const isGameOver = function (game) {
  try {
    assert.deepStrictEqual(game.target, game.puzzle, 'Target not achieved');
    return true;
  } catch (error) {
    return false;
  }
};

const isMoveInOption = (move) => move < 5 && move > 0;

const readGame = (file) =>
  JSON.parse(fs.readFileSync(file, 'utf-8'));

const saveGame = (file, game) =>
  fs.writeFileSync(file, JSON.stringify(game), 'utf-8');

// eslint-disable-next-line no-process-exit
const exitGame = (exitCode) => process.exit(exitCode);

const moveTheBlank = function (game, direction) {
  const moves = {
    '1': jumpUp.bind(game), '2': jumpDown.bind(game),
    '3': jumpLeft.bind(game), '4': jumpRight.bind(game)
  };
  return isMoveInOption(direction) ? moves[direction](emptyTile(game)) : game;
};

const slide = function (direction) {
  const game = readGame('./puzzle.json');
  const gameInPlay = moveTheBlank(game, direction);

  saveGame('./puzzle.json', gameInPlay);
  const exitCode = isGameOver(gameInPlay) ? 9 : 10;
  exitGame(exitCode);
};

exports.slide = slide;
exports.swap = swap;
