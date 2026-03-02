import Link from "next/link";

const links = [
  { href: "/design-preview/bold", label: "A. Bold & Expressive" },
  { href: "/design-preview/dark", label: "B. Dark & Moody ✓" },
  { href: "/design-preview/colors", label: "Colors — violet ✓" },
  { href: "/design-preview/backgrounds", label: "Backgrounds — zinc-950 ✓" },
  { href: "/design-preview/fonts", label: "Fonts — Inter ✓" },
  { href: "/design-preview/light", label: "Light Mode — neutral-50 ✓" },
  { href: "/design-preview/navbar", label: "Navbar — Floating Pill ✓" },
  { href: "/design-preview/homepage", label: "Home Page Layout — B ✓" },
  { href: "/design-preview/urlcard", label: "URL Card — A ✓" },
  { href: "/design-preview/modals", label: "Modals ✓" },
];

export default function DesignPreviewIndex() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-3 p-8">
      <h1 className="text-white text-2xl font-black mb-4">Design Preview</h1>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="w-64 px-5 py-3 bg-zinc-900 border border-white/10 text-white/70 hover:text-white hover:border-violet-500/40 rounded-xl text-sm font-medium transition-colors text-center"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
