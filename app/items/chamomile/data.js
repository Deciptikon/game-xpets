import { TA } from "../../maps/tileInfo.js";

export const data = {
  // эта функция вызывается тоьлко в конструкторе, один раз
  modifyStats: function (pet, val = null) {},

  // эта функция будет вызываться на каждом шаге расчетов.
  updateStats: function (pet, current) {
    if (
      Math.random() < 0.01 &&
      current.tile === TA.STEPPES &&
      pet.stats.hp < 10
    ) {
      pet.stats.hp++;
      pet.emojiStatus = "+1❤️";
      console.log("        +1HP");
    }
  },
};
