import Logo from "@/components/ui/Logo";
import UrlShortenerContainer from "@/components/ui/UrlShortenerContainer";
import FakeStat from "@/components/ui/FakeStat";

export default function Home() {
  return (
    <main className="container mx-auto max-w-2xl p-8">
      <Logo />
      <UrlShortenerContainer />
      <FakeStat />
    </main>
  );
}
