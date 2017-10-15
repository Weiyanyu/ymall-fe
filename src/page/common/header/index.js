'use strict'

require('./index.css');

var _ym = require('util/ym.js');

//头部
var header = {
    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        var keyword = _ym.getUrlParam('keyword');
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function() {
        var _this = this;
        $('#search-btn').click(function() {
            _this.searchSubmit();
        });
        //回车后，也搜索提交
        $('#search-input').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    //搜索提交
    searchSubmit : function() {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _ym.goHome();
        }
    }
}

header.init();