import Link from "next/link";
import { TbBrandGithubFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto max-w-2xl p-6">
        <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
          <div className="flex gap-6">
            <Link
              href="https://github.com/LeeEuyJoon/lilling-be"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <TbBrandGithubFilled className="w-4 h-4" />
              <span>GitHub</span>
            </Link>
            <Link
              href="mailto:wns6619@gmail.com"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <MdEmail className="w-4 h-4" />
              <span>wns6619@gmail.com</span>
            </Link>
          </div>

          <p className="text-xs">© 2025 LeeEuyJoon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
