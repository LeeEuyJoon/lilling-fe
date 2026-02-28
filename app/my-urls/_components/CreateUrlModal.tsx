"use client";

import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Hash, Link2, Loader2 } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import ResultDialog from "@/app/_components/ResultDialog";

const MAX_KEYWORD_LENGTH = 7;
const BASE62_PATTERN = /^[0-9a-zA-Z]*$/;

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

  const handleKeywordChange = (value: string) => {
    if (!BASE62_PATTERN.test(value)) return;
    if (value.length > MAX_KEYWORD_LENGTH) return;
    setKeyword(value);
  };

  const handleShorten = async () => {
    if (!urlInput.trim()) return;

    setIsLoading(true);
    try {
      const response = await api.url.shorten(urlInput);
      setShortUrl(response.shortUrl);
      onOpenChange(false); // Close input modal
      setIsResultOpen(true); // Open result modal
      onSuccess?.(); // Refresh URL list
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Short URL</DialogTitle>
            <DialogDescription>
              Enter a long URL to shorten it
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
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
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="relative w-52">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="keyword (optional)"
                  value={keyword}
                  onChange={(e) => handleKeywordChange(e.target.value)}
                  className="h-7! text-sm pl-8 pr-12 border-dashed"
                  maxLength={MAX_KEYWORD_LENGTH}
                  disabled={isLoading}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                  {keyword.length}/{MAX_KEYWORD_LENGTH}
                </span>
              </div>
              <p className="text-xs text-muted-foreground px-1">
                {keyword.length > 0 ? (
                  <>
                    lill.ing/
                    <span className="text-primary font-medium">{keyword}</span>
                    <span>{"·".repeat(MAX_KEYWORD_LENGTH - keyword.length)}</span>
                  </>
                ) : (
                  <>
                    Your keyword will be included at the start —
                    <br />
                    e.g. keyword <span className="font-medium">BOOK</span> →{" "}
                    <span className="font-medium">lill.ing/BOOK3jP</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleShorten} disabled={!urlInput.trim() || isLoading}>
              {isLoading && <Loader2 className="size-4 animate-spin mr-2" />}
              Shorten URL
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ResultDialog
        isOpen={isResultOpen}
        onOpenChange={setIsResultOpen}
        shortUrl={shortUrl}
      >
        {/* No button needed - already in My URLs page */}
      </ResultDialog>
    </>
  );
}
