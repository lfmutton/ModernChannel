import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

interface AuthContextType {
  login: (username: string, password: string) => Promise<boolean>;
  checkUserExists: (username: string) => Promise<{ success: boolean; error?: string }>;
  checkPassword: (password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  user: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const userResult = await db.query.users.findFirst({
        where: eq(users.name, username),
      });

      if (!userResult) {
        return false;
      }

      const isValidPassword = await compare(password, userResult.password);

      if (!isValidPassword) {
        return false;
      }

      setUser(username);
      localStorage.setItem("user", username);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const checkPassword = async (password: string): Promise<boolean> => {
    try {
      const username = localStorage.getItem("user");
      if (!username) return false;

      const userResult = await db.query.users.findFirst({
        where: eq(users.name, username),
      });

      if (!userResult) return false;

      return await compare(password, userResult.password);
    } catch (error) {
      console.error("Password check error:", error);
      return false;
    }
  };

  const checkUserExists = async (username: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.name, username),
      });

      return {
        success: !!existingUser,
        error: existingUser ? undefined : "User not found"
      };
    } catch (error) {
      console.error("Error checking user:", error);
      return { success: false, error: "Connection error" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  const value = {
    login,
    checkUserExists,
    checkPassword,
    logout,
    isAuthenticated: !!user,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};