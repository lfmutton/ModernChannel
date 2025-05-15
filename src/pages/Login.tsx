import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      
      if (success) {
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login");
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
        SYSTEM LOGIN
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
            htmlFor="username"
            className="block text-crt-green text-xs mb-2"
          >
            USERNAME:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="crt-input w-full"
            required
            minLength={4}
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-crt-green text-xs mb-2"
          >
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

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            type="submit"
            className="crt-button w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "AUTHENTICATING..." : "LOGIN"}
          </button>

          <Link
            to="/register"
            className="crt-button crt-button-secondary w-full sm:w-auto"
          >
            REGISTER
          </Link>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Login;