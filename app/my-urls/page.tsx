"use client";

import MyUrlsPageHeader from "./_components/MyUrlsPageHeader";
import UrlList from "./_components/UrlList";
import { dummyUrls } from "@/lib/dummyData";
import { useState } from "react";

export default function MyUrlsPage() {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    // TODO: Open edit modal
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log("Deleting URL:", id);
  };

  return (
    <main className="container mx-auto max-w-4xl p-8">
      <MyUrlsPageHeader />
      <UrlList
        urls={dummyUrls}
        onCopy={handleCopy}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}
