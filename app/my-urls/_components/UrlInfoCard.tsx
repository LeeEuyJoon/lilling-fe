"use client";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Copy, ExternalLink, Pencil } from "lucide-react";
import { useState } from "react";

interface UrlInfoCardProps {
  url: {
    id: string;
    shortUrl: string;
    originalUrl: string;
    description?: string;
  };
  onCopy: (shortUrl: string) => void;
  onEdit: (id: string, description: string) => void;
}

export default function UrlInfoCard({ url, onCopy, onEdit }: UrlInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(url.description || "");

  const extractDomain = (urlString: string) => {
    try {
      return new URL(urlString).hostname;
    } catch {
      return "";
    }
  };

  const getFaviconUrl = (urlString: string) => {
    const domain = extractDomain(urlString);
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  };

  const handleEditClick = () => {
    setDescription(url.description || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(url.id, description);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setDescription(url.description || "");
      setIsEditing(false);
    }
  };

  return (
    <div className="flex-1 min-w-0 border rounded-lg p-3 bg-muted/20">
      <div className="flex items-start gap-3">
        {/* Favicon */}
        <img
          src={getFaviconUrl(url.originalUrl)}
          alt="favicon"
          className="w-8 h-8 mt-1 flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = "/favicon.ico";
          }}
        />

        {/* URL 정보 */}
        <div className="flex-1 min-w-0">
          {/* 단축 URL + 아이콘 */}
          <div className="flex items-center gap-2 mb-2">
            <a
              href={`https://${url.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {url.shortUrl}
            </a>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => window.open(`https://${url.shortUrl}`, "_blank")}
              title="Open link"
              className="shrink-0"
            >
              <ExternalLink className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onCopy(url.shortUrl)}
              title="Copy link"
              className="shrink-0"
            >
              <Copy className="size-4" />
            </Button>
          </div>

          {/* 원본 URL */}
          <p className="text-sm text-muted-foreground truncate mb-3">
            {url.originalUrl}
          </p>

          {/* Description */}
          {isEditing ? (
            <div>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                placeholder="Enter description..."
                className="text-sm"
                autoFocus
              />
            </div>
          ) : (
            <div
              className="p-2 border border-dashed rounded bg-muted/30 text-sm cursor-pointer hover:border-primary transition-colors relative group"
              onClick={handleEditClick}
              title="Click to edit description"
            >
              {url.description ? (
                <p className="pr-8">{url.description}</p>
              ) : (
                <p className="text-muted-foreground italic pr-8">
                  Click to add description...
                </p>
              )}
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute right-1 top-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick();
                }}
              >
                <Pencil className="size-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
