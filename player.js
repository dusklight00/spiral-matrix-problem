const { print2DArr } = require("./util");

class Player {
  constructor(size) {
    this.DIRECTION_SEQEUNCE = ["RIGHT", "DOWN", "LEFT", "UP"];

    // Ground
    this.arr = this.constructArr(size, size);

    // Player
    this.x = 0;
    this.y = 0;

    // States
    this.directionIndex = 0;
  }

  moveInDirection() {
    const direction = this.getDirection();
    if (direction == "RIGHT") this.right();
    if (direction == "DOWN") this.down();
    if (direction == "LEFT") this.left();
    if (direction == "UP") this.up();
  }

  getDirection() {
    const direction = this.DIRECTION_SEQEUNCE[this.directionIndex];
    return direction;
  }

  nextDirection() {
    this.directionIndex =
      (this.directionIndex + 1) % this.DIRECTION_SEQEUNCE.length;
  }

  checkNextFree() {
    const playerDir = this.getDirection();
    const freeDirection = this.checkIsDirectionsFree(this.x, this.y);
    if (playerDir == "RIGHT") return freeDirection.right;
    if (playerDir == "DOWN") return freeDirection.down;
    if (playerDir == "LEFT") return freeDirection.left;
    if (playerDir == "UP") return freeDirection.up;
  }

  constructArr(sizeX, sizeY) {
    const arr = [];
    for (let j = 0; j < sizeY; j++) {
      const row = [];
      for (let i = 0; i < sizeX; i++) {
        row.push(-1);
      }
      arr.push(row);
    }
    return arr;
  }

  checkIndexExists(x, y) {
    if (this.arr[y] == undefined) return false;
    if (this.arr[y][x] == undefined) return false;
    return true;
  }

  checkIsDirectionExists(x, y) {
    const left = this.checkIndexExists(x - 1, y, this.arr)
      ? this.arr[y][x - 1]
      : undefined;
    const right = this.checkIndexExists(x + 1, y, this.arr)
      ? this.arr[y][x + 1]
      : undefined;
    const up = this.checkIndexExists(x, y - 1, this.arr)
      ? this.arr[y - 1][x]
      : undefined;
    const down = this.checkIndexExists(x, y + 1, this.arr)
      ? this.arr[y + 1][x]
      : undefined;
    return {
      left: left,
      right: right,
      up: up,
      down: down,
    };
  }

  checkIsDirectionsFree(x, y) {
    const directions = this.checkIsDirectionExists(x, y);
    return {
      left: directions.left == -1 ? true : false,
      right: directions.right == -1 ? true : false,
      up: directions.up == -1 ? true : false,
      down: directions.down == -1 ? true : false,
    };
  }

  show() {
    print2DArr(this.arr);
  }

  left() {
    this.x--;
  }

  right() {
    this.x++;
  }

  up() {
    this.y--;
  }

  down() {
    this.y++;
  }

  write(num) {
    this.arr[this.y][this.x] = num;
  }

  getCoord() {
    return [this.x, this.y];
  }

  isAllDirectionBlocked() {
    const freeDirection = this.checkIsDirectionsFree(this.x, this.y);
    return (
      freeDirection.left == false &&
      freeDirection.right == false &&
      freeDirection.up == false &&
      freeDirection.down == false
    );
  }
}

module.exports = Player;
