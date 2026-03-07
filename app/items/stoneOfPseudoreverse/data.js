import { TA } from "../../maps/tileInfo.js";

export const data = {
  // эта функция вызывается только в конструкторе, один раз
  modifyStats: function (pet, val = null) {
    console.log(`modifyStats`);

    let maxP = 0;
    for (const type in TA) {
      if (pet.probs[type] > maxP) maxP = pet.probs[type];
    }
    for (const type in TA) {
      pet.probs[type] = maxP - pet.probs[type] + 1;
    }
    //pet.probs[TA.SEAS] = 0;
    console.log(pet.probs);
  },

  // эта функция будет вызываться на каждом шаге расчетов.
  updateStats: function (pet, val = null) {},
};
