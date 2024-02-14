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
      <nav>
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
              <div
                ref={dropdownRef}
                className=" top-full right-0 mt-2 bg-white rounded shadow-md"
              >
                <Link href="/watchlist">
                  <p className="text-lg text-gray-500 font-medium p-2 hover:bg-gray-100 cursor-pointer">
                    Watchlist
                  </p>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-lg text-gray-500 font-medium"
                >
                  Sign Out
                </button>
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
