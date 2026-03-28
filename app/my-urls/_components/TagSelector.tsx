"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Tag } from "lucide-react";
import { Input } from "@/components/shadcn/input";
import { type TagItem } from "@/lib/api";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { getTagColor } from "./tagColors";

interface TagSelectorProps {
  urlId: string;
  allTags: TagItem[];
  assignedTagIds: Set<string>;
  onTagAssign: (urlId: string, tagId: string) => void;
  onTagUnassign: (urlId: string, tagId: string) => void;
  onTagCreated: (tag: TagItem) => void;
  hasAssignedTags: boolean;
}

export default function TagSelector({
  urlId,
  allTags,
  assignedTagIds,
  onTagAssign,
  onTagUnassign,
  onTagCreated,
  hasAssignedTags,
}: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        plusButtonRef.current &&
        !plusButtonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setNewTagName("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleTagToggle = async (tag: TagItem) => {
    if (assignedTagIds.has(tag.id)) {
      try {
        await api.tags.unassign(urlId, [tag.id]);
        onTagUnassign(urlId, tag.id);
      } catch {
        toast.error("태그를 해제하는데 실패했습니다.");
      }
    } else {
      try {
        await api.tags.assign(urlId, [tag.id]);
        onTagAssign(urlId, tag.id);
      } catch {
        toast.error("태그를 할당하는데 실패했습니다.");
      }
    }
  };

  const handleCreateTag = async () => {
    const trimmed = newTagName.trim();
    if (!trimmed) return;
    if (isCreatingTag) return;

    setIsCreatingTag(true);
    try {
      const created = await api.tags.create(trimmed);
      onTagCreated(created);
      // Assign the new tag to this URL immediately
      await api.tags.assign(urlId, [created.id]);
      onTagAssign(urlId, created.id);
      setNewTagName("");
      toast.success(`태그 "${created.name}"이 생성되었습니다.`);
    } catch {
      toast.error("태그 생성에 실패했습니다.");
    } finally {
      setIsCreatingTag(false);
    }
  };

  const handleNewTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateTag();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setNewTagName("");
    }
  };

  return (
    <div className="relative">
      {/* Add tag button */}
      {!hasAssignedTags ? (
        <button
          ref={plusButtonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md
            text-neutral-400 dark:text-white/30
            hover:text-violet-600 dark:hover:text-violet-400
            hover:bg-violet-50 dark:hover:bg-violet-500/10
            transition-colors"
          title="Add tag"
        >
          <Tag size={10} />
          <span>태그 추가</span>
        </button>
      ) : (
        <button
          ref={plusButtonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center w-5 h-5 rounded-full border
            border-dashed border-neutral-300 dark:border-white/20
            text-neutral-400 dark:text-white/40
            hover:border-violet-400 hover:text-violet-500 dark:hover:border-violet-500/50
            transition-colors"
          title="Add tag"
        >
          <Plus size={10} />
        </button>
      )}

      {/* Tag dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-1 z-50 w-52
            bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-white/10
            rounded-xl shadow-lg p-2"
        >
          {/* Existing tags list */}
          {allTags.length > 0 && (
            <div className="max-h-36 overflow-y-auto mb-1.5">
              {allTags.map((tag) => {
                const isAssigned = assignedTagIds.has(tag.id);
                const color = getTagColor(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag)}
                    className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-xs text-left transition-colors
                      ${isAssigned
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                        : "hover:bg-neutral-100 text-neutral-700 dark:hover:bg-white/8 dark:text-white/70"
                      }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-sm ${color.bg} border ${color.border}`}
                      />
                      {tag.name}
                    </span>
                    {isAssigned && (
                      <span className="text-violet-500 dark:text-violet-400 font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {allTags.length > 0 && (
            <div className="border-t border-neutral-100 dark:border-white/8 mb-1.5" />
          )}

          {/* Create new tag input */}
          <div className="flex items-center gap-1.5 px-1">
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={handleNewTagKeyDown}
              placeholder="New tag name..."
              className="h-7 text-xs border-dashed bg-transparent dark:bg-zinc-700/50 dark:border-white/20 dark:text-white dark:placeholder:text-white/30"
              autoFocus={allTags.length === 0}
            />
            <button
              onClick={handleCreateTag}
              disabled={!newTagName.trim() || isCreatingTag}
              className="shrink-0 p-1.5 rounded-lg transition-colors
                text-neutral-400 hover:text-violet-600 hover:bg-violet-50
                dark:text-white/40 dark:hover:text-violet-400 dark:hover:bg-violet-500/15
                disabled:opacity-40 disabled:cursor-not-allowed"
              title="Create tag (Enter)"
            >
              <Plus size={12} />
            </button>
          </div>
          {newTagName.trim() && (
            <p className="text-xs text-neutral-400 dark:text-white/30 px-1 mt-1">
              Press Enter to create
            </p>
          )}
        </div>
      )}
    </div>
  );
}
