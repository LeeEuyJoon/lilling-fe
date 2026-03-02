import Link from "next/link";
import { TbBrandGithubFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-white/8 mt-auto">
      <div className="container mx-auto max-w-5xl px-8 py-5">
        <div className="flex items-center justify-center gap-6 text-xs text-neutral-400 dark:text-white/30">
          <Link
            href="https://github.com/LeeEuyJoon/lilling-be"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-neutral-600 dark:hover:text-white/60 transition-colors"
          >
            <TbBrandGithubFilled className="w-3.5 h-3.5" />
            GitHub
          </Link>
          <Link
            href="mailto:lutidevzz@gmail.com"
            className="flex items-center gap-1.5 hover:text-neutral-600 dark:hover:text-white/60 transition-colors"
          >
            <MdEmail className="w-3.5 h-3.5" />
            lutidevzz@gmail.com
          </Link>
          <span>© 2025 LeeEuyJoon</span>
        </div>
      </div>
    </footer>
  );
}
