require('dotenv').config();
const cors = require('cors')({
  origin: true,
});
const functions = require('firebase-functions');
const express = require('express');
const app = express();
app.use(cors);

const statusRoutes = require('./routes/status');
const nasaAPIRoutes = require('./routes/nasaAPI');

// routings
app.use('/', statusRoutes);
app.use('/nasa', nasaAPIRoutes);

exports.bounce_insights_api = functions.https.onRequest(app);
