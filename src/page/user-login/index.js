'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _ym = require('util/ym.js');
var _user = require('service/user-service.js')


var formError = {
    show : function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(errMsg) {
        $('.error-item').hide().find('.err-msg').text('');
    },
}


var page = {
    init : function() {
        this.bindEvent();
    },
    bindEvent : function() {
        var _this = this;
        $('#submit').click(function() {
            _this.submit();
        });
        $('.user-content').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    //表单提交
    submit : function() {
        var 
            formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val()),
            },
            //表单验证结果
            validateRes = this.formValidate(formData);
        if (validateRes.status) {
            _user.login(formData, function(res) {
                window.location.href = _ym.getUrlParam('redirect') || './index.html';
            }, function(errMsg) {
                formError.show(errMsg);
            })
        } else {
            formError.show(validateRes.msg);
        }
    },
    //表单字段验证
    formValidate : function(formData) {
        var res = {
            status : false,
            msg : "",
        };
        if (!_ym.validate(formData.username,'require')) {
            res.msg = '用户名不能为空';
            return res;
        }
        if (!_ym.validate(formData.password,'require')) {
            res.msg = '密码不能为空';
            return res;
        }
        //通过验证
        res.status = true;
        res.msg = "验证通过";
        return res; 
    }
}

$(function() {
    page.init();
})