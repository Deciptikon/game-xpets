import { TA } from "../../maps/tileInfo.js";

export const data = {
  // эта функция вызывается тоьлко в конструкторе, один раз
  modifyStats: function (pet, val = null) {},

  // эта функция будет вызываться на каждом шаге расчетов.
  updateStats: function (pet, val = null) {
    console.log(`updateStats`);
    if (pet.stats?.morale < 3) {
      pet.stats.morale = 3;
    }
  },
};
