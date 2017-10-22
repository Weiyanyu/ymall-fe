'use strict';

var _ym = require('util/ym.js');

var _cart = {
    //获取购物车数量
    getCartCount : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject,
        });
    },

    //添加到购物车
    addToCart : function(productInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject,
        });
    },

    
};

module.exports = _cart;



