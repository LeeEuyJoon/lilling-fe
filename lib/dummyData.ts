export interface UrlItem {
  id: string;
  shortUrl: string;
  originalUrl: string;
  description?: string;
  createdAt: string;
  clickCount: number;
}

export const dummyUrls: UrlItem[] = [
  {
    id: "1",
    shortUrl: "lill.ing/abc123",
    originalUrl: "https://www.google.com/search?q=url+shortener",
    description: "Google search for URL shorteners",
    createdAt: "2025-01-05T10:30:00Z",
    clickCount: 42,
  },
  {
    id: "2",
    shortUrl: "lill.ing/xyz789",
    originalUrl: "https://github.com/vercel/next.js",
    description: "Next.js GitHub repository",
    createdAt: "2025-01-04T15:20:00Z",
    clickCount: 128,
  },
  {
    id: "3",
    shortUrl: "lill.ing/test99",
    originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2025-01-03T08:15:00Z",
    clickCount: 999,
  },
  {
    id: "4",
    shortUrl: "lill.ing/dev2025",
    originalUrl: "https://stackoverflow.com/questions/tagged/typescript",
    description: "TypeScript questions on Stack Overflow",
    createdAt: "2025-01-02T12:45:00Z",
    clickCount: 67,
  },
];
