'use strict';

var _ym = require('util/ym.js');

var _user = {

    checkLogin : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/user/get_user_info.do'),
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



