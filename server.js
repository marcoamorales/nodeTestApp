'use strict';

var express = require('express'),
    Log = require('log'),
    api = require('./lib/api'),
    pkg = require('./package.json'),
    app = express();

// defines app settings with default values
app.set('log level', process.env.MARINARA_LOG_LEVEL || Log.DEBUG);
app.set('session secret', process.env.MARINARA_SESSION_SECRET || 'secret');
app.set('session age', process.env.MARINARA_SESSION_AGE || 3600);
app.set('port', process.env.MARINARA_PORT || 8000);

// configures underscore view engine
// TODO: set caching for production
app.engine('html', require('consolidate').underscore);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

// enables compression for all requests
app.use(express.compress());

// serves index and static assets from app/ directory in development
app.configure('development', function () {
    app.get('/', function (req, res) {
        res.render('index', {
            jsFile: 'public/components/requirejs/require.js',
            cssFile: 'public/styles/main.css'
        });
    });
    app.use('/public', express.static(__dirname + '/app'));
});

// serves index and static assets from optimized public/ directory in prod
// TODO: replace staticCache middleware with varnish
app.configure('production', function () {
    var oneYear = 60*60*24*365,
        baseFile = 'public/' + pkg.name + '-' + pkg.version;

    app.get('/', function (req, res) {
        res.render('index', {
            jsFile: baseFile + '.min.js',
            cssFile: baseFile + '.min.css'
        });
    });
    app.use('/public', express.staticCache());
    app.use('/public', express.static(__dirname + '/public', { maxAge: oneYear }));
});

// configures default logger available for middleware and requests
app.use(function (req, res, next) {
    req.log = new Log(app.get('log level'));
    next();
});

// logs all requests if log level is INFO or higher using log module format
if (app.get('log level') >= Log.INFO) {
    var format = '[:date] INFO :remote-addr - :method :url ' +
                 ':status :res[content-length] - :response-time ms';
    express.logger.token('date', function () { return new Date(); });
    app.use(express.logger(format));
}

// mounts and configures rest api
app.use('/api', api({
    sessionSecret: app.get('session secret'),
    sessionAge: app.get('session age')
}));

// TODO: setup cluster support
app.listen(app.get('port'));