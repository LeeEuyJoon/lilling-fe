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
  onDark?: boolean;
  inputWrapperClassName?: string;
  inputClassName?: string;
}

export default function KeywordInput({
  value,
  onChange,
  disabled,
  showIcon = false,
  onDark = false,
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

  const countColor = onDark ? "text-white/40" : "text-muted-foreground";
  const hintColor = onDark ? "text-white/60" : "text-foreground/60";
  const hintEmphasis = onDark
    ? "text-white font-semibold"
    : "font-semibold text-foreground/80";
  const hintPrimary = onDark
    ? "text-white/90 font-medium"
    : "text-primary font-medium";
  const errorColor = onDark
    ? "text-yellow-300 font-medium"
    : "text-destructive font-medium";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <div className={`relative ${inputWrapperClassName || "w-40"}`}>
          {showIcon && (
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          )}
          <Input
            type="text"
            placeholder="keyword"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className={`h-7 text-sm border-dashed ${showIcon ? "pl-8" : ""} pr-12 ${inputClassName}`}
            maxLength={MAX_KEYWORD_LENGTH}
            disabled={disabled}
          />
          <span
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none ${countColor}`}
          >
            {value.length}/{MAX_KEYWORD_LENGTH}
          </span>
        </div>
        <span className={`text-xs ${countColor}`}>(optional)</span>
      </div>
      <p className={`text-xs leading-relaxed ${hintColor}`}>
        {showInvalidHint ? (
          <span className={errorColor}>
            영문자(a-z, A-Z)와 숫자(0-9)만 입력 가능해요
          </span>
        ) : value.length > 0 ? (
          <>
            lill.ing/
            <span className={hintPrimary}>{value}</span>
            <span>{"·".repeat(MAX_KEYWORD_LENGTH - value.length)}</span>
          </>
        ) : (
          <>
            키워드를 앞에 붙여 단축 URL을 만들어요
            <br />
            예: <span className={hintEmphasis}>BOOK</span>
            {" → "}
            <span className={hintEmphasis}>lill.ing/BOOK3jP</span>
          </>
        )}
      </p>
    </div>
  );
}
