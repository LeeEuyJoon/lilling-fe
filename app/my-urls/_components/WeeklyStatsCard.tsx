"use client";

import WeeklyStatsChart from "./WeeklyStatsChart";

interface WeeklyStatsCardProps {
  recentDailyStats: Array<{
    date: string;
    clickCount: number;
  }>;
}

export default function WeeklyStatsCard({
  recentDailyStats,
}: WeeklyStatsCardProps) {
  return (
    <div className="w-64 flex-shrink-0 border rounded-lg p-1 pt-3 bg-muted/20">
      <WeeklyStatsChart recentDailyStats={recentDailyStats} />
    </div>
  );
}
