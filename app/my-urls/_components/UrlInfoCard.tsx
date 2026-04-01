"use client";

import { Input } from "@/components/shadcn/input";
import { Copy, ExternalLink, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { type TagItem } from "@/lib/api";
import { api } from "@/lib/api";
import { toast } from "sonner";
import TagBadge from "./TagBadge";
import TagSelector from "./TagSelector";

interface UrlInfoCardProps {
  url: {
    id: string;
    shortUrl: string;
    originalUrl: string;
    description?: string;
    tags?: TagItem[];
  };
  onCopy: (shortUrl: string) => void;
  onEdit: (id: string, description: string) => void;
  clickCount: number;
  createdAt: string;
  onDelete: () => void;
  allTags?: TagItem[];
  onTagAssign?: (urlId: string, tagId: string) => void;
  onTagUnassign?: (urlId: string, tagId: string) => void;
  onTagCreated?: (tag: TagItem) => void;
}

export default function UrlInfoCard({
  url,
  onCopy,
  onEdit,
  clickCount,
  createdAt,
  onDelete,
  allTags = [],
  onTagAssign,
  onTagUnassign,
  onTagCreated,
}: UrlInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(url.description || "");

  const assignedTagIds = new Set((url.tags || []).map((t) => t.id));
  const assignedTags = (url.tags ?? []).slice().sort((a, b) => parseInt(a.id) - parseInt(b.id));
  const visibleTags = assignedTags.slice(0, 3);
  const overflowCount = assignedTags.length - visibleTags.length;

  const getFaviconUrl = (urlString: string) => {
    try {
      const domain = new URL(urlString).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return "";
    }
  };

  const handleEditClick = () => {
    setDescription(url.description || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(url.id, description);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setDescription(url.description || "");
      setIsEditing(false);
    }
  };

  const handleUnassignTag = async (e: React.MouseEvent, tag: TagItem) => {
    e.stopPropagation();
    try {
      await api.tags.unassign(url.id, [tag.id]);
      onTagUnassign?.(url.id, tag.id);
    } catch {
      toast.error("태그를 해제하는데 실패했습니다.");
    }
  };

  return (
    <div
      className="flex-1 min-w-0 border rounded-xl p-3 flex flex-col
      bg-neutral-50 border-neutral-200
      dark:bg-white/4 dark:border-white/8"
    >
      <div className="flex items-start gap-2.5 flex-1">
        {/* Favicon */}
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-neutral-200 dark:bg-white/10 overflow-hidden">
          <img
            src={getFaviconUrl(url.originalUrl)}
            alt="favicon"
            className="w-5 h-5"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* URL info */}
        <div className="flex-1 min-w-0 flex flex-col h-full">
          {/* Short URL + action icons + tags (same row) */}
          <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
            {/* Left: shortUrl + action buttons */}
            <a
              href={`https://${url.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-black text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors shrink-0"
            >
              {url.shortUrl}
            </a>
            <button
              onClick={() => onCopy(url.shortUrl)}
              className="text-neutral-400 dark:text-white/40 hover:text-neutral-600 dark:hover:text-white/70 p-0.5 rounded transition-colors shrink-0"
              title="Copy link"
            >
              <Copy size={12} />
            </button>
            <button
              onClick={() => window.open(`https://${url.shortUrl}`, "_blank")}
              className="text-neutral-400 dark:text-white/40 hover:text-neutral-600 dark:hover:text-white/70 p-0.5 rounded transition-colors shrink-0"
              title="Open link"
            >
              <ExternalLink size={12} />
            </button>

            {/* Right: tags + add tag button */}
            <div className="ml-auto flex items-center gap-1 shrink-0">
              {/* Visible tags (max 3) */}
              {visibleTags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} onRemove={handleUnassignTag} />
              ))}

              {/* Overflow count */}
              {overflowCount > 0 && (
                <span className="inline-flex items-center text-xs px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-white/8 text-neutral-500 dark:text-white/40 border border-neutral-200 dark:border-white/10">
                  +{overflowCount}
                </span>
              )}

              <TagSelector
                urlId={url.id}
                allTags={allTags}
                assignedTagIds={assignedTagIds}
                hasAssignedTags={assignedTags.length > 0}
                onTagAssign={onTagAssign ?? (() => {})}
                onTagUnassign={onTagUnassign ?? (() => {})}
                onTagCreated={onTagCreated ?? (() => {})}
              />
            </div>
          </div>

          {/* Original URL */}
          <p className="text-sm text-neutral-400 dark:text-white/40 truncate mb-2">
            {url.originalUrl}
          </p>

          {/* Description — inline editable */}
          {isEditing ? (
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              placeholder="Add a description..."
              className="text-xs md:text-xs h-7 border-dashed bg-white"
              autoFocus
            />
          ) : (
            <div
              className="flex items-center justify-between gap-2 border rounded-lg px-2.5 py-1.5 text-xs cursor-pointer transition-colors
                border-neutral-300 bg-white hover:border-violet-400
                dark:border-white/20 dark:bg-white/5 dark:hover:border-violet-500/50"
              onClick={handleEditClick}
              title="Click to edit description"
            >
              {url.description ? (
                <span className="text-neutral-700 dark:text-white/70">{url.description}</span>
              ) : (
                <span className="text-neutral-400 dark:text-white/30">Add a description...</span>
              )}
              <Pencil size={10} className="shrink-0 text-neutral-400 dark:text-white/30" />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 dark:border-white/6">
            <p className="text-xs text-neutral-400 dark:text-white/40">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              · {clickCount} clicks
            </p>
            <button
              onClick={onDelete}
              className="flex items-center gap-1 text-xs text-neutral-400 dark:text-white/40 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              title="Delete"
            >
              <Trash2 size={11} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
