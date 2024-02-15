"use client";
import React from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const WatchListCard = ({ anime }) => {
  const [isFavorited, setIsFavorited] = React.useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    console.log("Favorite clicked");
  };
  const imageSrc =
    anime.image && anime.image.original
      ? `https://shikimori.one${anime.image.original}`
      : null;
  return (
    <div className="w-full ">
      <div className="relative w-full h-[37vh] sm:justify-center">
        {imageSrc && (
          <div className="w-full h-12 cursor-pointer">
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
        <div className="flex gap-4 items-center">
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
            <p className="text-base font-bold text-[#FFAD49]">{anime.score}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="py-1 px-2 bg-[#161921] rounded-sm"
            onClick={handleFavoriteClick}
          >
            {isFavorited ? (
              <p>Remove from Watchlist</p>
            ) : (
              <p>Add to Watchlist</p>
            )}
          </button>
          <button onClick={handleFavoriteClick}>
            {isFavorited ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchListCard;
