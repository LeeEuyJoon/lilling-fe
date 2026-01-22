"use client";

import { Button } from "@/components/shadcn/button";
import { Trash2 } from "lucide-react";

interface UrlCardFooterProps {
  clickCount: number;
  createdAt: string;
  onDelete: () => void;
}

export default function UrlCardFooter({
  clickCount,
  createdAt,
  onDelete,
}: UrlCardFooterProps) {
  return (
    <div className="flex items-center justify-between mt-0 py-1">
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>{clickCount} clicks</span>
        <span>
          Created{" "}
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <Button variant="ghost" size="icon-sm" onClick={onDelete} title="Delete">
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
