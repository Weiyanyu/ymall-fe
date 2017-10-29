'use strict';

var _ym = require('util/ym.js');

var _payment = {
    //获取支付信息
    getPaymentInfo : function(orderNumber, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/order/pay.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject,
        });
    }, 
    //查看订单状态（轮询）
    getPaymentStatus : function(orderNumber, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject,
        });
    }, 
};

module.exports = _payment;



