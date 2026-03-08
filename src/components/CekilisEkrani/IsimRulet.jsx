import { useState, useEffect, useRef } from "react";
import { rastgeleEleman } from "../../utils/random";

/**
 * Kart içi isim ruleti.
 * 3 durum: "bekliyor" (arka plan döner), "aktif" (hızlı rulet), "kazandi" (sonuç).
 */
export default function IsimRulet({ kisiler, durum, kazanan, ruletIsim }) {
  const [arkaplanIsim, setArkaplanIsim] = useState("");
  const intervalRef = useRef(null);

  // Bekleyen ve henüz kazanan atanmamış kartlar için yavaş arka plan ruleti
  useEffect(() => {
    if (durum !== "bekliyor" || !kisiler.length) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setArkaplanIsim(rastgeleEleman(kisiler) || "");
    }, 250);

    return () => clearInterval(intervalRef.current);
  }, [durum, kisiler]);

  // ── Kazandı durumu ──
  if (durum === "kazandi" && kazanan) {
    return (
      <div
        className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{ animation: "scale-up 0.5s ease-out forwards" }}
      >
        {kazanan}
      </div>
    );
  }

  // ── Aktif rulet ──
  if (durum === "aktif") {
    return (
      <div
        key={ruletIsim}
        className="text-2xl font-bold text-white"
        style={{ animation: "slot-in 80ms ease-out" }}
      >
        {ruletIsim || "..."}
      </div>
    );
  }

  // ── Bekliyor (arka plan rületi) ──
  return (
    <div className="text-lg text-white/25 transition-opacity duration-150">
      {arkaplanIsim || "..."}
    </div>
  );
}
