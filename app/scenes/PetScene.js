console.log("start PetScene");
import Button, { newBackButton } from "../components/Button.js";
import IconButton from "../components/IconButton.js";
import StatusBar from "../components/StatusBar.js";
import TextBox from "../components/TextBox.js";
import { W, H, positiveButton, FONT_SIZE } from "../constants.js";
import { ListPets, STATS } from "../pets/listPets.js";

export default class PetScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetScene" });

    this.buttons = {};
  }

  create() {
    this.gameState = this.game.registry.get("gameState");
    //this.gameState.loadSettings();

    this.gameState.updateStats();
    this.drawStats();

    const textBox = new TextBox(
      this,
      H / 10,
      H * 0.2,
      ListPets[this.gameState.currentPet].info.overview,
      {
        width: W / 3,
        height: H * 0.7,
        backgroundColor: 0x6187a0,
        textColor: "#ffffff",
        fontSize: FONT_SIZE,
        padding: 8,
        borderRadius: 10,
        scrollable: true,
        scrollStep: 1,
        scrollBar: {
          width: 25,
          bgColor: 0x000000,
          bgAlpha: 0.2,
          thumbColor: 0x333333,
          thumbAlpha: 0.8,
        },
      },
    );

    console.log("PetScene");
    newBackButton(this, "PetsScene");

    console.log(ListPets[this.gameState.currentPet]);
  }

  drawStats() {
    if (this.statsBars) this.statsBars.clear();
    this.statsBars = this.add.graphics();

    const barWidth = W / 5;
    const x = W * 0.9 - barWidth;
    let y = H * 0.1;
    const h = H / 20;
    const s = H / 15;
    const color = 0xbb22bb;

    this.bars = {};
    for (const key in STATS) {
      this.bars[key] = new StatusBar(
        this,
        x,
        y,
        STATS[key].icon,
        10,
        this.gameState.pet.stats[key],
        color,
        {
          width: barWidth,
          height: h,
          label: STATS[key].name,
        },
      );
      this.add.existing(this.bars[key]);

      y += h + s;
    }

    new Button(
      this,
      W / 2,
      H - 100,
      "Инвентарь",
      () => {
        this.scene.start("InventoryScene");
      },
      positiveButton,
    );
  }
}
