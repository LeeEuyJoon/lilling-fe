import { Copy, Plus } from "lucide-react";

const FONTS = [
  {
    name: "Geist",
    sub: "현재 사용 중",
    variable: "'__GeistSans_aaf875', 'Helvetica Neue', sans-serif",
    googleUrl: null,
  },
  {
    name: "Inter",
    sub: "업계 표준. Vercel, Linear",
    variable: "'Inter', sans-serif",
    googleUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
  },
  {
    name: "Plus Jakarta Sans",
    sub: "개성 있고 따뜻함",
    variable: "'Plus Jakarta Sans', sans-serif",
    googleUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
  },
  {
    name: "DM Sans",
    sub: "가볍고 모던. Bold 대비 강함",
    variable: "'DM Sans', sans-serif",
    googleUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap",
  },
];

function MiniCard({ f, idx }: { f: (typeof FONTS)[0]; idx: number }) {
  return (
    <div
      className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden flex-1"
      style={{ fontFamily: f.variable }}
    >
      {/* Label */}
      <div className="px-4 py-2.5 border-b border-white/8 flex items-center justify-between">
        <span className="text-xs font-black text-white" style={{ fontFamily: f.variable }}>
          {f.name}
        </span>
        <span className="text-xs text-white/30">{f.sub}</span>
      </div>

      <div className="p-5" style={{ fontFamily: f.variable }}>
        {/* Nav */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-black text-white">
            lill<span className="text-violet-400">.ing</span>
          </span>
          <button
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-violet-600 text-white"
            style={{ fontFamily: f.variable }}
          >
            My URLs
          </button>
        </div>

        {/* Hero text — 폰트 차이가 가장 잘 드러나는 부분 */}
        <div className="mb-4">
          <h2
            className="text-2xl font-black leading-tight mb-2"
            style={{ fontFamily: f.variable }}
          >
            Shorten.<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">
              Share.
            </span>
          </h2>
          <p className="text-xs text-white/40" style={{ fontFamily: f.variable }}>
            Transform long URLs into sharp, memorable links.
          </p>
        </div>

        {/* 본문 텍스트 샘플 */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
          <div className="flex gap-2 mb-2">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/30 truncate">
              https://example.com/very/long/url...
            </div>
            <button
              className="bg-violet-600 text-white text-xs font-bold px-4 py-2 rounded-lg shrink-0"
              style={{ fontFamily: f.variable }}
            >
              Convert
            </button>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold text-violet-400">
            <Plus size={10} />
            Include a keyword
          </button>
        </div>

        {/* URL Card */}
        <div className="border border-violet-500/30 bg-violet-500/5 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-black text-violet-400">lill.ing/BOOK3jP</span>
            <Copy size={11} className="text-white/20" />
          </div>
          <p className="text-xs text-white/40">My reading list for 2025</p>
          <p className="text-xs text-white/20 truncate">https://notion.so/my-reading-list</p>
        </div>
      </div>
    </div>
  );
}

export default function FontsPreview() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap"
      />
      <div className="min-h-screen bg-neutral-950 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-black text-white mb-1">Font Options</h1>
              <p className="text-white/40 text-sm">폰트별 느낌 비교 (배경/색상 고정)</p>
            </div>
            <a href="/design-preview" className="text-xs text-white/30 hover:text-white/50">← back</a>
          </div>

          <div className="flex gap-4">
            {FONTS.map((f, idx) => (
              <MiniCard key={f.name} f={f} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
