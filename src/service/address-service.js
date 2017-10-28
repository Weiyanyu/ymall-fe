'use strict';

var _ym = require('util/ym.js');

var _address = {
    getAddressList : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50,
            },
            success : resolve,
            error   : reject,
        });
    },
    
    //保存地址
    save : function(addressInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject,
        });
    }, 

    //获取地址
    getAddress : function(shippingId, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId,
            },
            success : resolve,
            error   : reject,
        });
    },
    
    //更新收货地址
    update : function(addressInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject,
        });
    },
    //删除地址
    deleteAddress : function(shippingId, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/shipping/delete.do'),
            data    : {
                shippingId : shippingId,
            },
            success : resolve,
            error   : reject,
        });
    }, 
};

module.exports = _address;



