const readline = require("readline-sync");
const Player = require("./player");

function drawSprialMatrix(size) {
  const player = new Player(size);
  let num = 1;

  while (true) {
    player.write(num++);
    if (player.isAllDirectionBlocked()) break;
    const isNextFree = player.checkNextFree();
    if (isNextFree) player.moveInDirection();
    if (!isNextFree) {
      player.nextDirection();
      player.moveInDirection();
    }
  }
  player.show();
}

let size = Number(readline.question("Enter the size of the matrix :"));
drawSprialMatrix(size);
