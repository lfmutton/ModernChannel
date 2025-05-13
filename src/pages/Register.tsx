import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const success = await register({
        username,
        email,
        birthdate
      }, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center py-8"
    >
      <h1 className="font-retro text-crt-green text-xl mb-8 crt-flicker text-center">
        NEW USER REGISTRATION
      </h1>
      
      <motion.form 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md"
      >
        {error && (
          <div className="text-crt-red font-retro text-xs mb-4 text-center">
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
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-crt-green text-xs mb-2">
            PASSWORD:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="crt-input w-full"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-crt-green text-xs mb-2">
            CONFIRM PASSWORD:
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="crt-input w-full"
            required
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
            required
          />
        </div>
        
        <div className="mb-8">
          <label htmlFor="birthdate" className="block text-crt-green text-xs mb-2">
            BIRTHDATE:
          </label>
          <input
            id="birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="crt-input w-full"
            required
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button 
            type="submit" 
            className="crt-button w-full sm:w-auto"
          >
            SUBMIT
          </button>
          
          <Link 
            to="/login" 
            className="crt-button crt-button-secondary w-full sm:w-auto"
          >
            BACK TO LOGIN
          </Link>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Register;