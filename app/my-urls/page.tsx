"use client";

import MyUrlsPageHeader from "./_components/MyUrlsPageHeader";
import UrlList from "./_components/UrlList";
import EmptyState from "./_components/EmptyState";
import DeleteConfirmDialog from "./_components/DeleteConfirmDialog";
import TagFilter, { type TagFilterMode } from "./_components/TagFilter";
import { type UrlItem, type TagItem } from "@/lib/api";
import { Pagination } from "@/components/shadcn/pagination";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const PAGE_SIZE = 10;

export default function MyUrlsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [allTags, setAllTags] = useState<TagItem[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<TagFilterMode>("or");
  const [currentPage, setCurrentPage] = useState(0); // 0-based index for backend
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingUrls, setIsLoadingUrls] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error("로그인이 필요합니다.");
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  // Load URL list
  const loadUrls = async (page: number = 0, tagIds?: string[], mode?: TagFilterMode) => {
    const ids = tagIds ?? selectedTagIds;
    const currentMode = mode ?? filterMode;
    setIsLoadingUrls(true);
    try {
      const response = await api.myUrls.list(page, PAGE_SIZE, ids, currentMode);
      setUrls(response.urls);
      setTotalPages(Number(response.totalPages));
      setCurrentPage(Number(response.currentPage));
    } catch (error) {
      toast.error("URL 목록을 불러오는데 실패했습니다.");
      console.error("Failed to load URLs:", error);
    } finally {
      setIsLoadingUrls(false);
    }
  };

  // Load all tags
  const loadTags = async () => {
    try {
      const response = await api.tags.list();
      setAllTags(response.tags);
    } catch (error) {
      console.error("Failed to load tags:", error);
    }
  };

  // Load data after authentication
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      loadUrls(0);
      loadTags();
    }
  }, [authLoading, isAuthenticated]);

  // Find URL to delete
  const deletingUrl = useMemo(
    () => urls.find((url) => url.id === deletingId),
    [urls, deletingId]
  );

  // Do not render if loading or not authenticated
  if (authLoading || !isAuthenticated) {
    return null;
  }

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    toast.success("Copied to clipboard!");
  };

  const handleEdit = async (id: string, description: string) => {
    try {
      await api.myUrls.updateDescription(id, description);
      setUrls((prevUrls) =>
        prevUrls.map((url) => (url.id === id ? { ...url, description } : url))
      );
      toast.success("Description updated!");
    } catch (error) {
      toast.error("Failed to update description. Please try again.");
      console.error("Update description error:", error);
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;

    try {
      await api.myUrls.delete(deletingId);
      setDeletingId(null);
      loadUrls(currentPage, selectedTagIds, filterMode);
      toast.success("URL deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete URL. Please try again.");
      console.error("Delete error:", error);
      setDeletingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    // shadcn Pagination is 1-based, backend is 0-based
    loadUrls(page - 1, selectedTagIds, filterMode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTagFilterToggle = (tagId: string) => {
    const newIds = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId];
    setSelectedTagIds(newIds);
    loadUrls(0, newIds, filterMode);
  };

  const handleTagFilterClear = () => {
    setSelectedTagIds([]);
    loadUrls(0, [], filterMode);
  };

  const handleModeChange = (mode: TagFilterMode) => {
    setFilterMode(mode);
    if (selectedTagIds.length > 0) {
      loadUrls(0, selectedTagIds, mode);
    }
  };

  const handleAddUrl = () => {
    loadUrls(0, selectedTagIds, filterMode);
    toast.success("URL added successfully!");
  };

  const handleTagAssign = (urlId: string, tagId: string) => {
    const tag = allTags.find((t) => t.id === tagId);
    if (!tag) return;
    setUrls((prevUrls) =>
      prevUrls.map((url) => {
        if (url.id !== urlId) return url;
        const already = (url.tags || []).some((t) => t.id === tagId);
        if (already) return url;
        return { ...url, tags: [...(url.tags || []), tag] };
      })
    );
  };

  const handleTagUnassign = (urlId: string, tagId: string) => {
    setUrls((prevUrls) =>
      prevUrls.map((url) => {
        if (url.id !== urlId) return url;
        return { ...url, tags: (url.tags || []).filter((t) => t.id !== tagId) };
      })
    );
  };

  const handleTagCreated = (tag: TagItem) => {
    setAllTags((prev) => {
      const exists = prev.some((t) => t.id === tag.id);
      if (exists) return prev;
      return [...prev, tag];
    });
  };

  const handleTagDeleted = (tagId: string) => {
    setAllTags((prev) => prev.filter((t) => t.id !== tagId));
    setUrls((prevUrls) =>
      prevUrls.map((url) => ({
        ...url,
        tags: (url.tags || []).filter((t) => t.id !== tagId),
      }))
    );
    const newSelected = selectedTagIds.filter((id) => id !== tagId);
    if (newSelected.length !== selectedTagIds.length) {
      setSelectedTagIds(newSelected);
      loadUrls(0, newSelected, filterMode);
    }
  };

  const handleTagRenamed = (tagId: string, name: string) => {
    setAllTags((prev) =>
      prev.map((t) => (t.id === tagId ? { ...t, name } : t))
    );
    setUrls((prevUrls) =>
      prevUrls.map((url) => ({
        ...url,
        tags: (url.tags || []).map((t) => (t.id === tagId ? { ...t, name } : t)),
      }))
    );
  };

  return (
    <main className="container mx-auto max-w-5xl p-8">
      <MyUrlsPageHeader onAddUrl={handleAddUrl} />

      <TagFilter
        allTags={allTags}
        selectedTagIds={selectedTagIds}
        filterMode={filterMode}
        onToggle={handleTagFilterToggle}
        onClear={handleTagFilterClear}
        onModeChange={handleModeChange}
        onTagDeleted={handleTagDeleted}
        onTagRenamed={handleTagRenamed}
        onTagCreated={handleTagCreated}
      />

      {isLoadingUrls ? (
        <div className="text-center py-12">
          <p className="text-neutral-400 dark:text-white/40">Loading...</p>
        </div>
      ) : urls.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <UrlList
            urls={urls}
            onCopy={handleCopy}
            onEdit={handleEdit}
            onDelete={handleDelete}
            allTags={allTags}
            onTagAssign={handleTagAssign}
            onTagUnassign={handleTagUnassign}
            onTagCreated={handleTagCreated}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage + 1} // 1-based for display
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Delete confirmation modal */}
      <DeleteConfirmDialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
        onConfirm={confirmDelete}
        shortUrl={deletingUrl?.shortUrl}
      />
    </main>
  );
}
