const mongoose = require("mongoose");

// Define the schema for the watchlist collection
const watchlistSchema = new mongoose.Schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  animeId: {
    type: String,
    required: true,
  },
  // You can include other fields as needed
});

// Create the Watchlist model using the schema
const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;
