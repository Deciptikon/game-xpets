import { bird } from "./bird/bird.js";
import { cat } from "./cat/cat.js";
import { dog } from "./dog/dog.js";
import { hedgehog } from "./hedgehog/hedgehog.js";

export const savePetsPrefix = "pet";
export const SavePetsData = {
  level: 1, //        уровень
  experience: 0, //   опыт
  unlocked: false, //  питомец разблокирован

  countOfloc: 0, //   количество пройденных локаций
  timeInLoc: 0, //    количество секунд в игре
  countOfDeath: 0, // количество смертей
};

export const STATS = {
  hp: { name: "Жизнь", icon: "❤️" },
  guard: { name: "Защита", icon: "🛡️" },
  invisible: { name: "Незаметность", icon: "👤" },
  speed: { name: "Скорость", icon: "🌪️" },
  caution: { name: "Осторожность", icon: "🚨" },
  dodge: { name: "Уклонение", icon: "🌀" },
  morale: { name: "Мораль", icon: "⚖️" },
  perception: { name: "Восприятие", icon: "👁️" },
};

// разблокировка слотов инвенторя и абилок в зависимости от уровня прокачки
export const LVL_UNLOCKED = {
  0: 0,
  ability1: 3,
  1: 6,
  2: 9,
  ability2: 12,
  3: 15,
  4: 18,
  ability3: 21,
  5: 24,
};

export const ListPets = {
  cat: cat,
  dog: dog,
  bird: bird,
  hedgehog: hedgehog,
};
