// Рахмеры холста и сопряженные параметры
export const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

export const W = isMobile ? 540 : 1920;
export const H = 1080;
