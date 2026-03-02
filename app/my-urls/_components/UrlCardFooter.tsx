"use client";

import { Trash2 } from "lucide-react";

interface UrlCardFooterProps {
  clickCount: number;
  createdAt: string;
  onDelete: () => void;
}

export default function UrlCardFooter({
  clickCount,
  createdAt,
  onDelete,
}: UrlCardFooterProps) {
  return (
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100 dark:border-white/6">
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
  );
}
