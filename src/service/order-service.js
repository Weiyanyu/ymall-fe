'use strict';

var _ym = require('util/ym.js');

var _order = {
    //获取商品列表
    getProductList : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject,
        });
    }, 
    //提交订单
    createOrder : function(orderInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/order/create.do'),
            data    : orderInfo,
            success : resolve,
            error   : reject,
        });
    }, 
};

module.exports = _order;



