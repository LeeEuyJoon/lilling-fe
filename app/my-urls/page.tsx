"use client";

import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { dummyUrls } from "@/lib/dummyData";
import { Copy, ExternalLink, Link2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function MyUrlsPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddExistingModalOpen, setIsAddExistingModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [existingShortCode, setExistingShortCode] = useState("");

  const extractDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  };

  const getFaviconUrl = (url: string) => {
    const domain = extractDomain(url);
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  };

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
  };

  const handleShorten = () => {
    // TODO: Call shorten API
    console.log("Shortening URL:", urlInput);
    setIsCreateModalOpen(false);
    setUrlInput("");
  };

  const handleAddExisting = () => {
    // TODO: Call add existing URL API
    console.log("Adding existing short code:", existingShortCode);
    setIsAddExistingModalOpen(false);
    setExistingShortCode("");
  };

  return (
    <main className="container mx-auto max-w-4xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My URLs</h1>
          <p className="text-muted-foreground">Manage your shortened URLs</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="size-4" />
            Create New
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsAddExistingModalOpen(true)}
          >
            Add Existing URL
          </Button>
        </div>
      </div>

      {/* Create New URL Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Short URL</DialogTitle>
            <DialogDescription>
              Enter a long URL to shorten it
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="url"
              placeholder="https://example.com/very/long/url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && urlInput.trim()) {
                  handleShorten();
                }
              }}
              className="pl-10"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleShorten} disabled={!urlInput.trim()}>
              Shorten URL
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Existing URL Modal */}
      <Dialog open={isAddExistingModalOpen} onOpenChange={setIsAddExistingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Existing Short URL</DialogTitle>
            <DialogDescription>
              Enter the short code of an existing shortened URL to add it to your list
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="abc123"
              value={existingShortCode}
              onChange={(e) => setExistingShortCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && existingShortCode.trim()) {
                  handleAddExisting();
                }
              }}
              className="pl-10"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddExistingModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddExisting} disabled={!existingShortCode.trim()}>
              Add URL
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* URL List */}
      <div className="space-y-4">
        {dummyUrls.map((url) => (
          <div
            key={url.id}
            className="border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4 relative">
              {/* Top-right Actions */}
              <div className="absolute top-0 right-0 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleCopy(url.shortUrl)}
                  title="Copy link"
                >
                  <Copy className="size-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" title="Delete">
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
                  onClick={() => setEditingId(url.id)}
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
                      setEditingId(url.id);
                    }}
                  >
                    <Pencil className="size-3" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{url.clickCount} clicks</span>
                  <span>
                    Created {new Date(url.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
