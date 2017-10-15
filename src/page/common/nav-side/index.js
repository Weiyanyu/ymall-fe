'use strict'


require('./index.css');
var _ym = require('util/ym.js');
var templateIndex = require('./index.string')

var navSide = {
    option: {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href : '/user-center.html'},
            {name : 'order-list', desc : '我的订单', href : '/order-list.html'},
            {name : 'pass-update', desc : '修改密码', href : '/pass-update.html'},
            {name : 'about', desc : '关于YMALL', href : '/about.html'},
        ],
    },
    init : function(option) {
        //合并选项
        $.extend(this.option, option);
        this.renderNav();
        return this;
    },
    renderNav : function() {
        // 计算active数据
        for (var i = 0 , iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }

        //渲染HTML
        var navHtml = _ym.renterHTML(templateIndex, {
            navList : this.option.navList
        });

        $('.nav-side').html(navHtml)
    }
}

module.exports = navSide