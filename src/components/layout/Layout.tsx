import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { Tv } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const showLogo = isAuthPage;

  return (
    <AuthProvider>
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* TV Logo - Only shown on auth pages */}
          {showLogo && (
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <Tv className="text-crt-white w-10 h-10" />
              <span className="text-crt-white font-retro text-xs ml-2">RetroVision</span>
            </div>
          )}

          {/* TV Frame */}
          <div className={`relative overflow-hidden bg-gradient-to-b from-gray-700 to-gray-900 ${isAuthPage ? 'p-5 md:p-8 w-[85vw] h-[85vh] mx-auto my-8 rounded-3xl' : 'w-full h-full'}`}>
            {/* CRT Screen */}
            <div className="w-full h-full relative bg-black">
              <div className="vhs-distortion"></div>
              
              {/* TV Power Button - Only shown on auth pages */}
              {isAuthPage && (
                <div className="absolute -bottom-4 right-6 w-4 h-4 rounded-full bg-crt-red z-10 animate-glow"></div>
              )}
              
              {/* Content */}
              <div className="relative z-1 w-full h-full">
                <Outlet />
              </div>
            </div>

            {/* TV Controls - Only shown on auth pages */}
            {isAuthPage && (
              <div className="mt-4 flex justify-between items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 rounded-full bg-crt-gray"></div>
                  <div className="w-4 h-4 rounded-full bg-crt-gray"></div>
                </div>
                
                <div className="h-2 w-16 bg-crt-gray rounded-full mx-auto"></div>
                
                <div className="flex space-x-2">
                  <div className="w-4 h-4 rounded-full bg-crt-gray"></div>
                  <div className="w-4 h-4 rounded-full bg-crt-gray"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Layout;