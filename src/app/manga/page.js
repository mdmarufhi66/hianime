import MangaList from "@/components/MangaList";
import React from "react";
import { Metadata } from "next";

export const metadata = {
  title: "Zen Anime | Manga",
  description: "Manga",
};

const Manga = () => {
  return (
    <div className="sm:p-16 py-16 px-8 flex flex-col gap-10 bg-gradient-to-b from-[#25221e] to-[#8c1105] justify-center items-center">
      <h1 className="justify-self-center text-3xl font-bold">
        Explore <span className="red-gradient">Manga</span>
      </h1>
      <MangaList />
    </div>
  );
};

export default Manga;
