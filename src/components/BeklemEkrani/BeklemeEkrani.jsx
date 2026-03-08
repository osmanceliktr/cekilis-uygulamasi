import { motion } from "framer-motion";
import IsimBulut from "./IsimBulut";
import KisiSayaci from "./KisiSayaci";
import CekilisiBaslatBtn from "./CekilisiBaslatBtn";

/**
 * Çekiliş başlamadan önce gösterilen ana bekleme ekranı.
 * Katılımcı sayacı + arka plan isim bulutu + başlat butonu.
 */
export default function BeklemeEkrani({ kisiler, yukleniyor, onBaslat }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative w-screen h-screen flex flex-col items-center justify-center"
    >
      <IsimBulut kisiler={kisiler} />

      <KisiSayaci sayi={kisiler.length} />

      <div className="mt-16">
        <CekilisiBaslatBtn
          onClick={onBaslat}
          disabled={yukleniyor || kisiler.length === 0}
        />
      </div>
    </motion.div>
  );
}
