/**
 * Çekiliş kategorileri — yeni ödül eklemek için bu diziye yeni obje ekle.
 */
export const CEKILIS_KATEGORILERI = [
  {
    id: "tablet",
    odul: "Tablet",
    kazananSayisi: 3,
    renk: "#6366f1",
    gradyan: "from-indigo-500 to-purple-600",
    ikon: "💻",
  },
  {
    id: "kulaklik",
    odul: "Kulaklık",
    kazananSayisi: 3,
    renk: "#10b981",
    gradyan: "from-emerald-500 to-teal-600",
    ikon: "🎧",
  },
  {
    id: "scooter",
    odul: "Scooter",
    kazananSayisi: 3,
    renk: "#f59e0b",
    gradyan: "from-amber-500 to-orange-600",
    ikon: "🛴",
  },
];

/** API endpoint — Vite proxy üzerinden yönlendirilir */
export const API_URL = "/api/Cekilis/Liste";

/** Polling aralığı (ms) */
export const POLLING_INTERVAL = 10_000;

/** Rulet animasyon hızı — her kaç ms'de bir isim değişsin */
export const RULET_INTERVAL = 100;
