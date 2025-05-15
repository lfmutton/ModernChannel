import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";

interface AuthContextType {
  login: (username: string, password: string) => Promise<boolean>;
  checkUserExists: (username: string) => Promise<{ success: boolean; error?: string }>;
  checkPassword: (password: string) => Promise<boolean>;
  updateUserProfile: (data: { username?: string; password?: string }, currentPassword: string) => Promise<{ success: boolean; error?: string }>;
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

  const updateUserProfile = async (
    data: { username?: string; password?: string },
    currentPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const currentUsername = localStorage.getItem("user");
      if (!currentUsername) {
        return { success: false, error: "Not authenticated" };
      }

      // Verify current password
      const isValidPassword = await checkPassword(currentPassword);
      if (!isValidPassword) {
        return { success: false, error: "Invalid current password" };
      }

      const currentUser = await db.query.users.findFirst({
        where: eq(users.name, currentUsername),
      });

      if (!currentUser) {
        return { success: false, error: "User not found" };
      }

      // Prepare update data
      const updateData: { name?: string; password?: string } = {};

      if (data.username && data.username !== currentUsername) {
        // Check if new username is available
        const existingUser = await db.query.users.findFirst({
          where: eq(users.name, data.username),
        });

        if (existingUser) {
          return { success: false, error: "Username already taken" };
        }

        updateData.name = data.username;
      }

      if (data.password) {
        updateData.password = await hash(data.password, 12);
      }

      // Update user data
      if (Object.keys(updateData).length > 0) {
        await db
          .update(users)
          .set(updateData)
          .where(eq(users.name, currentUsername));

        if (updateData.name) {
          setUser(updateData.name);
          localStorage.setItem("user", updateData.name);
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Update error:", error);
      return { success: false, error: "Failed to update profile" };
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
    updateUserProfile,
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