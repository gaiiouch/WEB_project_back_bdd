require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const Art = require('./model/Art'); 
const User = require('./model/User'); 


const app = express();
const router = express.Router();
app.use(cors());

const API_PORT = process.env.API_PORT;

mongoose.connect(process.env.DB_URL)
var db = mongoose.connection;
db.on('error',()=> console.error('Erreur de connexion'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// GET /arts & /users
router.get('/arts', (req, res) => {
  Art.find()
    .then(art => {res.status(200).json(art);})
    .catch(err => {res.json({ success: false, data: { error: err } });});
});

router.get('/users', (req, res) => {
  User.find()
    .then(user => {res.status(200).json(user);})
    .catch(err => {res.json({ success: false, data: { error: err } });});
});

// POST /api/login 
router.post('/login', async (req, res) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exists' });
    }
    res.status(201).json({ msg: 'User connected successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username });
    await user.save();
    res.status(200).json({ msg: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
