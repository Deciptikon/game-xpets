import { TA } from "../../maps/tileInfo.js";

export const data = {
  // эта функция вызывается тоьлко в конструкторе, один раз
  modifyStats: function (pet, val = null) {
    console.log(`modifyStats`);
    pet.stats.invisible = 8;
    pet.stats.speed = 1;
  },

  // эта функция будет вызываться на каждом шаге расчетов.
  updateStats: function (pet, val = null) {},
};
