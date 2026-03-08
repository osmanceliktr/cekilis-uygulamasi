import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BeklemeEkrani from "./components/BeklemEkrani/BeklemeEkrani";
import CekilisEkrani from "./components/CekilisEkrani/CekilisEkrani";
import { useKisiListesi } from "./hooks/useKisiListesi";

function App() {
  const [ekran, setEkran] = useState("bekleme");
  const { kisiler, yukleniyor } = useKisiListesi();

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {ekran === "bekleme" ? (
          <BeklemeEkrani
            key="bekleme"
            kisiler={kisiler}
            yukleniyor={yukleniyor}
            onBaslat={() => setEkran("cekilis")}
          />
        ) : (
          <CekilisEkrani key="cekilis" kisiler={kisiler} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
