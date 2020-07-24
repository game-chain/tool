var DEFAULT_TIMEOUT = 30000;

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