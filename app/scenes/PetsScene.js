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
      "cat_icon",
      null,
      () => {
        console.log("!!!!!!!!");
      },
      { scale: 0.35, hoverScale: 0.5 },
    );

    console.log("PetsScene");
    newBackButton(this);

    console.log(ListPets);
  }
}
