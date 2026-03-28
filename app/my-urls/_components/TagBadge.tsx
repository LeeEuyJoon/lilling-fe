"use client";

import { X } from "lucide-react";
import { type TagItem } from "@/lib/api";
import { getTagColor } from "./tagColors";

interface TagBadgeProps {
  tag: TagItem;
  onRemove: (e: React.MouseEvent, tag: TagItem) => void;
}

export default function TagBadge({ tag, onRemove }: TagBadgeProps) {
  const color = getTagColor(tag.id);
  return (
    <button
      onClick={(e) => onRemove(e, tag)}
      title={`Remove tag "${tag.name}"`}
      className={`group relative inline-flex items-center text-xs px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${color.bg} ${color.text} ${color.border}`}
    >
      <span className="group-hover:opacity-0 transition-opacity">
        {tag.name}
      </span>
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-black/15 dark:bg-black/30">
        <X size={10} />
      </span>
    </button>
  );
}
