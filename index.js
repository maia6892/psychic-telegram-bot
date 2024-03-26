require('dotenv').config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const TelegramApi = require("node-telegram-bot-api");

const bot = new TelegramApi(SECRET_TOKEN, { polling: true });

const start = () => {
    bot.setMyCommands([
        { command: "/start", description: "Start command" },
        { command: "/info", description: "Info command" },
    ]);

    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const answers = [
            "YES",
            "NO",
            "I`m not sure. Ask me again later!",
        ];
        if (text === "/start") {
            await bot.sendMessage(chatId, `Hello, ${msg.from.username}!`);
            await bot.sendMessage(
                chatId,
                "Type your question and I will help you."
            );
        } else if (text === "/info") {
            await bot.sendMessage(
                chatId,
                "You ask me questions, and I give you the answer. Available answers: 'YES', 'NO', 'I'm not sure. Ask me again later!'"
            );
        } else {
            const randAnswer = Math.floor(Math.random() * answers.length);
            await bot.sendMessage(chatId, answers[randAnswer]);
        }
    });
};

start();
