"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { ExternalLink } from "lucide-react";

interface AddToMyUrlsButtonProps {
  shortUrl: string;
}

export default function AddToMyUrlsButton({ shortUrl }: AddToMyUrlsButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAddToMyUrls = async () => {
    setIsAdding(true);

    try {
      if (isAuthenticated) {
        router.push("/my-urls");
      } else {
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
    <button
      onClick={handleAddToMyUrls}
      disabled={isAdding}
      className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors disabled:opacity-50"
    >
      <ExternalLink size={13} />
      {isAdding ? "Adding..." : "View in My URLs"}
    </button>
  );
}
