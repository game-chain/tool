$(document).ready(function () {
	var androidLink = ''; // 安卓下载链接
    var iosLink = ''; // 苹果下载链接
    if (Webkit.isAndroid()) {
    	if(Webkit.isWenxin()){
    		$(".header").show();
    		$(".header .hint .hintAndroid").show();
    	}
		versionAndroid();
	} else if (Webkit.isIos()) {
		if(Webkit.isWenxin()){
    		$(".header").show();
			$(".header .hint .hintIos").show();
    	}
		versionIos();
	} else {
		if(Webkit.isWenxin()){
    		$(".header").show();
    		$(".header .hint .hintAndroid").show();
    	}
		versionAndroid();
		$(".btn span").css('cursor','no-drop')
    }
    
	/********************************** 提示框 **********************************/
    function getHint(text) {
        $("#hintBox").text(text)
        var height = $("#hintBox").innerHeight();
        $("#hintBox").css({'margin-top': '-' + (height / 2) + 'px'})
        $("#hintBox").show();
        setTimeout(function(){$("#hintBox").hide()}, 1500);
    }
    /********************************** 时间戳转化成时间 **********************************/
    function timestampToTime(timestamp) {
        timestamp = parseInt(timestamp);
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear().toString();
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1).toString();
        let D = date.getDate().toString();
        let h = date.getHours().toString();
        let m = date.getMinutes().toString();
        let s = date.getSeconds().toString();
        if (M.length < 2) {
            M = "0" + M;
        }
        if (D.length < 2) {
            D = "0" + D;
        }
        if (h.length < 2) {
            h = "0" + h;
        }
        if (m.length < 2) {
            m = "0" + m;
        }
        if (s.length < 2) {
            s = "0" + s;
        }
        return Y + "-" + M + "-" + D + " " + h + ':' + m + ':' + s;
        // return Y+M+D;
    }
    /********************************** 获取安卓下载链接 **********************************/
    function versionAndroid(){
        ajax({
            type: "GET",
            url: '/xb/version/android/android.json',
            success: function (rep) {
                if (rep.code == 100200) {
                    androidLink = rep.data.url;
                    $("#versionNum").text('版本：' + rep.data.versionNum);
                    $("#fileSize").text('大小：' + rep.data.fileSize);
                    $("#createTime").text('更新于：' + timestampToTime(rep.data.createTime));
                    //利用插件生成二维码,生成的二维码在canvas中
                    $("#download_canvas").qrcode({
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
                    var mycanvas1= $("#download_canvas canvas")[0];

                    //将转换后的img标签插入到html中
                    var img = convertCanvasToImage(mycanvas1);
                    $('#download_img').append(img); //插入容器
                } else {
                    alert(rep.msg);
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
                    iosLink = rep.data.url;
                    $("#versionNum").text('版本：' + rep.data.versionNum);
                    $("#fileSize").text('大小：' + rep.data.fileSize);
                    $("#createTime").text('更新于：' + timestampToTime(rep.data.createTime));
                    //利用插件生成二维码,生成的二维码在canvas中
                    $("#download_canvas").qrcode({
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
                    var mycanvas1= $("#download_canvas canvas")[0];

                    //将转换后的img标签插入到html中
                    var img = convertCanvasToImage(mycanvas1);
                    $('#download_img').append(img); //插入容器
                } else {
                    alert(rep.msg);
                }
            }
        });
    }
    /********************************** 点击下载 **********************************/
    $(".btn span").click(function(){
     	if(Webkit.isWenxin()){
     		if (Webkit.isAndroid()) {
        		alert('点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可安装');
        	} else if (Webkit.isIos()) {
        		alert('点击右上角按钮，然后在弹出的菜单中，点击在Safari中打开，即可安装');
        	}
        } else {
        	if (Webkit.isAndroid()) {
        		window.location.href = androidLink;
        	} else if (Webkit.isIos()) {
        		window.location.href = iosLink;
        	}
        }
    });
});










