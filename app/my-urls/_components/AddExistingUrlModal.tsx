"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import {
  Link2,
  Loader2,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

type VerificationState =
  | "idle"
  | "verifying"
  | "success"
  | "error"
  | "claiming";

interface VerifiedUrlInfo {
  shortUrl: string;
  originalUrl: string;
  clickCount: number;
}

interface AddExistingUrlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: () => void;
}

export default function AddExistingUrlModal({
  open,
  onOpenChange,
  onAdd,
}: AddExistingUrlModalProps) {
  const [shortCode, setShortCode] = useState("");
  const [verificationState, setVerificationState] =
    useState<VerificationState>("idle");
  const [verifiedUrl, setVerifiedUrl] = useState<VerifiedUrlInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    if (!shortCode.trim()) return;

    setVerificationState("verifying");
    setErrorMessage("");
    setVerifiedUrl(null);

    try {
      const response = await api.myUrls.verify(shortCode);

      if (response.status === "OK") {
        setVerifiedUrl({
          shortUrl: response.shortUrl,
          originalUrl: response.originalUrl,
          clickCount: response.clickCount,
        });
        setVerificationState("success");
      } else if (response.status === "ALREADY_OWNED") {
        setErrorMessage("This URL already has an owner");
        setVerificationState("error");
      } else if (response.status === "NOT_FOUND") {
        setErrorMessage("This URL doesn't exist");
        setVerificationState("error");
      } else if (response.status === "INVALID_FORMAT") {
        setErrorMessage("Invalid URL format");
        setVerificationState("error");
      } else {
        setErrorMessage("Unable to verify URL");
        setVerificationState("error");
      }
    } catch (error) {
      setErrorMessage("Failed to verify URL. Please try again.");
      setVerificationState("error");
      console.error("Verify error:", error);
    }
  };

  const handleAdd = async () => {
    if (!verifiedUrl) return;

    setVerificationState("claiming");

    try {
      await api.myUrls.claim(shortCode);
      toast.success("URL claimed successfully!");
      onAdd();
      handleClose();
    } catch (error) {
      toast.error("Failed to claim URL. Please try again.");
      setVerificationState("success");
      console.error("Claim error:", error);
    }
  };

  const handleClose = () => {
    setShortCode("");
    setVerificationState("idle");
    setVerifiedUrl(null);
    setErrorMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden gap-0
        flex flex-col max-h-[calc(100svh-2rem)]
        bg-white border-neutral-200
        dark:bg-zinc-900 dark:border-white/10">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-neutral-100 dark:border-white/8 shrink-0">
          <h2 className="text-lg font-black text-neutral-900 dark:text-white">Add Existing URL</h2>
          <p className="text-sm mt-0.5 text-neutral-500 dark:text-white/40">
            Enter a short code to add it to your list
          </p>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-5 flex flex-col gap-3 overflow-y-auto">
          <div className="relative">
            <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-white/30" />
            <Input
              type="text"
              placeholder="abc123"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && shortCode.trim() && verificationState === "idle") {
                  handleVerify();
                }
              }}
              className="pl-10 bg-neutral-50 border-neutral-200 dark:bg-white/5 dark:border-white/10 dark:text-violet-200 dark:placeholder:text-violet-400/50"
              disabled={verificationState === "verifying"}
            />
          </div>

          {verificationState === "idle" && (
            <button
              onClick={handleVerify}
              disabled={!shortCode.trim()}
              className="w-full text-sm font-semibold py-2 rounded-lg border transition-colors
                bg-violet-50 border-violet-300 text-violet-700 hover:bg-violet-100 hover:border-violet-400 hover:text-violet-800
                dark:bg-transparent dark:border-white/10 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white/80 dark:hover:border-white/20
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify URL
            </button>
          )}

          {verificationState === "verifying" && (
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-white/40 p-3 rounded-lg bg-neutral-50 dark:bg-white/5">
              <Loader2 className="size-4 animate-spin" />
              Verifying URL...
            </div>
          )}

          {verificationState === "success" && verifiedUrl && (
            <div className="border rounded-lg p-3 bg-neutral-50 dark:bg-white/4 border-neutral-200 dark:border-white/8 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-violet-600 dark:text-violet-400">
                    {verifiedUrl.shortUrl}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-neutral-400 dark:text-white/40 mt-0.5">
                    <ExternalLink className="size-3" />
                    <p className="truncate">{verifiedUrl.originalUrl}</p>
                  </div>
                  <p className="text-xs text-neutral-400 dark:text-white/40 mt-1">{verifiedUrl.clickCount} clicks</p>
                </div>
              </div>
            </div>
          )}

          {verificationState === "error" && (
            <div className="flex items-start gap-2 text-sm p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
              <XCircle className="size-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-600 dark:text-red-400">Verification Failed</p>
                <p className="text-xs mt-0.5 text-red-500 dark:text-red-400/70">{errorMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-neutral-100 dark:border-white/8 flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={handleClose}
            disabled={verificationState === "claiming"}
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-colors
              border-neutral-200 text-neutral-600 hover:bg-neutral-50
              dark:border-white/10 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white/80 dark:hover:border-white/20
              disabled:opacity-50"
          >
            Cancel
          </button>
          {verificationState === "success" ? (
            <button
              onClick={handleAdd}
              className="text-sm font-bold px-4 py-2 rounded-lg text-white transition-colors
                bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-900/30"
            >
              Add to List
            </button>
          ) : verificationState === "claiming" ? (
            <button
              disabled
              className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg text-white
                bg-violet-600 opacity-70 cursor-not-allowed"
            >
              <Loader2 className="size-4 animate-spin" />
              Adding...
            </button>
          ) : verificationState === "error" ? (
            <button
              onClick={() => setVerificationState("idle")}
              className="text-sm font-semibold px-4 py-2 rounded-lg border transition-colors
                border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 hover:border-neutral-400
                dark:border-white/10 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white/80 dark:hover:border-white/20"
            >
              Try Again
            </button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
