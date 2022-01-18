import { Cell } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number);
  nextGeneration();
  setSize(width: number, height: number);
}

export class GameField implements IGameField {
  width: number;
  height: number;
  result: Cell[][];
  nextStepField: Cell[][];
  afternextStepField: Cell[][];

  bothStepsAreEqual: boolean = false;

  constructor(width: number = 0, height: number = 1) {
    this.width = width;
    this.height = height;
    let result = Array.from(Array(this.height), () =>
      height === 1 ? [] : Array(this.width).fill(0)
    );
    this.result = result;
  }

  getState() {
    return this.result;
  }

  check(y: number, x: number): number {
    if (y < 0 || y > this.height - 1 || x < 0 || x > this.width - 1) {
      return 0;
    }
    return this.result[y][x];
  }

  nextStepCheck(y: number, x: number): number {
    if (y < 0 || y > this.height - 1 || x < 0 || x > this.width - 1) {
      return 0;
    }
    return this.nextStepField[y][x];
  }

  toggleCellState(x: number, y: number) {
    this.result[y][x] = this.result[y][x] === 0 ? 1 : 0;
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    let curField = this.getState();
    let difWidth = curField.length - height;
    function changeWidth() {
      for (let y = 0; y < height; y++) {
        let difHeight = curField[y].length - width;
        if (curField[y].length < width) {
          for (let x = 0; x < Math.abs(difHeight); x++) {
            curField[y].push(0);
          }
        }
        if (curField[y].length > width) {
          for (let x = 0; x < Math.abs(difHeight); x++) {
            curField[y].pop();
          }
        }
      }
    }
    function changeHeight() {
      if (curField.length < height) {
        for (let i = 0; i < Math.abs(difWidth); i++) {
          curField.push(Array(width).fill(0));
        }
      }
      if (curField.length > height) {
        for (let i = 0; i < Math.abs(difWidth); i++) {
          curField.pop();
        }
      }
    }
    if (curField.length < height) {
      changeHeight();
      changeWidth();
    } else {
      changeWidth();
      changeHeight();
    }
  }

  nextGeneration() {
    this.nextStepField = this.result.slice(0);
    for (let y = 0; y < this.height; y++) {
      this.nextStepField[y] = this.nextStepField[y].slice(0);
      for (let x = 0; x < this.width; x++) {
        let counter =
          this.check(y - 1, x - 1) +
          this.check(y, x - 1) +
          this.check(y + 1, x - 1) +
          this.check(y + 1, x) +
          this.check(y + 1, x + 1) +
          this.check(y, x + 1) +
          this.check(y - 1, x + 1) +
          this.check(y - 1, x);
        if (this.result[y][x] === 0 && counter === 3) {
          this.nextStepField[y][x] = 1;
        } else if (counter > 3) {
          this.nextStepField[y][x] = 0;
        } else if (
          this.nextStepField[y][x] === 1 &&
          (counter === 2 || counter === 3)
        ) {
          this.nextStepField[y][x] = 1;
        } else {
          this.nextStepField[y][x] = 0;
        }
      }
    }
    let check = true;
    for (let y2 = 0; y2 < this.height; y2++) {
      if (check === false) {
        break;
      }
      for (let x2 = 0; x2 < this.width; x2++) {
        if (this.result[y2][x2] !== this.nextStepField[y2][x2]) {
          check = false;
          break;
        }
      }
    }
    check
      ? (this.bothStepsAreEqual = true)
      : (this.result = this.nextStepField);
  }

  afterNextGeneration() {
    this.afternextStepField = this.nextStepField.slice(0);
    for (let y = 0; y < this.height; y++) {
      this.afternextStepField[y] = this.afternextStepField[y].slice(0);
      for (let x = 0; x < this.width; x++) {
        let counter =
          this.nextStepCheck(y - 1, x - 1) +
          this.nextStepCheck(y, x - 1) +
          this.nextStepCheck(y + 1, x - 1) +
          this.nextStepCheck(y + 1, x) +
          this.nextStepCheck(y + 1, x + 1) +
          this.nextStepCheck(y, x + 1) +
          this.nextStepCheck(y - 1, x + 1) +
          this.nextStepCheck(y - 1, x);
        if (this.nextStepField[y][x] === 0 && counter === 3) {
          this.afternextStepField[y][x] = 1;
        } else if (counter > 3) {
          this.afternextStepField[y][x] = 0;
        } else if (
          this.nextStepField[y][x] === 1 &&
          (counter === 2 || counter === 3)
        ) {
          this.afternextStepField[y][x] = 1;
        } else {
          this.afternextStepField[y][x] = 0;
        }
      }
    }
  }
}
