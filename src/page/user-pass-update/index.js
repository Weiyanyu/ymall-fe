'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')

var navSide = require('page/common/nav-side/index.js');
var _ym = require('util/ym.js');
var _user = require('service/user-service.js')

var page = {
    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        navSide.init({
            name : 'user-pass-update',
        })
    },

    bindEvent : function() {
        var _this = this;
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confrim').val()),
            };
            var validResult = _this.validateForm(userInfo);
            if (validResult.status) {
                //更改用户信息
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew,
                }, function(res, msg) {
                    _ym.successTips(msg);
                }, function(errMsg) {
                    _ym.errorTips(errMsg);
                });
            }
            else {
                _ym.errorTips(validResult.msg);
            }
        });
    },

    //验证字段
    validateForm : function(formData) {
        var res = {
            status : false,
            msg : "",
        };

        
        if (!_ym.validate(formData.password,'require')) {
            res.msg = '原密码不能为空';
            return res;
        }

        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            res.msg = '密码不能小于6位';
            return res;
        }

        if (formData.passwordNew !== formData.passwordConfirm) {
            res.msg = '两次输入密码不一致';
            return res;
        }

        //通过验证
        res.status = true;
        res.msg = "验证通过";
        return res; 
    },
}

$(function() {
    page.init();
})