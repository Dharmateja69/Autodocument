import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import WebhookRouter from './src/routes/Webhook.js';
const app = express();
dotenv.config();

const port = process.env.PORT || 5000;


// Middlewares
app.use(bodyParser.json()); // Parse JSON bodies (for GitHub webhook)
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (_req, res) => {
    res.send("🛠️ Auto-Doc Backend is running! this is what i made change")
})
// Example (Node.js/Express)
app.post('/webhook', WebhookRouter);
app.listen(port, () => {
    console.log(` Auto-Doc Backend is running on port ${port}`);
})
