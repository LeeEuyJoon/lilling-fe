"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import {
  type UrlAnalyticsResponse,
  type HourlyDataPoint,
  type DailyDataPoint,
  type WeeklyDataPoint,
  type MonthlyDataPoint,
} from "@/lib/api";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] flex items-center justify-center">
      <span className="text-neutral-400 dark:text-white/30 text-sm">
        차트 로딩 중...
      </span>
    </div>
  ),
});

type TimeUnit = "hourly" | "daily" | "weekly" | "monthly";

interface AnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortUrl: string;
  originalUrl: string;
  totalClickCount: number;
  analyticsData: UrlAnalyticsResponse | null;
}

/**
 * 시간 단위와 데이터 포인트 타입에 따라 레이블 포맷팅
 */
function formatLabel(
  timeUnit: TimeUnit,
  dataPoint: HourlyDataPoint | DailyDataPoint | WeeklyDataPoint | MonthlyDataPoint
): string {
  if (timeUnit === "hourly") {
    // "2025-01-26T00:00:00" -> "00:00"
    const timestamp = (dataPoint as HourlyDataPoint).timestamp;
    const hour = new Date(timestamp).getHours();
    return `${hour.toString().padStart(2, '0')}:00`;
  } else if (timeUnit === "daily") {
    // "2025-01-26" -> "01/26"
    const date = (dataPoint as DailyDataPoint).date;
    const [, month, day] = date.split("-");
    return `${month}/${day}`;
  } else if (timeUnit === "weekly") {
    // "2025-01-20" -> "01/20"
    const weekStart = (dataPoint as WeeklyDataPoint).weekStart;
    const [, month, day] = weekStart.split("-");
    return `${month}/${day}`;
  } else {
    // "2025-01" -> "2025/01"
    const yearMonth = (dataPoint as MonthlyDataPoint).yearMonth;
    const [year, month] = yearMonth.split("-");
    return `${year}/${month}`;
  }
}

const TIME_UNIT_LABELS: { value: TimeUnit; label: string }[] = [
  { value: "hourly", label: "시간" },
  { value: "daily", label: "일" },
  { value: "weekly", label: "주" },
  { value: "monthly", label: "월" },
];

export default function AnalyticsModal({
  open,
  onOpenChange,
  shortUrl,
  originalUrl,
  totalClickCount,
  analyticsData,
}: AnalyticsModalProps) {
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("daily");
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

  const getFaviconUrl = (urlString: string) => {
    try {
      const domain = new URL(urlString).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return "";
    }
  };

  const labelColor = isDark ? "rgba(255,255,255,0.35)" : "#64748b";
  const gridColor = isDark ? "rgba(255,255,255,0.07)" : "#e2e8f0";
  const tooltipTheme = isDark ? "dark" : "light";

  // 데이터가 없는 경우
  if (!analyticsData) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-5xl w-[calc(100vw-2rem)] sm:w-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <img
                src={getFaviconUrl(originalUrl)}
                alt="favicon"
                className="w-6 h-6 shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <DialogTitle className="text-lg font-black text-neutral-900 dark:text-white">
                {shortUrl}
              </DialogTitle>
            </div>
            <p className="text-xs text-neutral-400 dark:text-white/30 truncate mt-1">
              {originalUrl}
            </p>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <p className="text-neutral-400 dark:text-white/30 text-sm">
              통계 데이터를 불러오는 중...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // 현재 시간 단위의 시계열 데이터 가져오기
  const currentTimeSeries = analyticsData[timeUnit];
  const currentData = currentTimeSeries.data;

  // 레이블과 값 추출
  const labels = currentData.map((dataPoint) =>
    formatLabel(timeUnit, dataPoint)
  );
  const values = currentData.map((dataPoint) => dataPoint.clickCount);

  // 시간별 차트에서 00:00 지점 찾기 (날짜 구분선)
  const midnightIndices: number[] = [];
  if (timeUnit === "hourly") {
    currentData.forEach((dataPoint, index) => {
      const timestamp = (dataPoint as HourlyDataPoint).timestamp;
      const hour = new Date(timestamp).getHours();
      if (hour === 0 && index > 0) {
        // 첫 번째가 아니면서 00시인 경우
        midnightIndices.push(index);
      }
    });
  }

  const series = [
    {
      name: "클릭 수",
      data: values,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    colors: ["#7c3aed"],
    xaxis: {
      categories: labels,
      labels: {
        style: {
          fontSize: "12px",
          colors: labelColor,
        },
        rotate: 0,
        // 레이블을 간격을 두고 표시
        showDuplicates: false,
        hideOverlappingLabels: true,
      },
      // 시간 단위에 따라 표시할 틱(레이블) 개수 조정
      tickAmount: timeUnit === "hourly" ? 8 : timeUnit === "daily" ? 6 : timeUnit === "weekly" ? 12 : 12,
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
          fontSize: "12px",
          colors: labelColor,
        },
        formatter: (value) => Math.floor(value).toString(),
      },
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 3,
    },
    tooltip: {
      enabled: true,
      theme: tooltipTheme,
      y: {
        formatter: (value) => `${value} 클릭`,
      },
    },
    // 시간별 차트에서 00시에 세로선 표시 (날짜 구분)
    annotations: timeUnit === "hourly" ? {
      xaxis: midnightIndices.map((index) => ({
        x: labels[index],
        borderColor: isDark ? "rgba(255,255,255,0.3)" : "#374151",
        strokeDashArray: 4,
      })),
    } : undefined,
  };

  // 통계 계산
  const periodClicks = values.reduce((sum, value) => sum + value, 0);
  const avgClicks = values.length > 0 ? periodClicks / values.length : 0;
  const maxClicks = values.length > 0 ? Math.max(...values) : 0;

  // 시간 단위에 따른 기간 텍스트
  const getPeriodText = () => {
    switch (timeUnit) {
      case "hourly":
        return "최근 24시간";
      case "daily":
        return "최근 30일";
      case "weekly":
        return "최근 12주";
      case "monthly":
        return "최근 12개월";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90svh] overflow-y-auto w-[calc(100vw-2rem)] sm:w-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <img
              src={getFaviconUrl(originalUrl)}
              alt="favicon"
              className="w-6 h-6 shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <DialogTitle className="text-lg font-black text-neutral-900 dark:text-white">
              {shortUrl}
            </DialogTitle>
          </div>
          <p className="text-xs text-neutral-400 dark:text-white/30 truncate mt-1">
            {originalUrl}
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* 시간 단위 선택 - 커스텀 pill 탭 */}
          <div className="flex gap-1 p-1 rounded-lg bg-neutral-100 dark:bg-white/5 w-fit">
            {TIME_UNIT_LABELS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTimeUnit(value)}
                className={[
                  "px-3 py-1 rounded-md text-sm font-medium transition-all duration-150",
                  timeUnit === value
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700 dark:text-white/40 dark:hover:text-white/70",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 차트 */}
          <div className="bg-neutral-50 dark:bg-white/3 rounded-xl px-2 pt-2">
            <Chart
              key={`${timeUnit}-${isDark}`}
              options={options}
              series={series}
              type="area"
              height={250}
              width="100%"
            />
          </div>

          {/* 통계 요약 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* 전체 클릭 수 - 바이올렛 강조 */}
            <div className="rounded-xl p-4 border border-violet-200 dark:border-violet-500/20 bg-violet-50 dark:bg-violet-500/5">
              <p className="text-xs text-neutral-500 dark:text-white/40">전체 클릭 수</p>
              <p className="text-xl sm:text-2xl font-black text-violet-700 dark:text-violet-400 mt-1">
                {totalClickCount.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl p-4 border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/4">
              <p className="text-xs text-neutral-500 dark:text-white/40">{getPeriodText()}의 총 클릭</p>
              <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mt-1">
                {periodClicks.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl p-4 border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/4">
              <p className="text-xs text-neutral-500 dark:text-white/40">{getPeriodText()}의 평균</p>
              <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mt-1">
                {avgClicks.toFixed(1)}
              </p>
            </div>
            <div className="rounded-xl p-4 border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/4">
              <p className="text-xs text-neutral-500 dark:text-white/40">{getPeriodText()}의 최대</p>
              <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mt-1">
                {maxClicks.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
