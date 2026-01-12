"use client";

import { Button } from "@/components/shadcn/button";
import { Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function MyUrlsButton() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/my-urls");
    } else {
      // 로그인 후 /my-urls로 리다이렉트하도록 설정
      login("/my-urls");
    }
  };

  return (
    <div className="flex justify-center mt-16 mb-4">
      <Button
        onClick={handleClick}
        variant="outline"
        size="lg"
        disabled={isLoading}
        className="text-base font-semibold shadow-sm hover:shadow-md transition-all"
      >
        <Link2 className="size-5" />
        {isLoading ? "확인 중..." : "My URLs"}
      </Button>
    </div>
  );
}
