"use client";

import { Input } from "@/components/shadcn/input";
import { Hash } from "lucide-react";
import { useRef, useState } from "react";

export const MAX_KEYWORD_LENGTH = 7;
export const BASE62_PATTERN = /^[0-9a-zA-Z]*$/;

interface KeywordInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  showIcon?: boolean;
  inputWrapperClassName?: string;
  inputClassName?: string;
}

export default function KeywordInput({
  value,
  onChange,
  disabled,
  showIcon = false,
  inputWrapperClassName = "",
  inputClassName = "",
}: KeywordInputProps) {
  const [showInvalidHint, setShowInvalidHint] = useState(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (raw: string) => {
    if (!BASE62_PATTERN.test(raw)) {
      setShowInvalidHint(true);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      hintTimerRef.current = setTimeout(() => setShowInvalidHint(false), 2000);
      return;
    }
    if (raw.length > MAX_KEYWORD_LENGTH) return;
    setShowInvalidHint(false);
    onChange(raw);
  };

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        <div className={`relative ${inputWrapperClassName}`}>
          {showIcon && (
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          )}
          <Input
            type="text"
            placeholder="keyword"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className={`h-7! text-sm border-dashed ${showIcon ? "pl-8" : ""} pr-12 ${inputClassName}`}
            maxLength={MAX_KEYWORD_LENGTH}
            disabled={disabled}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            {value.length}/{MAX_KEYWORD_LENGTH}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">(optional)</span>
      </div>
      <p className="text-xs text-foreground/60">
        {showInvalidHint ? (
          <span className="text-destructive font-medium">
            Only letters (a-z, A-Z) and numbers (0-9) allowed
          </span>
        ) : value.length > 0 ? (
          <>
            lill.ing/
            <span className="text-primary font-medium">{value}</span>
            <span>{"·".repeat(MAX_KEYWORD_LENGTH - value.length)}</span>
          </>
        ) : (
          <>
            Your keyword will be included at the start
            <br />
            e.g. keyword{" "}
            <span className="font-semibold text-foreground/80">BOOK</span>
            {" → "}
            <span className="font-semibold text-foreground/80">lill.ing/BOOK3jP</span>
          </>
        )}
      </p>
    </div>
  );
}
