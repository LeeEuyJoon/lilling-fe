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
import { Link2, Loader2 } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import ResultDialog from "@/app/_components/ResultDialog";

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
  const [isLoading, setIsLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [isResultOpen, setIsResultOpen] = useState(false);

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
