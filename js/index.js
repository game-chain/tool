$(document).ready(function () {
    var androidLink = ''; // 安卓下载链接
    var iosLink = ''; // 苹果下载链接
    versionAndroid();
    versionIos();
    /********************************** 获取安卓下载链接 **********************************/
    function versionAndroid(){
        ajax({
            type: "GET",
            url: '/xb/version/android/android.json',
            success: function (rep) {
                if (rep.code == 100200) {
                    if(Webkit.isMobile()){
                        androidLink = 'http://demo.baina.org/game/h5/html/download.html';
                    } else {
                        androidLink = rep.data.url;
                    }
                    //利用插件生成二维码,生成的二维码在canvas中
                    $("#download_android_canvas").qrcode({
                        render: "canvas",
                        width: 200,
                        height:200,
                        text: 'http://demo.baina.org/game/h5/html/download.html'
                    });
                    //从canvas中提取图片image
                    function convertCanvasToImage(canvas) {
                        //新Image对象，可以理解为DOM
                        var image = new Image();
                        // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
                        // 指定格式PNG
                        image.src = canvas.toDataURL("image/png");
                        return image;
                    }

                    //获取网页中的canvas对象
                    var mycanvas1= $("#download_android_canvas canvas")[0];

                    //将转换后的img标签插入到html中
                    var img = convertCanvasToImage(mycanvas1);
                    $('#download_android_img').append(img); //插入容器
                } else {
                    getHint(rep.msg);
                }
            }
        });
    }
    /********************************** 获取苹果下载链接 **********************************/
    function versionIos(){
        ajax({
            type: "GET",
            url: '/xb/version/ios/ios.json',
            success: function (rep) {
                if (rep.code == 100200) {
                    if(Webkit.isMobile()){
                        iosLink = 'http://demo.baina.org/game/h5/html/download.html';
                    } else {
                        iosLink = rep.data.url;
                    }
                    //利用插件生成二维码,生成的二维码在canvas中
                    $("#download_ios_canvas").qrcode({
                        render: "canvas",
                        width: 200,
                        height:200,
                        text: 'http://demo.baina.org/game/h5/html/download.html'
                    });
                    //从canvas中提取图片image
                    function convertCanvasToImage(canvas) {
                        //新Image对象，可以理解为DOM
                        var image = new Image();
                        // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
                        // 指定格式PNG
                        image.src = canvas.toDataURL("image/png");
                        return image;
                    }

                    //获取网页中的canvas对象
                    var mycanvas1= $("#download_ios_canvas canvas")[0];

                    //将转换后的img标签插入到html中
                    var img = convertCanvasToImage(mycanvas1);
                    $('#download_ios_img').append(img); //插入容器
                } else {
                    getHint(rep.msg);
                }
            }
        });
    }
     /********************************** 点击安卓下载 **********************************/
    $("#download_android_btn").click(function(){
        window.location.href = androidLink;
        /*if(Webkit.isWenxin()){
            if(Webkit.isAndroid()){
                $("#hintAndroid").show(); 
            } else {
                 $("#hintIos").show(); 
            }
        } else {
            window.location.href = androidLink;
        }*/
     });
    /********************************** 点击苹果下载 **********************************/
    $("#download_ios_btn").click(function(){
        window.location.href = iosLink;
        /*if(Webkit.isWenxin()){
            if(Webkit.isAndroid()){
                $("#hintAndroid").show(); 
            } else {
                 $("#hintIos").show(); 
            }
        } else {
            window.location.href = iosLink;
        }*/
     });
    /********************************** 点击安卓下载提示框 **********************************/
    $("#hintAndroid").click(function(){
        $("#hintAndroid").hide(); 
     });
    /********************************** 点击苹果下载提示框 **********************************/
     $("#hintIos").click(function(){
        $("#hintIos").hide(); 
     });

    var copyWeibo = document.getElementById('copyWeibo');
    var copyWeixin = document.getElementById('copyWeixin');
    var copyEmail = document.getElementById('copyEmail');
    var clipboardWeibo = new Clipboard(copyWeibo);
    var clipboardWeixin = new Clipboard(copyWeixin);
    var clipboardEmail = new Clipboard(copyEmail);

    clipboardWeibo.on('success', function(e) {
        $.message('复制成功');
    });

    clipboardWeixin.on('success', function(e) {
        $.message('复制成功');
    });

    clipboardEmail.on('success', function(e) {
        $.message('复制成功');
    });

    clipboardWeibo.on('error', function(e) {
        $.message({
            message:'复制失败，请手动复制',
            type:'error'
        });
    });

    clipboardWeixin.on('error', function(e) {
        $.message({
            message:'复制失败，请手动复制',
            type:'error'
        });
    });

    clipboardEmail.on('error', function(e) {
        $.message({
            message:'复制失败，请手动复制',
            type:'error'
        });
    });

});










