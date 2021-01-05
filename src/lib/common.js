import verifyReg from 'lib/verifyReg';

export function downLoadFile(api,apiurl){
    let url = api + apiurl + '&token='+ sessionStorage.getItem('token');
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download','file');
    document.body.appendChild(link);
    link.click();
    link.remove();
}

export default{
    downLoadFile
}

export const Regcheck= {
    checkNameCn : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          // var reg = /^[\w\u4e00-\u9fa5（）()，,\-+_][\s\w\u4e00-\u9fa5（）()，,\-+_]*[\w\u4e00-\u9fa5（）()，,\-+_]$/;
          var reg = verifyReg.checkNameCnForbid;
          if (!reg.test(value)) {
            callback(new Error('不允许输入!@#$%^&* 特殊字符，首尾不能为空格'));
          } else callback();
        }, 500);
    },
    checkNameEn : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          // var reg = /^[\w\,.()+-_][\s\w\,.()+-_]*[\w\,.()+-_]$/;
          var reg = verifyReg.checkNameEnForbid;
          if (!reg.test(value)) {
            callback(new Error('不允许输入中文以及 !@#$%^&* 特殊字符，首尾不能为空格'));
          } else callback();
        }, 500);
    },
    checkNo : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          // var reg = /^[0-9]+$/;
          var reg = verifyReg.checkNumberAll
          if (!reg.test(value)) {
            callback(new Error('只允许输入数字'));
          } else callback();
        }, 500);
    },
    checkNum : (rule, value, callback) => {
        if (!value) return callback();
        setTimeout(() => {
          var reg = /^\d+(\.\d{1,5})?$/;
          if (!reg.test(value)) {
            callback(new Error('只允许输入数字，小数(小数不能超过5位)'));
          } else callback();
        }, 500);
    },
    checkTel : (rule, value, callback) => {
      if (!value) return callback();
      setTimeout(() => {
        var reg = /^[\d\-][\s\d\-]*[\d\-]$/;
        if (!reg.test(value)) {
          callback(new Error('只允许输入数字和空格还有"-",空格不允许开头与结尾'));
        } else callback();
      }, 500);
	},
	checkMoney : (rule, value, callback) => {
		if (!value) return callback();
		setTimeout(() => {
		  var reg = /^-?\d+(.\d{1,2})?$/;
		  if (!reg.test(value)) {
			callback(new Error('请输入正确的金额'));
		  } else callback();
		}, 500);
	},
	checkNumOnly7 : (rule, value, callback) => {
		if (!value) return callback();
		setTimeout(() => {
		  var reg = verifyReg.checkNumOnly7;
		  if (!reg.test(value)) {
			callback(new Error('请输入7位数字'));
		  } else callback();
		}, 500);
	},
	checkNumOnly9 : (rule, value, callback) => {
		if (!value) return callback();
		setTimeout(() => {
		  var reg = verifyReg.checkNumOnly9;
		  if (!reg.test(value)) {
			callback(new Error('请输入9位数字'));
		  } else callback();
		}, 500);
	},
}