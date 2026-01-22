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
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

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
  const [isAdding, setIsAdding] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handleAddToMyUrls = async () => {
    setIsAdding(true);

    try {
      if (isAuthenticated) {
        // Logged in: just redirect
        router.push("/my-urls");
      } else {
        // Not logged in: save and login
        localStorage.setItem("pending_claim_url", shortUrl);
        localStorage.setItem("redirect_after_login", "/my-urls");
        api.auth.loginWithGoogle();
      }
    } catch (error) {
      console.error("Error adding to My URLs:", error);
      setIsAdding(false);
    }
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
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input value={shortUrl} readOnly />
            <Button onClick={handleCopy}>{isCopied ? "Copied" : "Copy"}</Button>
          </div>
          <Button
            onClick={handleAddToMyUrls}
            disabled={isAdding}
            variant="outline"
            className="w-full border-black hover:bg-gray-300 transition-colors"
          >
            {isAdding ? "Adding..." : "Add to My URLs"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
