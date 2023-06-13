import express from 'express';
import dotenv from 'dotenv';
import nodeTelegramBotApi from 'node-telegram-bot-api';
import bodyParser from 'body-parser';
import { sendwhatsappmsg } from './controllers/whatsappControlller.js';

dotenv.config();

const token = process.env.TOKEN;
const port = process.env.PORT;
const url = process.env.URL;
console.log('Sent to whatsapp.\nThis command is still under developent');

const app = express();
const bot = new nodeTelegramBotApi(token, { polling: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

bot.setWebHook(`${url}/bot${token}`);

bot.onText(/\/start/, async (msg) => {
  bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`, {
    reply_markup: {
      keyboard: [['sample text', 'sample text2']],
    },
  });
});

bot.onText(/\/sendmessage/, async (msg) => {
  await bot.sendMessage(msg.chat.id, 'This command is developed');
});

bot.on('message', async (msg) => {
  if (!msg.text.includes('/')) {
    await sendwhatsappmsg(msg.text);
    await bot.sendMessage(msg.chat.id, msg.text + '\nSent to whatsapp.');
  }
});

bot.on('photo', async (msg) => {
  await bot.sendPhoto(msg.chat.id, msg.photo.at(0).file_id);
});

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
