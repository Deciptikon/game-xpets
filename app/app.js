console.log("start");
import { W, H } from "./constants.js";

//import GameState from "./GameState.js";

import PreSplashScene from "./scenes/PreSplashScene.js";
import SplashScene from "./scenes/SplashScene.js";
import MenuScene from "./scenes/MenuScene.js";
import SettingsScene from "./scenes/SettingsScene.js";

//export const gameState = new GameState();

//console.log(gameState.data);

const config = {
  type: Phaser.CANVAS,
  width: W, // Вертикальный макет для мобилок / альбомный для ПК
  height: H,
  scene: [PreSplashScene, SplashScene, MenuScene, SettingsScene],
  backgroundColor: "#9bd6ff",
  scale: {
    mode: Phaser.Scale.FIT, //Phaser.Scale.ENVELOP
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    backgroundColor: "#9bd6ff",
  },
};

const game = new Phaser.Game(config);

//game.registry.set("gameState", gameState);

window.addEventListener("beforeunload", () => {
  //gameState.save();
});
