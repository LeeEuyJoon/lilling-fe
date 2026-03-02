import { LucideIcon } from "lucide-react";

interface MyUrlsFeatureProps {
  icon: LucideIcon;
  label: string;
}

export default function MyUrlsFeature({
  icon: Icon,
  label,
}: MyUrlsFeatureProps) {
  return (
    <div
      className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full
            bg-neutral-100 text-neutral-600
            dark:bg-white/8 dark:text-white/50"
    >
      <Icon size={10} />
      {label}
    </div>
  );
}
