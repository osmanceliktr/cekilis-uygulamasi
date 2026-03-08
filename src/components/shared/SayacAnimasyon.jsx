import { useState, useEffect, useRef } from "react";

/**
 * Sayıyı animasyonlu count-up efektiyle gösterir.
 * @param {{ hedef: number, sure: number }} props
 */
export default function SayacAnimasyon({ hedef, sure = 1500 }) {
  const [deger, setDeger] = useState(0);
  const oncekiRef = useRef(0);

  useEffect(() => {
    const baslangic = oncekiRef.current;
    const fark = hedef - baslangic;
    if (fark === 0) return;

    const baslangicZamani = performance.now();

    const animate = (zaman) => {
      const gecen = zaman - baslangicZamani;
      const ilerleme = Math.min(gecen / sure, 1);
      // easeOutExpo — hızlı başla, yumuşak bitir
      const eased = 1 - Math.pow(2, -10 * ilerleme);
      const mevcutDeger = Math.round(baslangic + fark * eased);

      setDeger(mevcutDeger);

      if (ilerleme < 1) {
        requestAnimationFrame(animate);
      } else {
        oncekiRef.current = hedef;
      }
    };

    requestAnimationFrame(animate);
  }, [hedef, sure]);

  return (
    <span className="tabular-nums">{deger.toLocaleString("tr-TR")}</span>
  );
}
