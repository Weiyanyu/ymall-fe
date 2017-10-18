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

        //验证username
        $('#username').blur(function() {
            var username = $.trim($(this).val());
            if (!username) {
                return;
            }
            //ajax异步验证
            _user.checkUsername(username, function(res) {
                formError.hide();
            }, function(errMsg) {
                formError.show(errMsg);
            });
        })

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
                username        : $.trim($('#username').val()),
                password        : $.trim($('#password').val()),
                passwordConfrim : $.trim($('#password-comfirm').val()),
                phone           : $.trim($('#phone').val()),
                email           : $.trim($('#email').val()),
                question        : $.trim($('#question').val()),
                answer          : $.trim($('#answer').val()),
            },
            //表单验证结果
            validateRes = this.formValidate(formData);
        //验证成功
        if (validateRes.status) {
            _user.register(formData, function(res) {
                window.location.href = './result.html?type=register';
            }, function(errMsg) {
                formError.show(errMsg);
            })
        } 
        //验证失败
        else {
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
        //验证密码长度
        if (formData.password.length < 6) {
            res.msg = '密码不能少于6位';
            return res;
        }

        if (formData.passwordConfrim !== formData.password) {
            res.msg = '两次输入密码不一致';
            return res;
        }

        if (!_ym.validate(formData.phone,'phone')) {
            res.msg = '手机号格式不正确';
            return res;
        }

        if (!_ym.validate(formData.email,'email')) {
            res.msg = '邮箱格式不正确';
            return res;
        }

        if (!_ym.validate(formData.question,'require')) {
            res.msg = '密保问题不能为空';
            return res;
        }

        if (!_ym.validate(formData.answer,'require')) {
            res.msg = '密保答案不能为空';
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