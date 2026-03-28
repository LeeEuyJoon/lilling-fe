"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, X, ChevronDown, ChevronUp, MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/shadcn/input";
import { type TagItem } from "@/lib/api";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { getTagColor } from "./tagColors";

export type TagFilterMode = "or" | "and";

interface TagFilterProps {
  allTags: TagItem[];
  selectedTagIds: string[];
  filterMode: TagFilterMode;
  onToggle: (tagId: string) => void;
  onClear: () => void;
  onModeChange: (mode: TagFilterMode) => void;
  onTagDeleted: (tagId: string) => void;
  onTagRenamed: (tagId: string, name: string) => void;
  onTagCreated: (tag: TagItem) => void;
}

function TagChip({
  tag,
  isSelected,
  onToggle,
  onTagDeleted,
  onTagRenamed,
}: {
  tag: TagItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onTagDeleted: (id: string) => void;
  onTagRenamed: (id: string, name: string) => void;
}) {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const chipRef = useRef<HTMLDivElement>(null);
  const color = getTagColor(tag.id);

  useEffect(() => {
    if (!isManageOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (chipRef.current && !chipRef.current.contains(e.target as Node)) {
        setIsManageOpen(false);
        setIsRenaming(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isManageOpen]);

  const handleRenameSubmit = async () => {
    if (!isRenaming) return;
    const trimmed = renameValue.trim();
    if (!trimmed || trimmed === tag.name) {
      setIsRenaming(false);
      setIsManageOpen(false);
      return;
    }
    try {
      await api.tags.update(tag.id, trimmed);
      onTagRenamed(tag.id, trimmed);
      setIsRenaming(false);
      setIsManageOpen(false);
      toast.success("태그 이름이 변경되었습니다.");
    } catch {
      toast.error("태그 이름 변경에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      await api.tags.delete(tag.id);
      onTagDeleted(tag.id);
      setIsManageOpen(false);
      toast.success("태그가 삭제되었습니다.");
    } catch {
      toast.error("태그 삭제에 실패했습니다.");
    }
  };

  return (
    <div
      ref={chipRef}
      className={`group relative inline-flex items-center rounded-full border transition-all font-medium text-xs
        ${
          isSelected
            ? `${color.bg} ${color.text} ${color.border}`
            : `${color.bg} ${color.text} ${color.border} opacity-40 hover:opacity-75`
        }`}
    >
      {/* Tag name (filter toggle) */}
      <button onClick={() => onToggle(tag.id)} className="pl-2.5 pr-2 py-0.5">
        {tag.name}
      </button>

      {/* Divider + Manage button */}
      <span className="inline-flex items-center">
        <span className="w-px self-stretch bg-current opacity-30 my-1" />
        <button
          onClick={() => {
            setIsManageOpen((v) => !v);
            setIsRenaming(false);
          }}
          className="px-1.5 py-0.5"
          title="태그 관리"
        >
          <MoreHorizontal size={10} />
        </button>
      </span>

      {/* Manage popover */}
      {isManageOpen && (
        <div
          className="absolute left-0 top-full mt-1 z-50 min-w-[120px]
            bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-white/10
            rounded-xl shadow-lg p-1.5"
        >
          {isRenaming ? (
            <div className="px-1 py-0.5">
              <Input
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleRenameSubmit();
                  } else if (e.key === "Escape") {
                    setIsRenaming(false);
                    setIsManageOpen(false);
                  }
                }}
                onBlur={handleRenameSubmit}
                placeholder={tag.name}
                className="h-7 text-xs border-dashed bg-transparent dark:bg-zinc-700/50 dark:border-white/20 dark:text-white dark:placeholder:text-white/30"
                autoFocus
              />
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsRenaming(true);
                  setRenameValue(tag.name);
                }}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-left
                  text-neutral-700 dark:text-white/70
                  hover:bg-neutral-100 dark:hover:bg-white/8 transition-colors"
              >
                <Pencil size={11} /> 이름 변경
              </button>
              <button
                onClick={handleDelete}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-left
                  text-red-500 dark:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                <Trash2 size={11} /> 삭제
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function TagFilter({
  allTags,
  selectedTagIds,
  filterMode,
  onToggle,
  onClear,
  onModeChange,
  onTagDeleted,
  onTagRenamed,
  onTagCreated,
}: TagFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTag = async () => {
    const trimmed = newTagName.trim();
    if (!trimmed || isCreating) return;
    setIsCreating(true);
    try {
      const created = await api.tags.create(trimmed);
      onTagCreated(created);
      setNewTagName("");
      setIsAddingTag(false);
      toast.success(`태그 "${created.name}"이 생성되었습니다.`);
    } catch {
      toast.error("태그 생성에 실패했습니다.");
    } finally {
      setIsCreating(false);
    }
  };

  const activeCount = selectedTagIds.length;

  return (
    <div className="mb-6">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors
          bg-violet-600 text-white hover:bg-violet-500 shadow-md shadow-violet-900/20 dark:shadow-violet-900/40"
      >
        <Filter size={11} />
        <span>Filter{activeCount > 0 ? ` · ${activeCount}` : ""}</span>
        {isOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      </button>

      {/* Filter panel */}
      {isOpen && (
        <div className="mt-2 p-3 rounded-xl border bg-white dark:bg-zinc-800 border-violet-200 dark:border-violet-500/30 shadow-sm">
          <div className="flex items-center gap-2 flex-wrap">
            {/* AND / OR toggle */}
            <div className="flex items-center rounded-md border border-violet-200 dark:border-violet-500/30 overflow-hidden shrink-0 mr-1">
              {(["or", "and"] as TagFilterMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => onModeChange(mode)}
                  className={`text-xs px-2.5 py-1 transition-colors font-medium
                    ${
                      filterMode === mode
                        ? "bg-violet-500 text-white dark:bg-violet-600"
                        : "text-neutral-500 dark:text-white/50 hover:bg-neutral-100 dark:hover:bg-white/10"
                    }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Tag chips */}
            {allTags.map((tag) => (
              <TagChip
                key={tag.id}
                tag={tag}
                isSelected={selectedTagIds.includes(tag.id)}
                onToggle={onToggle}
                onTagDeleted={onTagDeleted}
                onTagRenamed={onTagRenamed}
              />
            ))}

            {/* Add tag */}
            {isAddingTag ? (
              <div className="flex items-center gap-1">
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCreateTag();
                    } else if (e.key === "Escape") {
                      setIsAddingTag(false);
                      setNewTagName("");
                    }
                  }}
                  onBlur={() => {
                    if (!newTagName.trim()) {
                      setIsAddingTag(false);
                    }
                  }}
                  placeholder="태그 이름..."
                  className="h-6 w-28 text-xs border-dashed bg-transparent dark:bg-zinc-700/50 dark:border-white/20 dark:text-white dark:placeholder:text-white/30"
                  autoFocus
                />
                <button
                  onClick={handleCreateTag}
                  disabled={!newTagName.trim() || isCreating}
                  className="p-1 rounded-md text-neutral-400 hover:text-violet-600 hover:bg-violet-50
                    dark:text-white/40 dark:hover:text-violet-400 dark:hover:bg-violet-500/15
                    disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={11} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingTag(true)}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium
                  bg-violet-100 text-violet-600 border border-violet-300
                  hover:bg-violet-200 hover:border-violet-400
                  dark:bg-violet-500/15 dark:text-violet-400 dark:border-violet-500/40
                  dark:hover:bg-violet-500/25 dark:hover:border-violet-500/60
                  transition-colors"
              >
                <Plus size={10} /> 태그 추가
              </button>
            )}

            {/* Clear filter */}
            {activeCount > 0 && (
              <button
                onClick={onClear}
                className="inline-flex items-center gap-1 text-xs text-neutral-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-auto"
              >
                <X size={10} /> 해제
              </button>
            )}
          </div>

          {/* AND mode hint */}
          {filterMode === "and" && activeCount > 1 && (
            <p className="text-xs text-neutral-400 dark:text-white/30 mt-2">
              선택한 태그를 모두 가진 URL만 표시됩니다
            </p>
          )}
        </div>
      )}
    </div>
  );
}
