"use client";

import { useState } from "react";
import UrlShortenerForm from "@/components/UrlShortenerForm";
import ResultDialog from "@/components/ResultDialog";

export default function UrlShortenerContainer() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/url/shorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalUrl: url }),
        }
      );

      const data = await response.json();
      setOriginalUrl(url);
      setShortUrl(data.shortUrl);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <UrlShortenerForm onSubmit={handleSubmit} isLoading={isLoading} />
      <ResultDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        shortUrl={shortUrl}
      />
    </>
  );
}
