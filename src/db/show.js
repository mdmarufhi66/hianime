const ShowSchema = require("../models/Show.model");
const axios = require("axios");

const ShowController = {
  getWatchlist: async (req, res) => {
    try {
      const { userId } = req.params;
      const watchlist = await WatchlistModel.getWatchlist(userId);
      res.json(watchlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createShow: async (req, res) => {
    try {
      const show = await ShowSchema.create(req.body);
      return show;
    } catch (err) {
      res.status(500).json({ message: error.message });
    }
  },
  getShowsFromProvider: async (page) => {
    const shows = await axios.get(
      `https://shikimori.one/api/animes?page=${page}`
    );
    return shows.data;
  },
  insertShowsInDB: async (shows) => {
    for (let i = 0; i < shows.length; i++) {
      const show = shows[i];
      const newShow = new ShowSchema({
        id: show.id,
        episodes: show.episodes,
        episodes_aired: show.episodes_aired,
        aired_on: show.aired_on,
        image: show.image,
        status: show.status,
      });
    }
  },
  updateShows: async (req, res) => {
    const shows = await ShowController.getShowsFromProvider(req.body.page);
    await ShowController.insertShowsInDB(shows);
    return shows;
  },
};

module.exports = ShowController;
