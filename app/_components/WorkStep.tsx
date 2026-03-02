import { Link2 } from "lucide-react";

interface WorkStepProps {
  number: string;
  sentence1: string;
  sentence2: string;
}

export default function WorkStep({
  number,
  sentence1,
  sentence2,
}: WorkStepProps) {
  return (
    <div className="flex-1 border border-violet-600 rounded-lg p-4 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-100 ">
          <Link2 size={14} className="text-violet-600 " />
        </div>
        <span className="text-[10px] font-bold text-violet-500 uppercase tracking-widest">
          {number}
        </span>
      </div>
      <p className="text-sm font-semibold text-neutral-800  mb-1">
        {sentence1}
      </p>
      <p className="text-xs text-neutral-400 leading-relaxed">{sentence2}</p>
    </div>
  );
}
