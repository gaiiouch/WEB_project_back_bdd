require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Art = require('./model/Art'); 
const User = require('./model/User'); 

const app = express();
const PORT = process.env.PORT|| 5000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cors());

// connection with db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Database Connection Error:', err));

// 
// GET /api/arts 
app.get('/api/arts', (req, res) => {
  Art.find()
    .then(art => res.status(200).json(art))
    .catch(err => res.json({ success: false, data: { error: err } }));
});

// POST /api/login 
app.post('/api/login', async (req, res) => {
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
app.post('/api/signup', async (req, res) => {
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
