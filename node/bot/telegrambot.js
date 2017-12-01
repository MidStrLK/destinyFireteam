let TelegramBot         = require('node-telegram-bot-api');
const links             = require("../shared/settings").links;
const activity          = require("../components/activity");
const token             = '490988845:AAHgEk_qPQOl9Is4wPzpZU-xk6enkZMq7Uw';
const defaultTimeCount  = 30;
let savedActivityArray  = [];
let intervalId          = null;

exports.start = start;

/*
* Возможные команды - UpForAnything, Raid, Nightfall, Strikes, TrialsOfNine, CruciblePvP
* также можно добавить окончание watch для слежений
* после watch можно добавить кол-во минут интервала*
* */


function start() {
    var bot = new TelegramBot(token, {polling: true});

    bot['onText'](/\/stop (.+)/, function(){

    });

    bot.on('message', (msg) => {
        const chatId    = msg['chat'].id;
        const text      = msg['text'];
        const type      = getType(text);
        const watch     = (text.indexOf(' watch') !== -1);
        const time      = getTime(text);

        function callback(res){
            activityCallback(res, bot, chatId)
        }

/* Нет типа -> 'неправильный запрос'*/
        if(!type){
            bot['sendMessage'](chatId, 'неправильный запрос');

/* Тип = стоп ->  останавливаем все вотчи*/
        }else if(type === 'stop'){
            clearInterval(intervalId);
            bot['sendMessage'](chatId, 'остановлено');

/* Остальное - запрашиваем активности или начинаем слежку */
        }else{
            activity(callback, null, type);
            if(watch) runWatch(callback, type, time);
        }


    });

}

/* ЗАПУСК СЛЕЖКИ */
function runWatch(callback, type, timeCount){
    clearInterval(intervalId);

    intervalId = setInterval(function(){
        console.log('run activity');
        activity(callback, null, type);
    }, (timeCount || defaultTimeCount)*1000)
}

/* НАХОДИМ НЕ НАЙДЕННЫЕ АКТИВНОСТИ, ЗАПОМИНАЕМ ИХ, УДАЛЯЕМ НАЙДЕННЫЕ  */
function saveAndCutActivity(activity){
    let res = [];

    activity.forEach(value => {
        if(savedActivityArray.indexOf(value.link) === -1) {
            savedActivityArray.push(value.link);
            res.push(value);
        }
    });

    return res;
}

/* ПРЕВРАЩАЕМ МАССИВ АКТИВНОСТЕЙ В ПРЕДСТАВЛЕНИЕ ДЛЯ ЧАТА */
function prepareTextActivity(activity){
    let res = [];

    /*{ type: null,
        link: 'https://www.bungie.net/ru/Forums/Post/239472732?sort=0&page=0',
        text: 'Рейд',
        places: 5,
        authorLink: 'https://www.bungie.net/ru/User/Profile?id=17204181',
        authorName: 'Edyardiys',
        time: '137м. 57с.' }*/

    activity.forEach(val => {
        res = res.concat([val.text, val.link, 'Мест: ' + val.places, val.time, '   '])
    });

    return res.join('\n');
}

/* ПОЛУЧАЕМ АКТИВНОСТИ, ПРЕОБРАЗУЕМ ИХ И ОТПРАВЛЯЕМ В ЧАТ */
function activityCallback(res, bot, chatId){
    if(!res || !res[0] || !res[0].activity ) return;
    let activity = res[0].activity;

    activity = saveAndCutActivity(activity);

    const text = prepareTextActivity(activity) || 'ничего не найдено';

    bot['sendMessage'](chatId, text);
}

/* ИЗ ТЕКСТА ЗАПРОСА ПОЛУЧАЕМ ИНТЕРВАЛ ТАЙМЕРА В МИНУТАХ */
function getTime(text){
    if(!text || typeof text !== 'string') return;

    let res = text.replace(/\D+/g,"");

    if(res) res = Number(res);

    if(res) res = res*60;

    return res;
}

/* ПОЛУЧАЕМ ТИП АКТИВНОСТИ, ОПИСАННЫЙ В СЕТТИНГСАХ ИЛИ СТОП */
function getType(text){
    let res = null;
    text = text.split(' ')[0];
    if(text[0] === '/') text = text.slice(1);

    links.forEach(link => {
        if(text.toLowerCase().indexOf(link.toLowerCase()) !== -1) res = link;
    });

    if(text === 'stop') res = text;

    return res;
}