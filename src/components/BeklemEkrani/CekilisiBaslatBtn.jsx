/**
 * Çekilişi başlatan animasyonlu CTA butonu.
 */
export default function CekilisiBaslatBtn({ onClick, disabled }) {
  return (
    <div className="relative z-10">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          px-14 py-6 text-2xl font-bold text-white rounded-2xl
          bg-gradient-to-r from-indigo-600 to-purple-600
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-4 focus:ring-indigo-500/50
          ${
            disabled
              ? "opacity-40 cursor-not-allowed"
              : "hover:from-indigo-500 hover:to-purple-500 hover:scale-105 active:scale-95 cursor-pointer"
          }
        `}
        style={!disabled ? { animation: "pulse-glow 2s ease-in-out infinite" } : undefined}
      >
        🎰 Çekilişi Başlat
      </button>
    </div>
  );
}
