'use strict'

var _ym = require('util/ym.js');
var _address = require('service/address-service.js')
var templateAddressModal = require('./address-modal.string')
var _cities = require('util/cities/index.js');

var addressModal =  {
    show : function(option) {
        //缓存option方便复用
        this.option = option;
        this.$modalWrap = $('.modal-wrap');
        //渲染模板
        this.loadModal();

        //绑定事件
        this.bindEvent();
    },
    //关闭弹窗
    hide : function() {
        this.$modalWrap.empty();
    },

    bindEvent : function() {
        var _this = this;
        //选择省份城市二级联动
        this.$modalWrap.find('#receiver-province').change(function() {
            var selectProvince = $(this).val();
            _this.loadCities(selectProvince);            
        });
        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function() {
            var receiverInfo = _this.getReceverInfo(),
                isUpdate     = _this.option.isUpdate;
            
            //使用新地址且验证通过    
            if (!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function(res){
                    _ym.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _ym.errorTips(errMsg);
                });
            }
            //更新地址
            else if (isUpdate && receiverInfo.status) {

            }
            //验证不通过
            else {
                _ym.errorTips(receiverInfo.errMsg || '好像哪里不对了？');
            }
        });
        
        //点击x或者蒙版区关闭弹窗
        this.$modalWrap.find('.close').click(function() {
            _this.hide();            
        });

        //防止事件冒泡到内容区
        this.$modalWrap.find('.modal-container').click(function(e) {
            e.stopPropagation();      
        });
    },

    loadModal : function() {
        var addressModalHtml = _ym.renderHTML(templateAddressModal, this.option.data);
        this.$modalWrap.html(addressModalHtml);
        //加载省份城市
        this.loadProvince();
        this.loadCities();
    },
    //加载省份城市
    loadProvince : function() {
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
    },

    loadCities : function(provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citiesSelect = this.$modalWrap.find('#receiver-city');
        $citiesSelect.html(this.getSelectOption(cities));
    },


    //获取select框的选项,输入数组，输出HTML
    getSelectOption : function(optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, len = optionArray.length; i < len; i++) {
            html += `<option value="${optionArray[i]}">${optionArray[i]}</option>`;
        }
        return html;
    },
    //获取表单信息,并做表单验证
    getReceverInfo : function() {
        var 
            receiverInfo = {},
            result = {
                status : false,
            };
        receiverInfo.receiverName       = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince   = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity       = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverAddress    = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone      = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip        = $.trim(this.$modalWrap.find('#receiver-zip').val());


        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        }
        else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        }
        else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        }
        else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请选择收件人信息地址';
        }
        else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请选择收件人手机号';
        }
        //用过所有验证
        else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    }


}

module.exports = addressModal;