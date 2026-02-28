"use client";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useState, FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_KEYWORD_LENGTH = 7;
const BASE62_PATTERN = /^[0-9a-zA-Z]*$/;

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

  const handleKeywordChange = (value: string) => {
    // Only allow base62 characters and enforce max length
    if (!BASE62_PATTERN.test(value)) return;
    if (value.length > MAX_KEYWORD_LENGTH) return;
    setKeyword(value);
  };

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

  const hasKeywordError = keyword.length > 0 && !BASE62_PATTERN.test(keyword);
  const remainingPlaceholder = "·".repeat(MAX_KEYWORD_LENGTH - keyword.length);

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
                <div className="flex flex-col gap-0.5 pb-0.5">
                  <div className="relative w-48">
                    <Input
                      type="text"
                      placeholder="keyword"
                      value={keyword}
                      onChange={(e) => handleKeywordChange(e.target.value)}
                      className="h-7! text-sm border-dashed border-primary pr-10"
                      maxLength={MAX_KEYWORD_LENGTH}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                      {keyword.length}/{MAX_KEYWORD_LENGTH}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {keyword.length > 0 ? (
                      <>
                        lill.ing/
                        <span className="text-primary font-medium">{keyword}</span>
                        <span>{remainingPlaceholder}</span>
                      </>
                    ) : (
                      <>
                        Your keyword will be included at the start
                        <br />
                        e.g. keyword{" "}
                        <span className="font-medium">BOOK</span> →{" "}
                        <span className="font-medium">lill.ing/BOOK3jP</span>
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            layout
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-1 w-fit text-sm font-medium text-foreground/70 hover:text-foreground transition-colors underline-offset-2"
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <ChevronDown size={14} />
            </motion.span>
            Include a keyword
          </motion.button>
        </div>

        {/* Convert: overflow-hidden 밖에 있어서 깜빡임 없음, items-start로 keyword 높이와 정렬 */}
        <Button
          type="submit"
          form="shorten-form"
          disabled={isLoading || hasKeywordError}
          className="shrink-0"
        >
          {isLoading ? "Converting..." : "Convert"}
        </Button>
      </div>
    </div>
  );
}
