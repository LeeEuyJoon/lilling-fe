import Link from "next/link";
import Robot404 from "@/components/Robot404";
import { Button } from "@/components/shadcn/button";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 text-center overflow-hidden p-8">
      <Robot404 />

      <h1 className="text-3xl font-bold">Page Not Found</h1>

      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
