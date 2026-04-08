"use client";

import { useState } from "react";
import WeeklyStatsChart from "./WeeklyStatsChart";
import { BarChart2, TrendingUp } from "lucide-react";
import AnalyticsModal from "./AnalyticsModal";
import { useUrlAnalytics } from "@/lib/queries/url.queries";
import { toast } from "sonner";

interface WeeklyStatsCardProps {
  urlId: string;
  shortUrl: string;
  originalUrl: string;
  totalClickCount: number;
  recentDailyStats: Array<{
    date: string;
    clickCount: number;
  }>;
}

export default function WeeklyStatsCard({
  urlId,
  shortUrl,
  originalUrl,
  totalClickCount,
  recentDailyStats,
}: WeeklyStatsCardProps) {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const { data: analyticsData, error } = useUrlAnalytics(urlId, showAnalytics);

  // Show toast on fetch error (only when modal is open)
  if (error && showAnalytics) {
    toast.error("통계 데이터를 불러오는데 실패했습니다.");
  }

  const handleOpenAnalytics = () => {
    setShowAnalytics(true);
  };

  return (
    <>
      <div
        className="w-full sm:w-56 sm:shrink-0 border rounded-xl px-2 pt-1.5 pb-1 flex flex-col gap-0 cursor-pointer group transition-colors min-h-0
          bg-neutral-50 border-neutral-200 hover:border-violet-300
          dark:bg-white/4 dark:border-white/8 dark:hover:border-violet-500/30"
        onClick={handleOpenAnalytics}
      >
        {/* Top row: click count + 통계 상세 보기 */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1 text-xs font-black text-violet-600 dark:text-violet-400">
            <BarChart2 size={12} />
            {totalClickCount}
          </div>
          <div className="flex items-center gap-0.5 text-[10px] text-neutral-400 dark:text-white/30 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
            <TrendingUp size={10} />
            <span>통계 상세 보기</span>
          </div>
        </div>

        {/* Chart */}
        <WeeklyStatsChart recentDailyStats={recentDailyStats} />
      </div>

      <AnalyticsModal
        open={showAnalytics}
        onOpenChange={setShowAnalytics}
        shortUrl={shortUrl}
        originalUrl={originalUrl}
        totalClickCount={totalClickCount}
        analyticsData={analyticsData ?? null}
      />
    </>
  );
}
