"use client";

import { useState } from "react";
import Link from "next/link";
import { Moon, Sun, User, ChevronRight } from "lucide-react";

type Mode = "dark" | "light";

// ── 옵션 정의 ──────────────────────────────────────────────
// A. 심플 — 로고 + 우측 (테마토글 + My URLs)
// B. 블러 글래스 — 배경 blur, 살짝 투명
// C. 플로팅 필 — 화면 상단에 떠있는 pill 모양
// D. 언더라인 없음 — border 완전 제거, 초미니멀

function PageShell({ mode, children }: { mode: Mode; children: React.ReactNode }) {
  const bg = mode === "dark" ? "bg-zinc-950" : "bg-neutral-50";
  const contentBg = mode === "dark" ? "bg-zinc-900/50" : "bg-neutral-200/50";
  return (
    <div className={`${bg} rounded-xl overflow-hidden`}>
      {children}
      {/* 페이지 콘텐츠 mock */}
      <div className="px-8 pt-10 pb-8">
        <div className={`h-3 ${contentBg} rounded-full w-48 mb-3`} />
        <div className={`h-3 ${contentBg} rounded-full w-72 mb-3`} />
        <div className={`h-3 ${contentBg} rounded-full w-36`} />
      </div>
    </div>
  );
}

// ── A. 심플 ──────────────────────────────────────────────
function NavA({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  return (
    <PageShell mode={mode}>
      <nav className={`
        flex items-center justify-between px-8 h-14
        border-b
        ${isDark ? "border-white/8" : "border-neutral-200"}
      `}>
        <span className={`text-base font-black ${isDark ? "text-white" : "text-neutral-900"}`}>
          lill<span className={isDark ? "text-violet-400" : "text-violet-600"}>.ing</span>
        </span>
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/8 text-white/50 hover:text-white/80" : "hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600"}`}>
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button className={`text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors
            ${isDark ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/40" : "bg-violet-600 hover:bg-violet-700 text-white"}
          `}>
            My URLs
          </button>
        </div>
      </nav>
    </PageShell>
  );
}

// ── B. 블러 글래스 ─────────────────────────────────────────
function NavB({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  return (
    <PageShell mode={mode}>
      <nav className={`
        flex items-center justify-between px-8 h-14
        backdrop-blur-md
        border-b
        ${isDark ? "bg-zinc-950/70 border-white/6" : "bg-neutral-50/80 border-neutral-200/70"}
      `}>
        <span className={`text-base font-black ${isDark ? "text-white" : "text-neutral-900"}`}>
          lill<span className={isDark ? "text-violet-400" : "text-violet-600"}>.ing</span>
        </span>
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/8 text-white/50" : "hover:bg-black/5 text-neutral-400"}`}>
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button className={`text-sm font-semibold px-4 py-1.5 rounded-lg
            ${isDark ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/40" : "bg-violet-600 hover:bg-violet-700 text-white"}
          `}>
            My URLs
          </button>
        </div>
      </nav>
    </PageShell>
  );
}

// ── C. 플로팅 필 ───────────────────────────────────────────
function NavC({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  return (
    <PageShell mode={mode}>
      <div className="px-8 pt-4 pb-0">
        <nav className={`
          flex items-center justify-between px-5 h-11
          rounded-xl border backdrop-blur-sm
          ${isDark
            ? "bg-zinc-900/80 border-white/10"
            : "bg-white/90 border-neutral-200 shadow-sm"}
        `}>
          <span className={`text-sm font-black ${isDark ? "text-white" : "text-neutral-900"}`}>
            lill<span className={isDark ? "text-violet-400" : "text-violet-600"}>.ing</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button className={`p-1.5 rounded-md transition-colors ${isDark ? "hover:bg-white/8 text-white/50" : "hover:bg-neutral-100 text-neutral-400"}`}>
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1
              ${isDark ? "bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-900/40" : "bg-violet-600 hover:bg-violet-700 text-white"}
            `}>
              My URLs <ChevronRight size={12} />
            </button>
          </div>
        </nav>
      </div>
    </PageShell>
  );
}

// ── D. 울트라 미니멀 (border 없음) ─────────────────────────
function NavD({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  return (
    <PageShell mode={mode}>
      <nav className="flex items-center justify-between px-8 h-14">
        <span className={`text-base font-black ${isDark ? "text-white" : "text-neutral-900"}`}>
          lill<span className={isDark ? "text-violet-400" : "text-violet-600"}>.ing</span>
        </span>
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-lg transition-colors ${isDark ? "text-white/30 hover:text-white/60" : "text-neutral-300 hover:text-neutral-500"}`}>
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button className={`text-sm font-semibold px-4 py-1.5 rounded-lg border transition-colors
            ${isDark
              ? "border-white/15 text-white/70 hover:border-violet-500/50 hover:text-white hover:bg-violet-500/10"
              : "border-neutral-300 text-neutral-600 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50"}
          `}>
            My URLs
          </button>
        </div>
      </nav>
    </PageShell>
  );
}

const OPTIONS = [
  { id: "A", label: "심플 (border-b)", comp: NavA },
  { id: "B", label: "블러 글래스 (sticky용)", comp: NavB },
  { id: "C", label: "플로팅 필", comp: NavC },
  { id: "D", label: "울트라 미니멀 (border 없음)", comp: NavD },
];

export default function NavbarPreview() {
  const [mode, setMode] = useState<Mode>("dark");

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">Navbar Options</h1>
            <p className="text-white/40 text-sm">스타일 4가지 × 다크/라이트</p>
          </div>
          <div className="flex items-center gap-3">
            {/* 모드 토글 */}
            <div className="flex gap-1 bg-zinc-900 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setMode("dark")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${mode === "dark" ? "bg-white/10 text-white" : "text-white/40"}`}
              >
                <Moon size={11} /> Dark
              </button>
              <button
                onClick={() => setMode("light")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${mode === "light" ? "bg-white/10 text-white" : "text-white/40"}`}
              >
                <Sun size={11} /> Light
              </button>
            </div>
            <Link href="/design-preview" className="text-xs text-white/30 hover:text-white/50">← back</Link>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-5">
          {OPTIONS.map(({ id, label, comp: Comp }) => (
            <div key={id}>
              <p className="text-xs font-bold text-white/40 mb-2 uppercase tracking-widest">
                {id}. {label}
              </p>
              <Comp mode={mode} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
