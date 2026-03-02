"use client";

import { Link2 } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="rounded-full p-5 mb-4 bg-neutral-100 dark:bg-white/5">
        <Link2 className="size-8 text-neutral-400 dark:text-white/30" />
      </div>
      <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-1">No URLs yet</h3>
      <p className="text-sm text-neutral-500 dark:text-white/40 text-center max-w-xs">
        Create a new short URL or add an existing one with the buttons above.
      </p>
    </div>
  );
}
