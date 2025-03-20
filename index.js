const express = require('express');
const { connectToMongoDB } = require('./connect');
const staticRoute = require('./router/staticrouter');
const URL = require('./models/url');
const path = require('path');

const app = express();
const port = 3000;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log('mongodb connected');
});

app.set('view engine', 'ejs');
app.set('views', path.resolve("./view"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/url", staticRoute);

app.get("/", async (req, res) => {
    const urls = await URL.find();
    return res.render("home", { urls, error: null });
});

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    
    if (!entry) {
        return res.status(404).send('URL not found');
    }

    // Check if URL is expired
    if (entry.expirationDate && new Date() > entry.expirationDate) {
        return res.status(410).send('This URL has expired');
    }

    // Update visit history
    await URL.findOneAndUpdate(
        { shortId },
        { $push: { visiteHistory: { timestamp: Date.now() } } }
    );

    res.redirect(entry.redirectURL);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});