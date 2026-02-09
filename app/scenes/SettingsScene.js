console.log("start SettingsScene");
import { W, H } from "../constants.js";

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super({ key: "SettingsScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();
  }
}
