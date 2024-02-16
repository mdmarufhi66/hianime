// backend/controllers/WatchlistController.js

const WatchlistModel = require("../models/WatchListModel");

const watchlistController = {
  // addToWatchlist: async (req, res) => {
  //   try {
  //     const { userId } = req.params;
  //     const { anime } = req.body;
  //     const result = await WatchlistModel.addToWatchlist(userId, anime);
  //     res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // },

  getWatchlist: async (req, res) => {
    try {
      const { userId } = req.params;
      const watchlist = await WatchlistModel.getWatchlist(userId);
      res.json(watchlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // removeFromWatchlist: async (req, res) => {
  //   try {
  //     const { userId, animeId } = req.params;
  //     const result = await WatchlistModel.removeFromWatchlist(userId, animeId);
  //     res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // },
};

module.exports = watchlistController;
