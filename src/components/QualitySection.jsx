import React from "react";
import bgWave from "../assets/BG.png"; // wave background
import machineImage from "../assets/Rectangle 8.png"; // mustard oil machine with text
import food1 from "../assets/food1.png";
import food2 from "../assets/Image 2.png";
import food3 from "../assets/Image 3.png";
import food4 from "../assets/Image 4.png";
import food5 from "../assets/Image 5.png";
import mint from "../assets/Mint.png";
import oilDrop from "../assets/oildrop1.png"; // oil drop image

const QualitySection = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${bgWave})` }}
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Left Image */}
        <div className="flex-1">
          <img
            src={machineImage}
            alt="Mustard Oil Extraction"
            className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 text-center md:text-left relative">
          {/* Mint Leaf Top Right */}
          <img
            src={mint}
            alt="Mint Leaf"
            className="absolute -top-14 md:-top-20 right-4 md:right-10 w-16 sm:w-20 md:w-28 lg:w-32"
          />

          {/* Heading with Oil Drop */}
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6 relative z-10">
            <img src={oilDrop} alt="Oil Drop" className="w-10 sm:w-12 md:w-16" />
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Made for those who seek a premium quality & freshness.
            </h2>
          </div>

          {/* Subheading */}
          <p className="text-gray-500 mb-8 text-sm sm:text-base md:text-lg">
            Ingredients that will define the meaning of every dish
          </p>

          {/* Food Images → 2:3 ratio */}
          <div className="flex flex-col items-center gap-6">
            {/* Row 1 → 2 items */}
            <div className="flex justify-center gap-6">
              {[food1, food2].map((food, i) => (
                <div
                  key={i}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                >
                  <img
                    src={food}
                    alt={`Food ${i + 1}`}
                    className="w-full h-full object-cover rounded-full shadow-lg border-4 border-gray-200"
                  />
                </div>
              ))}
            </div>

            {/* Row 2 → 3 items */}
            <div className="flex justify-center gap-6">
              {[food3, food4, food5].map((food, i) => (
                <div
                  key={i}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                >
                  <img
                    src={food}
                    alt={`Food ${i + 3}`}
                    className="w-full h-full object-cover rounded-full shadow-lg border-4 border-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
