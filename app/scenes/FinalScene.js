console.log("start FinalScene");
import { newBackButton } from "../components/Button.js";
import { W, H } from "../constants.js";

export default class FinalScene extends Phaser.Scene {
  constructor() {
    super({ key: "FinalScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("FinalScene");
    newBackButton(this);
  }
}
