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
  const videoRef = useRef<HTMLVideoElement>(null); // Declaração CORRETA aqui

  // Função deve vir DEPOIS da declaração do videoRef
  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (e.target === videoRef.current) {
      videoRef.current?.play();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }

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
            muted
            playsInline
            onClick={handleVideoClick} // Correto aqui
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-crt-green text-xl">NO VIDEO SOURCE</div>
          </div>
        )}

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