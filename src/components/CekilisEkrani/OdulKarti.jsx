import IsimRulet from "./IsimRulet";
import PartikulEfekt from "../shared/PartikulEfekt";

/**
 * Tek bir ödül kartı — ikon, isim alanı (rulet) ve kazanan göstergesi.
 */
export default function OdulKarti({
  kategori,
  kartIndex,
  kazanan,
  aktif,
  ruletIsim,
  kisiler,
  kazananBelirlendi,
}) {
  const durum = kazanan ? "kazandi" : aktif ? "aktif" : "bekliyor";

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center gap-3
        rounded-2xl border p-6 min-h-[200px] transition-all duration-500
        ${
          durum === "kazandi"
            ? `bg-gradient-to-br ${kategori.gradyan} border-white/30 shadow-2xl`
            : durum === "aktif"
              ? "bg-white/10 border-white/40 shadow-lg shadow-indigo-500/20 ring-2 ring-white/20"
              : "bg-white/[0.03] border-white/10 opacity-40"
        }
      `}
      style={
        kazananBelirlendi
          ? { animation: "winner-glow 1.5s ease-in-out infinite" }
          : undefined
      }
    >
      {/* Ödül adı */}
      <div className="text-center">
        <p className="text-sm font-medium text-white/60 tracking-wider uppercase">
          {kategori.odul} #{kartIndex + 1}
        </p>
      </div>

      {/* İsim alanı */}
      <div className="flex items-center justify-center min-h-[48px] w-full">
        <IsimRulet
          kisiler={kisiler}
          durum={durum}
          kazanan={kazanan}
          ruletIsim={ruletIsim}
        />
      </div>

      {/* Kazanan işareti */}
      {kazanan && !kazananBelirlendi && (
        <div className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">Kazanan</div>
      )}

      {/* Konfeti efekti */}
      <PartikulEfekt aktif={kazananBelirlendi} renk={kategori.renk} />
    </div>
  );
}
