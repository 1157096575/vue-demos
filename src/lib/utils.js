import verifyReg from 'lib/verifyReg';
/**
 * 函数去抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function(...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

/**
 * [异步组件加载函数]
 * @param  {[string]} name [组件名称]
 * @return {[promise]}      [组件]
 */
export const asyncComponent = (name) => {
    return resolve => require([`components/${name}`], resolve)
};

/**
 * [两个对象数组相比较，去除key值相同的项]
 * @param  a  [对象数组a]
 * @param  b  [对象数组b]
 * @param  k1  [对象数组a中每一项的key]
 * @param  k2  [对象数组b中每一项的key]
 */

//截取[]间的字符串
export const getSubStrBetween = (str) => {
    var iLen = str.length;
    if(iLen == 0){
        return '';
    }
    var iStart = str.indexOf('[');
    if (iStart == -1) return "";
    iStart += 1;
    var iEnd = str.indexOf("]", iStart);
    if (iEnd == -1) return "";
    return str.substring(iStart, iEnd);
};

//下载方法
export const downLoadFile = (url,name) => {
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    if(name){
        link.setAttribute('download',name);
    }else{
        link.setAttribute('download','file');
    }
    
    //link.setAttribute('download','file');
    document.body.appendChild(link);
    console.log(link)
    link.click();
    link.remove();
};

/**
 * [获取结束日期]
 * @param  Date startDate [起始日期]
 * * @param  Number days [N天]
 * @return Date     [结束日期]
 */
export const getEndDate = (startDate,days) => {
    if("" == startDate || "" == days){  
        return "";  
    }
    var days = parseInt(days)+1;//同一天算一天（客户要求）
    var date = new Date(startDate);  
    var newDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()+days);
    return newDate;
};
export const getEndDateFormat = (startDate,days) => {
    if("" == startDate || "" == days){  
        return "";  
    }
    var days = parseInt(days)-1; //同一天算一天（客户要求）
    var date = new Date(startDate);  
    var newDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()+days);
    var year = newDate.getFullYear();  
    var month = newDate.getMonth()+1;
    if(month&&month.toString().length<2){
        month = '0' + month;
    }
    var day = newDate.getDate(); 
    if(day&&day.toString().length<2){
        day = '0' + day;
    } 
    var endDate = year + '-' + month + '-' +day;
    return endDate;
};
export const newDateFormat = (date) => {
    var newDate;
    if(date){
        newDate = new Date(date);  
    }else{
        newDate = new Date();  
    }
    var year = newDate.getFullYear();  
    var month = newDate.getMonth()+1;
    if(month&&month.toString().length<2){
        month = '0' + month;
    }
    var day = newDate.getDate(); 
    if(day&&day.toString().length<2){
        day = '0' + day;
    } 
    var myDate = year + '-' + month + '-' +day;
    return myDate;
};

//计算2个日期间隔天数
export const DateDiff = (sDate1,  sDate2) => {
    //sDate1和sDate2是2002-12-18格式  
   //var  aDate,  oDate1,  oDate2,  iDays ;
   //var aDate  =  sDate1.split("-") ;
   //var oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);    //转换为12-18-2002格式  
   //var aDate2  =  sDate2.split("-");  
   //var oDate2  =  new  Date(aDate2[1]  +  '-'  +  aDate2[2]  +  '-'  +  aDate2[0]);  
   //var iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数 
   //return  parseInt(iDays+1); //同一天为1天（客户要求）
   var mydays = parseInt(Math.abs(new Date(sDate1)  -  new Date(sDate2))  /  1000  /  60  /  60  /24); 
   return mydays+1;
};

export const avoidTheSame = (a,b,k1,k2) => {
    if(b && b.length == 0){
        return a;
    }
    var c=new Array();
    for(var i=0;i<a.length;i++){
        var isEquals=false;
        for(var j=0;j<b.length;j++){
        if(a[i][k1]==b[j][k2]){
                  isEquals=true;
                  break;
            }
        }
        if(!isEquals)
        {
          c.push(a[i]);
        }
    }
    return c;
};
//avoidTheSame去除改为禁用
export const avoidTheSameDisabel = (a,b,k1,k2) => {
    if(b && b.length == 0){
        return a;
    }
    var c=new Array();
    for(var i=0;i<a.length;i++){
        var isEquals=false;
        for(var j=0;j<b.length;j++){
        if(a[i][k1]==b[j][k2]){
                a[i].disabled=true;
                  isEquals=true;
                  break;
            }
        }
        if(!isEquals)
        {
            a[i].disabled=false;
          //c.push(a[i]);
        }
        c.push(a[i]);
    }
    return c;
};

export const removeArrEmptyChildren = (arr) => {
    for(var k=0; k<arr.length;k++){
      var item = arr[k];
      for(var i in item){
        var v = item[i];      
        if (Array.isArray(v) && i == 'children'){
            if(v.length == 0 ){
                console.log('delete Array', i);
                delete item[i];
                continue;
            }else{
                removeArrEmptyChildren(item[i])    
            }
        }
      }
    }
    return arr;
};

//将树状数据的某一属性设为禁用(dis ==> 'disabled')
export const disabledTreeData = (arr, k, v, dis) => {
    var arr = arr || [];
    if(arr && arr.length > 0){
      for(var i=0; i<arr.length; i++){
        arr[i][dis] = false;
        if(arr[i][k] == v){
          arr[i][dis] = true;
        }
        if(arr[i].children && arr[i].children.length > 0){
          disabledTreeData(arr[i].children, k, v,dis)
        }
      }
    }
    return arr;
};
/**
 * [根据已知值获取其对应树状数据所在的联级arr]
 * @param  key  [已知值]
 * @param  treeData  [树状数据]
 * @param  keyWord  [树状数据每一项的值的key]
 */
export const getTreeDeepArr = (key, treeData, keyWord) => {
    let arr = []; // 在递归时操作的数组
    let returnArr = []; // 存放结果的数组
    let depth = 0; // 定义全局层级
    // 定义递归函数
    function childrenEach(childrenData, depthN) {
        for (var j = 0; j < childrenData.length; j++) {

            depth = depthN; // 将执行的层级赋值 到 全局层级

            arr[depthN] = (childrenData[j][keyWord]);
            
            if (childrenData[j][keyWord] == key) {

                // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
                returnArr = arr.slice(0, depthN+1); //将目前匹配的数组，截断并保存到结果数组，
                break

            } else {

                if (childrenData[j].children) {

                    depth ++;
                    childrenEach(childrenData[j].children, depth);

                }
            }

        }
        return returnArr;
    }
    return childrenEach(treeData, depth);
};

/**
 * [对象数组去重]
 * @param  array  [对象数组]
 * @param  k  [数组中每一项的key]
 */
export const uniqueObjArr = (array,k) => {
    var r = []; 
    for(var i = 0, l = array.length; i < l; i++) { 
      for(var j = i + 1; j < l; j++) 
        if (array[i][k] === array[j][k]) j = ++i; 
        r.push(array[i]); 
    } 
    return r;
};

/**
 * [数组去重]
 * @param  array  [数组]
 */
export const uniqueArr = (arr) => {
      var i,
      obj = {},
      result = [],
      len = arr.length;
     for(i = 0; i< arr.length; i++){
      if(!obj[arr[i]]){ //如果能查找到，证明数组元素重复了
       obj[arr[i]] = 1;
       result.push(arr[i]);
      }
     }
     return result;
};

export const htmlEncode = (str) => { //转义html
    var ele = document.createElement('span');
    ele.appendChild( document.createTextNode( str ) );
    return ele.innerHTML;
};

export const htmlDecode = (text) => { //反转义html
    var temp = document.createElement("div"); 
    temp.innerHTML = text; 
    var output = temp.innerText || temp.textContent; 
    temp = null; 
    return output; 
};

export const stripScript = (s) => { //去除script及其包含的内容
    return s.replace(/<script.*?>.*?<\/script>/ig, ''); 
};

export const substrTools = { // 截取字符串
    //获取字符串长度（数字英文为1，汉字为2）-----
    getStrLength: function(str) {
        var realLength = 0,
            len = str.length,
            charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
        }
        return realLength;
    },
    //截取字符串(l不为索引)------
    substrIndexFn: function(str, l) {
        var realLength = 0,
            len = str.length,
            charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (realLength == l || realLength == (l - 1)) {
                var mystr = substrTools.substrFn(str, i);
                return mystr;
            }
        }
    },
    //截取字符串------
    substrFn: function(str, l) {
        var str = str;
        str = str.substr(0, l).replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]$/g, "") + "...";
        return str;
    },
    //截取字符串(l不为索引)------
    substrIndex2Fn: function(str, l) {
        var realLength = 0,
            len = str.length,
            charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (realLength == l || realLength == (l - 1)) {
                var mystr = substrTools.substr2Fn(str, i);
                return mystr;
            }
        }
    },
    //截取字符串------
    substr2Fn: function(str, l) {
        var str = str;
        str = str.substr(0, l).replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]$/g, "");
        return str;
    }
};

export const getHost = function(url) { //获取 host
    var host = "null";
    if (typeof url == "undefined"|| null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/|:]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined"
        && null != match) {
        host = match[1];
    }
    if (typeof host != "undefined"
        && null != host) {
        var strAry = host.split(".");
        if (strAry.length > 1) {
            host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
        }
    }
    return host;
};

export const cookieTools = { // cookie操作
    get : function (name){
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null){
            return unescape(arr[2]);
        }
        return "";
    },
    set : function (name, value, days,domain){
        if (typeof days == "undefined"){
            domain = domain?domain:getHost();
            //document.cookie = name + "=" + escape(value) + "; path=/; domain="+domain;
            document.cookie = name + "=" + escape(value) + ";";
        }else{
            var expdate = new Date();
            var msecs = (typeof days === 'number') ? days * 24 * 60 * 60 * 1000 : 0;
            expdate.setTime(expdate.getTime() + msecs);
            //document.cookie = name + "=" + escape(value) + "; path=/; domain="+tools.getHost()+"; expires=" + expdate.toUTCString();
            document.cookie = name + "=" + escape(value) + "; expires=" + expdate.toUTCString();
        }
    },
    del : function (name){
        var expdate = new Date();
        expdate.setTime(expdate.getTime() - 1000);
        this.set(name, "", expdate);
    }
};

export const verifyTools = {
    checkPhone : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
            //var reg = /^[1][3,4,5,7,8][0-9]{9}$/; 
            var reg = verifyReg.checkPhone;
            if (!reg.test(value)) {
                callback(new Error('请输入11位数的手机号码'));
            } else callback();
        }, 500);
    },
    checkTelCn : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
            //var reg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/; 
            //var reg = /^([\d]+[\s\-]?)*[\d]$/;
            var reg = verifyReg.checkTelCn;
            if (!reg.test(value)) {
                callback(new Error('电话号码格式不正确')); 
            } else callback();
        }, 500);
    },
    checkTel : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
            //var reg = /^([\d]+[\s\-]?)*[\d]$/;
            var reg = verifyReg.checkTel;
            if (!reg.test(value)) {
                callback(new Error("只允许输入数字、空格和~!@#$%()-_=+,.;:'[{]}\|，空格不能在首尾或连续输入")); 
            } else callback();
        }, 500);
    },
    checkFaxCn : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
            //var reg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/; 
            var reg = verifyReg.checkFaxCn;
            if (!reg.test(value)) {
                callback(new Error('传真格式不正确')); 
            } else callback();
        }, 500);
    },
    checkFax : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
            //var reg = /^([\d]+[\s\-]?)*[\d]$/;
            var reg = verifyReg.checkFax;
            if (!reg.test(value)) {
                callback(new Error("只允许输入数字、空格和~!@#$%()-_=+,.;:'[{]}\|，空格不能在首尾或连续输入")); 
            } else callback();
        }, 500);
    },
    checkBankNo : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
            //var reg = /^([\d]+[\s\-]?)*[\d]$/;
            var reg = verifyReg.checkBankNo;
            if (!reg.test(value)) {
                callback(new Error("只允许输入数字和空格,空格不能在首尾或连续输入")); 
            } else callback();
        }, 500);
    },
    checkEmail : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
            //var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/; 
            var reg = verifyReg.checkEmail;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的邮箱格式'));
            } else callback();
        }, 500);
    },
    checkStar : (rule, value, callback) => {
        if (!value &&  value!= 0) return callback();
        setTimeout(() => {
          //var reg=/^([1-5])$/;
          var reg = verifyReg.checkStar;
          if (!reg.test(parseInt(value))) {
            callback(new Error('请选择星级'));
          } else callback();
        }, 500);
    },
    checkFiveNumber : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/^([0-5])$/;
          var reg = verifyReg.checkFiveNumber;
          if (!reg.test(parseInt(value))) {
            callback(new Error('请输入0-5的整数'));
          } else callback();
        }, 500);
    },
    checkNumberAll: (rule, value, callback) => {
      if (!value) return callback();
      setTimeout(() => {
        //var reg=/^\d*$/;
        var reg = verifyReg.checkNumberAll;
        if (!reg.test(value)) {
          callback(new Error('请输入数字'));
        } else callback();
      }, 500);
    },
    checkNumber: (rule, value, callback) => {
      if (!value) return callback();
      setTimeout(() => {
        //var reg=/^\d+$/;
        var reg = verifyReg.checkNumber;
        if (!reg.test(value)) {
          callback(new Error('请输入非负整数'));
        } else callback();
      }, 500);
    },
    checkNumber2: (rule, value, callback) => {
      if (!value) return callback();
      setTimeout(() => {
        //var reg=/^\d+(\.{0,1}\d+){0,1}$/;
        var reg = verifyReg.checkNumber2;
        if (!reg.test(value)) {
          callback(new Error('请输入非负数'));
        } else callback();
      }, 500);
    },
    checkNumber3: (rule, value, callback) => {
      if (!value) return callback();
      setTimeout(() => {
        //var reg=/^\+?[1-9][0-9]*$/;
        var reg = verifyReg.checkNumber3;
        if (!reg.test(value)) {
          callback(new Error('请输入正整数'));
        } else callback();
      }, 500);
    },
    checkNumber4: (rule, value, callback) => {
      if (!value) return callback();
      setTimeout(() => {
        //var reg=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
        var reg = verifyReg.checkNumber4;
        if (!reg.test(value)) {
          callback(new Error('只允许输入正数'));
        } else callback();
      }, 500);
    },
    checkNumOnly10: (rule, value, callback) => {
      if (!value) return callback();
      setTimeout(() => {
        var reg = verifyReg.checkNumOnly10;
        if (!reg.test(value)) {
          callback(new Error('请输入10位数字'));
        } else callback();
      }, 500);
    },
    checkNumLetterLong10: (rule, value, callback) => {
      if (!value) return callback();
      setTimeout(() => {
        var reg = verifyReg.checkNumLetterLong10;
        if (!reg.test(value)) {
          callback(new Error('请输入10位以下数字和字母'));
        } else callback();
      }, 500);
    },
    checkFloat1: (rule, value, callback) => {
      if (!value) return callback();
      setTimeout(() => {
        //var reg=/^[1-9]d*.d*|0.d*[1-9]d*|0?.0+|0$/;
        var reg = verifyReg.checkFloat1;
        if (!reg.test(value)) {
          callback(new Error('只允许输入非负浮点数'));
        } else callback();
      }, 500);
    },
    checkFloat2: (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/^[1-9]d*.d*|0.d*[1-9]d*|0?.0+|0$/;
          var reg = verifyReg.checkFloat2;
          if (!reg.test(value)) {
            callback(new Error('只允许输入0-1之间的小数'));
          } else callback();
        }, 500);
      },
    checkNameCn : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg= /^[\u4e00-\u9fa5]+$/;
          var reg = verifyReg.checkNameCn;
          if (!reg.test(value)) {
            callback(new Error('只允许输入中文'));
          } else callback();
        }, 500);
    },
    checkNameEn : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/^[A-Za-z]+$/;
          var reg = verifyReg.checkNameEn;
          if (!reg.test(value)) {
            callback(new Error('只允许输入英文'));
          } else callback();
        }, 500);
    },
    checkNameEnNum : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/^([A-Za-z0-9]+\s?)*[A-Za-z0-9]$/;
          var reg = verifyReg.checkNameEnNum;
          if (!reg.test(value)) {
            callback(new Error('只允许输入英文和数字'));
          } else callback();
        }, 500);
    },
    noSpec : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
            //var reg = /^([a-zA-Z0-9\u4e00-\u9fa5]+\s?)*[a-zA-Z0-9\u4e00-\u9fa5]$/;  
            var reg = verifyReg.noSpec;
            if (!reg.test(value)) {
                callback(new Error('只允许输入中文、英文、大小写字母，数字'));
            } else callback();
        }, 500);
    },
    noSpecStrict : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
            //var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/; 
            var reg = verifyReg.noSpecStrict;
            if (!reg.test(value)) {
                callback(new Error('只允许输入中文、英文、大小写字母，数字'));
            } else callback();
        }, 500);
    },
    checkNameCnForbid : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg = /[@#\$%\^&\*]+/g;    ~!@#$%()-_=+,<.>;:'"[{]}\|
          //var reg = /^([a-zA-Z0-9\u4e00-\u9fa5\`\~\!\@\#\$\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\（），\【\】]+\s?)*[a-zA-Z0-9\u4e00-\u9fa5\`\~\!\@\#\$\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\（），\【\】]$/;  
          var reg = verifyReg.checkNameCnForbid;
          //var reg = / /;
          if (!reg.test(value)) {
            //callback(new Error('禁止输入!@#$%^&*等特殊字符，空格不可以开头、结尾、连续输入'));
            callback(new Error('禁止输入特殊字符，空格不可以开头、结尾、连续输入'));
          } else callback();
        }, 500);
    },
    checkNameCnForbid1 : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg = /[@#\$%\^&\*]+/g;    ~!@#$%()-_=+,<.>;:'"[{]}\|
          //var reg = /^([a-zA-Z0-9\u4e00-\u9fa5\`\~\!\@\#\$\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\（），\【\】]+\s?)*[a-zA-Z0-9\u4e00-\u9fa5\`\~\!\@\#\$\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\（），\【\】]$/;  
          var reg = verifyReg.checkNameCnForbid1;
          //var reg = / /;
          if (!reg.test(value)) {
            //callback(new Error('禁止输入!@#$%^&*等特殊字符，空格不可以开头、结尾、连续输入'));
            callback(new Error('禁止输入特殊字符，空格不可以开头、结尾、连续输入'));
          } else callback();
        }, 500);
    },
    checkNameEnForbid : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg = /^([a-zA-Z0-9\`\~\!\@\#\$\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\]+\s?)*[a-zA-Z0-9\`\~\!\@\#\$\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\]$/;  
          var reg = verifyReg.checkNameEnForbid;
          if (!reg.test(value)) {
            //callback(new Error('禁止输入中文和!@#$%^&*等特殊字符，空格不可以开头、结尾、连续输入'));
            callback(new Error('禁止输入中文和特殊字符，空格不可以开头、结尾、连续输入'));
          } else callback();
        }, 500);
    },
    checkMoney : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          var reg = verifyReg.checkMoney;
          if (!reg.test(value)) {
            callback(new Error('请输入正确的金额'));
          } else callback();
        }, 500);
    },
	checkNumFloat : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          var reg = verifyReg.checkNumFloat2;
          if (!reg.test(value)) {
            callback(new Error('请输入正确的金额'));
          } else callback();
        }, 500);
    },
    checkNumFloat2 : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          var reg = verifyReg.checkNumFloat2;
          if (!reg.test(value)) {
            callback(new Error('请输入数字,允许2位小数'));
          } else callback();
        }, 500);
    },
    checkScript : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/<script[^>]*>.*(?=<\/script>)<\/script>/gi;
          var reg = verifyReg.checkScript;
          if (reg.test(value)) {
            callback(new Error('不允许输入js代码'));
          } else callback();
        }, 500);
    },
    checkSql : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/select|update|delete|exec|count|’|"|=|;|>|<|%/i;
          var reg = verifyReg.checkSql;
          if (reg.test(value)) {
            callback(new Error('不允许输入输入特殊字符和SQL关键字'));
          } else callback();
        }, 500);
    },
    checkRate : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/(^[1-9][0-9]$|^[0-9]$|^100$)/;
          var reg = verifyReg.checkRate;
          if (!reg.test(value)) {
            callback(new Error('请输入0-100的整数'));
          } else callback();
        }, 500);
    },
    checkRate2 : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/^((\d|[123456789]\d)(\.\d+)?|100)$/;
          var reg = verifyReg.checkRate4;
          if (!reg.test(value)) {
            callback(new Error('请输入0-100的数，可为0，可为100，最多含2位小数'));
          } else callback();
        }, 500);
    },
    checkRate3 : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/^((\d|[123456789]\d)(\.\d+)?|100)$/;
          var reg = verifyReg.checkRate3;
          if (!reg.test(value)) {
            callback(new Error('请输入1-100的数'));
          } else callback();
        }, 500);
    },
    check4En7Num : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/^[a-zA-Z]{4}[0-9]{7}$/;
          var reg = verifyReg.check4En7Num;
          if (!reg.test(value)) {
            callback(new Error('输入格式：4个字母+7个数字'));
          } else callback();
        }, 500);
    },
    checkArray : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          //var reg=/^[a-zA-Z]{4}[0-9]{7}$/;
          if (value.length == 0) {
            callback(new Error('请选择'));
          } else callback();
        }, 500);
    }
}
