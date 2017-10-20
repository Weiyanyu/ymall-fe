'use strict';

var _ym = require('util/ym.js');

var _product = {
    //登录
    getProductList : function(listParam, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/product/list.do'),
            data : listParam,
            success : resolve,
            error   : reject,
        });
    },
    
};

module.exports = _product;



