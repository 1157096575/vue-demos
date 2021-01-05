export const broserVersionUpdate = () => {
    var DEFAULT_VERSION = "10.0";
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie")>-1;
    var safariVersion;
    if(isIE){
        safariVersion =  ua.match(/msie ([\d.]+)/)[1];
    }
    if(safariVersion < parseFloat(DEFAULT_VERSION) ){
        //var html = "";
        //html += "<div class='ie8Text'>您的浏览器版本过低，为了更好的体验系统功能，推荐下载安装<a class='ie8Btn' target= _blank href='https://www.google.cn/intl/zh-CN/chrome'>谷歌浏览器</a> 获取更好的使用体验！</div>";
        //$("body").append(html);
        return true;
    }
    return false;
};