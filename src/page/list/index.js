'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')

var navSide = require('page/common/nav-side/index.js');
var _ym = require('util/ym.js');
var _product = require('service/product-service.js')
var templateIndex = require('./index.string')
var Pagination = require('util/pagination/index.js')

var page =  {

    data : {
        listParam : {
            keyword     : _ym.getUrlParam("keyword") || '',
            categoryId  : _ym.getUrlParam("categoryId") || '',
            orderBy     : _ym.getUrlParam("orderBy")    || 'default',
            pageNum     : _ym.getUrlParam("pageNum")    || 1,
            pageSize    : _ym.getUrlParam("pageSize")   || 20,
        }
    },

    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        this.loadList();
    },
    bindEvent : function() {
        var _this = this;
        
        $('.sort-item').click(function() {
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            //点击默认排序
            if ($this.data('type') === 'default') {
                //已经有active样式
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default;'
                }
            }
            //点击价格排序
            else if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item')
                .removeClass('active asc desc');
                //升序
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc'
                } 
                //降序
                else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_dasc'
                }
            }
            _this.loadList();
        });
    },
    //加载list数据
    loadList : function() {
        
        var _this   = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');


        $pListCon.html('<div class="loading"></div>');
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);

        //请求
        _product.getProductList(listParam, function(res) {
            listHtml = _ym.renderHTML(templateIndex, {
                list : res.list,
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages,
            });
        }, function(errMsg) {
            _ym.errorTips(errMsg);
        });
    },

    //加载分页信息
    loadPagination  : function(pageInfo) {
        var _this = this;
        this.pagination ? "" : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
}

$(function() {
    page.init();
})