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
import { Link2 } from "lucide-react";
import { useState } from "react";

interface CreateUrlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateUrlModal({
  open,
  onOpenChange,
}: CreateUrlModalProps) {
  const [urlInput, setUrlInput] = useState("");

  const handleShorten = () => {
    // TODO: Call shorten API
    console.log("Shortening URL:", urlInput);
    onOpenChange(false);
    setUrlInput("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              if (e.key === "Enter" && urlInput.trim()) {
                handleShorten();
              }
            }}
            className="pl-10"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleShorten} disabled={!urlInput.trim()}>
            Shorten URL
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
