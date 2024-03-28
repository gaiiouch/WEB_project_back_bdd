const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const ArtSchema = new Schema({
  title: String,
  artist: String,
  date: String,
  image: String,
  more_info: String
});

// export our module to use in server.js
module.exports = mongoose.model('Art', ArtSchema);