'use strict';

var express = require('express'),
    app = express();

module.exports = function (options) {
    app.use(express.cookieParser());
    app.use(express.cookieSession({
        secret: options.sessionSecret,
        cookie: { maxAge: options.sessionAge }
    }));
    app.use(express.bodyParser());
    app.use(express.csrf());
    app.use(app.router);

    app.get('/hello', function (req, res) {
        req.log.debug('serving /api/hello request');
        res.send('Hello Shawn');
    });

    return app;
};