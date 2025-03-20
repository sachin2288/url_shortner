const express = require('express');
const { nanoid } = require('nanoid');
const URL = require('../models/url');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { url, expirationDate, customUrl } = req.body;
        
        // Use custom URL if provided, otherwise generate random one
        const shortId = customUrl || nanoid(8);
        
        // Check if custom URL is already taken
        if (customUrl) {
            const existingUrl = await URL.findOne({ shortId: customUrl });
            if (existingUrl) {
                return res.render('home', { 
                    urls: await URL.find(),
                    error: 'Custom URL is already taken. Please choose another one.'
                });
            }
        }
        
        // Convert expiration date string to Date object if provided
        const expiration = expirationDate ? new Date(expirationDate) : null;
        
        await URL.create({
            shortId,
            redirectURL: url,
            visiteHistory: [],
            expirationDate: expiration
        });
        
        res.redirect('/');
    } catch (error) {
        console.error('Error creating URL:', error);
        res.render('home', { 
            urls: await URL.find(),
            error: 'Error creating URL. Please try again.'
        });
    }
});

module.exports = router;