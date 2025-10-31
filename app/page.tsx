import Logo from "@/components/ui/Logo";
import UrlShortenerContainer from "@/components/ui/UrlShortenerContainer";
import Stats from "@/components/ui/Stats";

export default function Home() {
  return (
    <main className="container mx-auto max-w-2xl p-8">
      <Logo />
      <UrlShortenerContainer />
      <Stats />
    </main>
  );
}
