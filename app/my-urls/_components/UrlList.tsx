"use client";

import { UrlItem, TagItem } from "@/lib/api";
import UrlCard from "./UrlCard";

interface UrlListProps {
  urls: UrlItem[];
  onCopy: (shortUrl: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
  allTags?: TagItem[];
  onTagAssign?: (urlId: string, tagId: string) => void;
  onTagUnassign?: (urlId: string, tagId: string) => void;
  onTagCreated?: (tag: TagItem) => void;
}

export default function UrlList({
  urls,
  onCopy,
  onEdit,
  onDelete,
  allTags,
  onTagAssign,
  onTagUnassign,
  onTagCreated,
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
          allTags={allTags}
          onTagAssign={onTagAssign}
          onTagUnassign={onTagUnassign}
          onTagCreated={onTagCreated}
        />
      ))}
    </div>
  );
}
