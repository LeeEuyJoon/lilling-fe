"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    type: "area",
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: false },
    background: "transparent",
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.35,
      opacityTo: 0.05,
      stops: [0, 90, 100],
    },
  },
  colors: ["#3b82f6"],
  tooltip: { enabled: false },
  xaxis: {
    categories: [
      "1/4",
      "1/5",
      "1/6",
      "1/7",
      "1/8",
      "1/9",
      "1/10",
      "1/11",
      "1/12",
      "1/13",
      "1/14",
      "1/15",
    ],
    labels: {
      show: true,
      style: { fontSize: "11px", colors: "#94a3b8" },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      show: true,
      style: { fontSize: "11px", colors: "#94a3b8" },
      formatter: (v) => String(Math.floor(v)),
    },
  },
  grid: {
    borderColor: "#cbd5e1",
    strokeDashArray: 3,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } },
    padding: { top: 0, right: 16, bottom: 0, left: 8 },
  },
  annotations: {
    xaxis: [
      { x: "1/8", borderColor: "#94a3b8", strokeDashArray: 0, borderWidth: 1 },
      { x: "1/12", borderColor: "#94a3b8", strokeDashArray: 0, borderWidth: 1 },
    ],
  },
};

const chartSeries = [
  {
    name: "클릭 수",
    data: [3, 7, 5, 12, 8, 18, 14, 22, 17, 28, 20, 30],
  },
];

export default function MyUrlsPreviewChart() {
  return (
    <div className="pointer-events-none select-none">
      <Chart
        type="area"
        options={chartOptions}
        series={chartSeries}
        height={280}
        width="100%"
      />
    </div>
  );
}
