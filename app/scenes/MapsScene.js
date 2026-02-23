console.log("start MapsScene");
import { newBackButton } from "../components/Button.js";
import { W, H } from "../constants.js";

export default class MapsScene extends Phaser.Scene {
  constructor() {
    super({ key: "MapsScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("MapsScene");
    newBackButton(this);
  }
}
