console.log("start menu");
import { W, H, isMobile } from "../constants.js";
import Button from "../components/Button.js";

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

    const s = H / 8;
    const x = W / 2;
    const y = H / 2;

    const mapsButton = this.newButtonMenu(x, y, "Играть", "MapsScene");
    const petsButton = this.newButtonMenu(x, y + s, "Персонажи", "PetsScene");
    const settingsButton = this.newButtonMenu(
      x,
      y + 2 * s,
      "Настройки",
      "SettingsScene",
    );
    const infoButton = new Button(
      this,
      W - H / 10,
      H - H / 10,
      "i",
      () => {
        this.scene.start("InfoScene");
      },
      {
        color: 0xff5900,
        width: H / 10,
        height: H / 10,
        textStyle: { fontSize: `${Math.ceil(H / 20)}px`, color: "#ffffff" },
      },
    );
  }

  newButtonMenu(x, y, txt, scene) {
    return new Button(
      this,
      x,
      y,
      txt,
      () => {
        this.scene.start(scene);
      },
      {
        color: 0x4caf50,
        width: W / 5,
        height: H / 10,
        textStyle: { fontSize: `${Math.ceil(H / 20)}px`, color: "#ffffff" },
      },
    );
  }
}
