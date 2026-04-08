"use client";

import { UrlItem } from "@/lib/api";
import UrlInfoCard from "./UrlInfoCard";
import WeeklyStatsCard from "./WeeklyStatsCard";

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
    <div
      className="border-2 border-violet-400 rounded-xl p-4 transition-all
      bg-white hover:border-violet-300
      dark:bg-zinc-900 dark:border dark:hover:border-violet-500/30"
    >
      {/* Card body: left / right split */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {/* Left: URL info */}
        <UrlInfoCard
          url={url}
          onCopy={onCopy}
          onEdit={onEdit}
          clickCount={url.clickCount}
          createdAt={url.createdAt}
          onDelete={() => onDelete(url.id)}
        />

        {/* Right: chart panel */}
        {url.recentDailyStats && url.recentDailyStats.length > 0 && (
          <WeeklyStatsCard
            urlId={url.id}
            shortUrl={url.shortUrl}
            originalUrl={url.originalUrl}
            totalClickCount={url.clickCount}
            recentDailyStats={url.recentDailyStats}
          />
        )}
      </div>
    </div>
  );
}
