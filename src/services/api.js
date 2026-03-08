import { API_URL } from "../constants/cekilis";

/**
 * API'den kişi listesini çeker ve string dizisine normalize eder.
 * @returns {Promise<string[]>} İsim dizisi
 */
export async function kisiListesiGetir() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`API hatası: ${res.status}`);
  const json = await res.json();

  // Beklenen format: { Sonuc, data: [{ Id, KisiAdi }], kisiSayisi }
  if (json.data && Array.isArray(json.data)) {
    return json.data.map((k) => k.KisiAdi);
  }

  // Alternatif: doğrudan dizi dönerse
  if (Array.isArray(json)) {
    return json.map((k) =>
      typeof k === "string" ? k : k.KisiAdi || k.isim || String(k)
    );
  }

  return [];
}
