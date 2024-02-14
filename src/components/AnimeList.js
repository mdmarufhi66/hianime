"use client";

import LoadMore from "@/components/LoadMore";
import TabPanel from "@/components/TabPanel";
import { useEffect, useState } from "react";

const AnimeList = () => {
  const [order, setOrder] = useState("popularity");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAnime = () => {};

    fetchAnime();
  }, [page]);

  // Should use useEffectExceptFirstRender instead
  useEffect(() => {
    const fetchAnime = () => {
      setPage(1)
    };

    fetchAnime();
  }, [order]);

  return (
    <>
      <TabPanel order={order} setOrder={setOrder} />
      <LoadMore setPage={setPage} />
    </>
  );
};

export default AnimeList;
