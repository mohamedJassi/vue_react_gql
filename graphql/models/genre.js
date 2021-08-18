const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgName: {
    type: String,
    require: true,
  },
});
const Genre = mongoose.model("genre", GenreSchema);

module.exports = Genre;
