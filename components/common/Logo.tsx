import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/lilling-logo-no-background.png"
      alt="Lilling Logo"
      width={200}
      height={100}
      className="mt-12 mb-6"
    />
  );
}
