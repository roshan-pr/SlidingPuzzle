#! /bin/bash

cp src/medium.json puzzle.json

node html/generateHtml.js
open html/puzzle.html
echo  Up:1,  Down:2,  Left:3,  Right:4
code=0
while [[ ${code} == 0 ]]; do
  read -p "Move Bob :" move
  node runGame.js ${move}
  code=$?
  node html/generateHtml.js
done

echo "GAME OVER !!"
