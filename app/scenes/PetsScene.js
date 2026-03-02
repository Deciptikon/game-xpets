console.log("start PetsScene");
import { newBackButton } from "../components/Button.js";
import IconButton from "../components/IconButton.js";
import { W, H } from "../constants.js";
import { ListPets } from "../pets/listPets.js";

export default class PetsScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetsScene" });

    this.buttons = {};
  }

  create() {
    this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    this.createAllPets();

    console.log("PetsScene");
    newBackButton(this);
  }

  createAllPets() {
    let x = 100;
    for (const key in ListPets) {
      const btt = new IconButton(
        this,
        x,
        H / 2,
        200,
        200,
        `icon_${key}`,
        null,
        () => {
          console.log(`icon_${key}`);
          this.gameState.currentPet = key;
          this.scene.start("PetScene");
        },
        { scale: 0.4, hoverScale: 0.5 },
      );
      this.buttons[key] = btt;
      x += 300;
    }
  }
}
