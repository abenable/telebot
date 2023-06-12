import express from 'express';
import dotenv from 'dotenv';
import nodeTelegramBotApi from 'node-telegram-bot-api';

dotenv.config();

const token = process.env.TOKEN;
const port = process.env.PORT;

const app = express();
const bot = new nodeTelegramBotApi(token, { polling: true });

bot.setWebHook(`${url}/bot${token}`);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`, {
    reply_markup: {
      keyboard: [['sample text', 'sample text2']],
    },
  });
});

bot.onText(/\/sendmessage/, (msg) => {
  bot.sendMessage(msg.chat.id, 'This command is still under developent');
});

bot.on('message', (msg) => {
  if (!msg.text.toString().includes('/')) {
    bot.sendMessage(msg.chat.id, msg.text.toString());
  }
});

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
