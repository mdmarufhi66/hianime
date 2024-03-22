import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "../search";
import React from "react";
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { userId } = auth();

  return (
    <>
      <header className="container hidden items-center justify-between mx-auto sm:flex md:flex lg:flex xl:flex">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="ZenAnime"
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>
        <div className="items-center md:flex">
          <ul className="flex gap-10 md:Gap-5">
            <li>
              <Link
                href="/"
                className="text-2xl font-bold text-white hover:text-red-500"
              >
                Anime
              </Link>
            </li>
            <li>
              <Link
                href="/manga"
                className="text-2xl font-bold text-white hover:text-red-500"
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
          <div className="flex items-center gap-8">
            <UserButton afterSignOutUrl="/" />
            <Link
              href="/watchlist"
              className="text-2xl font-bold text-white hover:text-red-500"
            >
              Watchlist
            </Link>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="text-2xl text-white font-medium flex hover:text-red-500 border-red-500 px-1 py-1 rounded-full"
          >
            Sign In
          </Link>
        )}
      </header>
      {/* Mobile Navbar */}
      <header className="container flex justify-between items-center sm:hidden md:hidden lg:hidden xl:hidden">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="ZenAnime"
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-4xl hover:text-red-500 border-red-500">
              <GiHamburgerMenu />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 border rounded-xl bg-[#0F1117] flex flex-col justify-center items-center">
            <DropdownMenuItem>
              {userId ? (
                <div className="flex items-center gap-4">
                  <UserButton afterSignOutUrl="/" />
                  <Link
                    href="/watchlist"
                    className="font-bold text-white hover:text-red-500"
                  >
                    Watchlist
                  </Link>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="text-2xl text-white font-medium flex hover:text-red-500 border-red-500 px-1 py-1 rounded-full"
                >
                  Sign In
                </Link>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/"
                className="font-bold text-white hover:text-red-500"
              >
                Anime
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/manga"
                className="font-bold text-white hover:text-red-500"
              >
                Manga
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
}
