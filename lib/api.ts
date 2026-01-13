const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * API 응답 타입 정의
 */
export interface UrlItem {
  id: string;
  shortUrl: string;
  originalUrl: string;
  description?: string;
  createdAt: string;
  clickCount: number;
}

export interface MyUrlsListResponse {
  urls: UrlItem[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface VerifyUrlResponse {
  status: "OK" | "NOT_FOUND" | "ALREADY_OWNED" | "INVALID_FORMAT";
  valid: boolean;
  originalUrl: string;
  shortUrl: string;
  clickCount: number;
  createdAt: string;
}

export interface AuthMeResponse {
  isAuthenticated: boolean;
  memberId?: number;
  email?: string;
}

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

/**
 * 기본 fetch 래퍼 함수
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include", // 쿠키 포함
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    // 204 No Content인 경우 (claim 등)
    if (response.status === 204) {
      return {} as T;
    }

    // 401 Unauthorized인 경우
    if (response.status === 401) {
      throw new ApiError(401, "Unauthorized", "로그인이 필요합니다.");
    }

    // 기타 에러 응답
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        response.statusText,
        errorData.message || response.statusText
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // 네트워크 에러 등
    throw new Error(
      error instanceof Error ? error.message : "네트워크 요청 실패"
    );
  }
}

/**
 * API 클라이언트
 */
export const api = {
  /**
   * 인증 관련 API
   */
  auth: {
    /**
     * 현재 인증 상태 확인
     */
    me: () => apiFetch<AuthMeResponse>("/api/v1/auth/me"),

    /**
     * Google OAuth2 로그인 페이지로 리다이렉트
     */
    loginWithGoogle: () => {
      window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
    },

    /**
     * 로그아웃 (HttpOnly 쿠키는 백엔드에서만 삭제 가능)
     */
    logout: async () => {
      try {
        await apiFetch<void>("/api/v1/auth/logout", {
          method: "POST",
        });
      } catch (error) {
        // 에러가 나더라도 계속 진행 (이미 로그아웃된 상태일 수 있음)
        console.error("Logout error:", error);
      }
    },
  },

  /**
   * URL 단축 API
   */
  url: {
    /**
     * URL 단축
     */
    shorten: (originalUrl: string) =>
      apiFetch<{ shortUrl: string }>("/api/v1/url/shorten", {
        method: "POST",
        body: JSON.stringify({ originalUrl }),
      }),
  },

  /**
   * 내 URL 관리 API
   */
  myUrls: {
    /**
     * 내 URL 목록 조회 (페이징)
     */
    list: (page: number = 0, size: number = 10) =>
      apiFetch<MyUrlsListResponse>(
        `/api/v1/my-urls/list?page=${page}&size=${size}`
      ),

    /**
     * URL 검증 (소유자 확인)
     */
    verify: (shortUrl: string) =>
      apiFetch<VerifyUrlResponse>(
        `/api/v1/my-urls/verify?shortUrl=${encodeURIComponent(shortUrl)}`
      ),

    /**
     * URL 클레임 (내 목록에 추가)
     */
    claim: (shortUrl: string) =>
      apiFetch<void>("/api/v1/my-urls/claim", {
        method: "POST",
        body: JSON.stringify({ shortUrl }),
      }),

    /**
     * URL Description 업데이트
     */
    updateDescription: (urlId: string, description: string) =>
      apiFetch<void>("/api/v1/my-urls/description", {
        method: "PATCH",
        body: JSON.stringify({ urlId: Number(urlId), description }),
      }),

    /**
     * URL 삭제
     */
    delete: (urlId: string) =>
      apiFetch<void>(`/api/v1/my-urls/${urlId}`, {
        method: "DELETE",
      }),
  },
};
