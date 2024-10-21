const express = require('express');
const { getWeatherData } = require('../controllers/weatherController');

const router = express.Router();

module.exports = (prisma) => {
  router.get('/:city', (req, res) => getWeatherData(req, res, prisma));
  return router;
};
