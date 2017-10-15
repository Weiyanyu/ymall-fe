'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _ym = require('util/ym.js');


$(function() {
    var type = _ym.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    //显示对应元素
    $element.show();
})