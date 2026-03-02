import Link from "next/link";
import { ComponentType } from "react";

interface ContactCardProps {
  href: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  external?: boolean;
}

export default function ContactCard({
  href,
  icon: Icon,
  title,
  description,
  external = false,
}: ContactCardProps) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
        bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm
        dark:bg-zinc-900 dark:border-white/10 dark:hover:border-white/20"
    >
      <Icon className="size-4 text-neutral-500 dark:text-white/50 shrink-0" />
      <div>
        <p className="text-xs font-semibold text-neutral-700 dark:text-white/80">{title}</p>
        <p className="text-xs text-neutral-400 dark:text-white/30">{description}</p>
      </div>
    </Link>
  );
}
