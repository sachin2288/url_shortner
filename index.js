const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./router/url');
const URL = require('./models/url');

const app = express();
const port = 3000;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log('mongodb connected');
});

app.use(express.json());
app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visiteHistory: { timestamp: Date.now() } } }
    );
    if (entry) {
        res.redirect(entry.redirectURL);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});