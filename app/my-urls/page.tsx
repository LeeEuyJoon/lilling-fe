"use client";

import MyUrlsPageHeader from "./_components/MyUrlsPageHeader";
import UrlList from "./_components/UrlList";
import EmptyState from "./_components/EmptyState";
import DeleteConfirmDialog from "./_components/DeleteConfirmDialog";
import { type UrlItem } from "@/lib/dummyData";
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
  const [currentPage, setCurrentPage] = useState(0); // 0-based index for backend
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingUrls, setIsLoadingUrls] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 인증 확인 및 리다이렉트
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error("로그인이 필요합니다.");
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  // URL 목록 로드
  const loadUrls = async (page: number = 0) => {
    setIsLoadingUrls(true);
    try {
      const response = await api.myUrls.list(page, PAGE_SIZE);
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

  // 인증 완료 후 URL 목록 로드
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      loadUrls(0);
    }
  }, [authLoading, isAuthenticated]);

  // 삭제할 URL 찾기
  const deletingUrl = useMemo(
    () => urls.find((url) => url.id === deletingId),
    [urls, deletingId]
  );

  // 로딩 중이거나 인증되지 않은 경우 렌더링하지 않음
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
      // 로컬 상태 업데이트
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
      loadUrls(currentPage);
      toast.success("URL deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete URL. Please try again.");
      console.error("Delete error:", error);
      setDeletingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    // shadcn Pagination은 1-based, 백엔드는 0-based
    loadUrls(page - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddUrl = () => {
    // 목록 새로고침 (첫 페이지로)
    loadUrls(0);
    toast.success("URL added successfully!");
  };

  return (
    <main className="container mx-auto max-w-4xl p-8">
      <MyUrlsPageHeader onAddUrl={handleAddUrl} />

      {isLoadingUrls ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
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

      {/* 삭제 확인 모달 */}
      <DeleteConfirmDialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
        onConfirm={confirmDelete}
        shortUrl={deletingUrl?.shortUrl}
      />
    </main>
  );
}
