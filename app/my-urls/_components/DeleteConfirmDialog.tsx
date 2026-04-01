"use client";

import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/shadcn/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  shortUrl?: string;
}

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  shortUrl,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-sm p-0 overflow-hidden gap-0
        bg-white border-neutral-200
        dark:bg-zinc-900 dark:border-white/10">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-neutral-100 dark:border-white/8">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-500/15">
              <AlertTriangle size={15} className="text-red-500" />
            </div>
            <h2 className="text-lg font-black text-neutral-900 dark:text-white">Delete URL</h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-white/40">This action cannot be undone.</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm text-neutral-500 dark:text-white/40 mb-3">
            The following short URL will be permanently deleted:
          </p>
          <div className="border rounded-lg px-3 py-2.5 text-sm font-semibold
            bg-neutral-50 border-neutral-200 text-neutral-500
            dark:bg-white/4 dark:border-white/8 dark:text-white/50">
            {shortUrl}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-100 dark:border-white/8 flex items-center justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-colors
              border-neutral-200 text-neutral-600 hover:bg-neutral-50
              dark:border-white/10 dark:text-white/60 dark:hover:border-white/20"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-sm font-bold px-4 py-2 rounded-lg text-white transition-colors
              bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
