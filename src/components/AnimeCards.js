import React from "react";
import AnimeCard from "./AnimeCard";

const AnimeCards = ({ list, setPage }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {list?.map((anime, index) => (
        <AnimeCard key={index} anime={anime} />
      ))}
    </div>
  );
};

export default AnimeCards;
