const express = require('express');
const mostCity = require('../controller/mostController')
const router = express.Router();

router.route('/get').get(mostCity)

module.exports = router;