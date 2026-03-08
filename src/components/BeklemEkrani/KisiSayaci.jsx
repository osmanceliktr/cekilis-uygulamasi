import SayacAnimasyon from "../shared/SayacAnimasyon";

/**
 * Ekranın ortasında büyük, animasyonlu katılımcı sayacı.
 */
export default function KisiSayaci({ sayi }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center">
      <div
        className="font-extrabold text-white drop-shadow-[0_0_40px_rgba(99,102,241,0.6)]"
        style={{ fontSize: "20vh", lineHeight: 1 }}
      >
        <SayacAnimasyon hedef={sayi} />
      </div>
      <p className="text-3xl text-white/60 mt-4 tracking-[0.3em] uppercase font-light">
        Katılımcı
      </p>
    </div>
  );
}
