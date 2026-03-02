import { GAME_NAME } from "./constants.js";
import { ListPets } from "./pets/listPets.js";

export default class GameState {
  constructor() {
    // текущая локация
    this.currentLocation = "forest";
    // текущий питомец
    this.currentPet = "cat";

    // отображаемый питомец (с модификациями от предметов и скиллов)
    this.pet = {
      type: "cat",

      // неизменные данные, но модифицируемые в каждой локации
      stats: {}, // статы
      probs: {}, // вероятности наступить на ячейку

      // изменяемые (нужно сохранять)
      inventory: [], // список найденных предметов на локации
      level: 1, //      уровень
      experience: 0, // опыт

      // заполняемые
      items: [], //     список надетых предметов
    };

    // конструируем локацию, с учетом модификации предметами
    this.location = {
      //
    };

    // хранимые/загружаемые данные---------------------------------------------
    this.data = {
      // игровые ресурсы
      resources: {
        coins: 100,
        crystall: 7,
        recepts: 2,
      },

      // статистика по всем питомцам
      pets: {},

      // Статистика по всем предметам
      items: {},

      // статистика по локациям
      locations: {},

      // игровые достижения (качественные и количественные)
      achievements: {},

      settings: {},
    };
  }

  load() {
    //this.loadFromLocalStorage();
  }

  save() {
    //this.saveToLocalStorage();
  }

  updateStats() {
    //без учета действий предметов
    this.pet.type = this.currentPet;
    this.pet.stats = ListPets[this.pet.type].stats;
    this.pet.probs = ListPets[this.pet.type].probs;
  }
}
