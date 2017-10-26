'use strict';

var _ym = require('util/ym.js');

var _order = {
    getProductList : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject,
        });
    }, 
};

module.exports = _order;



