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

interface AddExistingUrlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddExistingUrlModal({
  open,
  onOpenChange,
}: AddExistingUrlModalProps) {
  const [existingShortCode, setExistingShortCode] = useState("");

  const handleAddExisting = () => {
    // TODO: Call add existing URL API
    console.log("Adding existing short code:", existingShortCode);
    onOpenChange(false);
    setExistingShortCode("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Existing Short URL</DialogTitle>
          <DialogDescription>
            Enter the short code of an existing shortened URL to add it to your
            list
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="abc123"
            value={existingShortCode}
            onChange={(e) => setExistingShortCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && existingShortCode.trim()) {
                handleAddExisting();
              }
            }}
            className="pl-10"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAddExisting}
            disabled={!existingShortCode.trim()}
          >
            Add URL
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
