'use strict';

var _ym = require('util/ym.js');

var _address = {
    getAddressList : function(resolve, reject) {
        _ym.request({
            url     : _ym.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50,
            },
            success : resolve,
            error   : reject,
        });
    }, 
};

module.exports = _address;



