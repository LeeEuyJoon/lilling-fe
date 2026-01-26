"use client";

import { UrlItem } from "@/lib/api";
import UrlInfoCard from "./UrlInfoCard";
import WeeklyStatsCard from "./WeeklyStatsCard";
import UrlCardFooter from "./UrlCardFooter";

interface UrlCardProps {
  url: UrlItem;
  onCopy: (shortUrl: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
}

export default function UrlCard({
  url,
  onCopy,
  onEdit,
  onDelete,
}: UrlCardProps) {
  return (
    <div className="border rounded-lg p-4 pb-1 bg-card shadow-sm hover:shadow-md transition-all">
      {/* 카드 */}
      <div className="flex items-stretch gap-4">
        {/* 왼쪽 카드: URL 정보 */}
        <UrlInfoCard url={url} onCopy={onCopy} onEdit={onEdit} />

        {/* 오른쪽 카드: 차트 */}
        {url.recentDailyStats && url.recentDailyStats.length > 0 && (
          <WeeklyStatsCard
            urlId={url.id}
            shortUrl={url.shortUrl}
            totalClickCount={url.clickCount}
            recentDailyStats={url.recentDailyStats}
          />
        )}
      </div>

      {/* 푸터 */}
      <UrlCardFooter
        clickCount={url.clickCount}
        createdAt={url.createdAt}
        onDelete={() => onDelete(url.id)}
      />
    </div>
  );
}
