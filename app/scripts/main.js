requirejs.config({
    paths: {
        jquery: '../components/jquery/jquery',
        backbone: '../components/backbone/backbone',
        underscore: '../components/underscore/underscore'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['jquery', 'marinara'], function ($, marinara) {
    'use strict';

    var view = new marinara.SampleView();
    $('body').html(view.render().el);
});