'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')

var _ym = require('util/ym.js');
var _payment = require('service/payment-service.js')
var templatePayment = require('./index.string')


var page = {

    data : {
        orderNumber : _ym.getUrlParam('orderNumber'),
    },

    init : function() {
        this.onLoad();
    },
    onLoad : function() {
        this.loadPaymentInfo();
    },

    //加载订单详情
    loadPaymentInfo : function() {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>')
        _payment.getPaymentInfo(_this.data.orderNumber, function(res) {
            //渲染HTML
            paymentHtml = _ym.renderHTML(templatePayment, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg) {
            $pageWrap.html(`<p class="err-tip">${errMsg}</p>`)
        });
    },

    //监听订单状态
    listenOrderStatus : function() {
        var _this = this;
        this.paymentTimmer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber, function(res) {
                if (res === true) {
                    window.location.href = 
                    `./result.html?type=payment&orderNumber=${_this.data.orderNumber}`;
                } 
            });
        }, 5e3)
    }
    

}

$(function() {
    page.init();
})