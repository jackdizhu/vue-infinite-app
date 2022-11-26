const fs = require('fs');

/**
 * 查看key&value
 * @param {Object} moduleObj 要查看的对象
 */
const getKeysAndVal = function getKeysAndVal(moduleObj = {}, index = 0, parentKey = '') {
  return Object.keys(moduleObj).map((key) => {
    let val = moduleObj[key]
    let keyStr = parentKey ? `${parentKey}.${key}` : key
    let typeStr = Object.prototype.toString.call(val);
    if (typeof val === 'string' || typeof val === 'number') {
      return `{key: "${keyStr}", "value: ${val}}",`;
    } else if (typeStr === '[object Object]' && index < 1) {
      return `{key: "${keyStr}", type: "${typeStr}", child: ${getKeysAndVal(val, index + 1, keyStr)}},`;
    }
    return `{key: "${keyStr}", type: "${typeStr}}",`;
  }).join('\n');
};

const idFunction = function idFunction(rootPath = '') {
  const checkStr = function checkStr(str) {
    // 部分模块包使用name命名
    const includeList = [/\/main[_-][0-9a-zA-Z_-]+\.js$/, /-remote-components?\.[0-9a-zA-Z_-]+\.js$/].some(($reg) => {
      return $reg.test(str);
    });
    const excludeList = [/\/node_modules\//].some(($reg) => {
      return $reg.test(str);
    });
    return includeList && !excludeList;
  };
  return function idFunctionName(id, $module) {
    const rootModule = $module.rootModule;
    const buildInfo = $module.buildInfo;
    let isNamed = false;
    // 根据resource文件全路径
    if (buildInfo && buildInfo.exportsArgument === '__webpack_exports__' && rootModule && rootModule.userRequest) {
      isNamed = checkStr(rootModule.userRequest);
    }
    if (isNamed && rootModule && rootModule.userRequest) {
      return rootModule.userRequest.replace(rootPath, '');
    }
    return id;
  };
};

/**
 * 追加写入文件
 * @param {String} $path 文件路径
 * @param {String} data 文件内容
 */
const addWriteFileSync = function addWriteFileSync($path, data = '') {
  let str = fs.readFileSync($path).toString();
  str += data;
  fs.writeFileSync($path, str);
};

module.exports = {
  getKeysAndVal,
  idFunction,
  addWriteFileSync,
};
