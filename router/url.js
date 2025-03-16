const express = require('express');
const { handleGenerateShorturl } = require('../controller/url');
const router = express.Router();

router.post('/', handleGenerateShorturl);

module.exports = router;