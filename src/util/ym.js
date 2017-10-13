'use strict';

const Hogan = require('hogan');

var conf = {
    serverHost : '',
};



var _ym = {
    request : function(param) {
        var _this = this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',
            data     : param.data   || '',
            success  : function(res) {
                //获取数据成功
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //强制登录 
                else if (res.status === 10) {
                    _this.doLogin();
                }
                //请求数据错误
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error    : function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            },
        })
    },
    //获取服务器地址
    getServerUrl : function(path) {
        return conf.serverHost + path;
    },
    //获取URL参数
    getUrlParam : function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substring(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    //渲染HTML模板
    renterHTML : function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
        return result;
    },

    //成功提示
    successTips : function(msg) {
        alert(msg || '操作成功');
    },
    errorTips : function(msg) {
        alert(msg || '出错了！！');
    },

    //表单字段验证
    validate : function(value, type) {
        var value = $.trim(value);
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin : function() {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //回家(回到主页)
    goHome : function() {
        window.location.href = './index.html?redirect=';
    }
};

module.exports = _ym;