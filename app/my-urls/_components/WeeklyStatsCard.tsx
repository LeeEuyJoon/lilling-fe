"use client";

import { useState } from "react";
import WeeklyStatsChart from "./WeeklyStatsChart";
import { ChartBarIcon } from "lucide-react";
import AnalyticsModal from "./AnalyticsModal";
import { api, type UrlAnalyticsResponse } from "@/lib/api";
import { toast } from "sonner";

interface WeeklyStatsCardProps {
  urlId: string;
  shortUrl: string;
  totalClickCount: number;
  recentDailyStats: Array<{
    date: string;
    clickCount: number;
  }>;
}

export default function WeeklyStatsCard({
  urlId,
  shortUrl,
  totalClickCount,
  recentDailyStats,
}: WeeklyStatsCardProps) {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsData, setAnalyticsData] =
    useState<UrlAnalyticsResponse | null>(null);

  // 모달이 열릴 때 분석 데이터 가져오기
  const handleOpenAnalytics = async () => {
    setShowAnalytics(true);

    // 이미 데이터를 가져왔으면 다시 가져오지 않음
    if (analyticsData) {
      return;
    }

    try {
      const data = await api.myUrls.analytics(urlId);
      setAnalyticsData(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      toast.error("통계 데이터를 불러오는데 실패했습니다.");
      setShowAnalytics(false);
    }
  };

  return (
    <>
      <div
        className="w-64 shrink-0 border rounded-lg p-1 pt-3 bg-muted/20 relative group cursor-pointer"
        onClick={handleOpenAnalytics}
      >
        <WeeklyStatsChart recentDailyStats={recentDailyStats} />

        {/* 안내 텍스트 - 우측 상단에 항상 표시 */}
        <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-muted-foreground pointer-events-none">
          <ChartBarIcon className="size-3.5" />
          <span>통계 상세 보기</span>
        </div>

        {/* hover 효과 - 전체 오버레이 */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <ChartBarIcon className="size-5" />
            <span>상세 보기</span>
          </div>
        </div>
      </div>

      <AnalyticsModal
        open={showAnalytics}
        onOpenChange={setShowAnalytics}
        shortUrl={shortUrl}
        totalClickCount={totalClickCount}
        analyticsData={analyticsData}
      />
    </>
  );
}
