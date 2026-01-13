"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { api, type AuthMeResponse } from "./api";

interface AuthContextType {
  user: AuthMeResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (redirectTo?: string) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthMeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasRedirected = useRef(false);

  const checkAuth = async () => {
    try {
      const response = await api.auth.me();
      setUser(response);

      // 로그인 후 리다이렉트 처리 (한 번만 실행)
      if (response.isAuthenticated && !hasRedirected.current) {
        const redirectUrl = localStorage.getItem("redirect_after_login");
        if (redirectUrl) {
          hasRedirected.current = true;
          localStorage.removeItem("redirect_after_login");
          router.push(redirectUrl);
        }
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 401 Unauthorized 이벤트 리스너 등록
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null); // 즉시 로그아웃 상태로 변경
      setIsLoading(false);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const login = (redirectTo?: string) => {
    // 로그인 후 돌아갈 페이지를 localStorage에 저장
    if (redirectTo) {
      localStorage.setItem("redirect_after_login", redirectTo);
    }
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
    isAuthenticated: user?.isAuthenticated === true,
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
