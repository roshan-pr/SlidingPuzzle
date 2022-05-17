const fs = require('fs');

const generateTag = (tag, classes, content) =>
  ['<', tag, ' class="', classes, '">', content, '</', tag, '>'].join('');

const generateTile = (tileValue) => {
  const placeHolder = Number.isFinite(tileValue) ? tileValue : '🙂';
  return generateTag('div', 'tile', placeHolder);
};

const generateRow = function (row) {
  const rows = row.map((tileValue) =>
    generateTile(tileValue)).join('');
  return generateTag('div', 'row', rows);
};

const getHeader = () =>
  '<head><title>Sliding Puzzle</title>' +
  '<meta http-equiv="refresh" content="2">' +
  '<link rel="stylesheet" href="style.css"></head>';

const generateRows = (game) =>
  game.puzzle.map((row) => generateRow(row)).join('');

const generateWrapper = (game) =>
  generateTag('div', 'wrapper', generateRows(game));

const generateBody = (game) =>
  generateTag('body', '', generateWrapper(game));

const generateHtml = (game) =>
  generateTag('html', '', getHeader() + generateBody(game));

const readGame = () => JSON.parse(fs.readFileSync('./puzzle.json', 'utf-8'));
const saveGame = (game) => fs.writeFileSync('html/puzzle.html', game, 'utf-8');

const main = function () {
  const game = readGame();
  const htmlPage = generateHtml(game);
  saveGame(htmlPage);
};

main();
