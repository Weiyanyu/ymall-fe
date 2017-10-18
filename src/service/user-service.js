'use strict';

var _ym = require('util/ym.js');

var _user = {
    //登录
    login : function(userInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/login.do'),
            data : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    //注册
    register : function(userInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/register.do'),
            data : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    updateUserInfo : function(userInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/update_information.do'),
            data : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    //检查登录
    checkLogin : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    //检查用户名
    checkUsername : function(username, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/check_valid.do'),
            data    : {
                type : 'username',
                str  : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    //检查密保问题答案
    checkAnswer : function(userInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    //忘记密码情况下的重置密码
    resetPassword : function(userInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    //获取问题
    getQuestion : function(username, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username  : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    //获取用户信息
    getUserInfo : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    //登录状态下修改密码
    updatePassword : function(userInfo, resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    //登出
    logout : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },

    
};

module.exports = _user;



