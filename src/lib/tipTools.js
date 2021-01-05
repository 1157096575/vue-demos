
import 'static/js/jquery.pure.tooltips.js';
import { substrTools } from 'lib/utils';

/**
 * 文字输入限制+提示
 * @param num 中文字数
 * @param str 文字
 * @returns {Function}
 */
export const beyondWordsTip = (id,str,num) => {
    var num1 = num;
    var num2 = num ? num * 2 : 0;
    var target = $('#'+id);
    if(str && substrTools.getStrLength(str) > num2){
        $.pt({
            target: target,
            content: '只允许输入'+num1+'字!'
        });
        return str = substrTools.substrIndex2Fn(str, num2);
    }
    return str;
};