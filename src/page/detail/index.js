'use strict'
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')

var _ym = require('util/ym.js');
var _product = require('service/product-service.js')
var _cart = require('service/cart-service.js')
var templateIndex = require('./index.string')

var page =  {

    data : {
        productId : _ym.getUrlParam("productId") || '',
    },

    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        if (!this.data.productId) {
            _ym.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function() {
        var _this = this;
        //图片预览
        $(document).on('mouseenter', '.p-img-item', function() {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        //加减数量
        $(document).on('click', '.p-count-btn', function() {
            var 
                type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currentCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                $pCount.val(currentCount < maxCount ? currentCount + 1 : maxCount);
            }
            else if (type === 'minus') {
                $pCount.val(currentCount > minCount ? currentCount - 1 : minCount);
            }
        });
        //加入购物车
        $(document).on('click', '.cart-add', function() {
            _cart.addToCart({
                productId : _this.data.productId,
                count     : $('.p-count').val(),
            }, function(res) {
                window.location.href = "./result.html?type=cart-add";
            }, function(errMsg) {
                console.log('错误');
                _ym.errorTips(errMsg);
            });
        });
    },
    //加载detail数据
    loadDetail : function() {
        var 
            _this = this,
            html = '',
            $pageWrap = $('.page-wrap');

        $pageWrap.html('<div class="loading"></div>')
        _product.getProductDetail(this.data.productId, function(res) {
            _this.filter(res);
            //将res保存，方便复用
            _this.data.detailInfo = res;
            html = _ym.renderHTML(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip">找不到该商品了!</p>');
        });
    },
    filter : function(data) {
        data.subImages = data.subImages.split(',');
    }
}
    
$(function() {
    page.init();
})