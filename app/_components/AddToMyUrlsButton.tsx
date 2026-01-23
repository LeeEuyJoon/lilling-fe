"use client";

import { Button } from "@/components/shadcn/button";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

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
        // Logged in: just redirect
        router.push("/my-urls");
      } else {
        // Not logged in: save and login
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
    <Button
      onClick={handleAddToMyUrls}
      disabled={isAdding}
      variant="outline"
      className="w-full border-black hover:bg-gray-300 transition-colors"
    >
      {isAdding ? "Adding..." : "Add to My URLs"}
    </Button>
  );
}
