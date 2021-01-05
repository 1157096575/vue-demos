//格式化数字(补全2个小数点)(主要针对金额)
export const numFormat = (value) => {
    if(!value) return '0.00';

    var intPart = parseInt(value).toString(); //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    var floatPart = ".00"; //预定义小数部分
    var value2Array;
    if(value){
      value2Array =  value.toString().split(".");
    }
    //=2表示数据有小数位
    if(value2Array.length == 2) {
        floatPart = value2Array[1].toString().substring(0,2); //拿到小数部分

        if(floatPart.length == 1) { //补0,实际上用不着
            return intPartFormat + "." + floatPart + '0';
        } else {
            return intPartFormat + "." + floatPart;
        }

    } else {
        return intPartFormat + floatPart;
    }
};
//不补全小数点
export const numFormatOri = (value) => {
    if(!value) return '0';

    var intPart = parseInt(value).toString(); //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    var floatPart = ""; //预定义小数部分
    var value2Array;
    if(value){
      value2Array =  value.toString().split(".");
    }
    //=2表示数据有小数位
    if(value2Array.length == 2) {
        floatPart = value2Array[1].toString(); //拿到小数部分

        if(floatPart.length >= 1) { 
            return intPartFormat + "." + floatPart;
        } 

    } else {
        return intPartFormat + floatPart;
    }
};
//不补全小数点,最多保存10位小数点
export const numFormatPoint10 = (value) => {
    if(!value) return '0';

    var intPart = parseInt(value).toString(); //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    var floatPart = ""; //预定义小数部分
    var value2Array;
    if(value){
      value2Array =  value.toString().split(".");
    }
    //=2表示数据有小数位
    if(value2Array.length == 2) {
        floatPart = value2Array[1].toString(); //拿到小数部分
        if(floatPart.length >= 10) {
            floatPart = floatPart.substring(0,10);
        }
        if(floatPart.length >= 1) { 
            return intPartFormat + "." + floatPart;
        } 

    } else {
        return intPartFormat + floatPart;
    }
};
//不补全小数点,最多保存2位小数点
export const numFormatPoint2 = (value) => {
    if(!value) return '0';

    var intPart = parseInt(value).toString(); //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    var floatPart = ""; //预定义小数部分
    var value2Array;
    if(value){
      value2Array =  value.toString().split(".");
    }
    //=2表示数据有小数位
    if(value2Array.length == 2) {
        floatPart = value2Array[1].toString(); //拿到小数部分
        if(floatPart.length >= 2) {
            floatPart = floatPart.substring(0,2);
        }
        if(floatPart.length >= 1) { 
            return intPartFormat + "." + floatPart;
        } 

    } else {
        return intPartFormat + floatPart;
    }
};

//不补全小数点,最多保存2位小数点
export const numFormatPoint02 = (value) => {
    if(value === 0) return '0';
    if(!value) return '';

    var intPart = parseInt(value).toString(); //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    var floatPart = ""; //预定义小数部分
    var value2Array;
    if(value){
      value2Array =  value.toString().split(".");
    }
    //=2表示数据有小数位
    if(value2Array.length == 2) {
        floatPart = value2Array[1].toString(); //拿到小数部分
        if(floatPart.length >= 2) {
            floatPart = floatPart.substring(0,2);
        }
        if(floatPart.length >= 1) { 
            return intPartFormat + "." + floatPart;
        } 

    } else {
        return intPartFormat + floatPart;
    }
};
//不要小数点并且四舍五入
export const numFormatNoPoint = (value) => {
    if(value === 0) return '0';
    if(!value) return '';
    if(value && typeof value === 'number' && value % 1 != 0) {
        value = (parseInt(value)).toFixed(0);
    }
    return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
};

import Vue from 'vue';
Vue.filter('NumFormat', numFormat);
Vue.filter('NumFormatOri', numFormatOri);
Vue.filter('NumFormatPoint2', numFormatPoint2);
Vue.filter('NumFormatPoint02', numFormatPoint02);
Vue.filter('NumFormatNoPoint', numFormatNoPoint);