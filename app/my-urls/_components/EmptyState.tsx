"use client";

import { Link2 } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Link2 className="size-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No URLs yet</h3>
      <p className="text-muted-foreground text-center max-w-sm">
        Get started by creating a new short URL or adding an existing one using
        the buttons above.
      </p>
    </div>
  );
}
