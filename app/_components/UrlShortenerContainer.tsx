"use client";

import { useState } from "react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import UrlShortenerForm from "./UrlShortenerForm";
import ResultDialog from "./ResultDialog";
import AddToMyUrlsButton from "./AddToMyUrlsButton";

/**
 * 백엔드 에러 코드를 한국어 메시지로 변환
 */
function getShortenErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.errorCode) {
      case "3207":
        return "키워드 형식이 올바르지 않습니다. 영문자와 숫자만 사용 가능합니다.";
      case "3208":
        return "이미 사용 중인 키워드입니다. 다른 키워드를 사용해 주세요.";
      case "3209":
        return "URL 자동 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.";
      case "3210":
        return "올바른 URL 형식이 아닙니다. http:// 또는 https://로 시작해야 합니다.";
      default:
        return "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
    }
  }
  return "요청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function UrlShortenerContainer() {
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (url: string, keyword?: string) => {
    setIsLoading(true);

    try {
      const response = await api.url.shorten(url, keyword);
      setShortUrl(response.shortUrl);
      setIsDialogOpen(true);
    } catch (error) {
      const message = getShortenErrorMessage(error);
      toast.error(message);
      console.error("Shorten error:", error);
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
      >
        <AddToMyUrlsButton shortUrl={shortUrl} />
      </ResultDialog>
    </>
  );
}
