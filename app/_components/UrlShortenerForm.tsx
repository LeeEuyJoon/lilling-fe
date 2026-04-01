"use client";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useState, FormEvent } from "react";
import { Plus, X, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import KeywordInput from "./KeywordInput";

interface UrlShortenerFormProps {
  onSubmit: (url: string, keyword?: string) => Promise<void>;
  isLoading: boolean;
}

export default function UrlShortenerForm({
  onSubmit,
  isLoading,
}: UrlShortenerFormProps) {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      setKeyword("");
    }
    setIsExpanded((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(url, keyword || undefined);
    setUrl("");
    setKeyword("");
  };

  return (
    <div className="rounded-2xl p-5 sm:p-7 flex flex-col gap-5 bg-linear-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-900/30">
      {/* URL input */}
      <form id="shorten-form" onSubmit={handleSubmit}>
        <p className="text-white/80 text-sm font-medium mb-2">
          Paste your long link here
        </p>
        <div className="relative">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-violet-400" />
          <Input
            type="url"
            placeholder="https://your-long-url.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="h-13 pl-11 text-base sm:text-lg text-violet-900 bg-white border-0 placeholder:text-violet-400/70 focus-visible:ring-2 focus-visible:ring-white/60 shadow-none"
          />
        </div>
      </form>

      {/* Keyword section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="keyword-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <KeywordInput
              value={keyword}
              onChange={setKeyword}
              onDark={true}
              inputClassName="bg-white border-0 text-violet-900 placeholder:text-violet-400/60 focus-visible:ring-white/40"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom: toggle + convert */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <motion.button
          layout
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-1 w-fit text-xs font-medium rounded-full px-2.5 py-1 transition-colors
            border border-white/40 text-white/80 hover:border-white/70 hover:text-white"
        >
          {isExpanded ? <X size={11} /> : <Plus size={11} />}
          Include a keyword
        </motion.button>

        <div className="hidden sm:block flex-1" />

        <Button
          type="submit"
          form="shorten-form"
          disabled={isLoading}
          className="w-full sm:w-auto shrink-0 bg-white text-violet-700 hover:bg-violet-50 font-semibold border-0 shadow-none"
        >
          {isLoading ? "Converting..." : "Convert"}
        </Button>
      </div>
    </div>
  );
}
