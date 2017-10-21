
'use strict';

require('./index.css');
var _ym = require('util/ym.js');
var templatePagination = require('./index.string');

var Pagination = function() {

    var _this = this;

    this.defaultOption = {
        container    : null,
        pageNum      : 1,
        pageRange    : 3,
        onSelectPage : null,
    };

    $(document).on('click', '.pg-item', function() {
        var $this = $(this);
        if ($this.hasClass('disabled') || $this.hasClass('active')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ? 
            _this.option.onSelectPage($this.data('value')) : null; 
    });

};

//渲染分页组件
Pagination.prototype.render = function(userOption) {
    this.option = $.extend({}, this.defaultOption, userOption);
    //判断容器是否是jquery对象
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    //判断是否只有1页，1页就没必要显示pagination了
    if (this.option.pages <= 1) {
        return;
    }
    this.option.container.html(this.getPaginationHTML());
};

//获取分页的HTML
Pagination.prototype.getPaginationHTML = function() {
    var 
        html = "",
        option = this.option,
        pageArray = [],
        start = option.pageNum - option.pageRange > 0 ?
            option.pageNum -  option.pageRange : 1,

        end = option.pageNum + option.pageRange < option.pages ? 
            option.pageNum + option.pageRange : option.pages;

    //上一页按钮
    pageArray.push({
        name        : '上一页',
        value       : option.prePage,
        disabled    : !option.hasPreviousPage, 
    });

    for (var i = start; i <= end; i++) {
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum),
        })
    }

    //下一页
    pageArray.push({
        name        : '下一页',
        value       : option.nextPage,
        disabled    : !option.hasNextPage, 
    });

    html = _ym.renderHTML(templatePagination, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    })
    return html;
};

module.exports = Pagination;
