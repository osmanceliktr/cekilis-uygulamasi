/**
 * Min ve max (dahil) arasında rastgele tam sayı üretir.
 */
export const rastgeleSayi = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Min ve max arasında rastgele ondalıklı sayı üretir.
 */
export const rastgeleOndalik = (min, max) =>
  Math.random() * (max - min) + min;

/**
 * Diziden rastgele bir eleman seçer.
 */
export const rastgeleEleman = (dizi) => {
  if (!dizi.length) return null;
  return dizi[Math.floor(Math.random() * dizi.length)];
};
