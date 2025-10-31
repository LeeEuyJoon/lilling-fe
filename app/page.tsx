import Logo from "@/components/Logo";
import UrlShortenerContainer from "@/components/UrlShortenerContainer";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main className="container mx-auto max-w-2xl p-8">
      <Logo />
      <UrlShortenerContainer />
      <Stats />
    </main>
  );
}
