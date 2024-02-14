"use server";

import AnimeCard from "@/components/AnimeCard";

const MAX_LIMIT = 8;

export const fetchAnime = async (page, order) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=${order}`
  );

  const data = await response.json();
  if (!data) return;

  return data.map((anime, index) => (
    <AnimeCard key={anime.id} anime={anime} index={index} />
  ));
};
