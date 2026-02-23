console.log("start GameScene");
import { newBackButton } from "../components/Button.js";
import { W, H } from "../constants.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("GameScene");
    newBackButton(this);
  }
}
