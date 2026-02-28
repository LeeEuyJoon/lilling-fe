"use client";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useState, FormEvent } from "react";
import { Plus, X } from "lucide-react";
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
    <div className="flex flex-col gap-2">
      <form id="shorten-form" onSubmit={handleSubmit}>
        <Input
          type="url"
          placeholder="https://your-url-to-shorten.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1 border-primary"
        />
      </form>

      {/* 2-column: left = keyword(animated) + toggle / right = Convert(fixed) */}
      <div className="flex items-start gap-2">
        <div className="flex-1 flex flex-col gap-0.5">
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
                <div className="pb-0.5">
                  <KeywordInput
                    value={keyword}
                    onChange={setKeyword}
                    inputWrapperClassName="w-48"
                    inputClassName="border-primary"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            layout
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-1 w-fit text-xs font-medium border border-foreground/60 rounded-full px-2.5 py-1 text-foreground/70 hover:text-foreground hover:border-foreground transition-colors"
          >
            {isExpanded ? <X size={11} /> : <Plus size={11} />}
            Include a keyword
          </motion.button>
        </div>

        {/* Convert: overflow-hidden 밖에 있어서 깜빡임 없음, items-start로 keyword 높이와 정렬 */}
        <Button
          type="submit"
          form="shorten-form"
          disabled={isLoading}
          className="shrink-0"
        >
          {isLoading ? "Converting..." : "Convert"}
        </Button>
      </div>
    </div>
  );
}
