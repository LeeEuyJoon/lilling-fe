"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Link2, Loader2 } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import ResultDialog from "@/app/_components/ResultDialog";
import KeywordInput from "@/app/_components/KeywordInput";

interface CreateUrlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateUrlModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateUrlModalProps) {
  const [urlInput, setUrlInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [isResultOpen, setIsResultOpen] = useState(false);

  const handleShorten = async () => {
    if (!urlInput.trim()) return;

    setIsLoading(true);
    try {
      const response = await api.url.shorten(urlInput, keyword || undefined);
      setShortUrl(response.shortUrl);
      onOpenChange(false);
      setIsResultOpen(true);
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to shorten URL. Please try again.");
      console.error("Shorten error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setUrlInput("");
    setKeyword("");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-sm p-0 overflow-hidden gap-0
          bg-white border-neutral-200
          dark:bg-zinc-900 dark:border-white/10">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-neutral-100 dark:border-white/8">
            <h2 className="text-lg font-black text-neutral-900 dark:text-white">Create Short URL</h2>
            <p className="text-sm mt-0.5 text-neutral-500 dark:text-white/40">Enter a long URL to shorten it</p>
          </div>

          {/* Body */}
          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="relative">
              <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-white/30" />
              <Input
                type="url"
                placeholder="https://example.com/very/long/url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && urlInput.trim() && !isLoading) {
                    handleShorten();
                  }
                }}
                className="pl-10 bg-neutral-50 border-neutral-200 dark:bg-white/5 dark:border-white/10"
                disabled={isLoading}
              />
            </div>
            <KeywordInput
              value={keyword}
              onChange={setKeyword}
              disabled={isLoading}
              showIcon
              inputWrapperClassName="w-52"
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-neutral-100 dark:border-white/8 flex items-center justify-end gap-2">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="text-sm font-semibold px-4 py-2 rounded-lg border transition-colors
                border-neutral-200 text-neutral-600 hover:bg-neutral-50
                dark:border-white/10 dark:text-white/60 dark:hover:border-white/20"
            >
              Cancel
            </button>
            <button
              onClick={handleShorten}
              disabled={!urlInput.trim() || isLoading}
              className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg text-white transition-colors
                bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-900/30
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              Shorten URL
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <ResultDialog
        isOpen={isResultOpen}
        onOpenChange={setIsResultOpen}
        shortUrl={shortUrl}
      />
    </>
  );
}
