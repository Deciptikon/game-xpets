console.log("start menu");
import { W, H, isMobile } from "../constants.js";
//import Button from "../components/Button.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    const title = this.add
      .text(W / 2, H / 4, "XPets", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    if (!isMobile) {
      //
    }
  }
}
