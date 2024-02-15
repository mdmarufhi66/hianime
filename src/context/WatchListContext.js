"use client";

import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (anime) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, anime]);
  };

  const removeFromWatchlist = (animeId) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((anime) => anime.id !== animeId)
    );
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
