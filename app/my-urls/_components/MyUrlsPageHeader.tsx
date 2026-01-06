import MyUrlsActions from "./MyUrlsActions";

export default function MyUrlsPageHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My URLs</h1>
        <p className="text-muted-foreground">Manage your shortened URLs</p>
      </div>
      <MyUrlsActions />
    </div>
  );
}
