import Logo from "@/components/common/Logo";
import UrlShortenerContainer from "./_components/UrlShortenerContainer";
import FakeStat from "./_components/FakeStat";
import MyUrlsButton from "./_components/MyUrlsButton";

export default function Home() {
  return (
    <main className="container mx-auto max-w-2xl p-8">
      <Logo />
      <UrlShortenerContainer />
      <FakeStat />
      <MyUrlsButton />
    </main>
  );
}
