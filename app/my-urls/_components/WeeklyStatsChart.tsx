"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface WeeklyStatsChartProps {
  recentDailyStats: Array<{
    date: string; // ISO date format (YYYY-MM-DD)
    clickCount: number;
  }>;
}

export default function WeeklyStatsChart({
  recentDailyStats,
}: WeeklyStatsChartProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const labelColor = isDark ? "rgba(255,255,255,0.35)" : "#64748b";
  const gridColor = isDark ? "rgba(255,255,255,0.07)" : "#e2e8f0";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const categories = recentDailyStats.map((stat) => formatDate(stat.date));
  const data = recentDailyStats.map((stat) => stat.clickCount);

  const series = [{ name: "Clicks", data }];

  const options: ApexOptions = {
    chart: {
      type: "line",
      sparkline: { enabled: false },
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#7c3aed"],
    xaxis: {
      categories,
      labels: {
        style: { fontSize: "11px", colors: labelColor },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: "11px", colors: labelColor },
        formatter: (value) => Math.floor(value).toString(),
      },
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: -10, right: 10, bottom: 0, left: 10 },
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
  };

  return (
    <div className="w-full">
      <Chart options={options} series={series} type="line" height={100} />
    </div>
  );
}
