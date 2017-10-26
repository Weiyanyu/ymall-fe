'use strict'

require('page/common/header/index.js');
require('./index.css')

require('page/common/nav/index.js');

var _ym = require('util/ym.js');
var _order = require('service/order-service.js')
var _address = require('service/address-service.js')
var templateProduct = require('./product-list.string')
var templateAddress = require('./address-list.string')

var page =  {
    
    data : {
        selectedAddressId : null,
    },

    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function() {
        var _this = this;
        // // 选择 / 取消选择
        // $(document).on('click', '.cart-select', function(){
        //     var $this = $(this),
        //         productId = $this.parents('.cart-table').data('product-id');
        //     // 选中
        //     if($this.is(':checked')){
        //         _cart.selectProduct(productId, function(res){
        //             _this.renderCart(res);
        //         }, function(errMsg){
        //             _this.showCartError();
        //         });
        //     }
        //     // 取消选中
        //     else{
        //         _cart.unselectProduct(productId, function(res){
        //             _this.renderCart(res);
        //         }, function(errMsg){
        //             _this.showCartError();
        //         });
        //     }
        // });
    },
    
    /*加载地址列表*/ 
    loadAddressList : function() {
        var 
            _this = this;
        
        _address.getAddressList(function(res) {
            var AddressListHtml = _ym.renderHTML(templateAddress, res);
            $('.address-con').html(AddressListHtml);
        }, function(errMsg) {
            $('.address-con').html('<p class="err-tips">地址加载失败，请刷新重试</p>')
        });
    },

    /*加载商品信息列表*/ 
    loadProductList : function() {
        var 
            _this = this;
        
        _order.getProductList(function(res) {
            var productListHtml = _ym.renderHTML(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(errMsg) {
            $('.product-con').html('<p class="err-tips">商品信息加载失败，请刷新重试</p>')
        });
    },
}

$(function() {
    page.init();
})