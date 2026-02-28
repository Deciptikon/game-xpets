export const data = {
  init: function (pet) {
    pet.selfCounter = 0;
    pet.lastTile = null;
  },
  step: function (pet, current = null) {
    pet.selfCounter++;
    pet.experience += 0.7;
    if ([TA.SEAS, TA.LAVA].includes(current.tile)) {
      if ([TA.SEAS, TA.LAVA].includes(pet.lastTile)) {
        pet.stats.hp = 0;
        pet.emojiStatus = "❤️x0";
        console.log(`hp = ${pet.stats.hp}`);
        return;
      }
      pet.stats.hp--;
      pet.experience += 0.7;
      pet.emojiStatus = "-1❤️";
    }
    pet.lastTile = current.tile;
    console.log(`hp = ${pet.stats.hp}`);
  },
};
