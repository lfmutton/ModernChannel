import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Watch: React.FC = () => {
  const [showControls, setShowControls] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [mouseTimeout, setMouseTimeout] = useState<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock video data
  const videoTitle = "SYNTHWAVE NIGHTS - EP.01";
  const videoSrc = "/path/to/your/video.mp4";

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (mouseTimeout) clearTimeout(mouseTimeout);
      setMouseTimeout(setTimeout(() => setShowControls(false), 3000));
    };

    // Atualizar progresso do vídeo
    const updateProgress = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setVideoProgress(progress);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout) clearTimeout(mouseTimeout);
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [mouseTimeout]);

  // Formatar tempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Obter dados reais do vídeo
  const duration = videoRef.current?.duration || 0;
  const currentTime = videoRef.current?.currentTime || 0;

  return (
    <div className="fixed inset-0 bg-black">
      {/* Container do vídeo */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            ref={videoRef}
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

      {/* Botão de voltar */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-crt-green hover:text-crt-cyan z-50"
      >
        <ArrowLeft size={24} />
      </Link>

      {/* Controles de progresso */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4 z-50">
          {/* Título e tempo */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-crt-green text-sm font-retro">
              {videoTitle}
            </span>
            <span className="text-crt-green text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Barra de progresso não interativa */}
          <div className="relative w-full h-2 bg-gray-800">
            <div
              className="absolute top-0 left-0 h-full bg-crt-green transition-all duration-200"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;