import { TA } from "../../maps/tileInfo.js";

export const data = {
  // эта функция вызывается только в конструкторе, один раз
  modifyStats: function (pet, val = null) {
    console.log(`modifyStats`);
    pet.probs[TA.SEAS] = 0;
  },

  // эта функция будет вызываться на каждом шаге расчетов.
  updateStats: function (pet, val = null) {},
};
