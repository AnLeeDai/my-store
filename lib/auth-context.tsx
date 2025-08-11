"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useToast } from "@/lib/use-toast";

interface User {
  id: number;
  username: string;
  fullName: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  role: "ADMIN" | "USER";
  avatarUrl: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: RegisterData,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

interface RegisterData {
  username: string;
  password: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const checkAuth = async () => {
    try {
      const token = Cookies.get("auth-token");

      if (!token) {
        setLoading(false);

        return;
      }

      const response = await fetch("/api/auth/me");

      if (response.ok) {
        const data = await response.json();

        setUser(data.user);
      } else {
        // Token không hợp lệ, xóa cookie
        Cookies.remove("auth-token");
      }
    } catch (error) {
      console.error("Check auth error:", error);
      Cookies.remove("auth-token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);

        // Token đã được set trong cookie bởi server
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("Login error:", error);

      return { success: false, error: "Lỗi kết nối" };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("Register error:", error);

      return { success: false, error: "Lỗi kết nối" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      Cookies.remove("auth-token");
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.error("Logout error:", error);
      // Vẫn logout local state ngay cả khi API lỗi
      setUser(null);
      Cookies.remove("auth-token");
      toast.success("Đăng xuất thành công!");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
