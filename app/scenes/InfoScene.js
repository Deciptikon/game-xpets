console.log("start InfoScene");
import { newBackButton } from "../components/Button.js";
import TextBox from "../components/TextBox.js";
import { W, H, FONT_SIZE } from "../constants.js";

export default class InfoScene extends Phaser.Scene {
  constructor() {
    super({ key: "InfoScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("InfoScene");

    const content = this.cache.text.get("readme");

    const textBox = new TextBox(this, H * 0.05, H * 0.2, content, {
      width: W - H * 0.1,
      height: H * 0.75,
      backgroundColor: 0x6187a0,
      textColor: "#ffffff",
      fontSize: FONT_SIZE,
      padding: 8,
      borderRadius: 10,
      scrollable: true,
      scrollStep: 1,
      scrollBar: {
        width: 50,
        bgColor: 0x000000,
        bgAlpha: 0.2,
        thumbColor: 0x333333,
        thumbAlpha: 0.8,
      },
    });
    newBackButton(this);
  }
}
