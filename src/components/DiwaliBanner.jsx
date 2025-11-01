import React from "react";

const DiwaliBanner = () => {
  return (
    <div
      className="w-full bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-600 py-2 md:py-3 overflow-hidden relative flex items-center"
      style={{ fontFamily: "Manjari, sans-serif", zIndex: 9999 }}
    >
      <div className="whitespace-nowrap flex animate-marquee">
        <p className="text-white text-sm md:text-base font-semibold tracking-wide mx-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
          ✨ Happy Diwali from Pashupati Food & Agro! ✨ May your life be filled with
          light, prosperity, and joy. ✨
        </p>
        <p className="text-white text-sm md:text-base font-semibold tracking-wide mx-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
          ✨ Happy Diwali from Pashupati Food & Agro! ✨ May your life be filled with
          light, prosperity, and joy. ✨
        </p>
      </div>

      {/* Inline CSS animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DiwaliBanner;
