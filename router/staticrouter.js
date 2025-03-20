const express = require('express');
const { nanoid } = require('nanoid');
const URL = require('../models/url');
const router = express.Router();

router.post('/', async (req, res) => {
    const { url } = req.body;
    const shortId = nanoid(8);
    await URL.create({
        shortId,
        redirectURL: url,
        visiteHistory: [],
    });
    res.redirect('/');
});

module.exports = router;