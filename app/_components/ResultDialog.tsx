"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/shadcn/dialog";
import { useState, ReactNode } from "react";
import { Copy, Check } from "lucide-react";

interface ResultDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  shortUrl: string;
  children?: ReactNode;
}

export default function ResultDialog({
  isOpen,
  onOpenChange,
  shortUrl,
  children,
}: ResultDialogProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-sm p-0 overflow-hidden gap-0
          bg-white border-neutral-200
          dark:bg-zinc-900 dark:border-white/10"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-neutral-100 dark:border-white/8">
          <h2 className="text-lg font-black text-neutral-900 dark:text-white">Your short URL is ready!</h2>
          <p className="text-sm mt-0.5 text-neutral-500 dark:text-white/40">Copy and share it anywhere</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Short URL display */}
          <div className="flex items-center gap-2 border rounded-xl px-4 py-3 mb-3
            bg-neutral-50 border-neutral-200
            dark:bg-white/5 dark:border-white/10">
            <span className="flex-1 text-base font-black text-violet-600 dark:text-violet-400 truncate">
              {shortUrl}
            </span>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all shrink-0
                ${isCopied
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-600/20 dark:text-emerald-400"
                  : "bg-violet-600 text-white shadow-md shadow-violet-900/30 hover:bg-violet-500"
                }`}
            >
              {isCopied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-100 dark:border-white/8 flex items-center justify-between">
          {children && <div className="flex-1">{children}</div>}
          <button
            onClick={() => onOpenChange(false)}
            className="text-sm font-semibold text-neutral-400 dark:text-white/40 hover:text-neutral-600 dark:hover:text-white/70 transition-colors ml-auto"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
