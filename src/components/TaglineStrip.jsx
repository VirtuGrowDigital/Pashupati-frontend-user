import React from "react";

const TaglineStrip = () => {
  return (
    <div className="w-full flex justify-center my-6 px-2">
      <div
        className="
          bg-white rounded-full shadow-md 
          px-4 sm:px-8 py-2 sm:py-3 
          flex items-center justify-center 
          gap-3 sm:gap-6 
          overflow-x-auto whitespace-nowrap
          max-w-full
          no-scrollbar
        "
      >
        <p className="text-xs sm:text-sm md:text-lg font-semibold text-[#5E7141]">
          Purely Natural, Powerfully Nourishing.
        </p>

        <span className="text-yellow-500 text-lg sm:text-xl">✦</span>

        <p className="text-xs sm:text-sm md:text-lg font-semibold text-[#5E7141]">
          Nature’s Own Oil
        </p>

        <span className="text-yellow-500 text-lg sm:text-xl">✦</span>

        <p className="text-xs sm:text-sm md:text-lg font-semibold text-[#5E7141]">
          natural Ingredients
        </p>
      </div>
    </div>
  );
};

export default TaglineStrip;
