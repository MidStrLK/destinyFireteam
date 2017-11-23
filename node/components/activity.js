/**
 * Created by eds on 21.11.2017.
 */
const request  	        = require("request");
const cheerio  	        = require("cheerio");
const links  	        = require("../shared/links");
const cssClasses  	    = require("../shared/cssClasses");
const settings  	    = require("../shared/settings");
const maximumLastTime  	= require("../shared/settings").maximumLastTime;

module.exports = function(func) {
    const urls = links.getActivityLinks();
    let resp = [];

    if(settings.useDevJson && settings.devJSON){
        console.info('settings.devJSON - ',settings.devJSON);
        func(sortOutputArray(settings.devJSON));
    }else{
        urls.forEach(function(url){
            request({
                uri: url.link
            }, function(error, response, body){
                callback(body, func, urls.length, resp, url.name)
            });
        });
    }




};

/* СОРТИРОВКА МАССИВА ДЛЯ ОТПРАВКИ В БРАУЗЕР, КАК В settings.links */
function sortOutputArray(arr){
    const links = settings.links;
    let sortFn = function(a,b){
        const aPl = links.indexOf(a.name);
        const bPl = links.indexOf(b.name);

        return (aPl - bPl);
    };

    return arr.sort(sortFn)

}

function callback(body, func, count, arr, name) {
    var $;
    if(body) $ = cheerio.load(body);

    if($ && typeof $ === 'function'){
        let activity = getActivity($);

        arr.push({
            name: name,
            activity: activity
        });

        if(arr.length === count){
            func(sortOutputArray(arr));
        }
    }
}

/* ПОЛУЧАЕМ СПИСОК АКТИВНОСТЕЙ */
function getActivity($){
    const cssClass = cssClasses.getActivityClass();
    const result = [];

    if(cssClass) {
        $(cssClass).each(function (key, val) {
            const fullItem = getFullItem(val.children);

            if(fitsItem(fullItem)) {
                result.push(fullItem);
            }
        });
    }

    return result;
}

/* СОБИРАЕМ ПОЛНЫЙ ИТЕМ */
function getFullItem(childrens){
    let result = {};

    childrens.forEach(function(ch){
        if (ch.type === 'tag' && ch.name === 'div' && ch['attribs']){
            const attrClass = ch['attribs']['class'];

            if (attrClass === 'threadTitleAndTags') {
                let titleAndTags = getFromThreadTitleAndTags(ch.children);

                result.link = titleAndTags.link;
                result.text = titleAndTags.text;
                result.places = titleAndTags.places;
            }

            if (attrClass === 'threadAuthorAndDetail') {
                let authorAndDetail = getFromThreadAuthorAndDetail(ch.children);

                result.authorLink = authorAndDetail.authorLink;
                result.authorName = authorAndDetail.authorName;
                result.time = authorAndDetail.time;
            }
        }
    });

    return result;
}

/* ПРОВЕРКА, ПОДХОДИТ ЛИ ИТЕМ (проверяется кол-во мест и прошедшее время) */
function fitsItem(item){
    return (item.places & parseInt(item.time) < maximumLastTime);
}

/* ВОЗВРАЩАЕТ ССЫЛКУ, ТЕКСТ И ОСТАТОК МЕСТ */
function getFromThreadTitleAndTags(childrens){
    let result = {};

    childrens.forEach(function(ch) {
        if (ch.type === 'tag' && ch.name === 'a' && ch['attribs']) {
            result.link = links.getSiteLink() + ch['attribs']['href'];
            result.text = ch['attribs']['data-rawsubject'];
        }else if (ch.type === 'tag' && ch.name === 'span' && ch['attribs'] && ch['attribs']['class']) {
            if(ch.children && ch.children[0]) {
                let places = ch.children[0].data;
                result.places = ((places) ? parseInt(places.replace(/^\D+/g, '')) : 0);
            }
        }
    });

    return result;
}

/* ВОЗВРАЩАЕТ АВТОРА, ССЫЛКУ НА НЕГО И ДАТУ */
function getFromThreadAuthorAndDetail(childrens){
    let result = {};

    childrens.forEach(function(ch) {
        if (ch.type === 'tag' && ch.name === 'div' && ch['attribs']) {
            const attrClass = ch['attribs']['class'];

            if (attrClass === 'topicAuthor') {
                const author = getFromTopicAuthor(ch.children);
                result.authorLink = author.authorLink;
                result.authorName = author.authorName;
            }

            if (attrClass === 'topicDetails') {
                const details = getFromTopicDetails(ch.children);

                result.time = details.time;
            }
        }
    });

    return result;
}

/* ПОЛУЧАЕМ АВТОРА И ССЫЛКУ НА НЕГО */
function getFromTopicAuthor(childrens){
    let result = {
        authorLink: null,
        authorName: null
    };

    childrens.forEach(function(ch) {
        if (ch.type === 'tag' && ch.name === 'a') {
            let chZero = ch.children[0];

            if (ch && ch.attribs && ch.attribs.href) {
                result.authorLink = links.getSiteLink() + ch.attribs.href;

            }
            if (chZero && chZero && chZero && chZero.data) {
                result.authorName = (chZero.data).replace(/\s/g, '');

            }
        }

    });

    return result;
}

/* ПОЛУЧАЕМ ДАТУ */
function getFromTopicDetails(childrens){
    let result = {
        time: null
    };

    childrens.forEach(function(ch) {
        if (ch.type === 'tag' && ch.name === 'div' && ch.attribs && ch.attribs['class'] === 'lastReplied') {
            let lastReplied = ch.children;

            lastReplied.forEach(function(val){
                if (val.type === 'tag' && val.name === 'p') {
                    let p = val.children;

                    p.forEach(function(val){
                        if (val.type === 'tag' && val.name === 'span') {
                            let time = getLastTime(val.children[0].data);

                            result.time = time;
                        }
                    });
                }
            });
        }

    });

    return result;
}

/* ПРОШЕДШЕЕ ВРЕМЯ С ПУБЛИКАЦИИ */
function getLastTime(time){
    const nowTime = new Date();
    const createTime = new Date(time);
    const lastTime = nowTime - createTime;
    const minutes = (lastTime-(lastTime)%60000)/60000;
    const seconds = Math.round(lastTime%60000/1000);

    return minutes + 'м. ' + seconds + 'с.';
}