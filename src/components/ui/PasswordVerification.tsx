import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface PasswordVerificationProps {
  onVerified: () => void;
}

const PasswordVerification: React.FC<PasswordVerificationProps> = ({ onVerified }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { checkPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await checkPassword(password);
      if (success) {
        onVerified();
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Verification failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <h1 className="font-retro text-crt-green text-xl mb-8 crt-flicker text-center">
        VERIFY ACCESS
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

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-crt-green text-xs mb-2"
          >
            ENTER PASSWORD:
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

        <button
          type="submit"
          className="crt-button w-full"
          disabled={isLoading}
        >
          {isLoading ? "VERIFYING..." : "PROCEED"}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default PasswordVerification;