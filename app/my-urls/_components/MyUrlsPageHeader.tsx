import MyUrlsActions from "./MyUrlsActions";

export default function MyUrlsPageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">My URLs</h1>
        <p className="text-sm text-neutral-500 dark:text-white/40 mt-0.5">단축 URL을 관리하고 통계를 확인하세요</p>
      </div>
      <MyUrlsActions />
    </div>
  );
}
