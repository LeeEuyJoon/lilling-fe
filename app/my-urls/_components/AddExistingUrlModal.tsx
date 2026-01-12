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
import { Link2, Loader2, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

type VerificationState = "idle" | "verifying" | "success" | "error" | "claiming";

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
  const [verificationState, setVerificationState] = useState<VerificationState>("idle");
  const [verifiedUrl, setVerifiedUrl] = useState<VerifiedUrlInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    if (!shortCode.trim()) return;

    setVerificationState("verifying");
    setErrorMessage("");
    setVerifiedUrl(null);

    try {
      const response = await api.myUrls.verify(shortCode);

      if (response.valid) {
        // valid=true means URL exists and has no owner
        setVerifiedUrl({
          shortUrl: response.shortUrl,
          originalUrl: response.originalUrl,
          clickCount: response.clickCount,
        });
        setVerificationState("success");
      } else {
        // valid=false means URL doesn't exist or already has owner
        setErrorMessage("This URL doesn't exist or already has an owner");
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Existing Short URL</DialogTitle>
          <DialogDescription>
            Enter the short code of an existing shortened URL to add it to your
            list
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 입력 섹션 */}
          <div className="space-y-2">
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
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
                className="pl-10"
                disabled={verificationState === "verifying"}
              />
            </div>
            {verificationState === "idle" && (
              <Button
                onClick={handleVerify}
                disabled={!shortCode.trim()}
                className="w-full"
                variant="outline"
              >
                Verify URL
              </Button>
            )}
          </div>

          {/* 검증 상태 */}
          {verificationState === "verifying" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
              <Loader2 className="size-4 animate-spin" />
              <span>Verifying URL...</span>
            </div>
          )}

          {/* 성공 - URL 미리보기 */}
          {verificationState === "success" && verifiedUrl && (
            <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <p className="font-semibold text-sm">
                      {verifiedUrl.shortUrl}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <ExternalLink className="size-3" />
                      <p className="truncate">{verifiedUrl.originalUrl}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{verifiedUrl.clickCount} clicks</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 에러 */}
          {verificationState === "error" && (
            <div className="flex items-start gap-2 text-sm text-destructive p-4 bg-destructive/10 rounded-lg">
              <XCircle className="size-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Verification Failed</p>
                <p className="text-xs mt-1">{errorMessage}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={verificationState === "claiming"}
          >
            Cancel
          </Button>
          {verificationState === "success" ? (
            <Button onClick={handleAdd}>Add to List</Button>
          ) : verificationState === "claiming" ? (
            <Button disabled>
              <Loader2 className="size-4 animate-spin mr-2" />
              Adding...
            </Button>
          ) : verificationState === "error" ? (
            <Button onClick={() => setVerificationState("idle")} variant="outline">
              Try Again
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
