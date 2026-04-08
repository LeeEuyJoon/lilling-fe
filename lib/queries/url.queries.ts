import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "./keys";

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

export function useUrlAnalytics(urlId: string, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.analytics.byUrlId(urlId),
    queryFn: () => api.myUrls.analytics(urlId),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// ---------------------------------------------------------------------------
// My URLs list
// ---------------------------------------------------------------------------

export function useMyUrlsList(params: {
  page: number;
  size: number;
  tagIds: string[];
  filterMode: "or" | "and";
}) {
  return useQuery({
    queryKey: queryKeys.myUrls.list(params),
    queryFn: () => api.myUrls.list(params.page, params.size, params.tagIds, params.filterMode),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
}

// ---------------------------------------------------------------------------
// Delete URL
// ---------------------------------------------------------------------------

export function useDeleteUrl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (urlId: string) => api.myUrls.delete(urlId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myUrls.all });
    },
  });
}

// ---------------------------------------------------------------------------
// Update description
// ---------------------------------------------------------------------------

export function useUpdateDescription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ urlId, description }: { urlId: string; description: string }) =>
      api.myUrls.updateDescription(urlId, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myUrls.all });
    },
  });
}
