"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api, type AuthMeResponse } from "./api";

interface AuthContextType {
  user: AuthMeResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthMeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.auth.me();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = () => {
    api.auth.loginWithGoogle();
  };

  const logout = async () => {
    // TODO: 백엔드 로그아웃 엔드포인트 추가 후 구현
    await api.auth.logout();
    setUser(null);
    // 홈페이지로 리다이렉트
    window.location.href = "/";
  };

  const refreshAuth = async () => {
    setIsLoading(true);
    await checkAuth();
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: user?.authenticated === true,
    login,
    logout,
    refreshAuth,
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
