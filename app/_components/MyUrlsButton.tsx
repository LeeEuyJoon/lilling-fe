"use client";

import {
  ArrowRight,
  BarChart2,
  Link2,
  MousePointerClick,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import MyUrlsFeature from "./MyUrlsFeature";

const FAKE_BARS = [3, 7, 5, 12, 8, 15, 11, 19, 14, 22, 17, 26, 20, 30];

function MiniBarChart() {
  const max = Math.max(...FAKE_BARS);
  return (
    <div className="flex items-end gap-[3px] h-12">
      {FAKE_BARS.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-violet-400/40 dark:bg-violet-400/30"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

export default function MyUrlsButton() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/my-urls");
    } else {
      login("/my-urls");
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full text-left rounded-xl border-2 overflow-hidden transition-all group
            cursor-pointer
            bg-white border-violet-600 
            hover:border-violet-300 hover:bg-violet-50
            dark:bg-zinc-900
            dark:hover:border-violet-500/40 dark:hover:bg-violet-900/20"
      >
        {/* Top section */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
          {/* Left: text */}
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles
                size={13}
                className="text-violet-500 dark:text-violet-400"
              />
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                My URLs
              </span>
            </div>
            <p className="text-lg font-black text-neutral-900 dark:text-white leading-tight">
              단축 링크를 관리하고
              <br />
              클릭 통계를 확인하세요
            </p>
          </div>

          {/* Right: arrow */}
          <div
            className="shrink-0 mt-1 p-2 rounded-lg transition-colors
            bg-violet-100 dark:bg-violet-500/15
            group-hover:bg-violet-200 dark:group-hover:bg-violet-500/25"
          >
            <ArrowRight
              size={16}
              className="text-violet-600 dark:text-violet-400 transition-transform group-hover:translate-x-0.5"
            />
          </div>
        </div>

        {/* Feature pills */}
        <div className="pb-4 flex items-center gap-2 flex-wrap">
          <div className="px-6 pb-4 flex items-center gap-2 flex-wrap">
            <MyUrlsFeature icon={Link2} label="URL 관리" />
            <MyUrlsFeature icon={MousePointerClick} label="클릭 통계" />
            <MyUrlsFeature
              icon={BarChart2}
              label="시간·일·주·월 별 차트 분석"
            />
          </div>
        </div>

        {/* Bottom: decorative chart bar */}
        <div className="px-6 pb-5">
          <MiniBarChart />
        </div>
      </button>
    </div>
  );
}
