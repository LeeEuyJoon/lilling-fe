import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-white text-neutral-900 border-neutral-200 placeholder:text-neutral-400 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        "focus-visible:border-violet-400 focus-visible:ring-violet-400/20 focus-visible:ring-[3px]",

        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
