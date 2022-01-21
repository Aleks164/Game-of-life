import { Cell } from "./types/Cell";

export interface IGameView {
  updateGameField(field: Cell[][]): void,
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }): void,
  onCellClick(cb: (x: number, y: number) => void): void,
  onGameStateChange(cb: (newState: boolean) => void): void,
  onFieldSizeChange(cb: (width: number, height: number) => void): void,
  onStapeChange(cb: (stepDurationMs: number) => void): void,
  nextStepGameField(field: Cell[][]): void,
  changeCondition(Condition: string): void,
  Counter(count: number, newState: boolean, allZero: boolean): void,
  isRunning: boolean,
  count: number,

}
export class GameView implements IGameView {
  el: HTMLElement;

  gameField: HTMLElement;

  gameControls: HTMLElement;

  static field: Cell[][];

  static x: number;

  static y: number;

  isRunning: boolean;

  static width: number;

  static height: number;

  static table: HTMLElement;

  count = 0;

  updateGameField(field: Cell[][]): void {
    this.gameField.innerHTML = "";
    GameView.table = document.createElement("table");
    GameView.table.classList.add("table");
    field.forEach((row, y) => {
      const tr = document.createElement("tr");
      row.forEach((cell, x) => {
        const td = document.createElement("td");
        td.classList.add("cell");
        td.classList.add(cell === 0 ? "cell--dead" : "cell--alive");
        td.dataset.x = String(x);
        td.dataset.y = String(y);
        tr.append(td);
      });
      GameView.field = field;
      GameView.table.append(tr);
    });

    this.gameField.append(GameView.table);
  }

  nextStepGameField(field: Cell[][]): void {
    const cellAlive = this.el.querySelectorAll(".cell--alive");
    cellAlive.forEach((cell) => {
      if (field[cell.dataset.y][cell.dataset.x] === 0) {
        cell.classList.remove("cell--alive");
        cell.classList.add("cell--deadInNextStep");
      }
    });
  }

  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }): void {
    const runButton = this.el.querySelector(".run-button");
    const widthSize = this.el.querySelector(".field-size--width");
    const heightSize = this.el.querySelector(".field-size--height");
    if (runButton && widthSize && heightSize) {
      widthSize.setAttribute("value", String(state.width));
      heightSize.setAttribute("value", String(state.height));
      if (state.isRunning) {
        this.isRunning = true;
        runButton.classList.remove("run-button--stopped");
        runButton.classList.add("run-button--runned");
        runButton.innerHTML = "Stop";
      } else {
        this.isRunning = false;
        runButton.classList.add("run-button--stopped");
        runButton.classList.remove("run-button--runned");
        runButton.innerHTML = "Play";
      }
    }

  }

  onCellClick(cb: (x: number, y: number) => void): void {
    const list = this.el.querySelector(".gameField");
    if (list !== null) {
      list.addEventListener("click", function (ev) {
        const el2 = <HTMLInputElement>ev.target;
        if (el2) {
          const x = Number(el2.dataset.x);
          const y = Number(el2.dataset.y);
          if (x >= 0 && y >= 0) {
            cb(x, y);
          }
        }
      });
    }
  }

  onGameStateChange(cb: (newState: boolean) => void): void {
    const runButton = this.el.querySelector(".run-button");
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const app = this;
    if (runButton !== null) {
      runButton.addEventListener("click", function () {
        const isRunning = !app.isRunning;
        cb(isRunning);
      });
    }
  }

  onFieldSizeChange(cb: (width: number, height: number) => void): void {
    const widthButton = <HTMLInputElement>this.el.querySelector(".field-size--width");
    const heightButton = <HTMLInputElement>this.el.querySelector(".field-size--height");
    if (widthButton !== null && heightButton !== null) {
      widthButton.addEventListener("change", () => {
        GameView.height = Number(heightButton.value);
        GameView.width = Number(widthButton.value);

        cb(GameView.width, GameView.height);
        // app.updateGameState({ width: GameView.width, height: GameView.height });
      });
      heightButton.addEventListener("change", () => {
        GameView.height = Number(heightButton.value);
        GameView.width = Number(widthButton.value);

        cb(GameView.width, GameView.height);
        // app.updateGameState({ width: GameView.width, height: GameView.height });
      });
    }
  }

  onStapeChange(cb: (stepDurationMs: number) => void): void {
    const stepRange = <HTMLInputElement>this.el.querySelector(".range");
    const labelForrange = this.el.querySelector(".labelForrange");
    const runButton = this.el.querySelector(".run-button");
    if (stepRange !== null && labelForrange !== null && runButton !== null) {
      // const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));
      stepRange.addEventListener("change", function () {
        runButton.dispatchEvent(new Event("click"));
        const valueStepRange = Number(stepRange.value);
        const stepDurationMs = valueStepRange * 1000;
        labelForrange.innerHTML = `Step duration ${valueStepRange} sec `;
        console.log(stepDurationMs);
        cb(stepDurationMs);
        // await sleep(150);
        runButton.dispatchEvent(new Event("click"));
      });
    }
  }

  Counter(count: number, newState: boolean, allZero: boolean): void {
    const labelCounter = this.el.querySelector(".labelCounter");
    const runButton = this.el.querySelector(".run-button");
    if (labelCounter !== null && runButton !== null) {
      labelCounter.innerHTML = `Step ${count}`;
      if (newState && allZero) {
        this.count = 0;
        runButton.dispatchEvent(new Event("click"));
      }
    }
  }

  changeCondition(Condition: string): void {
    const labelCondition = this.el.querySelector(".labelCondition");
    if (labelCondition !== null) {
      labelCondition.innerHTML = `Condition is: ${Condition} `;
    }
  }

  constructor(el: HTMLElement) {
    const gameField = document.createElement("div");
    const gameControls = document.createElement("div");
    function addEl() {
      gameField.classList.add("gameField");
      gameControls.classList.add("gameControls");
      const inputwidth = document.createElement("INPUT");
      const inputheight = document.createElement("INPUT");
      const button = document.createElement("div");
      const range = document.createElement("INPUT");
      const divForWidth = document.createElement("div");
      const divForHeight = document.createElement("div");
      const divForrange = document.createElement("div");
      const labelForWidth = document.createElement("label");
      const labelForHeight = document.createElement("label");
      const labelForrange = document.createElement("label");
      const labelCounter = document.createElement("label");
      const labelCondition = document.createElement("Condition");
      inputwidth.setAttribute("type", "number");
      inputheight.setAttribute("type", "number");
      range.setAttribute("type", "range");
      range.setAttribute("value", "1");
      range.setAttribute("min", "0.5");
      range.setAttribute("max", "5");
      range.setAttribute("step", "0.5");
      inputwidth.setAttribute("min", "5");
      inputwidth.setAttribute("max", "20");
      inputheight.setAttribute("min", "5");
      inputheight.setAttribute("max", "20");
      inputwidth.classList.add("field-size");
      inputheight.classList.add("field-size");
      inputwidth.classList.add("field-size--width");
      inputheight.classList.add("field-size--height");
      labelForrange.classList.add("labelForrange");
      labelCounter.classList.add("labelCounter");
      labelCondition.classList.add("labelCondition");
      range.classList.add("range");
      button.classList.add("run-button");
      button.classList.add("run-button--stopped");
      labelCounter.innerHTML = "Step 0";
      button.innerHTML = "Play";
      labelCondition.innerHTML = "Condition is: waiting for srart ";
      labelForWidth.innerHTML = "Width";
      labelForHeight.innerHTML = "Height";
      labelForrange.innerHTML = "Step duration 1 sec";
      divForWidth.appendChild(labelForWidth);
      divForWidth.appendChild(inputwidth);
      divForHeight.appendChild(labelForHeight);
      divForHeight.appendChild(inputheight);
      divForrange.appendChild(labelForrange);
      divForrange.appendChild(range);
      gameControls.appendChild(divForWidth);
      gameControls.appendChild(divForHeight);
      gameControls.appendChild(divForrange);
      gameControls.appendChild(button);
      gameControls.appendChild(labelCondition);
      gameControls.appendChild(labelCounter);

      el.appendChild(gameControls);
      el.appendChild(gameField);

      document.body.append(el);
    }
    addEl();
    this.el = el;
    this.gameField = gameField;
    this.gameControls = gameControls;
    this.isRunning = false;
    this.count = 0;
  }
}
