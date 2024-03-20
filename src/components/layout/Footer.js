import Image from "next/image";

function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-zinc-950">
      <p className="text-base font-bold text-white">@2024 ZenAnime</p>
      <Image
        src="/logo.png"
        alt="logo"
        width={60}
        height={60}
        className="object-contain"
      />
      <div className="flex items-center gap-6">
        <Image
          src="/tiktok.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        <Image
          src="/instagram.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        <Image
          src="/twitter.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
      </div>
    </footer>
  );
}

export default Footer;
