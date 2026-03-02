"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import AddExistingUrlModal from "./AddExistingUrlModal";
import CreateUrlModal from "./CreateUrlModal";

interface MyUrlsActionsProps {
  onAddUrl: () => void;
}

export default function MyUrlsActions({ onAddUrl }: MyUrlsActionsProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddExistingModalOpen, setIsAddExistingModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 text-sm font-bold px-3.5 py-2 rounded-lg transition-colors
            bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-900/20 dark:shadow-violet-900/40"
        >
          <Plus size={14} />
          Create New
        </button>
        <button
          onClick={() => setIsAddExistingModalOpen(true)}
          className="flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-lg border transition-colors
            bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-400 hover:text-neutral-800
            dark:bg-zinc-900 dark:border-white/10 dark:text-white/70 dark:hover:bg-zinc-800 dark:hover:border-white/20"
        >
          Add Existing
        </button>
      </div>

      <CreateUrlModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSuccess={onAddUrl}
      />
      <AddExistingUrlModal
        open={isAddExistingModalOpen}
        onOpenChange={setIsAddExistingModalOpen}
        onAdd={onAddUrl}
      />
    </>
  );
}
