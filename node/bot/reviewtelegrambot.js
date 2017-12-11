let TelegramBot         = require('node-telegram-bot-api');
const token             = require("../../manifest.json")['review_telegram_token'];
let chatId              = null;
let bot              = null;

exports.start = start;
exports.sendReview = sendReview;

function start() {
    if(!token) return;

    bot = new TelegramBot(token, {polling: true});

    bot.on('message', (msg) => {
        chatId    = msg['chat'].id;

        bot['sendMessage'](chatId, 'Все ОК!');
    });

}

function sendReview(text){
    console.info('textsendReview - ',text);
    console.info('chatId - ',chatId);
    if(!text || !chatId || !bot) return;

    if(text.text) text = text.text;

    bot['sendMessage'](chatId, text);
}