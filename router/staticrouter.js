const express = require('express');
const { nanoid } = require('nanoid');
const URL = require('../models/url');
const router = express.Router();

router.post('/', async (req, res) => {
    const { url, expirationDate } = req.body;
    const shortId = nanoid(8);
    
    // Convert expiration date string to Date object if provided
    const expiration = expirationDate ? new Date(expirationDate) : null;
    
    await URL.create({
        shortId,
        redirectURL: url,
        visiteHistory: [],
        expirationDate: expiration
    });
    res.redirect('/');
});

module.exports = router;