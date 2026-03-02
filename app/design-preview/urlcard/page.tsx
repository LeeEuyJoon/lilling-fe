"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, BarChart2, Trash2, Pencil, TrendingUp, Moon, Sun } from "lucide-react";

type Mode = "dark" | "light";

const FAKE_BARS = [2, 5, 3, 8, 6, 11, 9];

function MiniChart({ isDark }: { isDark: boolean }) {
  const max = Math.max(...FAKE_BARS);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {FAKE_BARS.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm ${isDark ? "bg-violet-500/60" : "bg-violet-400/60"}`}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

// ── A. 현재 스타일 개선 — 좌우 분리 (정보 | 차트) ─────────
function CardA({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  const card = isDark ? "bg-zinc-900 border-white/10 hover:border-violet-500/30" : "bg-white border-neutral-200 hover:border-violet-300";
  const inner = isDark ? "bg-white/4 border-white/8" : "bg-neutral-50 border-neutral-200";
  const t = isDark ? "text-white" : "text-neutral-900";
  const muted = isDark ? "text-white/40" : "text-neutral-400";
  const link = isDark ? "text-violet-400" : "text-violet-600";
  const chartCard = isDark ? "bg-white/4 border-white/8" : "bg-neutral-50 border-neutral-200";

  return (
    <div className={`border rounded-xl p-4 transition-all ${card}`}>
      <div className="flex items-stretch gap-3">
        {/* 왼쪽: URL 정보 */}
        <div className={`flex-1 min-w-0 border rounded-xl p-3 ${inner}`}>
          <div className="flex items-start gap-2.5">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-sm ${isDark ? "bg-white/10" : "bg-neutral-100"}`}>
              🔗
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={`text-sm font-black ${link}`}>lill.ing/BOOK3jP</span>
                <button className={`${muted} hover:text-current p-0.5 rounded`}><Copy size={12} /></button>
                <button className={`${muted} hover:text-current p-0.5 rounded`}><ExternalLink size={12} /></button>
              </div>
              <p className={`text-xs ${muted} truncate mb-2`}>https://notion.so/my-reading-list-2024</p>
              <div className={`border border-dashed rounded-lg px-2.5 py-1.5 text-xs ${muted} italic ${isDark ? "border-white/10" : "border-neutral-200"}`}>
                My reading list for 2025
              </div>
            </div>
          </div>
        </div>
        {/* 오른쪽: 차트 */}
        <div className={`w-28 shrink-0 border rounded-xl p-2.5 flex flex-col justify-between ${chartCard}`}>
          <div className={`text-xs font-black ${link} flex items-center gap-1`}>
            <BarChart2 size={12} /> 142
          </div>
          <MiniChart isDark={isDark} />
          <p className={`text-xs ${muted}`}>7-day clicks</p>
        </div>
      </div>
      {/* Footer */}
      <div className={`flex items-center justify-between mt-3 pt-3 border-t ${isDark ? "border-white/6" : "border-neutral-100"}`}>
        <p className={`text-xs ${muted}`}>Jan 15, 2025 · 142 clicks</p>
        <button className={`flex items-center gap-1 text-xs ${muted} hover:text-red-400`}>
          <Trash2 size={11} /> Delete
        </button>
      </div>
    </div>
  );
}

// ── B. 올인원 — 차트 없이 컴팩트 ────────────────────────────
function CardB({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  const card = isDark ? "bg-zinc-900 border-white/10 hover:border-violet-500/30" : "bg-white border-neutral-200 hover:border-violet-300";
  const t = isDark ? "text-white" : "text-neutral-900";
  const muted = isDark ? "text-white/40" : "text-neutral-400";
  const link = isDark ? "text-violet-400" : "text-violet-600";
  const descBorder = isDark ? "border-white/10" : "border-neutral-200";

  return (
    <div className={`border rounded-xl p-4 transition-all ${card}`}>
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm ${isDark ? "bg-white/10" : "bg-neutral-100"}`}>
          🔗
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`text-sm font-black ${link}`}>lill.ing/BOOK3jP</span>
            <button className={`${muted} p-0.5 rounded`}><Copy size={12} /></button>
            <button className={`${muted} p-0.5 rounded`}><ExternalLink size={12} /></button>
          </div>
          <p className={`text-xs ${muted} truncate mb-2`}>https://notion.so/my-reading-list-2024</p>
          <div className={`border border-dashed rounded-lg px-2.5 py-1.5 text-xs ${muted} italic ${descBorder}`}>
            My reading list for 2025
          </div>
        </div>
        {/* 우측 스탯 */}
        <div className="shrink-0 text-right">
          <div className={`flex items-center gap-1 font-black text-lg ${link}`}>
            <TrendingUp size={14} className="opacity-60" /> 142
          </div>
          <p className={`text-xs ${muted}`}>clicks</p>
        </div>
      </div>
      <div className={`flex items-center justify-between mt-3 pt-3 border-t ${isDark ? "border-white/6" : "border-neutral-100"}`}>
        <p className={`text-xs ${muted}`}>Jan 15, 2025</p>
        <button className={`flex items-center gap-1 text-xs ${muted} hover:text-red-400`}>
          <Trash2 size={11} /> Delete
        </button>
      </div>
    </div>
  );
}

// ── C. 가로 전체 + 인라인 차트 ───────────────────────────────
function CardC({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  const card = isDark ? "bg-zinc-900 border-white/10 hover:border-violet-500/30" : "bg-white border-neutral-200 hover:border-violet-300";
  const muted = isDark ? "text-white/40" : "text-neutral-400";
  const link = isDark ? "text-violet-400" : "text-violet-600";
  const descBorder = isDark ? "border-white/10 hover:border-white/20" : "border-neutral-200 hover:border-neutral-300";

  return (
    <div className={`border rounded-xl p-4 transition-all ${card}`}>
      {/* 상단 행: favicon + URL 정보 + 스탯 + 차트 */}
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm ${isDark ? "bg-white/10" : "bg-neutral-100"}`}>
          🔗
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-black ${link}`}>lill.ing/BOOK3jP</span>
            <button className={`${muted} p-0.5 rounded`}><Copy size={12} /></button>
            <button className={`${muted} p-0.5 rounded`}><ExternalLink size={12} /></button>
          </div>
          <p className={`text-xs ${muted} truncate`}>https://notion.so/my-reading-list-2024</p>
        </div>
        {/* 우측: 스탯 + 미니 차트 인라인 */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className={`text-lg font-black ${link}`}>142</p>
            <p className={`text-xs ${muted}`}>clicks</p>
          </div>
          <div className="w-16">
            <MiniChart isDark={isDark} />
          </div>
        </div>
      </div>
      {/* 설명 */}
      <div className={`mt-3 border border-dashed rounded-lg px-3 py-2 text-xs ${muted} italic ${descBorder} transition-colors cursor-pointer flex items-center justify-between group`}>
        <span>My reading list for 2025</span>
        <Pencil size={11} className="opacity-0 group-hover:opacity-40 transition-opacity" />
      </div>
      {/* 푸터 */}
      <div className={`flex items-center justify-between mt-3 pt-3 border-t ${isDark ? "border-white/6" : "border-neutral-100"}`}>
        <p className={`text-xs ${muted}`}>Jan 15, 2025</p>
        <button className={`flex items-center gap-1 text-xs ${muted} hover:text-red-400`}>
          <Trash2 size={11} /> Delete
        </button>
      </div>
    </div>
  );
}

const OPTIONS = [
  { id: "A", label: "좌우 분리 — 정보 패널 | 차트 패널 (현재 구조 개선)", comp: CardA },
  { id: "B", label: "컴팩트 — 차트 없이, 클릭 수만 표시", comp: CardB },
  { id: "C", label: "풀 와이드 — 인라인 미니 차트 + 설명 hover", comp: CardC },
];

export default function UrlCardPreview() {
  const [mode, setMode] = useState<Mode>("dark");

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">URL Card Options</h1>
            <p className="text-white/40 text-sm">My URLs 페이지 카드 3가지</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-zinc-900 border border-white/10 rounded-lg p-1">
              <button onClick={() => setMode("dark")} className={`text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${mode === "dark" ? "bg-white/10 text-white" : "text-white/40"}`}>
                <Moon size={11} /> Dark
              </button>
              <button onClick={() => setMode("light")} className={`text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${mode === "light" ? "bg-white/10 text-white" : "text-white/40"}`}>
                <Sun size={11} /> Light
              </button>
            </div>
            <Link href="/design-preview" className="text-xs text-white/30 hover:text-white/50">← back</Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {OPTIONS.map(({ id, label, comp: Comp }) => (
            <div key={id}>
              <p className="text-xs font-bold text-white/40 mb-2 uppercase tracking-widest">{id}. {label}</p>
              <Comp mode={mode} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
