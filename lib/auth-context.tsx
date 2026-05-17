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

  const handlePostLoginRedirect = async (response: AuthMeResponse) => {
    if (response.isAuthenticated && !hasRedirected.current) {
      const redirectUrl = localStorage.getItem("redirect_after_login");
      const pendingClaimUrl = localStorage.getItem("pending_claim_url");

      if (redirectUrl) {
        hasRedirected.current = true;
        localStorage.removeItem("redirect_after_login");

        if (pendingClaimUrl) {
          try {
            await api.myUrls.claim(pendingClaimUrl);
            localStorage.removeItem("pending_claim_url");
          } catch (error) {
            console.error("Error claiming URL:", error);
          }
        }

        router.push(redirectUrl);
      }
    }
  };

  const checkAuth = async () => {
    try {
      const response = await api.auth.me();
      setUser(response);
      await handlePostLoginRedirect(response);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 401 Unauthorized 이벤트 리스너 등록
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setIsLoading(false);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const login = (redirectTo?: string) => {
    if (redirectTo) {
      localStorage.setItem("redirect_after_login", redirectTo);
    }
    api.auth.loginWithGoogle();
  };

  const logout = async () => {
    await api.auth.logout();
    setUser(null);       // React 상태 즉시 갱신 → Logout → Login 버튼 전환
    router.push("/");    // 소프트 네비게이션 (window.location.href 대체)
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
