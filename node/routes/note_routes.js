/**
 * Created by eds on 21.11.2017.
 */
const categories    = require('../components/categories');
const activity      = require('../components/activity');

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


};