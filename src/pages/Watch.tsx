import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Watch: React.FC = () => {
  const [showControls, setShowControls] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [mouseTimeout, setMouseTimeout] = useState<NodeJS.Timeout | null>(null);

  // Mock video data
  const videoTitle = "SYNTHWAVE NIGHTS - EP.01";
  const videoSrc = "/path/to/your/video.mp4"; // Replace with your actual video path

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (mouseTimeout) clearTimeout(mouseTimeout);
      setMouseTimeout(setTimeout(() => setShowControls(false), 3000));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout) clearTimeout(mouseTimeout);
    };
  }, [mouseTimeout]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoProgress(Number(e.target.value));
  };

  // Format time display (00:00 format)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Mock duration (replace with actual video duration)
  const duration = 330; // 5:30 in seconds
  const currentTime = (duration * videoProgress) / 100;

  return (
    <div className="fixed inset-0 bg-black">
      {/* Video container - always fullscreen */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            className="w-full h-full object-contain"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-crt-green text-xl">UPLOADING VIDEO...</div>
          </div>
        )}
      </div>

      {/* Back button (always visible) */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-crt-green hover:text-crt-cyan z-50"
      >
        <ArrowLeft size={24} />
      </Link>

      {/* Progress controls (appears on mouse movement) */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4 z-50">
          {/* Video title and time */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-crt-green text-sm font-retro">
              {videoTitle}
            </span>
            <span className="text-crt-green text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={videoProgress}
            onChange={handleProgressChange}
            className="w-full h-1.5 bg-crt-gray rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-crt-green"
          />
        </div>
      )}
    </div>
  );
};

export default Watch;
