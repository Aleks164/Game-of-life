import { Cell } from "./types/Cell";

export interface IGameView {
  updateGameField(field: Cell[][]);
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  });
  onCellClick(cb: (x: number, y: number) => void);
  onGameStateChange(cb: (newState: boolean) => void);
  onFieldSizeChange(cb: (width: number, height: number) => void);
}
export class GameView {
  el: HTMLElement;
  gameField: HTMLElement;
  gameControls: HTMLElement;
  static field: Cell[][];
  static x: number;
  static y: number;
  static isRunning: boolean;
  static width: number;
  static height: number;
  static table: HTMLElement;
  count: number = 0;

  updateGameField(field: Cell[][]) {
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
  nextStepGameField(field: Cell[][]) {
    let cellAlive = this.el.querySelectorAll(".cell--alive");
    cellAlive.forEach((cell) => {
      if (field[cell.dataset.y][cell.dataset.x] === 0) {
        cell.classList.remove("cell--alive");
        cell.classList.add("cell--deadInNextStep");
      }
    });

    field.forEach((row, y) => {
      row.forEach((cell, x) => {});
    });
  }

  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }) {
    let runButton = this.el.querySelector(".run-button");
    let widthSize = this.el.querySelector(".field-size--width");
    let heightSize = this.el.querySelector(".field-size--height");
    widthSize.setAttribute("value", String(state.width));
    heightSize.setAttribute("value", String(state.height));
    if (state.isRunning) {
      GameView.isRunning = true;
      runButton.classList.remove("run-button--stopped");
      runButton.classList.add("run-button--runned");
      runButton.innerHTML = "Stop";
    } else {
      GameView.isRunning = false;
      runButton.classList.add("run-button--stopped");
      runButton.classList.remove("run-button--runned");
      runButton.innerHTML = "Play";
    }
  }

  onCellClick(cb: (x: number, y: number) => void) {
    let list = this.el.querySelector(".gameField");
    list.addEventListener("click", function (ev) {
      const el2 = ev.target;
      if (el2) {
        const x = Number(el2.dataset.x);
        const y = Number(el2.dataset.y);
        if (x >= 0 && y >= 0) {
          cb(x, y);
        }
      }
    });
  }

  onGameStateChange(cb: (newState: boolean) => void) {
    let runButton = this.el.querySelector(".run-button");
    runButton.addEventListener("click", function () {
      const isRunning = !GameView.isRunning;
      cb(isRunning);
    });
  }
  onFieldSizeChange(cb: (width: number, height: number) => void) {
    let widthButton = this.el.querySelector(".field-size--width");
    let heightButton = this.el.querySelector(".field-size--height");
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
  onStapeChange(cb: (stepDurationMs: number) => void) {
    let stepRange = this.el.querySelector(".range");
    let labelForrange = this.el.querySelector(".labelForrange");
    let runButton = this.el.querySelector(".run-button");
    // const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));
    stepRange.addEventListener("change", function () {
      runButton.dispatchEvent(new Event("click"));
      let valueStepRange = Number(stepRange.value);
      const stepDurationMs = valueStepRange * 1000;
      labelForrange.innerHTML = `Step duration ${valueStepRange} sec `;
      console.log(stepDurationMs);
      cb(stepDurationMs);
      // await sleep(150);
      runButton.dispatchEvent(new Event("click"));
    });
  }
  Counter(count: number, newState: boolean, allZero: boolean) {
    let labelCounter = this.el.querySelector(".labelCounter");
    labelCounter.innerHTML = `Step ${count}`;
    if (newState && allZero) {
      let runButton = this.el.querySelector(".run-button");
      this.count = 0;
      runButton.dispatchEvent(new Event("click"));
    }
  }
  changeCondition(Condition: string) {
    let labelCondition = this.el.querySelector(".labelCondition");
    labelCondition.innerHTML = `Condition is: ${Condition} `;
  }

  constructor(el: HTMLElement) {
    let gameField = document.createElement("div");
    let gameControls = document.createElement("div");
    function addEl() {
      gameField.classList.add("gameField");
      gameControls.classList.add("gameControls");
      let inputwidth = document.createElement("INPUT");
      let inputheight = document.createElement("INPUT");
      let button = document.createElement("div");
      let range = document.createElement("INPUT");
      let divForWidth = document.createElement("div");
      let divForHeight = document.createElement("div");
      let divForrange = document.createElement("div");
      let labelForWidth = document.createElement("label");
      let labelForHeight = document.createElement("label");
      let labelForrange = document.createElement("label");
      let labelCounter = document.createElement("label");
      let labelCondition = document.createElement("Condition");
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
  }
}
