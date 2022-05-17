const assert = require('assert');
const fs = require('fs');

const getInfo = function (game, nextMove) {
  const [row, column] = game.emptyBlock;
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
  inGame.emptyBlock = nextMove;
  return inGame;
};

const swap = function (game, nextMove) {
  return isValidMove(game, nextMove) ? swapTo(game, nextMove) : game;
};

const deepCopy = function (object) {
  return JSON.parse(JSON.stringify(object));
};

const isValidMove = function (game, [row, column]) {
  const gameStrength = game.puzzle.length - 1;
  const validRow = row <= gameStrength && row >= 0;
  const validColumn = column <= gameStrength && column >= 0;
  return validRow && validColumn;
};

const jumpRight = function (game) {
  const inGame = deepCopy(game);
  return swap(inGame, [inGame.emptyBlock[0], inGame.emptyBlock[1] + 1]);
};

const jumpLeft = function (game) {
  const inGame = deepCopy(game);
  return swap(inGame, [inGame.emptyBlock[0], inGame.emptyBlock[1] - 1]);
};

const jumpUp = function (game) {
  const inGame = deepCopy(game);
  return swap(inGame, [inGame.emptyBlock[0] - 1, inGame.emptyBlock[1]]);
};

const jumpDown = function (game) {
  const inGame = deepCopy(game);
  return swap(inGame, [inGame.emptyBlock[0] + 1, inGame.emptyBlock[1]]);
};

const isGameOver = function (game) {
  try {
    assert.deepStrictEqual(game.target, game.puzzle, 'Target not achieved');
    return true;
  } catch (error) {
    return false;
  }
};

const isMoveInOption = function (move) {
  return move < 5 && move > 0;
};

const moveTheBlank = function (game) {
  const move = slidesTo();
  const moves = { '1': jumpUp, '2': jumpDown, '3': jumpLeft, '4': jumpRight };
  return isMoveInOption(move) ? moves[move](game) : game;
};

const readGame = () => JSON.parse(fs.readFileSync('puzzle.json', 'utf-8'));
const saveGame = (game) => fs.writeFileSync('puzzle.json', game, 'utf-8');
const slidesTo = () => process.argv[2];

// eslint-disable-next-line no-process-exit
const exitGame = (exitCode) => process.exit(exitCode);

const main = function () {
  const game = readGame();
  const gameInPlay = moveTheBlank(game);

  saveGame(JSON.stringify(gameInPlay));
  const exitCode = isGameOver(gameInPlay) ? 10 : 0;
  exitGame(exitCode);
};

main();

exports.main = main;
exports.swap = swap;
