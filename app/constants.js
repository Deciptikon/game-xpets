export const GAME_NAME = "XPets";

// Рахмеры холста и сопряженные параметры
export const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

export const W = 1920;
export const H = 1080;

export const positiveButton = {
  color: 0x4caf50,
  width: W / 5,
  height: H / 10,
  textStyle: { fontSize: `${Math.ceil(H / 20)}px`, color: "#ffffff" },
};
