'use strict';

var _ym = require('util/ym.js');

var _cart = {

    getCartCount : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject,
        });
    },

    
};

module.exports = _cart;



