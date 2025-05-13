import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Watch: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoProgress(Number(e.target.value));
  };

  // Mock video data
  const videoTitle = "SYNTHWAVE NIGHTS - EP.01";
  const videoDescription = "A journey through neon-lit streets and digital dreams.";

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header with back button */}
      <div className="flex items-center mb-4">
        <Link to="/">
          <motion.div whileHover={{ x: -5 }} className="text-crt-green mr-4">
            <ArrowLeft size={20} />
          </motion.div>
        </Link>
        <h1 className="font-retro text-crt-green text-sm">VIDEO PLAYER</h1>
      </div>

      {/* Video player */}
      <div className="flex-1 relative border-2 border-crt-green">
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className={`text-crt-green text-xl ${isPlaying ? 'hidden' : 'block'}`}>
            ▶ PRESS PLAY
          </div>
        </div>
        
        {/* Video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
          <div className="mb-3 flex justify-between items-center">
            <div>
              <h3 className="text-crt-cyan font-retro text-xs">{videoTitle}</h3>
              <p className="text-crt-white text-xs mt-1">{videoDescription}</p>
            </div>
            <div className="text-crt-green">
              <Volume2 size={16} />
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max="100"
              value={videoProgress}
              onChange={handleProgressChange}
              className="w-full h-2 bg-crt-gray rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-crt-green"
            />
            <div className="flex justify-between text-crt-green text-xs mt-1">
              <span>00:{videoProgress.toString().padStart(2, '0')}</span>
              <span>05:30</span>
            </div>
          </div>
          
          {/* Control buttons */}
          <div className="flex justify-center space-x-6">
            <button className="text-crt-cyan">
              <SkipBack size={20} />
            </button>
            <button 
              className="text-crt-green"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="text-crt-cyan">
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Retro tape counter */}
      <div className="mt-6 bg-black p-2 border border-crt-gray flex justify-center">
        <div className="inline-block bg-crt-gray px-4 py-1 font-mono text-black text-sm tracking-widest">
          {isPlaying ? "PLAYING" : "PAUSED"}
        </div>
      </div>
    </div>
  );
};

export default Watch;