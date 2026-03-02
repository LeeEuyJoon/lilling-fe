"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ChevronRight, Moon, Sun, BarChart2, ArrowRight } from "lucide-react";

type Mode = "dark" | "light";

function FloatingNav({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  return (
    <div className="px-6 pt-4 pb-0">
      <nav className={`flex items-center justify-between px-5 h-11 rounded-xl border backdrop-blur-sm
        ${isDark ? "bg-zinc-900/80 border-white/10" : "bg-white/90 border-neutral-200 shadow-sm"}`}>
        <span className={`text-sm font-black ${isDark ? "text-white" : "text-neutral-900"}`}>
          lill<span className={isDark ? "text-violet-400" : "text-violet-600"}>.ing</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button className={`p-1.5 rounded-md ${isDark ? "text-white/40 hover:text-white/70 hover:bg-white/8" : "text-neutral-400 hover:bg-neutral-100"}`}>
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>
          <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1
            ${isDark ? "bg-violet-600 text-white shadow-md shadow-violet-900/40" : "bg-violet-600 text-white"}`}>
            My URLs <ChevronRight size={11} />
          </button>
        </div>
      </nav>
    </div>
  );
}

// ── A. 중앙 정렬 Hero + 폼 ─────────────────────────────────
function HomeA({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  const t = isDark ? "text-white" : "text-neutral-900";
  const muted = isDark ? "text-white/40" : "text-neutral-500";
  const surface = isDark ? "bg-white/5 border-white/10" : "bg-neutral-100 border-neutral-200";
  const input = isDark ? "bg-white/5 border-white/10 text-white/30" : "bg-white border-neutral-300 text-neutral-400";

  return (
    <div className={`${isDark ? "bg-zinc-950" : "bg-neutral-50"} rounded-xl overflow-hidden`}>
      <FloatingNav mode={mode} />
      <main className="flex flex-col items-center text-center px-8 pt-16 pb-10">
        {/* Badge */}
        <div className={`inline-flex items-center gap-1.5 border text-xs font-semibold px-3 py-1 rounded-full mb-6
          ${isDark ? "bg-violet-500/10 border-violet-500/30 text-violet-300" : "bg-violet-50 border-violet-200 text-violet-700"}`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? "bg-violet-400" : "bg-violet-500"}`} />
          Now with keyword URLs
        </div>
        {/* Title */}
        <h1 className={`text-5xl font-black tracking-tight leading-tight mb-3 ${t}`}>
          Shorten.<br />
          <span className={`text-transparent bg-clip-text bg-linear-to-r ${isDark ? "from-violet-400 to-fuchsia-400" : "from-violet-600 to-fuchsia-600"}`}>
            Share.
          </span>
        </h1>
        <p className={`text-base mb-8 ${muted}`}>
          Transform long URLs into sharp, memorable links.
        </p>
        {/* Form */}
        <div className={`w-full max-w-md border rounded-xl p-4 ${surface}`}>
          <div className="flex gap-2 mb-3">
            <div className={`flex-1 border rounded-lg px-3 py-2.5 text-sm ${input} truncate`}>
              https://example.com/very/long/url...
            </div>
            <button className={`text-sm font-bold px-5 py-2.5 rounded-lg shrink-0 text-white
              ${isDark ? "bg-violet-600 shadow-lg shadow-violet-900/40" : "bg-violet-600"}`}>
              Convert
            </button>
          </div>
          <button className={`flex items-center gap-1 text-xs font-semibold ${isDark ? "text-violet-400" : "text-violet-600"}`}>
            <Plus size={11} /> Include a keyword
          </button>
        </div>
        {/* Stats */}
        <div className="flex gap-6 mt-8">
          {[{ n: "2,847", l: "URLs shortened" }, { n: "94,320", l: "Total clicks" }].map(s => (
            <div key={s.l} className="text-center">
              <p className={`text-2xl font-black ${t}`}>{s.n}</p>
              <p className={`text-xs ${muted}`}>{s.l}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ── B. 좌측 정렬 Hero + 큰 타이포 ─────────────────────────
function HomeB({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  const t = isDark ? "text-white" : "text-neutral-900";
  const muted = isDark ? "text-white/40" : "text-neutral-500";
  const surface = isDark ? "bg-white/5 border-white/10" : "bg-white border-neutral-200";
  const input = isDark ? "bg-white/8 border-white/10 text-white/30" : "bg-neutral-50 border-neutral-200 text-neutral-400";

  return (
    <div className={`${isDark ? "bg-zinc-950" : "bg-neutral-50"} rounded-xl overflow-hidden`}>
      <FloatingNav mode={mode} />
      <main className="px-8 pt-12 pb-10 max-w-xl">
        <h1 className={`text-6xl font-black tracking-tighter leading-[0.95] mb-4 ${t}`}>
          Shorten.
          <br />
          <span className={`text-transparent bg-clip-text bg-linear-to-r ${isDark ? "from-violet-400 to-fuchsia-400" : "from-violet-600 to-fuchsia-600"}`}>
            Share.
          </span>
          <br />
          <span className={muted}>Everywhere.</span>
        </h1>
        <p className={`text-sm mb-6 ${muted}`}>
          Turn any URL into a sharp, trackable link — instantly.
        </p>
        {/* Form */}
        <div className={`border rounded-xl p-4 mb-6 ${surface}`}>
          <div className="flex gap-2 mb-3">
            <div className={`flex-1 border rounded-lg px-3 py-2.5 text-sm ${input} truncate`}>
              https://example.com/very/long/url...
            </div>
            <button className={`text-sm font-bold px-5 py-2.5 rounded-lg shrink-0 text-white
              ${isDark ? "bg-violet-600 shadow-lg shadow-violet-900/40" : "bg-violet-600"}`}>
              Convert
            </button>
          </div>
          <button className={`flex items-center gap-1 text-xs font-semibold ${isDark ? "text-violet-400" : "text-violet-600"}`}>
            <Plus size={11} /> Include a keyword
          </button>
        </div>
        {/* Stats */}
        <div className="flex gap-5">
          {[{ n: "2,847", l: "URLs shortened" }, { n: "94,320", l: "Total clicks" }].map(s => (
            <div key={s.l} className={`flex-1 border rounded-xl p-3 ${isDark ? "bg-white/5 border-white/8" : "bg-white border-neutral-200"}`}>
              <p className={`text-xl font-black ${t}`}>{s.n}</p>
              <p className={`text-xs ${muted}`}>{s.l}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ── C. 좌우 분리 (Hero text | Form) ───────────────────────
function HomeC({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  const t = isDark ? "text-white" : "text-neutral-900";
  const muted = isDark ? "text-white/40" : "text-neutral-500";
  const card = isDark ? "bg-zinc-900 border-white/10" : "bg-white border-neutral-200";
  const input = isDark ? "bg-white/5 border-white/10 text-white/30" : "bg-neutral-50 border-neutral-200 text-neutral-400";

  return (
    <div className={`${isDark ? "bg-zinc-950" : "bg-neutral-50"} rounded-xl overflow-hidden`}>
      <FloatingNav mode={mode} />
      <main className="px-8 pt-12 pb-10">
        <div className="flex items-center gap-8">
          {/* Left: Text */}
          <div className="flex-1">
            <h1 className={`text-4xl font-black tracking-tight leading-tight mb-3 ${t}`}>
              Shorten.<br />
              <span className={`text-transparent bg-clip-text bg-linear-to-r ${isDark ? "from-violet-400 to-fuchsia-400" : "from-violet-600 to-fuchsia-600"}`}>Share.</span>
            </h1>
            <p className={`text-sm mb-5 ${muted}`}>
              Turn any URL into a sharp, trackable link.
            </p>
            <div className="flex gap-4">
              {[{ n: "2,847", l: "URLs" }, { n: "94k", l: "Clicks" }].map(s => (
                <div key={s.l}>
                  <p className={`text-lg font-black ${t}`}>{s.n}</p>
                  <p className={`text-xs ${muted}`}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Right: Form card */}
          <div className={`w-64 shrink-0 border rounded-xl p-4 ${card}`}>
            <p className={`text-xs font-bold mb-3 ${muted}`}>Paste your URL</p>
            <div className={`border rounded-lg px-3 py-2.5 text-xs mb-2 ${input} truncate`}>
              https://example.com/very/long/url...
            </div>
            <button className={`flex items-center gap-1 text-xs font-semibold mb-3 ${isDark ? "text-violet-400" : "text-violet-600"}`}>
              <Plus size={10} /> Include a keyword
            </button>
            <button className={`w-full text-sm font-bold py-2.5 rounded-lg text-white flex items-center justify-center gap-1.5
              ${isDark ? "bg-violet-600 shadow-lg shadow-violet-900/40" : "bg-violet-600"}`}>
              Convert <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const OPTIONS = [
  { id: "A", label: "중앙 정렬 — 클래식 히어로", comp: HomeA },
  { id: "B", label: "좌측 정렬 — 큰 타이포 + 스탯 카드", comp: HomeB },
  { id: "C", label: "좌우 분리 — 텍스트 | 폼 카드", comp: HomeC },
];

export default function HomepagePreview() {
  const [mode, setMode] = useState<Mode>("dark");

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">Home Page Layout</h1>
            <p className="text-white/40 text-sm">홈 페이지 레이아웃 3가지</p>
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
