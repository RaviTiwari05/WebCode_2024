// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); 
const announcementRoutes = require('./routes/announcementRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
