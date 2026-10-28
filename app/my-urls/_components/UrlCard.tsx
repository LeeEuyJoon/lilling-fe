"use client";

import { useLayoutEffect, useRef, useState } from "react";
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
  const infoRef = useRef<HTMLDivElement>(null);
  const [infoHeight, setInfoHeight] = useState<number>();

  useLayoutEffect(() => {
    const el = infoRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height;
      if (h) setInfoHeight(h);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="border-2 border-violet-400 rounded-xl p-4 transition-all
      bg-white hover:border-violet-300
      dark:bg-zinc-900 dark:border dark:hover:border-violet-500/30"
    >
      {/* Card body: left / right split */}
      <div className="flex flex-col sm:flex-row items-start gap-3">
        {/* Left: URL info */}
        <div ref={infoRef} className="flex-1 min-w-0">
          <UrlInfoCard
            url={url}
            onCopy={onCopy}
            onEdit={onEdit}
            clickCount={url.clickCount}
            createdAt={url.createdAt}
            onDelete={() => onDelete(url.id)}
          />
        </div>

        {/* Right: chart panel */}
        {url.recentDailyStats && url.recentDailyStats.length > 0 && (
          <WeeklyStatsCard
            urlId={url.id}
            shortUrl={url.shortUrl}
            originalUrl={url.originalUrl}
            totalClickCount={url.clickCount}
            recentDailyStats={url.recentDailyStats}
            cardHeight={infoHeight}
          />
        )}
      </div>
    </div>
  );
}
