"use client";

import WatchListCard from "@/components/WatchListCard";
import { useState, useEffect } from "react";
function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Access localStorage only on the client side
    const storedWatchlist =
      typeof window !== "undefined" ? localStorage.getItem("watchlist") : null;
    if (storedWatchlist) {
      const parsedWatchlist = JSON.parse(storedWatchlist);
      setWatchlist(parsedWatchlist);
    }
  }, []);

  console.log(watchlist);
  return (
    <div className="sm:p-16 py-16 px-8 flex flex-col gap-10 bg-zinc-950 justify-center items-center">
      <h1 className="justify-self-center text-3xl font-bold">
        Explore <span className="red-gradient">Watchlist</span>
      </h1>
      <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {watchlist.map((anime) => (
          <WatchListCard key={anime.id} anime={anime} />
        ))}
      </ul>
    </div>
  );
}

export default WatchlistPage;
