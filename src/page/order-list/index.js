'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')
var navSide = require('page/common/nav-side/index.js');
var _ym = require('util/ym.js');
var _user = require('service/user-service.js')

var templateIndex = require('./index.string')

var page = {
    init : function() {
        this.onLoad();
    },
    onLoad : function() {
        navSide.init({
            name : 'order-list',
        })
    },
}

$(function() {
    page.init();
})