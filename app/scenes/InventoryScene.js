console.log("start InventoryScene");
import { newBackButton } from "../components/Button.js";
import { W, H } from "../constants.js";

export default class InventoryScene extends Phaser.Scene {
  constructor() {
    super({ key: "InventoryScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("InventoryScene");
    newBackButton(this);
  }
}
