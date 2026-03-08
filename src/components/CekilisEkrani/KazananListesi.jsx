import { motion } from "framer-motion";
import { CEKILIS_KATEGORILERI } from "../../constants/cekilis";

/**
 * Tüm çekilişler bittikten sonra gösterilen kazanan özeti.
 */
export default function KazananListesi({ kazananlar }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto px-8"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 tracking-wide">
        ÇEKİLİŞ SONUÇLARI
      </h2>
      <div className="mb-10 h-0.5 w-40 mx-auto bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CEKILIS_KATEGORILERI.map((kategori, i) => (
          <motion.div
            key={kategori.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`bg-gradient-to-br ${kategori.gradyan} rounded-2xl p-6 shadow-2xl`}
          >
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-white">
                {kategori.odul}
              </h3>
              <div className="mt-1 h-px w-16 mx-auto bg-white/30" />
            </div>

            <div className="space-y-3">
              {kazananlar[kategori.id]?.map((isim, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-white font-semibold text-center text-lg"
                >
                  {index + 1}. {isim}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
