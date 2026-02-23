console.log("start PauseScene");
import { newBackButton } from "../components/Button.js";
import { W, H } from "../constants.js";

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: "PauseScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("PauseScene");
    newBackButton(this);
  }
}
