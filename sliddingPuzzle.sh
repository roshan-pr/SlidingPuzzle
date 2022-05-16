#! /bin/bash

# echo '{"target": [[1,2], [3, "😄"]],"puzzle": [["😄", 1], [3, 2]],"emptyBlock":[0, 0]}' > puzzle.json
# echo '{"target":[[1,2,3],[4,5,6],[7,8," "]],"puzzle":[[1,2,3],[4,5,6],[7," ",8]],"emptyBlock":[2,1]}' > puzzle.json
echo '{"target":[[1,2,3],[4,5,6],[7,8,"😁"]],"puzzle":[[2,"😁",3],[1,5,6],[4,7,8]],"emptyBlock":[0,1]}' > puzzle.json
# echo '{"target":[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,"🙂"]],"puzzle":[[3,5,4,8],[9,6,"🙂",12],[2,14,10,7],[1,13,11,15]],"emptyBlock":[1,2]}' > puzzle.json

node generateHtml.js
open puzzle.html
echo  Up:1,  Down:2,  Left:3,  Right:4
code=0
while [[ ${code} == 0 ]]; do
  read -p "Move Bob :" move
  node lib.js ${move}
  code=$?
  node generateHtml.js
  open puzzle.html
done

echo "GAME OVER !!"
