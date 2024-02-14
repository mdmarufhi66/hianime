"use client";

import LoadMore from "@/components/LoadMore";
import TabPanel from "@/components/TabPanel";
import { useEffect, useState } from "react";

const AnimeList = () => {
  const [order, setOrder] = useState("popularity");
  const [page, setPage] = useState("popularity");

  useEffect(() => {
    const fetchAnime = () => {};

    fetchAnime();
  }, [page]);

  useEffect(() => {
    const fetchAnime = () => {};

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
