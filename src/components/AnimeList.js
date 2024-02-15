"use client";

import LoadMore from "@/components/LoadMore";
import TabPanel from "@/components/TabPanel";
import { useEffectExceptFirstRender } from "hookverse";
import { useEffect, useState } from "react";
import AnimeCards from "./AnimeCards";

const MAX_LIMIT = 8;

const AnimeList = () => {
  const [order, setOrder] = useState("popularity");
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      const response = await fetch(
        `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=${order}`
      );
      const data = await response.json();
      setList(data);
    };

    fetchAnime();
  }, [page]);

  // Should use useEffectExceptFirstRender instead
  useEffectExceptFirstRender(() => {
    setPage(1);
  }, [order]);

  return (
    <>
      <TabPanel order={order} setOrder={setOrder} />
      {list && <AnimeCards list={list} />}
    </>
  );
};

export default AnimeList;
