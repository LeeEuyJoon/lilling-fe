"use client";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { useState } from "react";

interface ResultDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  shortUrl: string;
}

export default function ResultDialog({
  isOpen,
  onOpenChange,
  shortUrl,
}: ResultDialogProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-2xl p-8"
      >
        <DialogHeader>
          <DialogTitle>Shortened URL</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Input value={shortUrl} readOnly />
            <Button onClick={handleCopy}>{isCopied ? "Copied" : "Copy"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
