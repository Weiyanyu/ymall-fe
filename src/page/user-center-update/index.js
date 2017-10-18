'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')

var navSide = require('page/common/nav-side/index.js');
var _ym = require('util/ym.js');
var _user = require('service/user-service.js')
var templateIndex = require('./index.string')

var page = {
    init : function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function() {
        navSide.init({
            name : 'user-center',
        })
        this.loadUserInfo();
    },

    bindEvent : function() {
        var _this = this;
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val()),
            };
            var validResult = _this.validateForm(userInfo);
            if (validResult.status) {
                //更改用户信息
                _user.updateUserInfo(userInfo, function(res) {
                    _ym.successTips('更新成功');
                    window.location.href = './user-center.html'
                }, function(errMsg) {
                    _ym.errorTips(errMsg);
                });
            }
            else {
                _ym.errorTips(validResult.msg);
            }
        });
    },
    loadUserInfo : function() {
        var userHTML = '';
        _user.getUserInfo(function(res) {
            userHTML = _ym.renderHTML(templateIndex, res);
            $('.panel-body').html(userHTML);
        }, function(errMsg) {

        });
    },

    //验证字段
    validateForm : function(formData) {
        var res = {
            status : false,
            msg : "",
        };

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
    },
}

$(function() {
    page.init();
})