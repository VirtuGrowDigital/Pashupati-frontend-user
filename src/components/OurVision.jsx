import React from "react";

const OurVision = () => {
  return (
    <div className="relative w-full">
      {/* Mustard Tint Overlay */}
      <div className="absolute inset-0 bg-yellow-700/10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative w-full flex justify-center px-5 py-12">
        <div className="max-w-4xl text-center text-white">

          {/* Heading */}
          <h2
            className="text-4xl md:text-5xl font-extrabold text-yellow-400"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            OUR <span className="text-white">VISION</span>
          </h2>

          {/* Subtitle */}
          <p
            className="italic text-yellow-300 text-lg md:text-xl mt-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Journey of Purity and Tradition 🌿
          </p>

          {/* Story Text */}
          <div
            className="mt-8 space-y-6 text-base md:text-lg leading-relaxed text-gray-200"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            <p>
              At <strong>छौंक-बघार (Chhonk-Baghar)</strong>, our journey began with a 
              simple question — <em>why have we drifted away from the purity our grandparents once trusted?</em>
            </p>

            <p>
              As we explored how modern oils are made, we discovered a hidden truth:
              modern refinement strips mustard oil of its aroma, nutrients, and authenticity,
              leaving behind something far different from what our elders consumed.
            </p>

            <p>
              This realization sparked our mission: to revive the timeless
              <strong> Lakdi Ghani (Wood Pressed) </strong> tradition.  
              What began with one wooden press evolved into a heartfelt journey to bring pure,
              chemical-free, nutrient-rich oil back to every home.
            </p>

            <p>
              Every drop of <strong>छौंक-बघार Wood Pressed Mustard Oil</strong> is extracted slowly,
              without heat — preserving its natural vitamins, antioxidants, and the nostalgic,
              earthy aroma that once filled our kitchens.
            </p>

            <p>
              For us, it’s more than making oil.  
              It is about honoring our roots, reviving forgotten wisdom, and bringing honesty and 
              trust back to your kitchen.
            </p>

            <p className="text-yellow-200 font-semibold">
              At छौंक-बघार, purity isn’t a process — it’s our promise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
