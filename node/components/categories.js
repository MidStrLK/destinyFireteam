/**
 * Created by eds on 21.11.2017.
 */
const request  	    = require("request");
const cheerio  	    = require("cheerio");
const settings      = require("../shared/settings");
const links  	    = require("../shared/links");
const cssClasses  	= require("../shared/cssClasses");


module.exports = function(func) {
    const url = links.getCategoriesLink();

    request({
        uri: url
    }, function(error, response, body){
        callback(body, func)
    });

};

function callback(body, func) {
    var $;
    if(body) $ = cheerio.load(body);

    if($ && typeof $ === 'function'){
        let categories = getCategories($);

        func(categories);
    }
}

function getCategoryName(link){
    let result = '';

    if(settings && settings.links && settings.links.forEach && link){
        settings.links.forEach(val => {
            if(link.indexOf(val) !== -1) result = val;
        })
    }

    return result;
}

function getCategories($){
    const cssClass = cssClasses.getCategoriesClass();
    const result = {arr:[]};

    if(cssClass) {
        $(cssClass)['each'](function (key, val) {
            const link = val['attribs'].href;
            const text = val.children[1].data;
            const name = getCategoryName(link);

            if(name) result[name] = text;

            result.arr.push({
                text: text,
                link: link,
                name: name
            })
        });
    }

    return result;
}