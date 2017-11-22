/**
 * Created by eds on 21.11.2017.
 */
const settings = require("./settings");

module.exports.getCategoriesClass = function(){
    return settings.categoriesClass || null;
};

module.exports.getActivityClass = function(){
    return settings.activityClass || null;
};