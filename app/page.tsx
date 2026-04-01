import { TbBrandGithubFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import UrlShortenerContainer from "./_components/UrlShortenerContainer";
import FakeStat from "./_components/FakeStat";
import MyUrlsButton from "./_components/MyUrlsButton";
import HowItWorks from "./_components/HowItWorks";
import ContactCard from "./_components/ContactCard";

export default function Home() {
  return (
    <main className="container mx-auto max-w-5xl px-4 sm:px-8 pt-10 sm:pt-16 pb-10 sm:pb-16">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-baseline gap-1 sm:gap-0 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-4">
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
            Shorten.
          </span>
          <span>Share.</span>
          <span className="text-neutral-900/20 dark:text-white/20">
            Everywhere.
          </span>
        </h1>
      </div>

      {/* Stats */}
      <FakeStat />

      {/* URL input */}
      <div className="mt-8">
        <UrlShortenerContainer />
      </div>

      {/* My URLs CTA */}
      <div className="mt-8">
        <MyUrlsButton />
      </div>

      {/* How it works */}
      <HowItWorks />

      {/* GitHub + Email */}
      <div className="flex flex-col sm:flex-row gap-3 mt-3">
        <ContactCard
          href="https://github.com/LeeEuyJoon/lilling-be"
          icon={TbBrandGithubFilled}
          title="GitHub"
          description="소스 코드 보기"
          external
        />
        <ContactCard
          href="mailto:lutidevzz@gmail.com"
          icon={MdEmail}
          title="문의하기"
          description="lutidevzz@gmail.com"
        />
      </div>
    </main>
  );
}
