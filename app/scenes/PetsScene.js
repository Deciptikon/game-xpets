console.log("start PetsScene");
import { newBackButton } from "../components/Button.js";
import { W, H } from "../constants.js";

export default class PetsScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetsScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("PetsScene");
    newBackButton(this);
  }
}
