const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const ArtSchema = new Schema({
  title: String,
  artist: String,
  date: Number,
  image: String,
  more_info: String,
  title_hint: String,
  artist_hint: String,
  date_hint: String,
  museum: String,
  level: String
});

// export our module to use in server.js
module.exports = mongoose.model('Art', ArtSchema);