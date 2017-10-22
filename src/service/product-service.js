'use strict';

var _ym = require('util/ym.js');

var _product = {
    //获取商品列表
    getProductList : function(listParam, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/product/list.do'),
            data : listParam,
            success : resolve,
            error   : reject,
        });
    },
    //获取商品详情
    getProductDetail : function(productId, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/product/detail.do'),
            data : {
                productId : productId,
            },

            success : resolve,
            error   : reject,
        });
    }
    
};

module.exports = _product;



