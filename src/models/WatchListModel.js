const mongoose = require("mongoose");

// Define the schema for the watchlist collection
const watchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  animeId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  // You can include other fields as needed
});

// Create the Watchlist model using the schema
const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;
