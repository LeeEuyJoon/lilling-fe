import { Copy, Plus } from "lucide-react";

const BACKGROUNDS = [
  {
    name: "Pure Black",
    sub: "#000000",
    bg: "bg-black",
    card: "bg-[#0a0a0a]",
    cardBorder: "border-white/8",
    surface: "bg-white/4",
    surfaceBorder: "border-white/8",
    innerCard: "bg-violet-500/6 border-violet-500/25",
  },
  {
    name: "zinc-950",
    sub: "#09090b · 현재 샘플",
    bg: "bg-zinc-950",
    card: "bg-zinc-900",
    cardBorder: "border-white/10",
    surface: "bg-white/5",
    surfaceBorder: "border-white/10",
    innerCard: "bg-violet-500/6 border-violet-500/28",
  },
  {
    name: "zinc-900",
    sub: "#18181b",
    bg: "bg-zinc-900",
    card: "bg-zinc-800",
    cardBorder: "border-white/12",
    surface: "bg-white/6",
    surfaceBorder: "border-white/12",
    innerCard: "bg-violet-500/8 border-violet-500/30",
  },
];

function MiniCard({ b }: { b: (typeof BACKGROUNDS)[0] }) {
  return (
    <div className={`${b.bg} rounded-xl overflow-hidden border border-white/10 flex-1`}>
      {/* Label bar */}
      <div className="px-4 py-2.5 border-b border-white/8 flex items-center justify-between">
        <span className="text-xs font-black text-white">{b.name}</span>
        <span className="text-xs text-white/30">{b.sub}</span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Nav mock */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-black text-white">
            lill<span className="text-violet-400">.ing</span>
          </span>
          <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-violet-600 text-white shadow-lg shadow-violet-900/50">
            My URLs
          </button>
        </div>

        {/* Hero */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 border bg-violet-500/10 border-violet-500/30 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Now with keyword URLs
          </div>
          <h2 className="text-xl font-black leading-tight mb-1.5">
            Shorten.<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">
              Share.
            </span>
          </h2>
          <p className="text-xs text-white/40">Transform long URLs into sharp links.</p>
        </div>

        {/* Form */}
        <div className={`${b.surface} border ${b.surfaceBorder} rounded-lg p-3 mb-3`}>
          <div className="flex gap-2 mb-2.5">
            <div className={`flex-1 ${b.surface} border ${b.surfaceBorder} rounded-lg px-3 py-2 text-xs text-white/25 truncate`}>
              https://example.com/very/long/url...
            </div>
            <button className="bg-violet-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg shadow-violet-900/50 shrink-0">
              Convert
            </button>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold text-violet-400 opacity-70">
            <Plus size={10} />
            Include a keyword
          </button>
        </div>

        {/* Mini URL card */}
        <div className={`border ${b.innerCard} rounded-lg p-3`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-black text-violet-400">lill.ing/BOOK3jP</span>
            <Copy size={11} className="text-white/20" />
          </div>
          <p className="text-xs text-white/25 truncate">https://notion.so/my-reading-list</p>
        </div>
      </div>
    </div>
  );
}

export default function BackgroundsPreview() {
  return (
    <div className="min-h-screen bg-neutral-950 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">Background Options</h1>
            <p className="text-white/40 text-sm">배경 어둠 정도 비교 (violet accent 고정)</p>
          </div>
          <a href="/design-preview" className="text-xs text-white/30 hover:text-white/50">← back</a>
        </div>

        <div className="flex gap-5">
          {BACKGROUNDS.map((b) => (
            <MiniCard key={b.name} b={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
