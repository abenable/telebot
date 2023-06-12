import express from 'express';
import dotenv from 'dotenv';
import nodeTelegramBotApi from 'node-telegram-bot-api';
import bodyParser from 'body-parser';
import axios from 'axios';

dotenv.config();

const token = process.env.TOKEN;
const port = process.env.PORT;
const url = process.env.URL;

const app = express();
const bot = new nodeTelegramBotApi(token, { polling: true });

function sendwhatsappmsg(msg) {
  const options = {
    method: 'post',
    url: 'https://graph.facebook.com/v17.0/128077970274249/messages',
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: '256706401095',
      type: 'text',
      text: {
        preview_url: false,
        body: msg,
      },
    },
  };
  return axios(options);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    sendwhatsappmsg(msg.text.toString());
    bot.sendMessage(msg.chat.id, msg.text.toString() + 'Sent to whatsapp.');
  }
});

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
