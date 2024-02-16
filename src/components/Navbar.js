"use client";

import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./search";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { DropMenu } from "./DropMenu";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.id !== "profile-toggle"
    ) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between w-full px-8 ">
      <Link href="/">
        <Image src="/logo.png" alt="ZenAnime" width={100} height={100} />
      </Link>
      <div className="hidden md:flex">
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
      <nav className="flex gap-3 md:Gap-5">
        <SearchBar />
      </nav>

      {session?.user ? (
        <div className="flex gap-3 md:Gap-5 relative">
          <button
            id="profile-toggle"
            onClick={toggleDropdown}
            className="focus:outline-none"
          >
            <Image
              src={session?.user.image}
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
            />
          </button>
          <DropMenu isOpen={dropdownOpen}>
            {dropdownOpen && (
              <div ref={dropdownRef}>
                <ul className="relative z-[1000] float-left right-10 m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block">
                  <li className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600">
                    <Link href="/watchlist">
                      <p>Watchlist</p>
                    </Link>
                  </li>
                  <li className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600">
                    <button
                      onClick={() => signOut()}
                      className="text-lg text-gray-500 font-medium"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </DropMenu>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="text-lg text-gray-500 font-medium"
        >
          Sign In
        </button>
      )}
    </header>
  );
}
