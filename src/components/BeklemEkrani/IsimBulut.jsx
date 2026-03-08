import { useMemo } from "react";
import { rastgeleSayi } from "../../utils/random";

/**
 * Arka planda yüzen isim bulutu efekti.
 * CSS @keyframes ile performanslı animasyon — React re-render minimize edilir.
 */
export default function IsimBulut({ kisiler }) {
  const isimElementleri = useMemo(() => {
    if (!kisiler.length) return [];

    const ISIM_SAYISI = Math.min(35, Math.max(20, kisiler.length));

    return Array.from({ length: ISIM_SAYISI }, (_, i) => {
      const isim = kisiler[i % kisiler.length];
      const fontSize = rastgeleSayi(1, 3.5);
      const opacity = rastgeleSayi(0.08, 0.35);
      const duration = rastgeleSayi(8, 20);
      const top = rastgeleSayi(2, 95);
      const delay = rastgeleSayi(-20, 0);

      return { id: `${i}-${isim}`, isim, fontSize, opacity, duration, top, delay };
    });
  }, [kisiler]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {isimElementleri.map((item) => (
        <span
          key={item.id}
          className="absolute whitespace-nowrap text-white/20 will-change-transform"
          style={{
            fontSize: `${item.fontSize}rem`,
            top: `${item.top}%`,
            "--float-opacity": item.opacity,
            animation: `float-across ${item.duration}s linear ${item.delay}s infinite`,
          }}
        >
          {item.isim}
        </span>
      ))}
    </div>
  );
}
