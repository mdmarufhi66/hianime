"use client";

import TabPanel from "@/components/TabPanel";
import { useCallback, useEffect, useState } from "react";
import AnimeCards from "./AnimeCards";
import { useEffectExceptFirstRender } from "hookverse";

const MAX_LIMIT = 8;

const AnimeList = () => {
  const [order, setOrder] = useState("popularity");
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnime = useCallback(async () => {
    const response = await fetch(
      `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=${order}`
    );
    const data = await response.json();

    setList((prevList) => [...prevList, ...data]);
    setLoading(false);
    console.log(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    fetchAnime();
    console.log("test");
  }, [fetchAnime]);

  useEffectExceptFirstRender(() => {
    setList([]);
    setPage(1);
  }, [order]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
    console.log("xx");
  };

  return (
    <>
      <TabPanel order={order} setOrder={setOrder} />
      {!loading && (
        <AnimeCards list={list} setPage={setPage} nextPage={nextPage} />
      )}
    </>
  );
};

export default AnimeList;
