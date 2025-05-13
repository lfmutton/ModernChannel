import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoPlayerProps {
  title: string;
  description?: string;
  videoSrc?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  description = "",
  videoSrc = ""
}) => {
  const [showControls, setShowControls] = useState(true);
  const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start playing automatically
    if (videoRef.current) {
      videoRef.current.play();
    }

    // Mouse movement handler
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }
      
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      setMouseTimer(timer);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      {/* Video */}
      <div className="relative w-full h-full">
        {videoSrc ? (
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            autoPlay
            loop
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-crt-green text-xl">NO VIDEO SOURCE</div>
          </div>
        )}

        {/* Exit button */}
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