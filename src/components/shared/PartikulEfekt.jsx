import { useEffect } from "react";
import confetti from "canvas-confetti";

/**
 * Konfeti patlaması efekti — aktif olduğunda ateşlenir.
 * @param {{ aktif: boolean, renk: string }} props
 */
export default function PartikulEfekt({ aktif, renk = "#6366f1" }) {
  useEffect(() => {
    if (!aktif) return;

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      colors: [renk, "#ffffff", "#fbbf24", "#a78bfa"],
    };

    const fire = (particleRatio, opts) => {
      confetti({
        ...defaults,
        particleCount: Math.floor(200 * particleRatio),
        origin: { x: 0.5, y: 0.5 },
        ...opts,
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, [aktif, renk]);

  return null;
}
