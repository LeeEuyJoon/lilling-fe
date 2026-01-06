"use client";

import MyUrlsPageHeader from "./_components/MyUrlsPageHeader";
import UrlList from "./_components/UrlList";
import EmptyState from "./_components/EmptyState";
import DeleteConfirmDialog from "./_components/DeleteConfirmDialog";
import { dummyUrls, UrlItem } from "@/lib/dummyData";
import { Pagination } from "@/components/shadcn/pagination";
import { useState, useMemo } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function MyUrlsPage() {
  const [urls, setUrls] = useState<UrlItem[]>(dummyUrls);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 페이지네이션 계산
  const totalPages = Math.ceil(urls.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentUrls = useMemo(
    () => urls.slice(startIndex, endIndex),
    [urls, startIndex, endIndex]
  );

  // 삭제할 URL 찾기
  const deletingUrl = useMemo(
    () => urls.find((url) => url.id === deletingId),
    [urls, deletingId]
  );

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    toast.success("Copied to clipboard!");
  };

  const handleEdit = (id: string, description: string) => {
    // URL 리스트에서 해당 URL의 description 업데이트
    setUrls((prevUrls) =>
      prevUrls.map((url) => (url.id === id ? { ...url, description } : url))
    );
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (!deletingId) return;

    // URL 리스트에서 삭제
    setUrls((prevUrls) => prevUrls.filter((url) => url.id !== deletingId));
    setDeletingId(null);

    // 삭제 후 현재 페이지가 비어있으면 이전 페이지로
    const newTotalPages = Math.ceil((urls.length - 1) / PAGE_SIZE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤을 상단으로
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="container mx-auto max-w-4xl p-8">
      <MyUrlsPageHeader />

      {urls.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <UrlList
            urls={currentUrls}
            onCopy={handleCopy}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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
