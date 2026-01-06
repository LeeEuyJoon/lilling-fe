"use client";

import { UrlItem } from "@/lib/dummyData";
import UrlCard from "./UrlCard";

interface UrlListProps {
  urls: UrlItem[];
  onCopy: (shortUrl: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
}

export default function UrlList({
  urls,
  onCopy,
  onEdit,
  onDelete,
}: UrlListProps) {
  return (
    <div className="space-y-4">
      {urls.map((url) => (
        <UrlCard
          key={url.id}
          url={url}
          onCopy={onCopy}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
