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
        variant="outline"
        size="lg"
        className="border-primary/40 bg-primary/5 hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-all"
      >
        <Link2 className="size-5" />
        {isLoading ? "확인 중..." : "My URLs"}
      </Button>
    </div>
  );
}
