"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // 홈페이지에서는 네비게이션 바 숨김
  if (isHome) return null;

  return (
    <nav className="bg-transparent">
      <div className="container mx-auto max-w-6xl px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Lilling text link */}
          <Link
            href="/"
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Lilling
          </Link>

          {/* TODO: 로그아웃 버튼은 백엔드 엔드포인트 추가 후 구현 */}
        </div>
      </div>
    </nav>
  );
}
