import nodeTelegramBotApi from 'node-telegram-bot-api';

const token = '5789334803:AAEpeoS-o1rj4Q-TJIxZ6BPLpi32hWNUoq4';

const bot = new nodeTelegramBotApi(token, { polling: true });

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
