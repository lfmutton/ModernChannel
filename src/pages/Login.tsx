import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const { login, checkUserExists } = useAuth(); // Adicione checkUserExists ao contexto
  const navigate = useNavigate();

  // Verifica se o usuário existe no banco de dados
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (username.length > 3) {
        // Verifica apenas se o username tiver mais de 3 caracteres
        setIsCheckingUser(true);
        try {
          const exists = await checkUserExists(username, password);
          setUserExists(exists);
          if (!exists) {
            setError("Usuário não registrado");
          } else {
            setError("");
          }
        } catch (err) {
          console.error("Erro ao verificar usuário:", err);
        } finally {
          setIsCheckingUser(false);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username, checkUserExists]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userExists) {
      setError("Usuário não registrado");
      return;
    }

    try {
      const success = await login(username, password);
      if (success) {
        navigate("/");
      } else {
        setError("Credenciais inválidas");
      }
    } catch (err) {
      setError("Ocorreu um erro durante o login");
      console.error(err);
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
          <div
            className={`text-${
              error.includes("inválidas") ? "crt-red" : "crt-yellow"
            } font-retro text-xs mb-4 text-center`}
          >
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
          <div className="relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUserExists(false); // Reseta ao digitar
              }}
              className="crt-input w-full"
              required
              minLength={4}
            />
            {isCheckingUser && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-crt-green text-xs">
                Verificando...
              </span>
            )}
            {!isCheckingUser && username.length > 3 && (
              <span
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${
                  userExists ? "text-crt-green" : "text-crt-red"
                }`}
              >
                {userExists ? "✔" : "✖"}
              </span>
            )}
          </div>
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
            disabled={!userExists} // Desabilita se o usuário não existir
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            type="submit"
            className={`crt-button w-full sm:w-auto ${
              !userExists ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!userExists}
          >
            LOGIN
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
