"use client";

import MyUrlsPageHeader from "./_components/MyUrlsPageHeader";
import UrlList from "./_components/UrlList";
import { dummyUrls, UrlItem } from "@/lib/dummyData";
import { Pagination } from "@/components/shadcn/pagination";
import { useState, useMemo } from "react";

const PAGE_SIZE = 10;

export default function MyUrlsPage() {
  const [urls, setUrls] = useState<UrlItem[]>(dummyUrls);
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지네이션 계산
  const totalPages = Math.ceil(urls.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentUrls = useMemo(
    () => urls.slice(startIndex, endIndex),
    [urls, startIndex, endIndex]
  );

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
  };

  const handleEdit = (id: string, description: string) => {
    // URL 리스트에서 해당 URL의 description 업데이트
    setUrls((prevUrls) =>
      prevUrls.map((url) =>
        url.id === id ? { ...url, description } : url
      )
    );
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log("Deleting URL:", id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤을 상단으로
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="container mx-auto max-w-4xl p-8">
      <MyUrlsPageHeader />
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
    </main>
  );
}
