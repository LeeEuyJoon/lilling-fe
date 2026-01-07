import MyUrlsActions from "./MyUrlsActions";
import { UrlItem } from "@/lib/dummyData";

interface MyUrlsPageHeaderProps {
  onAddUrl: (url: UrlItem) => void;
}

export default function MyUrlsPageHeader({ onAddUrl }: MyUrlsPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My URLs</h1>
        <p className="text-muted-foreground">Manage your shortened URLs</p>
      </div>
      <MyUrlsActions onAddUrl={onAddUrl} />
    </div>
  );
}
