import React from "react";
import product1 from "../assets/Rectangle 5134.png"; // left product image
import product2 from "../assets/Rectangle 5135.png"; // center product image
import product3 from "../assets/Rectangle 5136.png"; // right product image

const WhyChooseUs = () => {
  return (
    <section className="relative w-full bg-[#5E7141] py-16">
      <div className="container mx-auto px-6 bg-white rounded-3xl border-8 border-[#D4A017] shadow-lg py-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Choose us?
          </h2>
          <p className="text-yellow-700 font-semibold mt-2">
            Quality Craftsmanship
          </p>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-2">
            At Pashupati, every drop of mustard oil is crafted with care,
            tradition, and precision. Using the wood-pressed method, we ensure
            purity and preserve the natural nutrients of mustard seeds. Our oil
            is free from chemicals, delivering authentic flavors and natural
            wellness to every household.
          </p>
        </div>

        {/* Product Images */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto mb-12">
          {[product1, product2, product3].map((img, i) => (
            <div
              key={i}
              className="w-44 h-72 md:w-52 md:h-80 bg-gray-100 rounded-[40%] overflow-hidden shadow-xl"
            >
              <img
                src={img}
                alt={`Product ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Why Choose Us Points */}
        <div className="grid gap-6 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-green-700 font-bold text-xl">01</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Pure & Natural</span> – Wood-pressed,
              chemical-free oils.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-green-700 font-bold text-xl">02</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Traditional Process</span> – Wood-pressed
              using age-old methods to retain nutrients.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-green-700 font-bold text-xl">03</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Quality Assurance</span> – Hygienically
              packed for freshness and long shelf life.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-green-700 font-bold text-xl">04</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Save Money</span> –Less consumption compared to other oils.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-green-700 font-bold text-xl">05</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Health Assurance</span> – Good for health and immunity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
