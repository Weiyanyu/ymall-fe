'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')

var navSide = require('page/common/nav-side/index.js');
var _ym = require('util/ym.js');
var _product = require('service/product-service.js')
var templateIndex = require('./index.string')

var page =  {

    data : {
        listParam : {
            keyword     : _ym.getUrlParam("keyword") || '',
            categoryId  : _ym.getUrlParam("categoryId") || '',
            orderBy     : _ym.getUrlParam("orderBy")    || 'default',
            pageNum     : _ym.getUrlParam("pageNum")    || 1,
            pageSize    : _ym.getUrlParam("pageSize")   || 20,
        }
    },

    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        this.loadList();
    },
    bindEvent : function() {

    },
    //加载list数据
    loadList : function() {
        
        var _this   = this,
            listHtml = '',
            listParam = this.data.listParam;

        _product.getProductList(listParam, function(res) {
            listHtml = _ym.renderHTML(templateIndex, {
                list : res.list,
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination(res.pageNum, res.pages);
        }, function(errMsg) {
            _ym.errorTips(errMsg);
        });
    },

    //加载分页信息
    loadPagination  : function(pageNum, pages) {

    }
}

$(function() {
    page.init();
})