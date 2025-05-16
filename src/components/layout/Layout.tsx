import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { 
  Tv, 
  Info, 
  Settings as SettingsIcon, 
  Power, 
  VolumeX, 
  Volume2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [showInfo, setShowInfo] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [muted, setMuted] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, y: -2, transition: { duration: 0.2 } }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-3 flex justify-between items-center z-10">
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center group">
          <Tv className="text-crt-green w-5 h-5 animate-pulse-glow mr-2" />
          <span className="font-retro text-crt-green text-xs tracking-wider group-hover:text-crt-white transition-colors">
            RetroVision
          </span>
        </Link>
        <span className="text-crt-gray text-sm">|</span>
        <span className="text-crt-green text-xs font-vt323">{formattedTime}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        {user && (
          <span className="text-crt-cyan text-xs font-vt323 animate-flicker">
            USER: {user?.toUpperCase()}
          </span>
        )}

        <motion.button 
          whileHover="hover"
          variants={buttonVariants}
          className="text-crt-gray hover:text-crt-white transition-colors"
          onClick={() => setMuted(!muted)}
        >
          {muted ? 
            <VolumeX size={16} /> : 
            <Volume2 size={16} />
          }
        </motion.button>

        <motion.button 
          whileHover="hover"
          variants={buttonVariants}
          className="text-crt-gray hover:text-crt-white transition-colors"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info size={16} />
        </motion.button>

        <Link to="/settings">
          <motion.div 
            whileHover="hover"
            variants={buttonVariants}
            className="text-crt-gray hover:text-crt-white transition-colors"
          >
            <SettingsIcon size={16} />
          </motion.div>
        </Link>

        {user && (
          <motion.button 
            whileHover="hover"
            variants={buttonVariants}
            className="text-crt-red hover:text-crt-white transition-colors"
            onClick={logout}
          >
            <Power size={16} />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-crt-dark border border-crt-green rounded p-3 text-crt-green text-xs w-64"
          >
            <h3 className="font-retro text-sm mb-2">RetroVision v1.0</h3>
            <div className="space-y-1 font-vt323">
              <p>System: ONLINE</p>
              <p>Signal: DIGITAL</p>
              <p>Build: 20250516-43</p>
              <p className="text-crt-yellow mt-1">Enjoy your nostalgic experience!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Layout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const [loading, setLoading] = useState(true);

  // Simulate TV turn on effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Screen variants for animation
  const screenVariants = {
    turnOn: {
      scale: [0.8, 1],
      opacity: [0, 1],
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    turnOff: {
      scale: [1, 0.8],
      opacity: [1, 0],
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <AuthProvider>
      <div className="fixed inset-0 bg-crt-darker flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex flex-col items-center justify-center text-crt-green"
            >
              <div className="w-16 h-16 border-4 border-crt-green border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-retro text-xs animate-pulse">BOOTING SYSTEM</p>
            </motion.div>
          ) : (
            <motion.div 
              className={`relative w-full h-full max-w-7xl mx-auto`}
              initial="turnOff"
              animate="turnOn"
              variants={screenVariants}
            >
              {/* TV Frame with old TV curve effect */}
              <div className={`relative ${isAuthPage ? 'max-w-md mx-auto my-12' : 'w-full h-full'}`}>
                <div className={`relative overflow-hidden ${isAuthPage ? 'crt-frame rounded-3xl' : 'w-full h-full'}`}>
                  {/* CRT Screen */}
                  <div className="w-full h-full relative bg-black crt-screen">
                    {!isAuthPage && <Header />}
                    
                    {/* CRT Effects */}
                    <div className="scanlines"></div>
                    <div className="vhs-distortion"></div>
                    <div className="h-noise"></div>
                    <div className="crt-scanner"></div>
                    
                    {/* TV Power Button - Only shown on auth pages */}
                    {isAuthPage && (
                      <div className="absolute bottom-4 right-6 w-4 h-4 rounded-full bg-crt-red z-10 power-button"></div>
                    )}
                    
                    {/* Content */}
                    <div className="relative z-1 w-full h-full p-4 sm:p-6 overflow-y-auto">
                      <Outlet />
                    </div>
                  </div>

                  {/* TV Controls - Only shown on auth pages */}
                  {isAuthPage && (
                    <div className="mt-6 flex justify-between items-center px-4">
                      <div className="flex space-x-3">
                        <div className="w-3 h-3 rounded-full bg-crt-gray hover:bg-crt-white cursor-pointer transition-colors"></div>
                        <div className="w-3 h-3 rounded-full bg-crt-gray hover:bg-crt-white cursor-pointer transition-colors"></div>
                      </div>
                      
                      <div className="h-2 w-16 bg-crt-gray rounded-full mx-auto"></div>
                      
                      <div className="flex space-x-3">
                        <div className="w-3 h-3 rounded-full bg-crt-gray hover:bg-crt-white cursor-pointer transition-colors"></div>
                        <div className="w-3 h-3 rounded-full bg-crt-gray hover:bg-crt-white cursor-pointer transition-colors"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* TV Stand - Only shown on auth pages */}
                {isAuthPage && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[95%] w-1/2 h-6 bg-gradient-to-b from-crt-gray to-crt-dark rounded-b-lg"></div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
};

export default Layout;