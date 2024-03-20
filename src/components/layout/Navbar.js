import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "../search";
import React from "react";
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {

  const {userId} = auth()


  return (
    <header className="container flex items-center justify-between mx-auto ">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="ZenAnime"
          width={100}
          height={100}
          className="object-contain"
        />
      </Link>
      <div className=" md:flex">
        <ul className="flex gap-10 md:Gap-5">
          <li>
            <Link
              href="/"
              className="text-lg font-bold text-white hover:text-red-500"
            >
              Anime
            </Link>
          </li>
          <li>
            <Link
              href="/manga"
              className="text-lg font-bold text-white hover:text-red-500"
            >
              Manga
            </Link>
          </li>
        </ul>
      </div>
      <nav className="hidden gap-3 md:flex Gap-5 items-center">
        <SearchBar />
      </nav>

      {userId ? (
        <div className="flex gap-3 md:Gap-5 relative">
          <UserButton afterSignOutUrl="/"/>
        </div>
      ) : (
        <Link
          href="/sign-in"
          className="text-lg text-white font-medium flex hover:text-red-500 border-red-500 px-1 py-1 rounded-full"
        >
          Sign In
        </Link>
      )}
    </header>
  );
}
