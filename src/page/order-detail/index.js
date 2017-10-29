'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')
var navSide = require('page/common/nav-side/index.js');
var _ym = require('util/ym.js');
var _order = require('service/order-service.js')
var templateOrder = require('./index.string')


var page = {

    data : {
        orderNumber : _ym.getUrlParam('orderNumber'),
    },

    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        navSide.init({
            name : 'order-detail',
        })
        this.loadDetail();
    },

    bindEvent : function() {
        var _this = this;
        $(document).on('click', '.order-cancel', function() {
            if (window.confirm('确定取消该订单吗？')) {
                _order.cancelOrder(_this.data.orderNumber, function(res){
                    _ym.successTips('订单取消成功!');
                    _this.loadDetail();
                }, function(errMsg) {
                    _ym.errorTips(errMsg);
                });
            }
        });
    },

    //加载订单详情
    loadDetail : function() {
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>')
        _order.getOrderDetail(_this.data.orderNumber, function(res) {
            //处理数据
            _this.dataFilter(res);
            //渲染HTML
            orderDetailHtml = _ym.renderHTML(templateOrder, res);
            $content.html(orderDetailHtml);
        }, function(errMsg) {
            $content.html(`<p class="err-tip">${errMsg}</p>`)
        });
    },
    
    //处理数据
    dataFilter : function(data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    },

}

$(function() {
    page.init();
})