import React, { useState, useEffect } from "react";

const VideoCard = ({ videoSrc, thumbnail, title, description, tag }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-[#5E7141] text-white rounded-2xl overflow-hidden mb-12">
      <div className="relative w-full rounded-2xl overflow-hidden">
        {isMobile ? (
          // ✅ Mobile: show poster + controls (no autoplay issues)
          <video
            src={videoSrc}
            poster={thumbnail}
            controls
            playsInline
            preload="metadata"
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
        ) : (
          // ✅ Desktop: hover to play
          <video
            src={videoSrc}
            muted
            loop
            playsInline
            poster={thumbnail}
            className="w-full h-[300px] md:h-[400px] object-cover"
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          <span className="bg-black text-white text-sm px-3 py-1 rounded-full ml-4">
            {tag}
          </span>
        </div>
        <p className="text-sm md:text-base text-gray-200 font-extralight">
          {description}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
