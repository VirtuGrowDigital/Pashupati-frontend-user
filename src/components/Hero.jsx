import React from "react";
import { motion } from "framer-motion";
import bottle from "../assets/bottle.png";
import heroBg from "../assets/Rectangle 1.png";

const Hero = () => {
  const whatsappNumber = "919876543210";
  const handleExploreClick = () => {
    const section = document.getElementById("products");
    if (section) {
      const yOffset = -100; // adjust for navbar
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      className="w-full rounded-3xl shadow-lg mt-24 px-6 md:px-16 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Content (Text) */}
      <motion.div
        className="flex-1 text-white space-y-6"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1
          className="text-2xl sm:text-3xl md:text-5xl font-light leading-snug"
          style={{ fontFamily: "Manjari, sans-serif" }}
        >
          Best Cooking Oil Company in Lucknow

        </h1>

        <p className="text-sm font-extralight sm:text-base md:text-xl text-gray-200 leading-relaxed max-w-lg">
          <h3 className="font-bold">राजस्थान के चुनिंदा खेतों से आपकी रसोई तक</h3> <br />
          Best Cooking Oil Company in Lucknow, proudly offers pure wood-pressed
          mustard oil made using traditional methods. Rich in nutrients, natural aroma,
          and authentic taste, our oil ensures purity and health in every drop, making
          it the perfect choice for cooking, wellness, and everyday use.
        </p>

        <div className="flex space-x-4 sm:space-x-6 pt-6">
          {/* Explore More scrolls to Product Section */}
          <button
            onClick={handleExploreClick}
            className="bg-white text-black text-sm sm:text-base md:text-lg font-extralight px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg shadow hover:bg-gray-200 transition cursor-pointer"
          >
            Explore More
          </button>

          {/* WhatsApp Enquiry */}
          <a
            href="https://wa.me/message/VTG5NXOH5TYIN1?text=Hi,%20I%20want%20to%20know%20more%20about%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 text-white text-sm sm:text-base md:text-lg font-extralight px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg shadow hover:bg-green-700 transition cursor-pointer"
          >
            Whatsapp Enquiry
          </a>
        </div>
      </motion.div>

      {/* Right Content (Bottle Image) */}
      <motion.div
        className="flex-1 relative flex flex-col items-center mt-12 md:mt-0"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src={bottle}
          alt="Mustard Oil Bottle"
          className="h-72 sm:h-96 md:h-[28rem] lg:h-[34rem] drop-shadow-2xl"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
