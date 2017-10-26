'use strict'

require('page/common/header/index.js');
require('./index.css')

var nav = require('page/common/nav/index.js');
var _ym = require('util/ym.js');
var _cart = require('service/cart-service.js')
var templateIndex = require('./index.string')

var page =  {

    data : {
        
    },

    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        this.loadCart();
    },
    bindEvent : function() {
        var _this = this;
        // 选择 / 取消选择
        $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            // 选中
            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            // 取消选中
            else{
                _cart.unselectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        // 商品的全选 / 取消全选
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            // 全选
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            // 取消全选
            else{
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        //商品数量变化
        $(document).on('click', '.count-btn', function(){
            var $this = $(this),
                $Pcount         = $this.siblings('.count-input'),
                currentCount    = parseInt($Pcount.val()),
                type            = $this.hasClass('plus') ? 'plus' : 'minus',
                productId       = $this.parents('.cart-table').data('product-id'),
                minCount        = 1,
                maxCount        = parseInt($Pcount.data('max')),
                newCount        = 0;
            if (type === 'plus') {
                if (currentCount >= maxCount) {
                    _ym.errorTips('该商品数量达到上限');
                    return;
                }
                newCount = currentCount + 1;
            } else if (type === 'minus') {
                if (currentCount <= minCount) {
                    return;
                }
                newCount = currentCount - 1;
            }
            //更新数量
            _cart.updateProduct({
                productId : productId,
                count     : newCount,   
            }, function(res) {
                _this.renderCart(res);
            }, function(errMsg) {
                _this.showCartError();
            })
        });

        //删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if (window.confirm('确认要删除该商品吗？')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        //删除选中的商品（可能有多选）
        $(document).on('click', '.delete-selected', function(){
            if (window.confirm('确认要删除这些商品吗？')) {
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                
                //查找选中的ID
                for (var i = 0; i < $selectedItem.length; i++) {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }

                if (arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','));
                }
                else {
                    _ym.errorTips('您还没有选中任何要删除的商品');
                }
            }
        }); 

        //提交
        $(document).on('click', '.btn-submit', function(){
            //总价大于0就提交
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = "./order-confirm.html";

            } else {
                _ym.errorTips('请选择商品后再提交');
            }
        });   
    },
    //加载购物车数据
    loadCart : function() {
        var 
            _this = this;
        
        _cart.getCartList(function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartErr();
        });

        // $pageWrap.html('<div class="loading"></div>')
    },

    //渲染购物车
    renderCart : function(data) {
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;

        var cartHTML = _ym.renderHTML(templateIndex, data);
        $('.page-wrap').html(cartHTML);

        //通知导航购物车更新数量
        nav.loadCartCount(); 
    },

    //数据匹配
    filter : function(data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },

    showCartError : function() {
        $('.page-wrap').html('<p class="err-tip">哪里不对了？刷新下试试吧！</p>  ');
    },

    //删除指定商品，支持批量，逗号分隔
    deleteCartProduct   : function(productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        });
    }
}
    
$(function() {
    page.init();
})