import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Tv, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px 2px rgba(51, 255, 51, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-crt-green font-retro text-sm crt-flicker"
        >
          WELCOME {user?.username?.toUpperCase()}
        </motion.div>
        <Link to="/settings">
          <motion.div 
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="text-crt-cyan"
          >
            <Settings size={20} />
          </motion.div>
        </Link>
      </div>

      {/* Main Options */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 justify-center items-center">
        <Link to="/watch" className="w-full md:w-1/2">
          <motion.div 
            className="border-2 border-crt-green bg-black bg-opacity-50 p-8 rounded text-center h-full flex flex-col items-center justify-center"
            whileHover="hover"
            variants={cardVariants}
          >
            <Tv className="w-16 h-16 text-crt-green mb-4" />
            <h2 className="font-retro text-crt-green text-lg mb-2">WATCH</h2>
            <p className="text-crt-white text-xs">Stream your favorite shows</p>
          </motion.div>
        </Link>

        <Link to="/schedule" className="w-full md:w-1/2">
          <motion.div 
            className="border-2 border-crt-cyan bg-black bg-opacity-50 p-8 rounded text-center h-full flex flex-col items-center justify-center"
            whileHover="hover"
            variants={cardVariants}
          >
            <Calendar className="w-16 h-16 text-crt-cyan mb-4" />
            <h2 className="font-retro text-crt-cyan text-lg mb-2">SCHEDULE</h2>
            <p className="text-crt-white text-xs">Organize your programming</p>
          </motion.div>
        </Link>
      </div>

      {/* Status Bar */}
      <div className="mt-8 border-t border-crt-gray pt-4">
        <div className="text-xs text-crt-green font-retro flex justify-between items-center">
          <span className="animate-pulse">●</span>
          <span>SYSTEM STATUS: ONLINE</span>
          <span className="text-right animate-pulse">●</span>
        </div>
      </div>
    </div>
  );
};

export default Home;