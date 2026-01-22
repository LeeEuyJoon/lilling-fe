"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

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
  // 날짜 포맷팅: "2025-01-15" -> "1/15"
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 차트 데이터 준비
  const categories = recentDailyStats.map((stat) => formatDate(stat.date));
  const data = recentDailyStats.map((stat) => stat.clickCount);

  const series = [
    {
      name: "Clicks",
      data: data,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 100,
      sparkline: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#3b82f6"],
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "11px",
          colors: "#64748b",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          colors: "#64748b",
        },
        formatter: (value) => Math.floor(value).toString(),
      },
    },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10,
      },
    },
    tooltip: {
      enabled: true,
      theme: "light",
      x: {
        show: true,
      },
      y: {
        formatter: (value) => `${value} clicks`,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="w-full">
      <Chart options={options} series={series} type="line" height={100} />
    </div>
  );
}
