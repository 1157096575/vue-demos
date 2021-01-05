let API_URL = ''; 

if(!!location.href.match('localhost')){//dev
    API_URL = 'xxxx';
}else{
    API_URL = 'xxx';
}
export default {
    API_URL: API_URL
    getMenuData: function (context, params) {
        return context.$axios({
            url: API_URL + '/common/getMenu',
            method: 'GET',
            params: params
        });
    },
    downloadUrl : function (url) {//4.1 下载阿里云文件接口
        return API_URL + '/common/file?url=' + url +'&token='+sessionStorage.getItem('token');
    }
}