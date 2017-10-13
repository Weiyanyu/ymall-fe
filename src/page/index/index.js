'use strict';

var _ym = require('util/ym.js');

var html = '<div>{{ data }}</div>';
var data = {
    data : 'test',
};

_ym.renterHTML(html, data);
console.log(_ym.renterHTML(html, data));