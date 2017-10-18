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
            name : 'user-center',
        })
        this.loadUserInfo();
    },
    loadUserInfo : function() {
        var userHTML = '';
        _user.getUserInfo(function(res) {
            userHTML = _ym.renderHTML(templateIndex, res);
            $('.panel-body').html(userHTML);
        }, function(errMsg) {
            _user.errorTips(errMsg);
        });
    },
}

$(function() {
    page.init();
})