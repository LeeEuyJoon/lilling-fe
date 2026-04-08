import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "./keys";

// ---------------------------------------------------------------------------
// Tags list
// ---------------------------------------------------------------------------

export function useTagsList() {
  return useQuery({
    queryKey: queryKeys.tags.list(),
    queryFn: () => api.tags.list(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    select: (data) => data.tags,
  });
}

// ---------------------------------------------------------------------------
// Create tag
// ---------------------------------------------------------------------------

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => api.tags.create(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.myUrls.all });
    },
  });
}

// ---------------------------------------------------------------------------
// Delete tag
// ---------------------------------------------------------------------------

export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tagId: string) => api.tags.delete(tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.myUrls.all });
    },
  });
}

// ---------------------------------------------------------------------------
// Update (rename) tag
// ---------------------------------------------------------------------------

export function useUpdateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tagId, name }: { tagId: string; name: string }) =>
      api.tags.update(tagId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.myUrls.all });
    },
  });
}

// ---------------------------------------------------------------------------
// Assign tag to URL
// ---------------------------------------------------------------------------

export function useAssignTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ urlId, tagIds }: { urlId: string; tagIds: string[] }) =>
      api.tags.assign(urlId, tagIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myUrls.all });
    },
  });
}

// ---------------------------------------------------------------------------
// Unassign tag from URL
// ---------------------------------------------------------------------------

export function useUnassignTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ urlId, tagIds }: { urlId: string; tagIds: string[] }) =>
      api.tags.unassign(urlId, tagIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myUrls.all });
    },
  });
}
