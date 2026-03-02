"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, BarChart2, Trash2, Plus, Moon, Sun } from "lucide-react";

// 라이트 모드 옵션 3가지:
// A. Neutral-50 배경 (크림 화이트)
// B. White 배경 (순백)
// C. Slate-50 배경 (쿨한 화이트)

const LIGHT_OPTIONS = [
  {
    id: "neutral",
    name: "Neutral-50",
    sub: "#fafafa — 따뜻한 흰색",
    bg: "bg-neutral-50",
    card: "bg-white",
    cardBorder: "border-neutral-200",
    surface: "bg-neutral-100",
    surfaceBorder: "border-neutral-200",
    muted: "text-neutral-500",
    text: "text-neutral-900",
    subtext: "text-neutral-600",
    innerCard: "bg-violet-50 border-violet-200",
    badge: "bg-violet-50 border-violet-200 text-violet-700",
    dot: "bg-violet-500",
    navBorder: "border-neutral-200",
    inputBg: "bg-white",
    link: "text-violet-600",
    btn: "bg-violet-600 hover:bg-violet-700",
  },
  {
    id: "white",
    name: "Pure White",
    sub: "#ffffff — 순백",
    bg: "bg-white",
    card: "bg-neutral-50",
    cardBorder: "border-neutral-200",
    surface: "bg-neutral-50",
    surfaceBorder: "border-neutral-200",
    muted: "text-neutral-400",
    text: "text-neutral-900",
    subtext: "text-neutral-500",
    innerCard: "bg-violet-50 border-violet-200",
    badge: "bg-violet-50 border-violet-200 text-violet-700",
    dot: "bg-violet-500",
    navBorder: "border-neutral-150",
    inputBg: "bg-white",
    link: "text-violet-600",
    btn: "bg-violet-600 hover:bg-violet-700",
  },
  {
    id: "slate",
    name: "Slate-50",
    sub: "#f8fafc — 쿨한 흰색",
    bg: "bg-slate-50",
    card: "bg-white",
    cardBorder: "border-slate-200",
    surface: "bg-slate-100",
    surfaceBorder: "border-slate-200",
    muted: "text-slate-400",
    text: "text-slate-900",
    subtext: "text-slate-600",
    innerCard: "bg-violet-50 border-violet-200",
    badge: "bg-violet-50 border-violet-200 text-violet-700",
    dot: "bg-violet-500",
    navBorder: "border-slate-200",
    inputBg: "bg-white",
    link: "text-violet-600",
    btn: "bg-violet-600 hover:bg-violet-700",
  },
];

function MiniHome({ o }: { o: (typeof LIGHT_OPTIONS)[0] }) {
  return (
    <div className={`${o.bg} rounded-xl overflow-hidden border ${o.cardBorder} flex-1`}>
      {/* Label */}
      <div className={`px-4 py-2.5 border-b ${o.cardBorder} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${o.dot}`} />
          <span className={`text-xs font-black ${o.text}`}>{o.name}</span>
        </div>
        <span className={`text-xs ${o.muted}`}>{o.sub}</span>
      </div>

      <div className="p-5">
        {/* Nav */}
        <div className={`flex items-center justify-between mb-5 pb-3 border-b ${o.navBorder}`}>
          <span className={`text-sm font-black ${o.text}`}>
            lill<span className={o.link}>.ing</span>
          </span>
          <div className="flex items-center gap-2">
            <button className={`p-1.5 rounded-lg ${o.surface} ${o.muted}`}>
              <Moon size={12} />
            </button>
            <button className={`text-xs font-bold px-3 py-1.5 rounded-lg ${o.btn} text-white`}>
              My URLs
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-4">
          <div className={`inline-flex items-center gap-1.5 border ${o.badge} text-xs font-semibold px-2.5 py-1 rounded-full mb-3`}>
            <span className={`w-1.5 h-1.5 rounded-full ${o.dot}`} />
            Now with keyword URLs
          </div>
          <h2 className={`text-2xl font-black leading-tight mb-1.5 ${o.text}`}>
            Shorten.<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-fuchsia-600">
              Share.
            </span>
          </h2>
          <p className={`text-xs ${o.subtext}`}>Transform long URLs into sharp links.</p>
        </div>

        {/* Form */}
        <div className={`${o.surface} border ${o.surfaceBorder} rounded-lg p-3 mb-3`}>
          <div className="flex gap-2 mb-2.5">
            <div className={`flex-1 ${o.inputBg} border ${o.cardBorder} rounded-lg px-3 py-2 text-xs ${o.muted} truncate`}>
              https://example.com/very/long/url...
            </div>
            <button className={`${o.btn} text-white text-xs font-bold px-4 py-2 rounded-lg shrink-0`}>
              Convert
            </button>
          </div>
          <button className={`flex items-center gap-1 text-xs font-semibold ${o.link}`}>
            <Plus size={10} />
            Include a keyword
          </button>
        </div>

        {/* Mini URL card */}
        <div className={`border ${o.innerCard} rounded-lg p-3`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`text-xs font-black ${o.link}`}>lill.ing/BOOK3jP</span>
            <Copy size={11} className={o.muted} />
          </div>
          <p className={`text-xs ${o.muted} truncate`}>https://notion.so/my-reading-list</p>
        </div>
      </div>
    </div>
  );
}

function MiniMyUrls({ o }: { o: (typeof LIGHT_OPTIONS)[0] }) {
  return (
    <div className={`${o.bg} rounded-xl overflow-hidden border ${o.cardBorder} flex-1`}>
      <div className={`px-4 py-2.5 border-b ${o.cardBorder} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${o.dot}`} />
          <span className={`text-xs font-black ${o.text}`}>{o.name} — My URLs</span>
        </div>
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-base font-black ${o.text}`}>My URLs</h2>
          <button className={`${o.btn} text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1`}>
            <Plus size={11} /> New
          </button>
        </div>

        {/* URL Card */}
        <div className={`${o.card} border ${o.cardBorder} rounded-xl p-3`}>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg ${o.surface} flex items-center justify-center shrink-0 text-sm`}>🔗</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={`text-xs font-black ${o.link}`}>lill.ing/BOOK3jP</span>
                <Copy size={11} className={o.muted} />
                <ExternalLink size={11} className={o.muted} />
              </div>
              <p className={`text-xs ${o.muted} truncate mb-2`}>https://notion.so/my-reading-list-2024</p>
              <div className={`border border-dashed ${o.surfaceBorder} rounded-lg px-2.5 py-1.5 text-xs ${o.muted} italic`}>
                Click to add description...
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className={`flex items-center gap-1 ${o.link} font-black text-sm`}>
                <BarChart2 size={13} />142
              </div>
              <p className={`text-xs ${o.muted}`}>clicks</p>
            </div>
          </div>
          <div className={`flex items-center justify-between mt-2.5 pt-2.5 border-t ${o.cardBorder}`}>
            <p className={`text-xs ${o.muted}`}>Jan 15, 2025</p>
            <button className={`flex items-center gap-1 text-xs ${o.muted} hover:text-red-500`}>
              <Trash2 size={11} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LightPreview() {
  const [view, setView] = useState<"home" | "myurls">("home");

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">Light Mode Options</h1>
            <p className="text-white/40 text-sm">3가지 라이트 배경 비교</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-zinc-900 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setView("home")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${view === "home" ? "bg-white/10 text-white" : "text-white/40"}`}
              >
                Home
              </button>
              <button
                onClick={() => setView("myurls")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${view === "myurls" ? "bg-white/10 text-white" : "text-white/40"}`}
              >
                My URLs
              </button>
            </div>
            <Link href="/design-preview" className="text-xs text-white/30 hover:text-white/50">← back</Link>
          </div>
        </div>

        <div className="flex gap-5">
          {LIGHT_OPTIONS.map((o) =>
            view === "home"
              ? <MiniHome key={o.id} o={o} />
              : <MiniMyUrls key={o.id} o={o} />
          )}
        </div>

        {/* Dark 비교용 */}
        <p className="text-xs text-white/30 text-center mt-6">
          다크 모드 레퍼런스 →{" "}
          <Link href="/design-preview/dark" className="underline hover:text-white/50">
            /design-preview/dark
          </Link>
        </p>
      </div>
    </div>
  );
}
