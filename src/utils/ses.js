/**
 * Çekiliş ses efektleri.
 * Tick sesi programatik WAV olarak üretilir (harici dosya gerekmez).
 * Kazanan sesi: public/sounds/winner.mp3 dosyası gerekir.
 */

let tickUrl = null;
let winnerAudio = null;

/**
 * Kısa, temiz bir tick WAV sesi üretir — mekanik çark hissi verir.
 * @returns {string} Blob URL
 */
const tickWavOlustur = () => {
  const sampleRate = 44100;
  const sure = 0.04; // 40ms — kısa ve keskin
  const ornekSayisi = Math.floor(sampleRate * sure);
  const buffer = new ArrayBuffer(44 + ornekSayisi * 2);
  const view = new DataView(buffer);

  // WAV header yazımı
  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, "RIFF");
  view.setUint32(4, 36 + ornekSayisi * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, ornekSayisi * 2, true);

  // Ses sinyali: 1200 Hz sinus + hızlı üstel sönüm → temiz "tık" sesi
  for (let i = 0; i < ornekSayisi; i++) {
    const t = i / sampleRate;
    const zarf = Math.exp(-t * 120);
    const sinyal = Math.sin(2 * Math.PI * 1200 * t) * zarf * 0.6;
    view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, sinyal)) * 32767, true);
  }

  const blob = new Blob([buffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
};

/**
 * Ses kaynaklarını önceden yükler.
 * Tarayıcı autoplay kısıtlaması nedeniyle kullanıcı etkileşimi sonrası çağrılmalı.
 */
export const sesleriOncdenYukle = () => {
  if (tickUrl) return;
  tickUrl = tickWavOlustur();
  winnerAudio = new Audio("/sounds/winner.mp3");
  winnerAudio.load();
};

/**
 * Çark tick sesi — her isim değişiminde çalınır.
 * Her çağrıda yeni Audio nesnesi oluşturur — üst üste binen sesler doğal çark hissi verir.
 * @param {number} pitch - Playback rate çarpanı (yavaşladıkça düşür)
 */
export const tickSesiCal = (pitch = 1) => {
  try {
    if (!tickUrl) sesleriOncdenYukle();
    const ses = new Audio(tickUrl);
    ses.playbackRate = Math.max(pitch, 0.25);
    ses.volume = 0.35;
    ses.play().catch(() => {});
  } catch {
    // Ses çalamazsa sessizce devam et
  }
};

/**
 * Kazanan zil sesi — kazanan sabitlendiğinde çalınır.
 */
export const kazananSesiCal = () => {
  try {
    if (!winnerAudio) sesleriOncdenYukle();
    winnerAudio.currentTime = 0;
    winnerAudio.volume = 0.5;
    winnerAudio.play().catch(() => {});
  } catch {
    // Ses çalamazsa sessizce devam et
  }
};
