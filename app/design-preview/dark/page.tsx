"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, BarChart2, Trash2, Plus } from "lucide-react";

export default function DarkDesignPreview() {
  const [activeTab, setActiveTab] = useState<"home" | "myurls">("home");

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <span className="text-2xl font-black tracking-tight">
          lill<span className="text-violet-400">.ing</span>
        </span>
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`text-sm font-semibold px-4 py-1.5 rounded-lg transition-all ${
              activeTab === "home"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("myurls")}
            className={`text-sm font-semibold px-4 py-1.5 rounded-lg transition-all ${
              activeTab === "myurls"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            My URLs
          </button>
        </div>
        <Link
          href="/design-preview"
          className="text-xs text-white/30 hover:text-white/60"
        >
          ← back to index
        </Link>
      </nav>

      {activeTab === "home" ? <HomeView /> : <MyUrlsView />}
    </div>
  );
}

function HomeView() {
  return (
    <main className="max-w-3xl mx-auto px-8 pt-24 pb-16">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Now with keyword URLs
        </div>
        <h1 className="text-6xl font-black tracking-tight leading-[1.05] mb-4">
          Shorten.<br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">
            Share.
          </span>
        </h1>
        <p className="text-lg text-white/40 font-medium">
          Transform long URLs into sharp, memorable links — instantly.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            defaultValue="https://www.example.com/very/long/url/that/nobody-wants-to-type"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white/80 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-colors placeholder:text-white/20"
            readOnly
          />
          <button className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shrink-0 shadow-lg shadow-violet-900/50">
            Convert
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-white/30 hover:text-violet-400 transition-colors">
          <Plus size={12} />
          Include a keyword
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        {[
          { label: "URLs shortened", value: "2,847" },
          { label: "Total clicks", value: "94,320" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <p className="text-4xl font-black mb-1 text-transparent bg-clip-text bg-linear-to-br from-white to-white/60">
              {stat.value}
            </p>
            <p className="text-sm text-white/30 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* My URLs CTA */}
      <div className="border border-violet-500/20 bg-violet-500/5 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="font-black text-white text-lg mb-0.5">Track your links</p>
          <p className="text-sm text-white/40">Analytics, custom keywords, and more.</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-violet-900/50">
          My URLs →
        </button>
      </div>
    </main>
  );
}

function MyUrlsView() {
  const urls = [
    {
      id: "1",
      short: "lill.ing/BOOK3jP",
      original: "https://www.notion.so/my-reading-list-2024",
      desc: "My reading list",
      clicks: 142,
      date: "Jan 15, 2025",
    },
    {
      id: "2",
      short: "lill.ing/GH9mKx",
      original: "https://github.com/username/very-long-repository-name-here",
      desc: "",
      clicks: 58,
      date: "Jan 22, 2025",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-8 pt-12 pb-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight">My URLs</h1>
          <p className="text-white/40 font-medium mt-1">Manage your shortened links</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-lg shadow-violet-900/50">
          <Plus size={14} />
          New URL
        </button>
      </div>

      {/* URL Cards */}
      <div className="flex flex-col gap-3">
        {urls.map((url) => (
          <div
            key={url.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all group"
          >
            <div className="flex items-start gap-4">
              {/* Favicon placeholder */}
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-lg">🔗</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <a className="font-black text-violet-400 text-base hover:text-violet-300 transition-colors cursor-pointer">
                    {url.short}
                  </a>
                  <button className="p-1 text-white/20 hover:text-white/70 rounded-lg hover:bg-white/10 transition-colors">
                    <Copy size={13} />
                  </button>
                  <button className="p-1 text-white/20 hover:text-white/70 rounded-lg hover:bg-white/10 transition-colors">
                    <ExternalLink size={13} />
                  </button>
                </div>
                <p className="text-sm text-white/25 truncate mb-3">{url.original}</p>

                {/* Description */}
                <div className="border border-dashed border-white/10 rounded-xl px-3 py-2 text-sm hover:border-violet-500/30 transition-colors cursor-pointer">
                  {url.desc ? (
                    <span className="text-white/60 font-medium">{url.desc}</span>
                  ) : (
                    <span className="text-white/20 italic">Click to add description...</span>
                  )}
                </div>
              </div>

              {/* Stats mini */}
              <div className="shrink-0 text-right">
                <div className="flex items-center gap-1 text-violet-400 font-black text-xl mb-0.5">
                  <BarChart2 size={16} className="text-violet-500/60" />
                  {url.clicks}
                </div>
                <p className="text-xs text-white/20">clicks</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-white/20 font-medium">{url.date}</p>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-white/20 hover:text-red-400 transition-colors">
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
