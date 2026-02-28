console.log("start PetsScene");
import { newBackButton } from "../components/Button.js";
import IconButton from "../components/IconButton.js";
import { W, H } from "../constants.js";
import { ListPets } from "../pets/listPets.js";

export default class PetsScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetsScene" });
  }

  create() {
    //this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    let btt = new IconButton(
      this,
      W / 2,
      H / 2,
      100,
      100,
      "icon_cat",
      null,
      () => {
        console.log("!!!!!!!!");
        btt.x = btt.x < W / 2 ? W * 0.75 : W * 0.25;
      },
      { scale: 0.4, hoverScale: 0.5 },
    );

    console.log("PetsScene");
    newBackButton(this);

    console.log(ListPets);
  }
}
