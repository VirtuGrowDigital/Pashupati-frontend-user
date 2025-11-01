import React from "react";
import VideoCard from "./VideoCard";
import video1 from "../assets/IMG_4524.mp4";
import video2 from "../assets/IMG_4522.mp4";
import thumb1 from "../assets/image 13.png"; // thumbnail for video1
import thumb2 from "../assets/image 14.png"; // thumbnail for video2

const VideoSection = () => {
  return (
    <section className="bg-[#5E7141] py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-12"style={{ fontFamily: "'Playfair Display', serif" }}>
          The Making of Every Drop of Goodness
        </h2>

        <VideoCard
          videoSrc={video1}
          thumbnail={thumb1}
          title="Perfect for Families & Businesses – 5 Litre Pack"
          description="Bottled in Premium Glass, Perfect For Cooking, Skincare, And Wellness."
          tag="5L"
        />

        <VideoCard
          videoSrc={video2}
          thumbnail={thumb2}
          title="Purity begins on the farm – experience it in every drop."
          description="Organic Mustard Oil is Pure, Wood-Pressed, And Chemical-Free. Crafted To Preserve Natural Nutrients And Antioxidants."
          tag="1L"
        />
      </div>
    </section>
  );
};

export default VideoSection;
