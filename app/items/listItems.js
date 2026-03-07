import { TA } from "../Map/TileInfo.js";
import { chamomile } from "./chamomile/chamomile.js";
import { lastDrop } from "./lastDrop/lastDrop.js";
import { leadBullet } from "./leadBullet/leadBullet.js";
import { walnut } from "./walnut/walnut.js";
import { wingOfFly } from "./wingOfFly/wingOfFly.js";
import { eyeOfStorm } from "./eyeOfStorm/eyeOfStorm.js";
import { stoneOfPseudoreverse } from "./stoneOfPseudoreverse/stoneOfPseudoreverse.js";

export const saveItemsPrefix = "item";
export const SaveItemsData = {
  unlocked: false,
  place: "none", // 'PET.CAT'  ||  'PET.DOG'  || ....
  slot: 0, // слот в инвентаре питомца

  countOfLoc: 0, // количество завершенных миссий с этим предметом
};

export const ListItems = {
  walnut: walnut,
  leadBullet: leadBullet,
  wingOfFly: wingOfFly,
  lastDrop: lastDrop,
  chamomile: chamomile,
  eyeOfStorm: eyeOfStorm,
  stoneOfPseudoreverse: stoneOfPseudoreverse,
};
