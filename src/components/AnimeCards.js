import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AnimeCard from "./AnimeCard";
import Image from "next/image";

const AnimeCards = ({ list, setPage, nextPage }) => {
  console.log(list);
  return (
    <InfiniteScroll
      dataLength={list?.length}
      next={nextPage}
      hasMore={true}
      loader={<Image src="/spinner.svg" alt="loader" width={50} height={50} />}
      className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10"
    >
      {list?.map((anime, index) => (
        <AnimeCard key={index} anime={anime} />
      ))}
    </InfiniteScroll>
  );
};

export default AnimeCards;
