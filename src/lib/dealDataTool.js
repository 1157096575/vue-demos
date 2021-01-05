/**
 * json转成树状数据
 * @param json 格式==> {"国内":{"COUN38475_中国/China":{"COUN38096_北京/Beijing":{},"COUN38099_重庆/Chongqing":{}}}
 * @returns [Array]
 */
export const toTreeDataAboutCityFn = (json) => {
    let mydataResArr = [];
    function toTreeData(mydataRes,mydataResArr){
      for(var a in mydataRes){
        if(a){
          let index = a.indexOf('_');
          let item = {};
          item.label = a.substring(0, index) || a;
          item.code = a.substring(index+1, a.length) || a;
          var f = false;
          for(var b in mydataRes[a]){
            if(b){
              f = true;
            }
          }
          if(f){
            item.children = [];
          }
          mydataResArr.push(item);
          toTreeData(mydataRes[a],item.children)
          //console.log(depth)
        }
      }
    }
    toTreeData(json,mydataResArr);
    return mydataResArr;
};

/**
 * 取值
 * @param json 格式==> {"国内":{"COUN38475_中国/China":{"COUN38096_北京/Beijing":{},"COUN38099_重庆/Chongqing":{}}}
 * @param code
 * @returns {Object}
 */

export const getDataFromJsonAboutCityFn = (json,code) => {
    var mydataRes = {};
    for(var a in json){
        if(a){
            var index = a.indexOf('_');
            var code = a.substring(0, index);
            if(code == code){
                mydataRes = json[a];
                break;
            }else{
                getDataFromJsonAboutCityFn(json[a]);
            }
        }
    }
    return mydataRes;
};