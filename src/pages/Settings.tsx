import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState(user || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);
    
    // Validation
    if (!currentPassword) {
      setError('Current password is required');
      setIsLoading(false);
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      const updateData: { username?: string; password?: string } = {};
      
      if (username !== user) {
        updateData.username = username;
      }
      
      if (newPassword) {
        updateData.password = newPassword;
      }

      if (Object.keys(updateData).length === 0) {
        setError('No changes to save');
        setIsLoading(false);
        return;
      }

      const result = await updateUserProfile(updateData, currentPassword);
      
      if (result.success) {
        setMessage('Profile updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex items-center mb-4">
        <Link to="/">
          <motion.div whileHover={{ x: -5 }} className="text-crt-green mr-4">
            <ArrowLeft size={20} />
          </motion.div>
        </Link>
        <h1 className="font-retro text-crt-green text-sm">ACCOUNT SETTINGS</h1>
      </div>

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
            minLength={4}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-crt-green text-xs mb-2">
            CURRENT PASSWORD:
          </label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="crt-input w-full"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-crt-green text-xs mb-2">
            NEW PASSWORD:
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="crt-input w-full"
            minLength={6}
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
            disabled={isLoading}
          >
            <Save size={16} className="mr-2" />
            {isLoading ? "SAVING..." : "SAVE CHANGES"}
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