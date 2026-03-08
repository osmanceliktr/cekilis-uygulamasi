# 🎰 Çekiliş Uygulaması — Geliştirici Prompt Dökümanı

## 📌 Proje Özeti

React + Vite + JavaScript (TypeScript **kullanılmayacak**) ile geliştirilecek, tek sayfada çalışan, iki ekranlı (görünüm/mod) interaktif bir çekiliş uygulaması. Uygulama tam ekran çalışacak, yüksek kaliteli görsel animasyonlar ve modern efektler içerecek.

---

## 🗂️ Teknoloji Stack

| Katman       | Teknoloji                              |
|-------------|----------------------------------------|
| Framework   | React 18+                              |
| Build Tool  | Vite                                   |
| Dil         | JavaScript (ES2022+) — TypeScript YOK  |
| Animasyon   | Framer Motion + CSS Keyframes          |
| HTTP        | Axios veya native fetch                |
| Stil        | Tailwind CSS veya CSS Modules          |
| State       | useState + useReducer + useRef         |

---

## 📁 Proje Klasör Yapısı

```
src/
├── components/
│   ├── BeklemEkrani/
│   │   ├── BeklemeEkrani.jsx
│   │   ├── KisiSayaci.jsx
│   │   ├── IsimBulut.jsx
│   │   └── CekilisiBaslatBtn.jsx
│   ├── CekilisEkrani/
│   │   ├── CekilisEkrani.jsx
│   │   ├── OdulKarti.jsx
│   │   ├── IsimRulet.jsx
│   │   └── KazananListesi.jsx
│   └── shared/
│       ├── PartikulEfekt.jsx
│       └── SayacAnimasyon.jsx
├── constants/
│   └── cekilis.js          ← Ödül konfigürasyonu burada
├── hooks/
│   ├── useKisiListesi.js
│   └── useCekilis.js
├── services/
│   └── api.js
├── utils/
│   └── random.js
├── App.jsx
└── main.jsx
```

---

## ⚙️ Sabitler — `src/constants/cekilis.js`

```js
// Bu dosya ileride yeni çekilişler eklemek için genişletilebilir yapıda olmalı.
export const CEKILIS_KATEGORILERI = [
  {
    id: "tablet",
    odul: "Tablet",
    kazananSayisi: 3,
    renk: "#6366f1",        // indigo
    gradyan: "from-indigo-500 to-purple-600",
    ikon: "💻",
  },
  {
    id: "kulaklik",
    odul: "Kulaklık",
    kazananSayisi: 3,
    renk: "#10b981",        // emerald
    gradyan: "from-emerald-500 to-teal-600",
    ikon: "🎧",
  },
  {
    id: "scooter",
    odul: "Scooter",
    kazananSayisi: 3,
    renk: "#f59e0b",        // amber
    gradyan: "from-amber-500 to-orange-600",
    ikon: "🛴",
  },
];

// API endpoint
export const API_URL = "http://localhost:50750/api/Cekilis/Liste";

// Polling aralığı (ms)
export const POLLING_INTERVAL = 10_000;

// Rulet animasyon hızı — her kaç ms'de bir isim değişsin
export const RULET_INTERVAL = 100;
```

---

## 🖥️ EKRAN 1 — Bekleme / İzleme Ekranı

### Açıklama
Çekiliş başlamadan önce gösterilen ana ekran. Katılımcı sayısını büyük ve belirgin şekilde gösterir. Arkada, farklı boyut ve opaklıklarda isimler yüzerken kaybolur ve yenileri gelir.

### Özellikler

#### 1. Kişi Sayacı (`KisiSayaci.jsx`)
- Ekranın tam ortasında, ekran yüksekliğinin **1/5'i** kadar `font-size` ile gösterilecek.  
  Öneri: `font-size: 20vh`
- Rakam değiştiğinde **count-up animasyonu** (0'dan mevcut sayıya hızlıca çıkma) uygulanacak.
- Sayının altında `"Katılımcı"` etiketi daha küçük ama okunabilir biçimde yazılacak.
- Renk: Parlak beyaz veya neon renk tonu, arka plan karanlık.

#### 2. İsim Bulutu Efekti (`IsimBulut.jsx`)
- Sayacın arkasında (z-index düşük) isimler **farklı boyut, opaklık ve hızlarda** soldan sağa veya rastgele yönlerde yüzerek geçecek.
- Her isim için:
  - `font-size`: `1rem` ile `3.5rem` arası rastgele
  - `opacity`: `0.08` ile `0.35` arası rastgele
  - `animasyon süresi`: `8s` ile `20s` arası rastgele
  - Renk: beyazın tonları veya pastel renkler
- Ekranda aynı anda **20–40 isim** bulunacak.
- Her 10 saniyede API'den yeni liste geldiğinde isimler güncellenir, eski isimler fade-out ile çıkar, yeniler fade-in ile girer.
- **Performans notu:** `requestAnimationFrame` veya CSS `@keyframes` kullan, React re-render sayısını minimize et. İsimleri `useMemo` ile memoize et.

#### 3. Çekilişi Başlat Butonu (`CekilisiBaslatBtn.jsx`)
- Ekranın alt kısmında, merkezi konumda.
- Büyük, dikkat çekici, animasyonlu bir CTA butonu.
- Hover'da parlama / pulse efekti.
- Tıklandığında ekran 2'ye geçiş animasyonuyla (fade veya slide) geçilir.

### API Entegrasyonu (`useKisiListesi.js`)
```js
// useKisiListesi.js
import { useState, useEffect } from "react";
import { API_URL, POLLING_INTERVAL } from "../constants/cekilis";

export function useKisiListesi() {
  const [kisiler, setKisiler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setKisiler(data);       // API'nin döndürdüğü isim dizisi
      } catch (err) {
        console.error("Liste alınamadı:", err);
      } finally {
        setYukleniyor(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { kisiler, yukleniyor };
}
```

---

## 🎰 EKRAN 2 — Çekiliş Ekranı

### Açıklama
Çekiliş başlatıldığında gösterilen ekran. Her ödül kategorisi için 3 kart yan yana sıralanır. Rulet animasyonuyla isimler hızla değişir, sırayla her karta kazanan yerleşir.

### Özellikler

#### 1. Ödül Kartları (`OdulKarti.jsx`)
- Her kategori için **3 kart** yan yana (`grid` veya `flex`).
- Her kart:
  - Üstte ödül ikonu + ödül adı
  - Ortada büyük **isim alanı** (rulet animasyonu buraya)
  - Altta kazanan onaylandığında ✅ işareti ve konfeti patlaması
- Boş kartlar soluk/opak görünür. Kazanan doldurulunca parlak hale gelir.
- Kart arka planı kategoriye göre farklı gradyan renk.

#### 2. Rulet Animasyonu (`IsimRulet.jsx`)
```
Akış:
1. Çekiliş başladığında tüm kategoriler için aynı anda rulet başlar.
2. Her 100ms'de bir, kartın isim alanına API listesinden rastgele bir isim yazılır.
3. İsim değişiminde blur → clear → blur efekti (veya vertical scroll animasyonu).
4. Sırayla: önce Tablet için 1. kart dolar, sonra 2., sonra 3.
5. Her kart dolduğunda:
   - İsim büyür ve parlak hale gelir (scale + glow animasyonu)
   - Kart "kazandı" durumuna geçer
   - Konfeti/partikül efekti patlar
   - Ses efekti (opsiyonel)
6. Tüm kartlar dolduğunda bir sonraki kategoriye geçilir.
7. Tüm kategoriler tamamlandığında "Çekiliş Tamamlandı" ekranı gösterilir.
```

#### 3. Kazanan Seçim Algoritması (`useCekilis.js`)
```js
// useCekilis.js
import { useState, useRef, useCallback } from "react";
import { CEKILIS_KATEGORILERI, RULET_INTERVAL } from "../constants/cekilis";

export function useCekilis(kisiler) {
  const [aktifKategoriIndex, setAktifKategoriIndex] = useState(0);
  const [kazananlar, setKazananlar] = useState(
    // { tablet: [], kulaklik: [], scooter: [] }
    Object.fromEntries(CEKILIS_KATEGORILERI.map((k) => [k.id, []]))
  );
  const [ruletIsim, setRuletIsim] = useState("");
  const [aktifKartIndex, setAktifKartIndex] = useState(0);
  const [bitti, setBitti] = useState(false);
  const intervalRef = useRef(null);
  const kullanilmislar = useRef(new Set());

  const rastgeleIsim = useCallback(() => {
    const musaitler = kisiler.filter((k) => !kullanilmislar.current.has(k));
    if (!musaitler.length) return null;
    return musaitler[Math.floor(Math.random() * musaitler.length)];
  }, [kisiler]);

  const cekilisiBaslat = useCallback(() => {
    // ... rulet mantığı burada
    // Her 100ms rastgele isim göster
    // Belirli süre sonra kazananı sabitle
    // Sonraki karta geç
    // Tüm kategoriler bitince bitti = true
  }, [rastgeleIsim]);

  return { kazananlar, ruletIsim, aktifKategoriIndex, aktifKartIndex, bitti, cekilisiBaslat };
}
```

---

## 🎨 Görsel Tasarım Gereksinimleri

### Genel Tema
- **Arka plan:** Koyu, derin renk (örn. `#0a0a1a` veya `#050510`)
- **Renk paleti:** Neon ve canlı renkler karanlık zemin üzerinde
- **Font:** Google Fonts — `"Outfit"` veya `"Space Grotesk"` (modern, geometrik)
- **Genel his:** Event LED ekranı, gaming, premium ödül töreni

### Animasyon Kütüphaneleri ve Teknikler
| Efekt | Yöntem |
|---|---|
| İsim bulutu hareketi | CSS `@keyframes` + `transform: translateX` |
| Sayaç count-up | Custom hook + `requestAnimationFrame` |
| Ekran geçişi | Framer Motion `AnimatePresence` |
| Rulet isim değişimi | CSS `opacity` + `translateY` transition |
| Kazanan patlaması | `canvas-confetti` npm paketi |
| Kart parlama | CSS `box-shadow` + `filter: brightness` |
| Buton pulse | CSS `@keyframes pulse` |
| Parçacık efekti | `tsparticles` veya custom canvas |

### Önerilen Animasyon Süreleri
```
Ekran geçişi       : 600ms ease-in-out
Rulet interval     : 100ms
Kazanan sabitleme  : 1200ms (yavaşlayarak dur)
Konfeti süresi     : 3000ms
Kart fade-in       : 400ms
İsim bulutu        : 10-20s (her isim için farklı)
```

---

## 📡 API Sözleşmesi

**Endpoint:** `GET http://localhost:50750/api/Cekilis/Liste`

**Beklenen Response (örnek):**
```json
{
"Sonuc": true,
"data": [
{
"Id": 79,
"KisiAdi": "Adile Naşit"
},
{
"Id": 89,
"KisiAdi": "Afra Saraçoğlu"
}
],
"kisiSayisi": 100
}
```

> ⚠️ API farklı bir format dönüyorsa, `services/api.js` içinde `normalize` fonksiyonu yazılacak ve uygulama her zaman `string[]` (isim dizisi) ile çalışacak.

---

## 🧩 Bileşen Hiyerarşisi

```
App.jsx
├── [ekran === "bekleme"] → BeklemeEkrani
│   ├── IsimBulut          (arka plan, z:0)
│   ├── KisiSayaci         (ön plan, z:10)
│   └── CekilisiBaslatBtn  (alt, z:10)
└── [ekran === "cekilis"] → CekilisEkrani
    ├── [kategori döngüsü] → OdulKarti × 3
    │   └── IsimRulet      (kart içi)
    └── KazananListesi     (tüm çekilişler bitince)
```

---

## 🚀 Vite Konfigürasyonu

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:50750",
        changeOrigin: true,
      },
    },
  },
});
```

---

## 📦 Kurulum Komutları

```bash
npm create vite@latest cekilis-app -- --template react
cd cekilis-app
npm install
npm install framer-motion canvas-confetti
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## ✅ Geliştirme Checklist

### Ekran 1
- [ ] API polling her 10 saniyede bir çalışıyor
- [ ] Kişi sayısı `20vh` font-size ile gösteriliyor
- [ ] İsim bulutu 20-40 isimle sürekli hareket ediyor
- [ ] Yeni liste geldiğinde isimler smooth güncelleniyor
- [ ] Çekilişi Başlat butonu animasyonlu

### Ekran 2
- [ ] 3 kategori × 3 kart = 9 kart görünüyor
- [ ] Rulet her 100ms'de isim değiştiriyor
- [ ] Kazanan sırayla kartlara yazılıyor
- [ ] Kazanan kartı parlıyor + konfeti
- [ ] Kullanılan isimler tekrar seçilmiyor
- [ ] Tüm kategoriler bitince özet ekranı geliyor

### Genel
- [ ] Mobil uyumlu değil — **tam ekran, single display** odaklı
- [ ] `constants/cekilis.js` üzerinden yeni ödüller kolayca eklenebiliyor
- [ ] Console'da hata yok
- [ ] Performans: 60fps animasyon korunuyor

---

## 🔮 İleride Eklenebilecekler (Scope Dışı)

- Yeni çekiliş kategorisi → sadece `constants/cekilis.js`'e yeni obje ekle
- Ses efektleri (rulet sesi, kazanan fanfarı)
- Kazananları PDF/Excel'e export etme
- QR kod ile katılım sistemi
- Çekiliş geçmişi log'u

---

> **Not:** Bu prompt, uygulamayı sıfırdan oluşturacak bir AI kod asistanına (Cursor, GitHub Copilot, Claude vb.) verebilirsin. Tüm mimari kararlar, dosya yapısı, veri akışı ve animasyon gereksinimleri bu döküman içinde tanımlanmıştır.