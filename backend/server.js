// server.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Art = require("./model/Art");

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

mongoose.connect("mongodb://localhost:3010/art-guessr")
var db = mongoose.connection;
db.on('error',()=> console.error('Erreur de connexion'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// now we can set the route path & initialize the API

const newArt = new Art({
  title: "Nouvelle œuvre",
  artist: "Artiste inconnu",
  date: "2024",
  image: "url_de_l_image",
  more_info: "Description de la nouvelle œuvre"
});

router.get('/art-guessr', (req, res) => {
  Art.find()
    .then(art => {
      res.json({ success: true, data: art });
    })
    .catch(err => {
      res.json({ success: false, data: { error: err } });
    });
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));