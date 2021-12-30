const express = require('express');
const saveCityName = require("../controller/cityController")
const router = express.Router();

router.route('/city').post(saveCityName);

module.exports = router; 