import React from "react";
import bgNature from "../assets/Frame37894.png"; // background for text card
import bottle from "../assets/bottle2.png"; // bottle image
import ornament from "../assets/Ornament.png"; // decorative swirl

const ExperienceSection = () => {
  return (
    <section className="relative w-full bg-[#5E7141] py-20 overflow-hidden">
      {/* Ornament Right */}
      <img
        src={ornament}
        alt="ornament"
        className="absolute right-0 top-20 w-[380px] opacity-90 pointer-events-none "
      />

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left: Nature image with overlay card */}

        <div className="w-full md:w-1/2 relative rounded-2xl shadow-lg overflow-hidden 
                h-auto">
  <img
    src={bgNature}
    alt="Nature Background"
    className="w-full h-auto object-contain"
  />
</div>




        {/* Right: Bottle with Hindi text */}
        <div className="flex-1 text-center">
         

          <div className="relative inline-block">
            {/* Yellow glow behind bottle */}
            <div className="absolute inset-0 rounded-full bg-yellow-400 blur-3xl opacity-40"></div>
            <img
              src={bottle}
              alt="Mustard Oil Bottle"
              className="relative w-40 md:w-72 lg:w-80 drop-shadow-2xl"
            />
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
