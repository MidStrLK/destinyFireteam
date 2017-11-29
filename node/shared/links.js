/**
 * Created by eds on 21.11.2017.
 */
const settings = require("./settings");

module['exports'].getCategoriesLink = function(){
    return getLinks()[0].link || null;
};

module['exports'].getSiteLink = function(){
    return settings.site || null;
};


module['exports'].getActivityLinks = function(){
    return getLinks() || [];
};

function getLinks(){
    return settings.links.map(val => ({
            name: val,
            link: settings.site + settings.prefix + val + settings.postfix
        })
    );
}