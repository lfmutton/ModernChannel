import React, { useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface VideoPlayerProps {
  title: string;
  description?: string;
  videoSrc?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  description = "",
  videoSrc = "",
}) => {
  const [showControls, setShowControls] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start playing automatically
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }

    // Mouse movement handler to show controls
    const handleMouseMove = () => {
      setShowControls(true);
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 2000);
      return () => clearTimeout(timer);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      <div className="relative w-full h-full">
        {videoSrc ? (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            autoPlay
            loop
            muted // Added muted to help with autoplay restrictions
            playsInline // For iOS
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-crt-green text-xl">NO VIDEO SOURCE</div>
          </div>
        )}

        {/* Exit button (only shows on mouse movement) */}
        {showControls && (
          <Link
            to="/"
            className="absolute top-4 left-4 text-crt-white hover:text-crt-green transition-colors duration-300 z-50"
          >
            <ArrowLeft size={24} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
