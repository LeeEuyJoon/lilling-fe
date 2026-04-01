import { ArrowRight, ArrowDown } from "lucide-react";

export function StepArrow() {
  return (
    <div className="flex items-center justify-center p-1.5 rounded-full border border-violet-500 bg-violet-50 shrink-0 self-center">
      <ArrowDown size={14} className="text-violet-800 sm:hidden" />
      <ArrowRight size={14} className="text-violet-800 hidden sm:block" />
    </div>
  );
}
