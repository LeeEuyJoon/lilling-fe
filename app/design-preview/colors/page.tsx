"use client";

import { Copy, Plus } from "lucide-react";

const ACCENTS = [
  {
    name: "Violet / Purple",
    id: "violet",
    btn: "bg-violet-600 hover:bg-violet-500 shadow-violet-900/60",
    badge: "bg-violet-500/10 border-violet-500/30 text-violet-300",
    dot: "bg-violet-400",
    linkColor: "text-violet-400",
    gradient: "from-violet-400 to-fuchsia-400",
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
  },
  {
    name: "Cyan / Teal",
    id: "cyan",
    btn: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/60",
    badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
    dot: "bg-cyan-400",
    linkColor: "text-cyan-400",
    gradient: "from-cyan-400 to-teal-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
  },
  {
    name: "Emerald / Green",
    id: "emerald",
    btn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/60",
    badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    dot: "bg-emerald-400",
    linkColor: "text-emerald-400",
    gradient: "from-emerald-400 to-teal-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
  },
  {
    name: "Blue / Indigo",
    id: "blue",
    btn: "bg-blue-600 hover:bg-blue-500 shadow-blue-900/60",
    badge: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    dot: "bg-blue-400",
    linkColor: "text-blue-400",
    gradient: "from-blue-400 to-indigo-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
  },
  {
    name: "Navy — Dark Blue",
    id: "navy",
    btn: "bg-sky-700 hover:bg-sky-600 shadow-sky-950/80",
    badge: "bg-sky-500/10 border-sky-600/40 text-sky-300",
    dot: "bg-sky-400",
    linkColor: "text-sky-400",
    gradient: "from-sky-400 to-blue-500",
    border: "border-sky-600/30",
    bg: "bg-sky-500/5",
  },
  {
    name: "Navy — Deep Indigo",
    id: "deep-indigo",
    btn: "bg-indigo-700 hover:bg-indigo-600 shadow-indigo-950/80",
    badge: "bg-indigo-500/10 border-indigo-500/40 text-indigo-300",
    dot: "bg-indigo-400",
    linkColor: "text-indigo-400",
    gradient: "from-indigo-400 to-blue-500",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/5",
  },
  {
    name: "Navy — Steel Blue",
    id: "steel",
    btn: "bg-slate-600 hover:bg-slate-500 shadow-slate-950/80",
    badge: "bg-slate-400/10 border-slate-400/30 text-slate-300",
    dot: "bg-slate-400",
    linkColor: "text-slate-300",
    gradient: "from-slate-300 to-sky-400",
    border: "border-slate-400/25",
    bg: "bg-slate-400/5",
  },
  {
    name: "Navy — Royal Blue",
    id: "royal",
    btn: "bg-blue-700 hover:bg-blue-600 shadow-blue-950/80",
    badge: "bg-blue-600/15 border-blue-500/40 text-blue-200",
    dot: "bg-blue-300",
    linkColor: "text-blue-300",
    gradient: "from-blue-300 to-cyan-400",
    border: "border-blue-500/30",
    bg: "bg-blue-600/5",
  },
];

function MiniPreview({ a }: { a: (typeof ACCENTS)[0] }) {
  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
      {/* Label */}
      <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${a.dot}`} />
        <span className="text-xs font-bold text-white/50">{a.name}</span>
      </div>

      {/* Mini home page */}
      <div className="p-5">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-base font-black text-white">
            lill<span className={a.linkColor}>.ing</span>
          </span>
          <button className={`text-xs font-bold px-3 py-1.5 rounded-lg ${a.btn} shadow-lg text-white`}>
            My URLs
          </button>
        </div>

        {/* Hero */}
        <div className="mb-4">
          <div className={`inline-flex items-center gap-1.5 border ${a.badge} text-xs font-semibold px-2.5 py-1 rounded-full mb-3`}>
            <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
            Now with keyword URLs
          </div>
          <h2 className="text-2xl font-black leading-tight mb-1.5">
            Shorten.<br />
            <span className={`text-transparent bg-clip-text bg-linear-to-r ${a.gradient}`}>
              Share.
            </span>
          </h2>
          <p className="text-xs text-white/40">Transform long URLs into sharp links.</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
          <div className="flex gap-2 mb-2.5">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/30 truncate">
              https://example.com/very/long/url...
            </div>
            <button className={`${a.btn} text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shrink-0`}>
              Convert
            </button>
          </div>
          <button className={`flex items-center gap-1 text-xs font-semibold ${a.linkColor} transition-colors opacity-70`}>
            <Plus size={10} />
            Include a keyword
          </button>
        </div>

        {/* Mini URL card */}
        <div className={`border ${a.border} ${a.bg} rounded-lg p-3`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`text-xs font-black ${a.linkColor}`}>lill.ing/BOOK3jP</span>
            <Copy size={11} className="text-white/20" />
          </div>
          <p className="text-xs text-white/25 truncate">https://www.notion.so/my-reading-list</p>
        </div>
      </div>
    </div>
  );
}

export default function ColorsPreview() {
  return (
    <div className="min-h-screen bg-neutral-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">Accent Color Options</h1>
            <p className="text-white/40 text-sm">같은 레이아웃, 다른 포인트 색상</p>
          </div>
          <a href="/design-preview" className="text-xs text-white/30 hover:text-white/50">← back</a>
        </div>

        {/* Original options */}
        <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">기존 옵션</p>
        <div className="grid grid-cols-2 gap-5 mb-8">
          {ACCENTS.slice(0, 4).map((a) => (
            <MiniPreview key={a.id} a={a} />
          ))}
        </div>

        {/* Navy options */}
        <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">Navy 계열</p>
        <div className="grid grid-cols-2 gap-5">
          {ACCENTS.slice(4).map((a) => (
            <MiniPreview key={a.id} a={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
