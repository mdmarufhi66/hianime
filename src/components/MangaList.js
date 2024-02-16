"use client";

import TabPanel from "@/components/TabPanel";
import { useCallback, useEffect, useState } from "react";
import MangaCards from "./MangaCards";
import { useEffectExceptFirstRender } from "hookverse";

const MAX_LIMIT = 8;

const MangaList = () => {
  const [order, setOrder] = useState("popularity");
  const [page, setPage] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManga = async () => {
      const response = await fetch(
        `https://shikimori.one/api/mangas?page=${page}&limit=${MAX_LIMIT}&order=${order}`
      );
      const data = await response.json();
      setList((prevList) => [...prevList, ...data]);
      setLoading(false);
    };
    if (page) {
      fetchManga();
    }
  }, [order, page]);

  useEffectExceptFirstRender(() => {
    setList([]);
    setPage(1);
  }, [order]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <TabPanel order={order} setOrder={setOrder} />
      {!loading && (
        <MangaCards list={list} setPage={setPage} nextPage={nextPage} />
      )}
    </>
  );
};

export default MangaList;
