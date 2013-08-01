define(['jquery', 'backbone', 'underscore'], function ($, Backbone, _) {
    'use strict';

    var exports = {};

    var SampleView = exports.SampleView = Backbone.View.extend({
        id: 'sample',
        template: _.template('<h1><%= msg %></h1>'),
        events: {
            'click': function () { alert('Hello Shawn.'); }
        },
        render: function () {
            this.$el.html(this.template({ msg: 'Click me please.' }));
            return this;
        }
    });

    return exports;
});