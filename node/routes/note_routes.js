/**
 * Created by eds on 21.11.2017.
 */
const categories    = require('../components/categories');
const activity      = require('../components/activity');
const ReviewTelegramBot = require('../bot/reviewtelegrambot');
const mailer = require('../bot/mailer');

module.exports = function(app) {

    app.get('/api/categories', (req, res) => {
        let func = function (cat) {
            res.send(cat)
        };

        categories(func);
    });


    app.get('/api/activity', (req, res) => {
        let func = function (cat) {
            res.send(cat)
        };

        activity(func, req.query.time);
    });

    app.post('/api/review', (req, res) => {
        let text = req.body;

        if(text){
            if(text.text) text = text.text;

            ReviewTelegramBot.sendReview(text);

            mailer.send(text);

            res.send('OK');
        }else{
            res.send('NOT OK');
        }


    });




};