import TelegramBot from 'node-telegram-bot-api';
import { Configuration, OpenAIApi } from 'openai';

import dotenv from 'dotenv';
dotenv.config();

import { sendwhatsappmsg } from './whatsappControlller.js';

const token = process.env.TOKEN;
const apiKey = process.env.OPENAI_API_KEY;

export const bot = new TelegramBot(token, { polling: true });

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

const chat_completion = await openai.createChatCompletion({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'hello world' }],
});

const url = process.env.URL;

bot.setWebHook(`${url}/bot${token}`);

bot.onText(/\/start/, async (msg) => {
  bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`, {
    reply_markup: {
      keyboard: [['/start', '/chat']],
    },
  });
});

bot.onText(/\/sendmessage/, async (msg) => {
  await bot.sendMessage(msg.chat.id, 'This command is not working');
});

bot.onText(/\/chat/, async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    'You have been connected to the AI chatbot. \n\nAsk anything...',
    {
      reply_markup: {
        keyboard: [['👆 Type your question.', '/exit']],
      },
    }
  );

  bot.on('message', async (msg) => {
    if (!String(msg.text).includes('/')) {
      const chat_completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: msg.text }],
      });
      await bot.sendMessage(
        msg.chat.id,
        chat_completion.data.choices[0].message.content,
        {
          reply_markup: {
            keyboard: [['/exit', '/start']],
          },
        }
      );
      await sendwhatsappmsg(
        `${msg.text} \n\n ${chat_completion.data.choices[0].message.content}`
      );
    } else if (String(msg.text).includes('/exit')) {
      await bot.sendMessage(
        msg.chat.id,
        'Thank you for trying out this feature.',
        {
          reply_markup: {
            keyboard: [['/start', '/chat']],
          },
        }
      );
    } else {
      await bot.sendMessage(msg.chat.id, 'This command is undefined.');
    }
  });
});

bot.on('photo', async (msg) => {
  await bot.sendPhoto(msg.chat.id, msg.photo.at(0).file_id);
});
