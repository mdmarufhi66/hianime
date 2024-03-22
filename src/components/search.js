"use client";

import React, { useState, useEffect, useRef } from "react";
import useModal from "../hooks/useModal";
import Link from "next/link";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
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
              className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-full border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            <IoSearch className="right-1 absolute inset-y-0 my-auto h-4 w-4 focus:border-primary" />

            <DropMenu isOpen={dropdownOpen}>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="flex bg-zinc-950 border rounded-xl w-full hover:bg-zinc-800"
                >
                  <ul className="flex flex-col text-white w-screen mx-2">
                    {search(items).map((item) => (
                      <Link
                        key={item.id}
                        href={`https://shikimori.one${item.url}`}
                      >
                        <li className="flex gap-3 py-2">
                          <div className="relative flex-1 rounded-full p-2 min-w-[47px] min-h-[47px]">
                            <Image
                              src={`https://shikimori.one${item.image.original}`}
                              alt={item.name}
                              width={47}
                              height={47}
                              className="rounded h-full w-full "
                            />
                          </div>
                          <div className="items-center relative ">
                            <h3 className="text-white font-bold overflow-auto">
                              {item.name}
                            </h3>
                            <div className="border-t" />
                            <p>Aired: {item.aired_on}</p>
                            <p className="">{`Kind: ${item.kind}`}</p>
                            <p>Episodes: {item.episodes}</p>

                            <p>Rate: {item.score}</p>
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
