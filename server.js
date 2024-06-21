require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const menuRoute = require('./routes/menuController');
const userRoute = require('./routes/userRoute');
const campaignRoute = require('./routes/campaignController');

const app = express();
const DB = process.env.DB;
const PORT = process.env.PORT || 8000;

mongoose.connect(DB)
    .then(() => console.log('DB successfully connected ✅'))
    .catch(e => console.log('Failed to connect to the database:', e.message));

app.use(bodyParser.json());
app.use(cors());

// Använd routes
app.use('/menu', menuRoute);
app.use('/users', userRoute);
app.use('/campaigns', campaignRoute);

const SERVER = app.listen(PORT, () => {
  console.log(`APP is running on port: ${PORT}`);
});