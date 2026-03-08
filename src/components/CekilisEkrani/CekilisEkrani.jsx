import { useEffect } from "react";
import { motion } from "framer-motion";
import { CEKILIS_KATEGORILERI } from "../../constants/cekilis";
import { useCekilis } from "../../hooks/useCekilis";
import OdulKarti from "./OdulKarti";
import KazananListesi from "./KazananListesi";

/**
 * Çekiliş ekranı — 3 kategori × 3 kart, rulet animasyonu ve kazanan gösterimi.
 */
export default function CekilisEkrani({ kisiler }) {
  const {
    kazananlar,
    ruletIsim,
    aktifKategoriIndex,
    aktifKartIndex,
    bitti,
    basladi,
    kazananBelirlendi,
    cekilisiBaslat,
  } = useCekilis(kisiler);

  // Ekran açıldığında 1 saniye sonra çekilişi başlat
  useEffect(() => {
    if (!basladi && kisiler.length > 0) {
      const timeout = setTimeout(cekilisiBaslat, 1000);
      return () => clearTimeout(timeout);
    }
  }, [basladi, kisiler.length, cekilisiBaslat]);

  // ── Çekiliş tamamlandı ──
  if (bitti) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-screen h-screen flex items-center justify-center"
      >
        <KazananListesi kazananlar={kazananlar} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-screen h-screen flex flex-col items-center justify-center gap-6 p-8"
    >
      <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        🎰 Çekiliş Devam Ediyor...
      </h1>

      <div className="w-full max-w-6xl space-y-6">
        {CEKILIS_KATEGORILERI.map((kategori, ki) => (
          <div key={kategori.id}>
            {/* Kategori başlığı */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{kategori.ikon}</span>
              <h2
                className={`text-2xl font-bold transition-opacity duration-300 ${
                  ki === aktifKategoriIndex
                    ? "text-white opacity-100"
                    : ki < aktifKategoriIndex
                      ? "text-white/70 opacity-80"
                      : "text-white/30 opacity-40"
                }`}
              >
                {kategori.odul}
              </h2>
              {ki < aktifKategoriIndex && (
                <span className="text-green-400 text-xl">✅</span>
              )}
            </div>

            {/* Kartlar */}
            <div className="grid grid-cols-3 gap-4">
              {Array.from(
                { length: kategori.kazananSayisi },
                (_, kartI) => {
                  const kazananIsim =
                    kazananlar[kategori.id]?.[kartI] || null;
                  const buKartAktif =
                    ki === aktifKategoriIndex &&
                    kartI === aktifKartIndex &&
                    basladi &&
                    !kazananIsim;
                  const yeniKazandi =
                    ki === aktifKategoriIndex &&
                    kartI === aktifKartIndex &&
                    kazananBelirlendi;

                  return (
                    <OdulKarti
                      key={`${kategori.id}-${kartI}`}
                      kategori={kategori}
                      kartIndex={kartI}
                      kazanan={kazananIsim}
                      aktif={buKartAktif}
                      ruletIsim={buKartAktif ? ruletIsim : ""}
                      kisiler={kisiler}
                      kazananBelirlendi={yeniKazandi}
                    />
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
