/**
 * Web Audio API ile çekiliş ses efektleri.
 * Harici dosya gerektirmez — programmatik olarak üretilir.
 */

let audioCtx = null;

/** AudioContext'i lazy olarak oluşturur (kullanıcı etkileşimi gerektirir) */
const getAudioCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
};

/**
 * Çark tick sesi — her isim değişiminde çalınır.
 * Kısa, mekanik bir "tık" efekti.
 * @param {number} pitch - Frekans çarpanı (yavaşladıkça düşür)
 */
export const tickSesiCal = (pitch = 1) => {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(800 * pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400 * pitch, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // Ses çalamazsa sessizce devam et
  }
};

/**
 * Kazanan belirleme fanfarı — kazanan sabitlendiğinde çalınır.
 * Yükselen üç nota dizisi.
 */
export const kazananSesiCal = () => {
  try {
    const ctx = getAudioCtx();
    const notalar = [523, 659, 784]; // C5, E5, G5

    notalar.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.15 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.4);

      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.4);
    });
  } catch {
    // Ses çalamazsa sessizce devam et
  }
};
