"use client";

import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { MotionDiv } from "../ui/Motion";
import Link from "next/link";
import Modal from "../ui/Modal";
import useModal from "../../hooks/useModal";
import { useWatchlist } from "@/context/WatchListContext";
import { useRouter } from "next/navigation";

const stagger = 0.25;

const variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

function MangaCard({ manga, index }) {
  const router = useRouter();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToWatchlist = () => {
    const mangaData = {
      id: manga.id,
      name: manga.name,
      image: manga.image,
      chapters: manga.chapters,
      chapters_aired: manga.chapters_aired,
      score: manga.score,
      kind: manga.kind,
      isFavorite: true,
    };

    let existingWatchlist = localStorage.getItem("watchlist");

    existingWatchlist = existingWatchlist ? JSON.parse(existingWatchlist) : [];

    existingWatchlist.push(mangaData);

    localStorage.setItem("watchlist", JSON.stringify(existingWatchlist));
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      addToWatchlist(manga); // Add to watchlist
    } else {
      removeFromWatchlist(manga.id); // Remove from watchlist
    }
  };
  const imageSrc =
    manga.image && manga.image.original
      ? `https://shikimori.one${manga.image.original}`
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
                alt={manga.name}
                fill
                className="rounded-xl object-contain"
              />
            </div>
          )}
        </div>
        <div className="py-4 flex flex-col gap-3">
          <div className="flex justify-between items-center gap-1">
            <h2 className="font-bold text-white text-lg line-clamp-1 w-full">
              {manga.name}
            </h2>
            <div className="py-1 px-2 bg-[#161921] rounded-sm">
              <p className="text-white text-sm font-bold capitalize">
                {manga.kind}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src="/episodes.svg"
                  alt="episodes"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <p className="text-base text-white font-bold">
                  {manga.chapters || manga.chapters_aired}
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
                  {manga.score}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <button onClick={handleFavorite}>
                {isFavorite ? (
                  <p>
                    <FaHeart />
                  </p>
                ) : (
                  <FaRegHeart onClick={handleAddToWatchlist} />
                )}
              </button>
            </div>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}

export default MangaCard;
