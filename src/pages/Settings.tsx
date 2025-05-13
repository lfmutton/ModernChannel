import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [birthdate, setBirthdate] = useState(user?.birthdate || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    // Validation
    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const success = await updateUser({
        username,
        email,
        birthdate
      });
      
      if (success) {
        setMessage('Profile updated successfully');
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header with back button */}
      <div className="flex items-center mb-4">
        <Link to="/">
          <motion.div whileHover={{ x: -5 }} className="text-crt-green mr-4">
            <ArrowLeft size={20} />
          </motion.div>
        </Link>
        <h1 className="font-retro text-crt-green text-sm">ACCOUNT SETTINGS</h1>
      </div>

      {/* Settings form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        {message && (
          <div className="mb-4 p-2 border border-crt-green text-crt-green text-xs">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-2 border border-crt-red text-crt-red text-xs">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-crt-green text-xs mb-2">
            USERNAME:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="crt-input w-full"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-crt-green text-xs mb-2">
            EMAIL:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="crt-input w-full"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="birthdate" className="block text-crt-green text-xs mb-2">
            BIRTHDATE:
          </label>
          <input
            id="birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="crt-input w-full"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-crt-green text-xs mb-2">
            NEW PASSWORD (LEAVE BLANK TO KEEP CURRENT):
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="crt-input w-full"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-crt-green text-xs mb-2">
            CONFIRM NEW PASSWORD:
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="crt-input w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button 
            type="submit" 
            className="crt-button flex items-center justify-center"
          >
            <Save size={16} className="mr-2" />
            SAVE CHANGES
          </button>
          
          <button 
            type="button"
            onClick={handleLogout}
            className="crt-button crt-button-secondary flex items-center justify-center"
          >
            <LogOut size={16} className="mr-2" />
            LOGOUT
          </button>
        </div>
      </form>

      {/* System information */}
      <div className="mt-6 text-crt-gray text-xs">
        <div className="flex justify-between">
          <span>SYSTEM VERSION:</span>
          <span>1.0.0</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>SIGNAL STATUS:</span>
          <span className="text-crt-green">CONNECTED</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;