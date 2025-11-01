import React from "react";
 // your like icon
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";

const TestimonialCard = ({ image, text, extraClass }) => {
  return (
    <div
      className={`bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-2xl shadow-xl p-6 w-full max-w-sm relative flex flex-col items-center ${extraClass}`}
    >
      {/* Like Icon */}


      {/* White Inner Box */}
      <div className="bg-white rounded-xl shadow p-6 w-full flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white -mt-12 shadow-md">
          <img
            src={image}
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Stars */}
        <div className="flex justify-center my-2 text-yellow-500 text-lg">
          {"★".repeat(5)}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-700 text-center text-sm md:text-base">{text}</p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#5E7141]">
      <h2
        className="text-2xl md:text-3xl font-semibold text-center text-white mb-12"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        What Our Customers Say
      </h2>

      {/* Flex row for staggered layout */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-12">
        <TestimonialCard
          image={user1}
          text="Pashupati Food has transformed our inventory with their premium oils. Their service is top-notch and highly dependable."
        />
        <TestimonialCard
          image={user2}
          text="The quality of the oils is unmatched. Pashupati is our go-to supplier for all our needs."
          extraClass="md:mt-30" // 👈 only offset on desktop
        />
        <TestimonialCard
          image={user3}
          text="Amazing quality, consistent taste, and reliable service. We’ve been customers for years and will continue to be."
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;
