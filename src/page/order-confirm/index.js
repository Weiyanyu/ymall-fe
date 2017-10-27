'use strict'

require('page/common/header/index.js');
require('./index.css')

require('page/common/nav/index.js');

var _ym = require('util/ym.js');
var _order = require('service/order-service.js')
var _address = require('service/address-service.js')
var templateProduct = require('./product-list.string')
var templateAddress = require('./address-list.string')
var addressModal = require('./address-modal.js')

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
        // 地址选择 / 取消选择
        $(document).on('click', '.address-item', function(){
            var $this = $(this);

            $this.addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $this.data('id');
        });

        $(document).on('click', '.order-submit', function(){
            var $this = $(this),
                shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId : shippingId,
                }, function(res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg) {
                    _ym.errorTips(errMsg);
                });
            } else {
                _ym.errorTips('请选择地址后再提交');
            }
        });

        //地址添加
        $(document).on('click', '.address-add', function(){
            var $this = $(this);
            addressModal.show({
                isUpdate    : false,
                onSuccess   : function() {
                    _this.loadAddressList();
                }
            })
        });
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