"use client";

import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddExistingUrlModal from "./AddExistingUrlModal";
import CreateUrlModal from "./CreateUrlModal";
import { UrlItem } from "@/lib/dummyData";

interface MyUrlsActionsProps {
  onAddUrl: (url: UrlItem) => void;
}

export default function MyUrlsActions({ onAddUrl }: MyUrlsActionsProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddExistingModalOpen, setIsAddExistingModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button variant="default" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="size-4" />
          Create New
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsAddExistingModalOpen(true)}
        >
          Add Existing URL
        </Button>
      </div>

      {/* Modals */}
      <CreateUrlModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
      <AddExistingUrlModal
        open={isAddExistingModalOpen}
        onOpenChange={setIsAddExistingModalOpen}
        onAdd={onAddUrl}
      />
    </>
  );
}
