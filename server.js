/**
 * Created by eds on 21.11.2017.
 */
// server.js
const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const telegrambot    = require('./node/bot/telegrambot.js');
const port           = require('./node/shared/settings').port;
const server_port           = process.env['OPENSHIFT_NODEJS_PORT'] || port || 8080;
const server_ip_address     = process.env['OPENSHIFT_NODEJS_IP']   || '127.0.0.1';

app.use(bodyParser.urlencoded({ extended: true }));

console.log(server_port, server_ip_address);

require('./node/routes')(app, {});

app.listen(server_port, server_ip_address, () => {
    console.log( "Listening on " + server_ip_address + ", port " + server_port );
    telegrambot.start();
});

