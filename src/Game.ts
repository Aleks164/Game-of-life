import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export interface IGame { }
export class Game {
  static gameField;
  static gameView;
  static timerId;
  static width;
  static height;
  static stepDurationMs;

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
      isRunning: false
    });
    Game.gameView.onCellClick((x, y) => {
      field = Game.gameField.getState();
      Game.gameField.toggleCellState(x, y);
      Game.gameView.updateGameField(field);
    });
    Game.gameView.onFieldSizeChange((width, height) => {
      Game.width = width;
      Game.height = height;
      Game.gameField.setSize(width, height);
      field = Game.gameField.getState();
      Game.gameView.updateGameField(field);
      Game.gameView.updateGameState({
        width: field[0].length,
        height: field.length
      });
    });
    Game.gameView.onGameStateChange((newState: boolean) => {
      Game.gameView.updateGameState({
        width: field[0].length,
        height: field.length,
        isRunning: newState
      });
      Game.gameView.isRunning = newState;
      function intervel() {
        Game.gameView.count += 1;
        Game.gameField.nextGeneration();
        field = Game.gameField.getState();
        Game.gameView.updateGameField(field);
        Game.gameField.afterNextGeneration();
        let field2 = Game.gameField.afternextStepField;
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
        Game.gameView.Counter(Game.gameView.count, newState, allZero);
      }
      if (Game.gameView.isRunning) {
        Game.timerId = setInterval(intervel, Game.stepDurationMs);
        intervel();
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
