"use client";

import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MotionDiv } from "../ui/Motion";
import Link from "next/link";
import Modal from "../ui/Modal";
import useModal from "../../hooks/useModal";
import { useWatchlist } from "@/context/WatchListContext";
import { useRouter } from "next/navigation";

const stagger = 0.25;

const variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

function AnimeCard({ anime, index }) {
  const router = useRouter();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const localStorageWatchList = localStorage.getItem("watchlist");
    const existingWatchlist = localStorageWatchList
      ? JSON.parse(localStorageWatchList)
      : [];

    existingWatchlist.map((item) => {
      if (item.id === anime.id) {
        setIsFavorite(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavorite = () => {
    const localStorageWatchList = localStorage.getItem("watchlist");
    const existingWatchlist = localStorageWatchList
      ? JSON.parse(localStorageWatchList)
      : [];

    const animeData = {
      id: anime.id,
      name: anime.name,
      image: anime.image,
      episodes: anime.episodes,
      episodes_aired: anime.episodes_aired,
      score: anime.score,
      kind: anime.kind,
      isFavorite: true,
    };

    const index = existingWatchlist.findIndex((item) => item.id === anime.id);

    if (index !== -1) {
      const updatedWatchList = [
        ...existingWatchlist.slice(0, index),
        ...existingWatchlist.slice(index + 1),
      ];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchList));
      setIsFavorite(false);
      addToWatchlist(animeData);
    } else {
      const updatedWatchList = [...existingWatchlist, animeData];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchList));
      setIsFavorite(true);
      removeFromWatchlist(animeData);
    }
  };

  const imageSrc =
    anime.image && anime.image.original
      ? `https://shikimori.one${anime.image.original}`
      : null;

  return (
    <>
      <MotionDiv
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: stagger * index,
          ease: "easeInOut",
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
        className="max-w-sm rounded relative w-full h-full p-4 shadow-md"
      >
        <div className="relative w-full h-[37vh] sm:justify-center">
          {imageSrc && (
            <div
              className="w-full h-12 cursor-pointer"
              onClick={handleOpenModal}
            >
              <Image
                src={imageSrc}
                alt={anime.name}
                fill
                className="rounded-xl object-contain"
              />
            </div>
          )}
        </div>
        <div className="py-4 flex flex-col gap-3">
          <div className="flex justify-between items-center gap-1">
            <h2 className="font-bold text-white text-lg line-clamp-1 w-full">
              {anime.name}
            </h2>
            <div className="py-1 px-2 bg-[#161921] rounded-sm">
              <p className="text-white text-sm font-bold capitalize">
                {anime.kind}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src="/episodes.svg"
                  alt="episodes"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <p className="text-base text-white font-bold">
                  {anime.episodes || anime.episodes_aired}
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src="/star.svg"
                  alt="star"
                  width={18}
                  height={18}
                  className="object-contain"
                />
                <p className="text-base font-bold text-[#FFAD49]">
                  {anime.score}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <button onClick={handleFavorite}>
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}

export default AnimeCard;
