"use client";

import { Button } from "@/components/shadcn/button";
import { Link2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyUrlsButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/my-urls");
  };

  return (
    <div className="flex justify-center mt-16 mb-4">
      <Button
        onClick={handleClick}
        variant="outline"
        size="lg"
        className="text-base font-semibold shadow-sm hover:shadow-md transition-all"
      >
        <Link2 className="size-5" />
        My URLs
      </Button>
    </div>
  );
}
