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
      H * 0.1,
      H * 0.6,
      ListPets[this.gameState.currentPet].info.overview,
      {
        width: W - H * 0.2,
        height: H * 0.3,
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
    const xl = H * 0.15;
    const xr = W - H * 0.125 - barWidth;
    const y0 = H * 0.2;
    let y = y0;
    const h = H * 0.05;
    const s = H * 0.05;
    const color = 0xbb22bb;

    this.bars = {};

    const leftKeys = {
      hp: "hp",
      guard: "guard",
      invisible: "invisible",
      speed: "speed",
    };
    const rightKeys = {
      caution: "caution",
      dodge: "dodge",
      morale: "morale",
      perception: "perception",
    };

    //Левая колонка
    for (const key in leftKeys) {
      this.bars[key] = new StatusBar(
        this,
        xl,
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

    //Правая колонка
    y = y0;
    for (const key in rightKeys) {
      this.bars[key] = new StatusBar(
        this,
        xr,
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
      H * 0.515,
      "Инвентарь",
      () => {
        this.scene.start("InventoryScene");
      },
      positiveButton,
    );
  }
}
