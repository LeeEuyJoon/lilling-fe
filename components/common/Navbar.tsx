"use client";

import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // 홈페이지에서는 네비게이션 바 숨김
  if (isHome) return null;

  const handleLogout = () => {
    // TODO: 로그아웃 API 호출
    // 쿠키 삭제 등
    router.push("/");
  };

  return (
    <nav className="border-b border-border/40 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Lilling text link */}
          <Link
            href="/"
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Lilling
          </Link>

          {/* Right: Logout button */}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
