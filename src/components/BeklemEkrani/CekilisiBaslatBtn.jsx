/**
 * Çekilişi başlatan kurumsal CTA butonu.
 */
export default function CekilisiBaslatBtn({ onClick, disabled }) {
  return (
    <div className="relative z-10">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          px-14 py-6 text-2xl font-bold text-white rounded-2xl
          bg-gradient-to-r from-blue-700 to-blue-900
          border border-white/20
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-4 focus:ring-blue-500/50
          ${
            disabled
              ? "opacity-40 cursor-not-allowed"
              : "hover:from-blue-600 hover:to-blue-800 hover:scale-105 active:scale-95 cursor-pointer"
          }
        `}
        style={!disabled ? { animation: "pulse-glow 2s ease-in-out infinite" } : undefined}
      >
        Çekilişi Başlat
      </button>
    </div>
  );
}
