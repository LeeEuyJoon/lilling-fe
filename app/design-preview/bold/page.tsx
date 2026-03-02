"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, BarChart2, Trash2, Plus } from "lucide-react";

export default function BoldDesignPreview() {
  const [activeTab, setActiveTab] = useState<"home" | "myurls">("home");

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="border-b border-neutral-200 px-8 py-4 flex items-center justify-between">
        <span className="text-2xl font-black tracking-tight text-neutral-900">
          lill<span className="text-violet-600">.ing</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${
              activeTab === "home"
                ? "bg-neutral-900 text-white"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("myurls")}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors ${
              activeTab === "myurls"
                ? "bg-neutral-900 text-white"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            My URLs
          </button>
        </div>
        <Link
          href="/design-preview"
          className="text-xs text-neutral-400 hover:text-neutral-600"
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
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Now with keyword URLs
        </div>
        <h1 className="text-6xl font-black tracking-tight text-neutral-900 leading-[1.05] mb-4">
          Shorten.<br />
          <span className="text-violet-600">Share.</span>
        </h1>
        <p className="text-lg text-neutral-500 font-medium">
          Transform long URLs into sharp, memorable links — instantly.
        </p>
      </div>

      {/* Form */}
      <div className="bg-neutral-50 border-2 border-neutral-200 rounded-2xl p-6 mb-8">
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            defaultValue="https://www.example.com/very/long/url/that/nobody-wants-to-type"
            className="flex-1 bg-white border-2 border-neutral-300 rounded-xl px-4 py-3 text-sm font-medium text-neutral-800 focus:outline-none focus:border-violet-500 transition-colors"
            readOnly
          />
          <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shrink-0">
            Convert
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-violet-600 transition-colors">
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
            className="bg-neutral-900 rounded-2xl p-6 text-white"
          >
            <p className="text-4xl font-black mb-1">{stat.value}</p>
            <p className="text-sm text-neutral-400 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* My URLs CTA */}
      <div className="border-2 border-violet-200 bg-violet-50 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="font-black text-neutral-900 text-lg mb-0.5">Track your links</p>
          <p className="text-sm text-neutral-500">Analytics, custom keywords, and more.</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
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
          <h1 className="text-4xl font-black text-neutral-900 tracking-tight">My URLs</h1>
          <p className="text-neutral-500 font-medium mt-1">Manage your shortened links</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
          <Plus size={14} />
          New URL
        </button>
      </div>

      {/* URL Cards */}
      <div className="flex flex-col gap-4">
        {urls.map((url) => (
          <div
            key={url.id}
            className="bg-white border-2 border-neutral-200 rounded-2xl p-5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Favicon placeholder */}
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-lg">🔗</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <a className="font-black text-violet-600 text-base hover:underline">
                    {url.short}
                  </a>
                  <button className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors">
                    <Copy size={13} />
                  </button>
                  <button className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors">
                    <ExternalLink size={13} />
                  </button>
                </div>
                <p className="text-sm text-neutral-400 truncate mb-3">{url.original}</p>

                {/* Description */}
                <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-xl px-3 py-2 text-sm">
                  {url.desc ? (
                    <span className="text-neutral-700 font-medium">{url.desc}</span>
                  ) : (
                    <span className="text-neutral-400 italic">Click to add description...</span>
                  )}
                </div>
              </div>

              {/* Stats mini */}
              <div className="shrink-0 text-right">
                <div className="flex items-center gap-1 text-violet-600 font-black text-xl mb-0.5">
                  <BarChart2 size={16} className="text-violet-400" />
                  {url.clicks}
                </div>
                <p className="text-xs text-neutral-400">clicks</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-neutral-100">
              <p className="text-xs text-neutral-400 font-medium">{url.date}</p>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-red-500 transition-colors">
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
