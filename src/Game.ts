import { IGameField } from "./GameField";
import { IGameView } from "./GameView";

// export interface IGame {
// }

export class Game {
  static gameField: IGameField;

  static gameView: IGameView;

  static timerId: ReturnType<typeof setInterval>;

  static width: number;

  static height: number;

  static stepDurationMs: number;

  static isRunning: boolean;

  constructor(
    GameField: IGameField,
    GameView: IGameView,
    stepDurationMs: number
  ) {
    Game.stepDurationMs = stepDurationMs;
    Game.gameField = GameField;
    Game.gameView = GameView;

    let field = Game.gameField.getState();
    Game.gameView.updateGameField(field);
    Game.gameView.updateGameState({
      width: field[0].length,
      height: field.length,
      isRunning: false,
    });
    Game.gameView.onCellClick((x, y) => {
      field = Game.gameField.getState();
      Game.gameField.toggleCellState(x, y);
      Game.gameView.updateGameField(field);
    });
    let fixWidth;
    let fixHeight;
    Game.gameView.onFieldSizeChange((width, height) => {
      fixWidth = width;
      fixHeight = height;
      if (width > 20) {
        fixWidth = 20;
      }
      if (width < 5) {
        fixWidth = 5;
      }
      if (height > 20) {
        fixHeight = 20;
      }
      if (height < 5) {
        fixHeight = 5;
      }
      Game.width = fixWidth;
      Game.height = fixHeight;
      Game.gameField.setSize(fixWidth, fixHeight);
      field = Game.gameField.getState();
      Game.gameView.updateGameField(field);
      Game.gameView.updateGameState({
        width: field[0].length,
        height: field.length,
      });
    });
    Game.gameView.onGameStateChange((newState: boolean) => {
      Game.gameView.updateGameState({
        width: field[0].length,
        height: field.length,
        isRunning: newState,
      });
      Game.gameView.isRunning = newState;
      Game.isRunning = newState;
      function intervel() {
        Game.gameView.count += 1;
        Game.gameField.nextGeneration();
        field = Game.gameField.getState();
        Game.gameView.updateGameField(field);
        Game.gameField.afterNextGeneration();
        const field2 = Game.gameField.afternextStepField;
        Game.gameView.nextStepGameField(field2);
        let allZero = true;
        field.forEach((element) => {
          if (element.includes(1)) {
            allZero = false;
            Game.gameView.changeCondition("struggle for life");
          }
        });
        if (allZero) {
          Game.gameView.changeCondition("all cells is dead");
        }
        if (Game.gameField.bothStepsAreEqual === true) {
          allZero = true;
          Game.gameView.changeCondition("these are immortal cells");
          Game.gameField.bothStepsAreEqual = false;
        }
        Game.gameView.counter(Game.gameView.count, newState, allZero);
      }
      if (Game.gameView.isRunning) {
        Game.timerId = setInterval(intervel, Game.stepDurationMs);
      } else {
        clearInterval(Game.timerId);
        field = Game.gameField.getState();
        Game.gameView.updateGameField(field);
      }
    });
    Game.gameView.onStapeChange((onStapeChange: number) => {
      Game.stepDurationMs = onStapeChange;
    });
  }
}
