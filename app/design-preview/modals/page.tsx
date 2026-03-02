"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Link2, Hash, Plus, Moon, Sun, AlertTriangle, ExternalLink, Loader2 } from "lucide-react";

type Mode = "dark" | "light";

function ModalShell({ mode, children }: { mode: Mode; children: React.ReactNode }) {
  const isDark = mode === "dark";
  return (
    <div className={`relative rounded-2xl border overflow-hidden
      ${isDark ? "bg-zinc-900 border-white/10" : "bg-white border-neutral-200 shadow-xl"}`}>
      {children}
    </div>
  );
}

// ── 1. Create URL Modal ───────────────────────────────────
function CreateModal({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  const t = isDark ? "text-white" : "text-neutral-900";
  const muted = isDark ? "text-white/40" : "text-neutral-500";
  const input = isDark
    ? "bg-white/5 border-white/10 text-white/70 placeholder:text-white/25"
    : "bg-neutral-50 border-neutral-200 text-neutral-800 placeholder:text-neutral-400";
  const divider = isDark ? "border-white/8" : "border-neutral-100";

  return (
    <ModalShell mode={mode}>
      {/* Header */}
      <div className={`px-6 pt-6 pb-4 border-b ${divider}`}>
        <h2 className={`text-lg font-black ${t}`}>Create Short URL</h2>
        <p className={`text-sm mt-0.5 ${muted}`}>Enter a long URL to shorten it</p>
      </div>

      {/* Body */}
      <div className="px-6 py-5 flex flex-col gap-4">
        {/* URL input */}
        <div className="relative">
          <Link2 className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 ${muted}`} />
          <input
            type="text"
            placeholder="https://example.com/very/long/url"
            defaultValue="https://notion.so/my-reading-list-2024"
            className={`w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none ${input}`}
            readOnly
          />
        </div>

        {/* Keyword input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="relative w-44">
              <Hash className={`absolute left-3 top-1/2 -translate-y-1/2 size-3.5 ${muted}`} />
              <input
                type="text"
                placeholder="keyword"
                defaultValue="BOOK"
                className={`w-full h-8 border border-dashed rounded-lg pl-8 pr-10 text-sm outline-none ${input}`}
                readOnly
              />
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${muted}`}>4/7</span>
            </div>
            <span className={`text-xs ${muted}`}>(optional)</span>
          </div>
          <p className={`text-xs ${muted} pl-1`}>
            lill.ing/<span className={isDark ? "text-violet-400 font-semibold" : "text-violet-600 font-semibold"}>BOOK</span>···
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className={`px-6 py-4 border-t ${divider} flex items-center justify-end gap-2`}>
        <button className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors
          ${isDark ? "border-white/10 text-white/60 hover:border-white/20" : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}>
          Cancel
        </button>
        <button className={`text-sm font-bold px-4 py-2 rounded-lg text-white transition-colors
          ${isDark ? "bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-900/40" : "bg-violet-600 hover:bg-violet-700"}`}>
          Shorten URL
        </button>
      </div>
    </ModalShell>
  );
}

// ── 2. Result Dialog ──────────────────────────────────────
function ResultModal({ mode }: { mode: Mode }) {
  const [copied, setCopied] = useState(false);
  const isDark = mode === "dark";
  const t = isDark ? "text-white" : "text-neutral-900";
  const muted = isDark ? "text-white/40" : "text-neutral-500";
  const urlBg = isDark ? "bg-white/5 border-white/10" : "bg-neutral-50 border-neutral-200";
  const divider = isDark ? "border-white/8" : "border-neutral-100";
  const link = isDark ? "text-violet-400" : "text-violet-600";

  return (
    <ModalShell mode={mode}>
      {/* Header */}
      <div className={`px-6 pt-6 pb-4 border-b ${divider}`}>
        <h2 className={`text-lg font-black ${t}`}>Your short URL is ready!</h2>
        <p className={`text-sm mt-0.5 ${muted}`}>Copy and share it anywhere</p>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {/* Short URL display */}
        <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 mb-3 ${urlBg}`}>
          <span className={`flex-1 text-base font-black ${link}`}>lill.ing/BOOK3jP</span>
          <button
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all
              ${copied
                ? (isDark ? "bg-emerald-600/20 text-emerald-400" : "bg-emerald-50 text-emerald-600")
                : (isDark ? "bg-violet-600 text-white shadow-md shadow-violet-900/40" : "bg-violet-600 text-white")
              }`}
          >
            {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
          </button>
        </div>

        {/* Original URL */}
        <p className={`text-xs ${muted} truncate px-1`}>
          → https://notion.so/my-reading-list-2024
        </p>
      </div>

      {/* Footer */}
      <div className={`px-6 py-4 border-t ${divider} flex items-center justify-between`}>
        <button className={`flex items-center gap-1.5 text-sm font-semibold ${link}`}>
          <ExternalLink size={13} /> View in My URLs
        </button>
        <button className={`text-sm font-semibold ${muted}`}>Close</button>
      </div>
    </ModalShell>
  );
}

// ── 3. Delete Confirm Dialog ──────────────────────────────
function DeleteModal({ mode }: { mode: Mode }) {
  const isDark = mode === "dark";
  const t = isDark ? "text-white" : "text-neutral-900";
  const muted = isDark ? "text-white/40" : "text-neutral-500";
  const divider = isDark ? "border-white/8" : "border-neutral-100";
  const urlBg = isDark ? "bg-white/4 border-white/8 text-white/50" : "bg-neutral-50 border-neutral-200 text-neutral-500";

  return (
    <ModalShell mode={mode}>
      {/* Header */}
      <div className={`px-6 pt-6 pb-4 border-b ${divider}`}>
        <div className="flex items-center gap-2.5 mb-1">
          <div className={`p-1.5 rounded-lg ${isDark ? "bg-red-500/15" : "bg-red-50"}`}>
            <AlertTriangle size={15} className="text-red-500" />
          </div>
          <h2 className={`text-lg font-black ${t}`}>Delete URL</h2>
        </div>
        <p className={`text-sm ${muted}`}>This action cannot be undone.</p>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <p className={`text-sm ${muted} mb-3`}>The following short URL will be permanently deleted:</p>
        <div className={`border rounded-lg px-3 py-2.5 text-sm font-semibold ${urlBg}`}>
          lill.ing/BOOK3jP
        </div>
      </div>

      {/* Footer */}
      <div className={`px-6 py-4 border-t ${divider} flex items-center justify-end gap-2`}>
        <button className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors
          ${isDark ? "border-white/10 text-white/60 hover:border-white/20" : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"}`}>
          Cancel
        </button>
        <button className="text-sm font-bold px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors">
          Delete
        </button>
      </div>
    </ModalShell>
  );
}

const MODALS = [
  { id: "1", label: "Create URL Modal", comp: CreateModal },
  { id: "2", label: "Result Dialog", comp: ResultModal },
  { id: "3", label: "Delete Confirm", comp: DeleteModal },
];

export default function ModalsPreview() {
  const [mode, setMode] = useState<Mode>("dark");

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-sm mx-auto">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">Modal Options</h1>
            <p className="text-white/40 text-sm">3가지 모달 디자인</p>
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

        {/* Backdrop 시뮬레이션 */}
        <div className={`rounded-2xl p-8 mb-2 flex flex-col gap-5 ${mode === "dark" ? "bg-zinc-950/80" : "bg-neutral-900/30"}`}
          style={{ backdropFilter: "blur(4px)" }}>
          {MODALS.map(({ id, label, comp: Comp }) => (
            <div key={id}>
              <p className="text-xs font-bold text-white/40 mb-2 uppercase tracking-widest">{id}. {label}</p>
              <Comp mode={mode} />
            </div>
          ))}
        </div>

        <p className="text-xs text-white/20 text-center">Result Dialog의 Copy 버튼은 클릭 가능</p>
      </div>
    </div>
  );
}
