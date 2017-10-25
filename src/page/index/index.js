'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
require('util/slider/index.js')

var _ym = require('util/ym.js');
var templateBanner = require('./banner.string')

$(function() {
    //渲染banner HTML
    var bannerHTML = _ym.renderHTML(templateBanner);
    $('.banner-con').html(bannerHTML)
    //初始化banner
    var $slider = $('.banner').unslider({
        dots: true,
    });

    //事件绑定
    $('.banner-con .banner-arrow').click(function() {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
    
});

 