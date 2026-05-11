"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMyUrls = () => {
    if (isAuthenticated) {
      router.push("/my-urls");
    } else {
      login("/my-urls");
    }
  };

  const isMyUrlsPage = pathname === "/my-urls";

  return (
    <nav className="sticky top-4 z-50 px-3 sm:px-8 pointer-events-none">
      <div
        className="h-13 max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-5 rounded-xl border backdrop-blur-sm pointer-events-auto
        bg-white/90 border-neutral-200 shadow-sm
        dark:bg-zinc-900/80 dark:border-white/10 dark:shadow-none"
      >
        {/* Logo */}
        <Link href="/" className="text-base font-black text-neutral-900 dark:text-white">
          lill.<span className="text-violet-600 dark:text-violet-400">ing</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-white/40 dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {/* My URLs button — hidden on /my-urls page */}
          {!isMyUrlsPage && (
            <button
              onClick={handleMyUrls}
              className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg transition-colors
                bg-neutral-900 text-white hover:bg-neutral-700
                dark:bg-violet-600 dark:text-white dark:hover:bg-violet-500"
            >
              My URLs <ArrowRight size={13} />
            </button>
          )}

          {/* Login button — shown when not authenticated */}
          {!isAuthenticated && (
            <button
              onClick={() => login("/my-urls")}
              className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg transition-colors
                bg-neutral-900 text-white hover:bg-neutral-700
                dark:bg-violet-600 dark:text-white dark:hover:bg-violet-500"
            >
              Login
            </button>
          )}

          {/* Logout button — shown when authenticated */}
          {isAuthenticated && (
            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg transition-colors
                border border-neutral-300 text-neutral-600 hover:bg-neutral-100
                dark:border-white/20 dark:text-white/60 dark:hover:bg-white/10"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
