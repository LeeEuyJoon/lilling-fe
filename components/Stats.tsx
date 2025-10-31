export default function Stats() {
  return (
    // 나중에 api 만들고 연동하기
    <div className="flex gap-8 justify-center mt-18">
      <div className="text-center">
        <p className="text-3xl font-bold">1,234</p>
        <p className="text-sm text-muted-foreground">단축된 URL</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold">5,678</p>
        <p className="text-sm text-muted-foreground">총 클릭</p>
      </div>
    </div>
  );
}
