"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
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
  loading: () => <div className="h-[350px] flex items-center justify-center">차트 로딩 중...</div>
});

type TimeUnit = "hourly" | "daily" | "weekly" | "monthly";

interface AnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortUrl: string;
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

export default function AnalyticsModal({
  open,
  onOpenChange,
  shortUrl,
  analyticsData,
}: AnalyticsModalProps) {
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("daily");

  // 데이터가 없는 경우
  if (!analyticsData) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>클릭 통계 상세</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">{shortUrl}</p>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">통계 데이터를 불러오는 중...</p>
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
    colors: ["#3b82f6"],
    xaxis: {
      categories: labels,
      labels: {
        style: {
          fontSize: "12px",
          colors: "#64748b",
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
          colors: "#64748b",
        },
        formatter: (value) => Math.floor(value).toString(),
      },
    },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 3,
    },
    tooltip: {
      enabled: true,
      theme: "light",
      y: {
        formatter: (value) => `${value} 클릭`,
      },
    },
    // 시간별 차트에서 00시에 세로선 표시 (날짜 구분)
    annotations: timeUnit === "hourly" ? {
      xaxis: midnightIndices.map((index) => ({
        x: labels[index],
        borderColor: "#374151",
        strokeDashArray: 4,
      })),
    } : undefined,
  };

  // 통계 계산
  const totalClicks = values.reduce((sum, value) => sum + value, 0);
  const avgClicks = values.length > 0 ? totalClicks / values.length : 0;
  const maxClicks = values.length > 0 ? Math.max(...values) : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>클릭 통계 상세</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">{shortUrl}</p>
        </DialogHeader>

        <div className="space-y-4">
          {/* 시간 단위 선택 버튼 */}
          <div className="flex gap-2">
            <Button
              variant={timeUnit === "hourly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeUnit("hourly")}
            >
              시간
            </Button>
            <Button
              variant={timeUnit === "daily" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeUnit("daily")}
            >
              일
            </Button>
            <Button
              variant={timeUnit === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeUnit("weekly")}
            >
              주
            </Button>
            <Button
              variant={timeUnit === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeUnit("monthly")}
            >
              월
            </Button>
          </div>

          {/* 차트 */}
          <div className="border rounded-lg p-4 bg-card">
            <Chart
              key={timeUnit}
              options={options}
              series={series}
              type="area"
              height={350}
            />
          </div>

          {/* 통계 요약 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">총 클릭 수</p>
              <p className="text-2xl font-bold mt-1">
                {totalClicks.toLocaleString()}
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">평균 클릭 수</p>
              <p className="text-2xl font-bold mt-1">{avgClicks.toFixed(1)}</p>
            </div>
            <div className="border rounded-lg p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground">최대 클릭 수</p>
              <p className="text-2xl font-bold mt-1">
                {maxClicks.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
