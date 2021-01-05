const verifyReg = {
    checkNameCnForbid: /^([a-zA-Z0-9\u4e00-\u9fa5\`\~\!\@\#\$\%\&\\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\（），\【\】]+\s?)*[a-zA-Z0-9\u4e00-\u9fa5\`\~\!\@\#\$\&\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\（），\【\】]$/,//xx中文名称禁止输入除.  外的特殊字符，空格不可以开头、结尾、连续输入   当前系统允许输入的字符包括: `~!@#$%()-_=+,<.>;:'"[{]}\|
    checkNameCnForbid1: /^([a-zA-Z0-9\u4e00-\u9fa5\`\~\!\@\#\$\%\&\\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\（），\【\】\/]+\s?)*[a-zA-Z0-9\u4e00-\u9fa5\`\~\!\@\#\$\&\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\（），\【\】\/]$/,//xx中文名称禁止输入除.  外的特殊字符，空格不可以开头、结尾、连续输入   当前系统允许输入的字符包括: `~!@#$%()-_=+,<.>;:'"[{]}\|
    checkNameEnForbid: /^([a-zA-Z0-9\`\~\!\@\#\$\&\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\]+\s?)*[a-zA-Z0-9\`\~\!\@\#\$\&\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\]$/,//xx英文名称禁止输入中文和除  外的特殊字符，空格不可以开头、结尾、连续输入
    checkPhone : /^[1][3,4,5,7,8][0-9]{9}$/,//请输入11位数的手机号码
    checkTelCn: /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/,//电话号码格式不正确
    //checkTel: /^([\d+]+[\s\-+]?)*[\d]$/,//只允许输入数字，空格和-+,空格和-不能在首尾或连续输入
    checkTel: /^([0-9\`\~\!\@\#\$\&\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\]+\s?)*[0-9\`\~\!\@\#\$\&\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\]$/,//xx电话 在原有基础上可输入“就允许输入  `~!@#$%()-_=+,.;:'"[{]}\|”
    checkFaxCn: /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/,//传真格式不正确(cn)
    //checkFax: /^([\d+]+[\s\-+]?)*[\d]$/,//只允许输入数字，空格和-，空格和-不能在首尾或连续输入
    checkFax:/^([0-9\`\~\!\@\#\$\&\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\]+\s?)*[0-9\`\~\!\@\#\$\&\%\(\)\-\_\=\+\,\<\.\>\;\:\'\"\[\{\]\}\|\\]$/,//xx传真
    checkEmail: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,//请输入正确的邮箱格式
    checkStar: /^([1-5])$/,//请选择星级
    checkBankNo: /^([\d+]+[\s]?)*[\d]$/,//只允许输入数字和空格,空格不能在首尾或连续输入
    checkFiveNumber: /^([0-5])$/,//请输入0-5的整数
    checkNumberFloat: /^\d+(\.\d+)?$/,
    checkNumberAll: /^\d*$/,//请输入数字
    checkNumberAll2: /^[0-9]*$/,
    checkNumberAllNum: /^(-?\d+)(\.\d+)?$/,//所有数字（包括正负浮点数）
    checkNumber: /^\d+$/,//请输入非负整数
    checkNumber2: /^\d+(\.{0,1}\d+){0,1}$/,//请输入非负数
    checkNumber3: /^\+?[1-9][0-9]*$/, //请输入正整数
    checkNumber4: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,//只允许输入正数
    checkNumber5: /^-?\d+$/,//只允许输入整数
    checkFloat1: /^[1-9]d*.d*|0.d*[1-9]d*|0?.0+|0$/,//只允许输入非负浮点数
    checkFloat2: /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/,//0-1之间的小数（包含0和1）
    checkNameCn:/^[\u4e00-\u9fa5]+$/,//只允许输入中文
    checkNameEn: /^[A-Za-z]+$/,//只允许输入英文
    checkNameEnNum: /^([A-Za-z0-9]+\s?)*[A-Za-z0-9]$/, //只允许输入英文和数字
    noSpec: /^([a-zA-Z0-9\u4e00-\u9fa5]+\s?)*[a-zA-Z0-9\u4e00-\u9fa5]$/,//只允许输入中文、英文、大小写字母，数字,
    noSpecStrict: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,//只允许输入中文、英文、大小写字母，数字
    checkMoney: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,//请输入正确的金额
    checkScript: /<script[^>]*>.*(?=<\/script>)<\/script>/gi,//不允许输入js代码
    checkSql:/select|update|delete|exec|count|’|"|=|;|>|<|%/i,// 不允许输入输入特殊字符和SQL关键字
    checkRate: /(^[1-9][0-9]$|^[0-9]$|^100$)/,//请输入0-100的整数
    checkRate2: /^((\d|[123456789]\d)(\.\d+)?|100)$/,//请输入0-100的数(含小数)
    checkRate3: /^([1-9][0-9]{0,1}|100)$/,//请输入1-100的整数
    checkRate4: /^([0-9][0-9]{0,1}(\.\d{1,2})?|100|100.0|100.00)$/,//请输入0-100的数(可为0，可为100，最多含2位小数)
    check4En7Num: /^[a-zA-Z]{4}[0-9]{7}$/,//输入格式：4个字母+7个数字
    checkNumL10: /^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]{0,10}$/, //必须是大写字母与数字组合且长度不能超过10
    checkNumL4: /^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]{0,4}$/, //必须是大写字母与数字组合且长度不能超过4
    checkNumLong10: /^[0-9A-Z]{0,10}$/, //只能输入数字、大写字母或两者组合且长度不能超过10
    checkNumLetterLong10: /^[0-9a-zA-Z]{0,10}$/, //只能输入数字、大小写字母或两者组合且长度不能超过10
    checkNumOnly10:/^[0-9]{10}$/, //10位纯数字
	checkNumOnly7:/^[0-9]{7}$/, //7位纯数字
    checkNumOnly9:/^[0-9]{9}$/, //9位纯数字
    checkNumLong4: /^[0-9A-Z]{0,4}$/, //只能输入数字、大写字母或两者组合且长度不能超过10
	checkNumAndAtoZ:  /^[0-9A-Z]*$/, //只能输入数字、大写字母或两者组合
	checkNumAndAtoZ1:  /^[A-Z0-9;]*[A-Z0-9]+$/, //只能输入数字、大写字母或两者组合
	checkNumFloat1:/^[1-9]\d*\,\d*|[1-9]\d*$/, //整数或小数
    checkNumFloat2:/^([\+ \-]?(([1-9]\d*)|(0)))([.]\d{0,2})?$/, //一到两位小数的正数或负数
    checkPassWord:/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/
}

export default verifyReg;
