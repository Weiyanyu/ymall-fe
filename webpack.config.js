const path = require('path');
const webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置， dev/online

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);


//获取html-webpack-plugin参数的封装方法
var getHTMLConfig = function(name, title) {
    return {
        template : './src/view/' + name + '.html',
        filename : '/view/' + name + '.html',
        title : title,
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    };
}

//webpack config
var config = {
    entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'list'             : ['./src/page/list/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'user-pass-update' : ['./src/page/user-pass-update/index.js'],
        'result'            : ['./src/page/result/index.js']
    },
    output: {
        filename : 'js/[name].js',
        publicPath : '/dist',
        path : __dirname + '/dist/'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: "html-loader" },
        ]
    },
    resolve : {
        alias : {
            util           : __dirname + '/src/util',
            page           : __dirname + '/src/page',
            service        : __dirname + '/src/service',
            image          : __dirname + '/src/image',
            node_modules   : __dirname + '/node_modules',
        }
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js',
        }),
        //把CSS分离到dist文件里
        new ExtractTextPlugin("css/[name].css"),
        //HTML模板处理
        new HtmlWebpackPlugin(getHTMLConfig('index', '首页')),
        new HtmlWebpackPlugin(getHTMLConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHTMLConfig('user-register', '注册界面')),
        new HtmlWebpackPlugin(getHTMLConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHTMLConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHTMLConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHTMLConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHTMLConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHTMLConfig('result', '操作结果')),

        
    ],

};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;