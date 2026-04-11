"use client";

import { useState, useMemo } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import MyUrlsPageHeader from "./_components/MyUrlsPageHeader";
import UrlList from "./_components/UrlList";
import EmptyState from "./_components/EmptyState";
import DeleteConfirmDialog from "./_components/DeleteConfirmDialog";
import TagFilter, { type TagFilterMode } from "./_components/TagFilter";
import { Pagination } from "@/components/shadcn/pagination";
import { useMyUrlsList, useDeleteUrl, useUpdateDescription } from "@/lib/queries/url.queries";

const PAGE_SIZE = 10;

export default function MyUrlsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Filter state (only these remain as useState)
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<TagFilterMode>("or");
  const [currentPage, setCurrentPage] = useState(0); // 0-based for backend

  // Delete dialog state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error("로그인이 필요합니다.");
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  // URL list query
  const {
    data: urlsData,
    isLoading: isLoadingUrls,
  } = useMyUrlsList({
    page: currentPage,
    size: PAGE_SIZE,
    tagIds: selectedTagIds,
    filterMode,
  });

  const urls = useMemo(() => urlsData?.urls ?? [], [urlsData?.urls]);
  const totalPages = urlsData?.totalPages ?? 0;

  // Mutations
  const deleteUrl = useDeleteUrl();
  const updateDescription = useUpdateDescription();

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
      await updateDescription.mutateAsync({ urlId: id, description });
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
      await deleteUrl.mutateAsync(deletingId);
      setDeletingId(null);
      toast.success("URL deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete URL. Please try again.");
      console.error("Delete error:", error);
      setDeletingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    // shadcn Pagination is 1-based, backend is 0-based
    setCurrentPage(page - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTagFilterToggle = (tagId: string) => {
    const newIds = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId];
    setSelectedTagIds(newIds);
    setCurrentPage(0);
  };

  const handleTagFilterClear = () => {
    setSelectedTagIds([]);
    setCurrentPage(0);
  };

  const handleModeChange = (mode: TagFilterMode) => {
    setFilterMode(mode);
    setCurrentPage(0);
  };

  return (
    <main className="container mx-auto max-w-5xl p-4 sm:p-8">
      <MyUrlsPageHeader />

      <TagFilter
        selectedTagIds={selectedTagIds}
        filterMode={filterMode}
        onToggle={handleTagFilterToggle}
        onClear={handleTagFilterClear}
        onModeChange={handleModeChange}
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
