export const queryKeys = {
  myUrls: {
    all: ["myUrls"] as const,
    list: (params: { page: number; size: number; tagIds: string[]; filterMode: string }) =>
      [...queryKeys.myUrls.all, "list", params] as const,
  },
  tags: {
    all: ["tags"] as const,
    list: () => [...queryKeys.tags.all, "list"] as const,
  },
  analytics: {
    all: ["analytics"] as const,
    byUrlId: (urlId: string) => [...queryKeys.analytics.all, urlId] as const,
  },
} as const;
