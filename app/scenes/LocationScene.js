console.log("start LocationScene");
import { newBackButton } from "../components/Button.js";
import { W, H } from "../constants.js";

export default class LocationScene extends Phaser.Scene {
  constructor() {
    super({ key: "LocationScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("LocationScene");
    newBackButton(this);
  }
}
