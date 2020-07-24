var DEFAULT_BROKER_ID = 10003;
var DEFAULT_TIMEOUT = 30000;

var REG_NAME = /^(?=.*\d)(?=.*[a-zA-Z])[0-9A-Za-z]{6,20}/; // 账号
var REG_PHONE = /^(1)\d{10}$/; // 手机号
var REG_EMAIL = /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; // 邮箱
var REG_CODE = /^[0-9]{6}$/; // 验证码
var REG_LOGPWD = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*)[\da-zA-Z~]{10,20}$/; // 登录密码
var REG_PAYPWD= /^[0-9]{6}$/; // 交易密码
var REG_INVIYRCODE = /^[0-9]{6}$/; // 邀请码
var REG_UID = /^[0-9]{6}$/; // uid
var REG_NUMBER = /^[1-9][0-9]*$/;//数字（不以0开头的数字，不限位数）

/********************************** 封装ajax **********************************/
function stringifyHeader(param) {
    var results = [];
    if ($.isEmptyObject(param) === true) {
        return '';
    }
    $.map(param, (value, key) => {
        let valueTemp = window.encodeURIComponent(value);
        results.push(`${key}=${valueTemp}`);
    });
    return results.join(',');
}

function getAuthHeader(param) {
    var headers = {
        'accept-language': 'zh-CN'
    };
    var auth = {};
    if (param && $.isEmptyObject(param) === false) {
        auth = $.extend(auth , param);
    }
    if ($.isEmptyObject(auth) === false) {
        headers.authorization = stringifyHeader(auth);
    }
    return headers;
}
function ajax(mgt) {
    mgt = mgt || {};
    mgt.type = mgt.type || 'POST';
    mgt.dataType = mgt.dataType || 'JSON';
    mgt.url = mgt.url || '';
    mgt.success = mgt.success || function (data) {
        };
    mgt.error = mgt.error || function (data) {
        };
    mgt.async = mgt.async == false ? false : true;
    mgt.contentType = mgt.contentType || "application/json; charset=UTF-8";
    mgt.data = mgt.data || {};
    mgt.timeout = mgt.timeout || DEFAULT_TIMEOUT;
    mgt.headers = getAuthHeader(mgt.headers);
    $.ajax({
        url: mgt.url, // 请求地址
        type: mgt.type, // 请求类型 get/post
        dataType: mgt.dataType, // 请求数据类型 json/jsonp等
        contentType: mgt.contentType,
        data: mgt.data, // 请求参数
        async:mgt.async,
        timeout: mgt.timeout,
        headers: mgt.headers,
        success: function (data) {
            mgt.success(data);
        },
        error: function (data) {
            mgt.error(data);
        }
    });
}