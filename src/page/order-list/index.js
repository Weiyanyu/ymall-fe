'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')
var navSide = require('page/common/nav-side/index.js');
var _ym = require('util/ym.js');
var _order = require('service/order-service.js')
var Pagination = require('util/pagination/index.js')
var templateOrder = require('./index.string')


var page = {

    data : {
        listParam : {
            pageNum : 1,
            pageSize : 10,
        },
    },

    init : function() {
        this.onLoad();
    },
    onLoad : function() {
        this.loadOrderList();
        navSide.init({
            name : 'order-list',
        })
    },

    //加载订单详情
    loadOrderList : function() {
        var _this = this,
            orderListHtml = '',
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>')
        _order.getOrderList(_this.data.listParam, function(res) {
            //渲染HTML
            orderListHtml = _ym.renderHTML(templateOrder, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages,
            });
        }, function(errMsg) {
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>')
        });
    }, 


    //加载分页信息
    loadPagination  : function(pageInfo) {
        var _this = this;
        this.pagination ? "" : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
}

$(function() {
    page.init();
})