"use client";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useState, FormEvent } from "react";

interface UrlShortenerFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export default function UrlShortenerForm({
  onSubmit,
  isLoading,
}: UrlShortenerFormProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(url);
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="url"
        placeholder="https://your-url-to-shorten.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Converting..." : "Convert"}
      </Button>
    </form>
  );
}
