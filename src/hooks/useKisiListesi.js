import { useState, useEffect } from "react";
import { POLLING_INTERVAL } from "../constants/cekilis";
import { kisiListesiGetir } from "../services/api";

/**
 * API'den kişi listesini çeker ve belirli aralıklarla günceller.
 * @returns {{ kisiler: string[], yukleniyor: boolean }}
 */
export function useKisiListesi() {
  const [kisiler, setKisiler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    let aktif = true;

    const fetchData = async () => {
      try {
        const data = await kisiListesiGetir();
        if (aktif) setKisiler(data);
      } catch (err) {
        console.error("Liste alınamadı:", err);
      } finally {
        if (aktif) setYukleniyor(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, POLLING_INTERVAL);

    return () => {
      aktif = false;
      clearInterval(interval);
    };
  }, []);

  return { kisiler, yukleniyor };
}
