console.log("start PetScene");
import { newBackButton } from "../components/Button.js";
import IconButton from "../components/IconButton.js";
import { W, H } from "../constants.js";
import { ListPets } from "../pets/listPets.js";

export default class PetScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetScene" });

    this.buttons = {};
  }

  create() {
    this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    console.log("PetScene");
    newBackButton(this, "PetsScene");

    console.log(ListPets[this.gameState.currentPet]);
  }
}
