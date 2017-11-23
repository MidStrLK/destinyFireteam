/**
 * Created by eds on 21.11.2017.
 */
// server.js
const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port           = require('./node/shared/settings').port;

app.use(bodyParser.urlencoded({ extended: true }));

require('./node/routes')(app, {});

app.listen(port, () => {
    console.log('We are live on ' + port);
});