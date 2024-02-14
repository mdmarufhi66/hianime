"use client";

import React, { useState, useEffect, useRef } from "react";
import useModal from "../hooks/useModal";
import Link from "next/link";
import Image from "next/image";
import { DropMenu } from "./DropMenu";

export const SearchBar = () => {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const [query, setQuery] = React.useState("");
  const [searchParam] = React.useState(["name"]);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (!query) {
      return;
    }
    fetch(`https://shikimori.one/api/animes?search=${query}`)
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      }),
      (error) => {
        setIsLoaded(true);
        setError(error);
      };
  }, [query]);

  function search(items) {
    return items.filter((item) => {
      if (item.name) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) !== -1
          );
        });
      } else {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) !== -1
          );
        });
      }
    });
  }

  const handleSearch = () => {
    handleCloseModal();
  };

  return (
    <>
      <form className="flex items-center">
        <div>
          <div className="relative flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            <button
              className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              type="button"
              id="button-addon3"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleSearch}
            >
              Search
            </button>
            <DropMenu isOpen={dropdownOpen}>
              {dropdownOpen && (
                <div ref={dropdownRef} className="flex bg-[#0A0023]">
                  <ul className="flex flex-col gap-2 text-white">
                    {search(items).map((item) => (
                      <Link
                        key={item.id}
                        href={`https://shikimori.one${item.url}`}
                      >
                        <li className="flex">
                          <div className="relative flex-1 pr-1">
                            <Image
                              src={`https://shikimori.one${item.image.original}`}
                              alt={item.name}
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className="items-center font-serif ">
                            <h3 className="text-white font-bold overflow-auto my-2">
                              {item.name}
                            </h3>
                            <p className="">{`Kind: ${item.kind}`}</p>
                            <div className="border-t" />
                            <p>Episodes: {item.episodes}</p>
                            <div className="border-t" />
                            <p>Score: {item.score}</p>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </DropMenu>
          </div>
        </div>
      </form>
    </>
  );
};
