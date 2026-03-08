import { useState, useRef, useCallback, useEffect } from "react";
import { CEKILIS_KATEGORILERI, RULET_INTERVAL } from "../constants/cekilis";
import { rastgeleEleman } from "../utils/random";
import { tickSesiCal, kazananSesiCal, sesleriOncdenYukle } from "../utils/ses";

/**
 * Çekiliş mantığını yöneten hook.
 * Rulet animasyonu, yavaşlama, kazanan belirleme ve sıralı ilerleme sağlar.
 * Aynı kişi birden fazla kez seçilemez — kullanilmislar Set'i ile izlenir.
 * @param {string[]} kisiler - Katılımcı isimleri
 */
export function useCekilis(kisiler) {
  const [aktifKategoriIndex, setAktifKategoriIndex] = useState(0);
  const [aktifKartIndex, setAktifKartIndex] = useState(0);
  const [kazananlar, setKazananlar] = useState(
    Object.fromEntries(CEKILIS_KATEGORILERI.map((k) => [k.id, []]))
  );
  const [ruletIsim, setRuletIsim] = useState("");
  const [bitti, setBitti] = useState(false);
  const [basladi, setBasladi] = useState(false);
  const [kazananBelirlendi, setKazananBelirlendi] = useState(false);

  const kullanilmislar = useRef(new Set());
  const kisilerRef = useRef(kisiler);

  // Ref'i güncel tut — polling sırasında liste değişirse son hali kullanılsın
  useEffect(() => {
    kisilerRef.current = kisiler;
  }, [kisiler]);

  /** Kullanılmamış rastgele bir isim döner — aynı kişi asla iki kez seçilemez */
  const rastgeleMusaitIsim = useCallback(() => {
    const musaitler = kisilerRef.current.filter(
      (k) => !kullanilmislar.current.has(k)
    );
    return rastgeleEleman(musaitler);
  }, []);

  /**
   * Tek bir kart için rulet çevirir, kazananı belirler.
   * @param {string} kategoriId
   * @returns {Promise<string|null>}
   */
  const birKartCek = useCallback(
    (kategoriId) => {
      return new Promise((resolve) => {
        // Kazananı önceden belirle — yavaşlama sonunda bu isim gösterilecek
        const kazanan = rastgeleMusaitIsim();
        if (!kazanan) { resolve(null); return; }

        let sayac = 0;
        const toplamHizliDonme = 20; // ~2 saniye hızlı faz

        // ── Hızlı faz ──
        const hizliInterval = setInterval(() => {
          const isim = rastgeleMusaitIsim();
          if (isim) {
            setRuletIsim(isim);
            tickSesiCal(1.2);
          }
          sayac++;

          if (sayac >= toplamHizliDonme) {
            clearInterval(hizliInterval);

            // ── Yavaşlama fazı ──
            const yavaslamaSureleri = [150, 200, 300, 400, 600, 800, 1000];
            let i = 0;

            const yavasla = () => {
              if (i < yavaslamaSureleri.length) {
                // Son adımda kazananın ismini göster — izleyici doğru ismi görür
                const isim = i === yavaslamaSureleri.length - 1
                  ? kazanan
                  : rastgeleMusaitIsim();
                if (isim) {
                  setRuletIsim(isim);
                  const pitch = 1.0 - i * 0.08;
                  tickSesiCal(Math.max(pitch, 0.5));
                }
                setTimeout(yavasla, yavaslamaSureleri[i]);
                i++;
              } else {
                // ── Kazanan sabitleniyor (son gösterilen isimle aynı) ──
                kullanilmislar.current.add(kazanan);
                setRuletIsim(kazanan);
                setKazananlar((prev) => ({
                  ...prev,
                  [kategoriId]: [...prev[kategoriId], kazanan],
                }));
                setKazananBelirlendi(true);
                kazananSesiCal();

                // Kutlama süresi sonrası devam
                setTimeout(() => {
                  setKazananBelirlendi(false);
                  resolve(kazanan);
                }, 3000);
              }
            };

            yavasla();
          }
        }, RULET_INTERVAL);
      });
    },
    [rastgeleMusaitIsim]
  );

  /** Tüm çekilişi sırayla başlatır */
  const cekilisiBaslat = useCallback(async () => {
    sesleriOncdenYukle();
    setBasladi(true);

    for (let ki = 0; ki < CEKILIS_KATEGORILERI.length; ki++) {
      const kategori = CEKILIS_KATEGORILERI[ki];
      setAktifKategoriIndex(ki);

      for (let kartI = 0; kartI < kategori.kazananSayisi; kartI++) {
        setAktifKartIndex(kartI);

        // Kartlar arası kısa bekleme (ilk kart hariç)
        if (ki > 0 || kartI > 0) {
          await new Promise((r) => setTimeout(r, 500));
        }

        await birKartCek(kategori.id);
      }
    }

    setBitti(true);
  }, [birKartCek]);

  return {
    kazananlar,
    ruletIsim,
    aktifKategoriIndex,
    aktifKartIndex,
    bitti,
    basladi,
    kazananBelirlendi,
    cekilisiBaslat,
  };
}
