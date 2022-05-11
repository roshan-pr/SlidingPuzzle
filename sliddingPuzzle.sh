#! /bin/bash

# echo '{"target": [[1,2], [3, "bob"]],"puzzle": [["bob", 1], [3, 2]],"emptyBlock":[0, 0]}' > puzzle.json
# echo '{"target":[[1,2,3],[4,5,6],[7,8," "]],"puzzle":[[1,2,3],[4,5,6],[7," ",8]],"emptyBlock":[2,1]}' > puzzle.json
echo '{"target":[[1,2,3],[4,5,6],[7,8,"🙂"]],"puzzle":[[2,"🙂",3],[1,5,6],[4,7,8]],"emptyBlock":[0,1]}' > puzzle.json
node generateHtml.js
open puzzle.html
echo  Up:1,  Down:2,  Left:3,  Right:4
echo 'exit 0' | bash;
code=0
while [[ ${code} == 0 ]]; do
  read -p "Move Bob :" move
  node lib.js ${move}
  code=$?
  node generateHtml.js
  open puzzle.html
done

echo "GAME OVER !!"
