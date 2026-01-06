"use client";

import { Button } from "@/components/shadcn/button";
import { UrlItem } from "@/lib/dummyData";
import { Copy, ExternalLink, Pencil, Trash2 } from "lucide-react";

interface UrlCardProps {
  url: UrlItem;
  onCopy: (shortUrl: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function UrlCard({
  url,
  onCopy,
  onEdit,
  onDelete,
}: UrlCardProps) {
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

  return (
    <div className="border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-4 relative">
        {/* Top-right Actions */}
        <div className="absolute top-0 right-0 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onCopy(url.shortUrl)}
            title="Copy link"
          >
            <Copy className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(url.id)}
            title="Delete"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        {/* Favicon */}
        <img
          src={getFaviconUrl(url.originalUrl)}
          alt="favicon"
          className="w-8 h-8 mt-1 flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = "/favicon.ico";
          }}
        />

        {/* URL Info */}
        <div className="flex-1 min-w-0 pr-20">
          <div className="flex items-center gap-2 mb-1">
            <a
              href={`https://${url.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {url.shortUrl}
            </a>
            <ExternalLink className="size-4 text-muted-foreground" />
          </div>

          <p className="text-sm text-muted-foreground truncate mb-2">
            {url.originalUrl}
          </p>

          {/* Description - Clickable area with Edit button */}
          <div
            className="mt-2 mb-3 p-2 border border-dashed rounded bg-muted/30 text-sm cursor-pointer hover:border-primary transition-colors relative group"
            onClick={() => onEdit(url.id)}
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
                onEdit(url.id);
              }}
            >
              <Pencil className="size-3" />
            </Button>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{url.clickCount} clicks</span>
            <span>Created {new Date(url.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
