import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { bot } from './controllers/telegramBot.js';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

bot;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
