"use client";

import { Button } from "@/components/shadcn/button";
import { BarChart2, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import MyUrlsPreviewChart from "@/app/_components/MyUrlsPreviewChart";

export default function MyUrlsButton() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/my-urls");
    } else {
      login("/my-urls");
    }
  };

  return (
    <div className="mt-16 mb-4 relative rounded-xl overflow-hidden bg-primary/5 border border-primary/25 shadow-sm">
      {/* Background chart — decorative only, no pointer events */}
      <MyUrlsPreviewChart />

      {/* Button centered on top of chart */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={handleClick}
          className="border-primary/40 bg-background/20 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-all h-auto py-3 flex-col gap-1"
        >
          <span className="flex items-center gap-2">
            <Link2 className="size-5" />
            {isLoading ? "확인 중..." : "My URLs"}
          </span>
          <span className="flex items-center gap-1 opacity-70 text-xs font-normal">
            <BarChart2 className="size-3" />
            클릭 통계 · 차트 분석
          </span>
        </Button>
      </div>
    </div>
  );
}
