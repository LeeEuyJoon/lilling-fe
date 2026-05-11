const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Refresh token 중복 호출 방지를 위한 상태
 * 여러 요청이 동시에 401을 받더라도 refresh는 한 번만 호출
 */
let refreshPromise: Promise<boolean> | null = null;

/**
 * Refresh 재시도를 건너뛰어야 하는 엔드포인트 목록 (무한 루프 방지)
 */
const NO_REFRESH_ENDPOINTS = [
  "/api/v1/auth/refresh",
  "/api/v1/auth/logout",
  "/api/v1/auth/me",
];

/**
 * API 응답 타입 정의
 */
export interface TagItem {
  id: string;
  name: string;
}

export interface UrlItem {
  id: string;
  shortUrl: string;
  originalUrl: string;
  description?: string;
  createdAt: string;
  clickCount: number;
  recentDailyStats?: Array<{
    date: string; // (YYYY-MM-DD)
    clickCount: number;
  }>;
  tags?: TagItem[];
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
 * Analytics API 응답 타입
 */
export interface HourlyDataPoint {
  timestamp: string; // ISO 8601: "2025-01-26T00:00:00"
  clickCount: number;
}

export interface DailyDataPoint {
  date: string; // "2025-01-26"
  clickCount: number;
}

export interface WeeklyDataPoint {
  weekStart: string; // "2025-01-20"
  clickCount: number;
}

export interface MonthlyDataPoint {
  yearMonth: string; // "2025-01"
  clickCount: number;
}

export interface TimeSeriesData<T> {
  range: string; // "24h" | "30d" | "12w" | "12m"
  data: T[];
}

export interface UrlAnalyticsResponse {
  hourly: TimeSeriesData<HourlyDataPoint>;
  daily: TimeSeriesData<DailyDataPoint>;
  weekly: TimeSeriesData<WeeklyDataPoint>;
  monthly: TimeSeriesData<MonthlyDataPoint>;
}

/**
 * 백엔드 에러 응답 타입
 */
export interface ApiErrorResponse {
  code: string;
  message: string;
}

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string,
    public errorCode?: string
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
      // refresh 재시도를 건너뛰어야 하는 엔드포인트는 바로 처리 (무한 루프 방지)
      const skipRefresh = NO_REFRESH_ENDPOINTS.some((path) =>
        endpoint.startsWith(path)
      );

      if (!skipRefresh && typeof window !== "undefined") {
        // 이미 진행 중인 refresh가 있으면 재사용, 없으면 새로 시작
        if (!refreshPromise) {
          refreshPromise = fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          })
            .then((r) => r.ok)
            .finally(() => {
              refreshPromise = null;
            });
        }

        const refreshed = await refreshPromise;

        if (refreshed) {
          // 토큰 갱신 성공 → 원래 요청 1회 재시도
          const retryResponse = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              ...options?.headers,
            },
          });

          if (retryResponse.status === 204) {
            return {} as T;
          }

          if (!retryResponse.ok) {
            const errorData: Partial<ApiErrorResponse> = await retryResponse
              .json()
              .catch(() => ({}));
            throw new ApiError(
              retryResponse.status,
              retryResponse.statusText,
              errorData.message || retryResponse.statusText,
              errorData.code
            );
          }

          return retryResponse.json();
        }
      }

      // 갱신 실패 또는 skipRefresh인 경우 → 인증 실패 이벤트 dispatch
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
      throw new ApiError(401, "Unauthorized", "로그인이 필요합니다.");
    }

    // 기타 에러 응답
    if (!response.ok) {
      const errorData: Partial<ApiErrorResponse> = await response
        .json()
        .catch(() => ({}));
      throw new ApiError(
        response.status,
        response.statusText,
        errorData.message || response.statusText,
        errorData.code
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
    shorten: (originalUrl: string, keyword?: string) =>
      apiFetch<{ shortUrl: string }>("/api/v1/url/shorten", {
        method: "POST",
        body: JSON.stringify({ originalUrl, ...(keyword ? { keyword } : {}) }),
      }),
  },

  /**
   * 내 URL 관리 API
   */
  myUrls: {
    /**
     * 내 URL 목록 조회 (페이징)
     */
    list: (page: number = 0, size: number = 10, tagIds: string[] = [], filterMode: "or" | "and" = "or") => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("size", String(size));
      params.set("filterMode", filterMode);
      tagIds.forEach((id) => params.append("tagIds", id));
      return apiFetch<MyUrlsListResponse>(`/api/v1/my-urls/list?${params.toString()}`);
    },

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

    /**
     * URL 분석 데이터 조회
     */
    analytics: (urlId: string) =>
      apiFetch<UrlAnalyticsResponse>(`/api/v1/my-urls/${urlId}/analytics`),
  },

  /**
   * 태그 관리 API
   */
  tags: {
    /**
     * 내 태그 전체 목록 조회
     */
    list: () =>
      apiFetch<{ tags: TagItem[] }>("/api/v1/tags"),

    /**
     * 태그 생성
     */
    create: (name: string) =>
      apiFetch<TagItem>("/api/v1/tags", {
        method: "POST",
        body: JSON.stringify({ name }),
      }),

    /**
     * 태그 이름 수정
     */
    update: (tagId: string, name: string) =>
      apiFetch<void>(`/api/v1/tags/${tagId}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
      }),

    /**
     * 태그 삭제
     */
    delete: (tagId: string) =>
      apiFetch<void>(`/api/v1/tags/${tagId}`, {
        method: "DELETE",
      }),

    /**
     * URL에 태그 할당
     */
    assign: (urlId: string, tagIds: string[]) =>
      apiFetch<void>("/api/v1/tags/assign", {
        method: "POST",
        body: JSON.stringify({ urlId: Number(urlId), tagIds: tagIds.map(Number) }),
      }),

    /**
     * URL에서 태그 해제
     */
    unassign: (urlId: string, tagIds: string[]) =>
      apiFetch<void>("/api/v1/tags/unassign", {
        method: "POST",
        body: JSON.stringify({ urlId: Number(urlId), tagIds: tagIds.map(Number) }),
      }),
  },
};
