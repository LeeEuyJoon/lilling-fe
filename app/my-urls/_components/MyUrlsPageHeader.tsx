import MyUrlsActions from "./MyUrlsActions";

interface MyUrlsPageHeaderProps {
  onAddUrl: () => void;
}

export default function MyUrlsPageHeader({ onAddUrl }: MyUrlsPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-black text-neutral-900 dark:text-white">My URLs</h1>
        <p className="text-sm text-neutral-500 dark:text-white/40 mt-0.5">단축 URL을 관리하고 통계를 확인하세요</p>
      </div>
      <MyUrlsActions onAddUrl={onAddUrl} />
    </div>
  );
}
