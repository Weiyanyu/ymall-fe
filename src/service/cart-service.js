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

    //获取购物车列表
    getCartList : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject,
        });
    },

    //选择商品
    selectProduct : function(productId, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/select.do'),
            data    : {
                productId : productId,
            },
            success : resolve,
            error   : reject,
        });
    },
    
    //取消选中
    unselectProduct : function(productId, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/un_select.do'),
            data    : {
                productId : productId,
            },
            success : resolve,
            error   : reject,
        });
    },

    //全选
    selectAllProduct : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject,
        });
    },

    //非全选
    unselectAllProduct : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject,
        });
    },

        
    //更新购物车中产品信息（价格，数量等等）
    updateProduct : function(productInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject,
        });
    },

    //删除购物车里的商品
    deleteProduct : function(productIds, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds,
            },
            success : resolve,
            error   : reject,
        });
    },



    
};

module.exports = _cart;



