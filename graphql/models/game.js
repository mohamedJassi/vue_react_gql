const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },

    genreId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Game = mongoose.model("game", GameSchema);

module.exports = Game;
