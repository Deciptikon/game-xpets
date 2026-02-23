console.log("start InfoScene");
import { newBackButton } from "../components/Button.js";
import { W, H } from "../constants.js";

export default class InfoScene extends Phaser.Scene {
  constructor() {
    super({ key: "InfoScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("InfoScene");
    newBackButton(this);
  }
}
